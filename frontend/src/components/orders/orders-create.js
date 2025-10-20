import {ValidationUtils} from "../../utils/validation-utils";
import {FreelancersService} from "../../services/freelancers-service";
import {OrdersService} from "../../services/orders-services";

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
        const response = await FreelancersService.getFreelancers();

        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }

        for (let i = 0; i < response.freelancers.length; i++) {
            const option = document.createElement("option");
            option.value = response.freelancers[i].id;
            option.innerText = response.freelancers[i].name + ' ' + response.freelancers[i].lastName;
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


            const response = await OrdersService.createOrder(createData);

            if (response.error) {
                alert(response.error);
                return response.redirect ? this.openNewRoute(response.redirect) : null;
            }

            return this.openNewRoute("/orders/view?id=" + response.id);
        }
    }

}