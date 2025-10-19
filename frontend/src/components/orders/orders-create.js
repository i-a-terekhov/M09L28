import {HttpUtils} from "../../utils/http-utils";
import {ValidationUtils} from "../../utils/validation-utils";

export class OrdersCreate {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        document.getElementById('saveButton').addEventListener('click', this.saveOrder.bind(this));

        this.scheduledDate = null;
        this.deadlineDate = null;
        this.completeDate = null;

        const calendarOptions = {
            inline: true,
            locale: 'ru',
            icons: {
                time: 'far fa-clock',
            },
            useCurrent: false,
        };

        const calendarScheduled = $('#calendar-scheduled');
        calendarScheduled.datetimepicker(calendarOptions);
        calendarScheduled.on("change.datetimepicker", (e) => {
            this.scheduledDate = e.date;
        });

        const calendarDeadline = $('#calendar-deadline');
        calendarDeadline.datetimepicker(calendarOptions);
        calendarDeadline.on("change.datetimepicker", (e) => {
            this.deadlineDate = e.date;
        });

        const calendarComplete = $('#calendar-complete');
        calendarOptions.buttons = {
            showClear: true,
        };
        calendarComplete.datetimepicker(calendarOptions);
        calendarComplete.on("change.datetimepicker", (e) => {
            this.completeDate = e.date;
        });

        this.findElements();

        this.validations = [
            {element: this.descriptinInputElement},
            {element: this.amountInputElement},
            {element: this.scheduledCardElement, options: {checkProperty: this.scheduledDate}},
            {element: this.deadlineCardElement, options: {checkProperty: this.deadlineDate}},
        ];
        this.getFreelancers().then();
    }

    findElements() {
        this.freelancersSelectElement = document.getElementById('freelancerSelect');
        this.statusSelectElement = document.getElementById('statusSelect');
        this.descriptinInputElement = document.getElementById('descriptionInput');
        this.amountInputElement = document.getElementById('amountInput');
        this.scheduledCardElement = document.getElementById('scheduled-card');
        this.deadlineCardElement = document.getElementById('deadline-card');
    }

    async getFreelancers() {
        const result = await HttpUtils.request('/freelancers');
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }

        if (result.error || !result.response || (result.response && (result.response.error || !result.response.freelancers))) {
            return alert('Возникла ошибка при запросе фрилансеров. Обратитесь в поддержку');
        }

        const freelancers = result.response.freelancers;
        for (let i = 0; i < freelancers.length; i++) {
            const option = document.createElement("option");
            option.value = freelancers[i].id;
            option.innerText = freelancers[i].name + ' ' + freelancers[i].lastName;
            this.freelancersSelectElement.appendChild(option);
        }

        $(this.freelancersSelectElement).select2({
            theme: 'bootstrap4'
        });
    }

    async saveOrder(e) {
        e.preventDefault();

        if (ValidationUtils.validateForm(this.validations)) { // #ERROR Ошибка у Чернова: deadlineDate и scheduledDate определяются после передачи в функцию
            const createData = {
                description: this.descriptinInputElement.value,
                deadlineDate: this.deadlineDate.toISOString(),
                scheduledDate: this.scheduledDate.toISOString(),
                freelancer: this.freelancersSelectElement.value,
                status: this.statusSelectElement.value,
                amount: parseInt(this.amountInputElement.value),
            }

            if (this.completeDate) {
                createData.completeDate = this.completeDate.toISOString();
            }

            const result = await HttpUtils.request('/orders', "POST", true, createData);
            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }

            if (result.error || !result.response || (result.response && result.response.error)) {
                console.log(result.response.message);
                return alert('Возникла ошибка при добавлении заказа. Обратитесь в поддержку');
            }

            return this.openNewRoute("/orders/view?id=" + result.response.id);
        }
    }


}