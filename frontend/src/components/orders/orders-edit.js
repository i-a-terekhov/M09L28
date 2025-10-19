import {HttpUtils} from "../../utils/http-utils";
import {ValidationUtils} from "../../utils/validation-utils";
import {UrlUtils} from "../../utils/url-utils";

export class OrdersEdit {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        const id = UrlUtils.getUrlParam('id');
        if (!id) {
            return this.openNewRoute('/');
        }

        document.getElementById('updateButton').addEventListener('click', this.updateOrder.bind(this));

        this.scheduledDate = null;
        this.deadlineDate = null;
        this.completeDate = null;

        this.findElements();

        this.validations = [
            {element: this.descriptionInputElement},
            {element: this.amountInputElement},
        ];
        this.init(id).then();
    }

    findElements() {
        this.freelancersSelectElement = document.getElementById('freelancerSelect');
        this.statusSelectElement = document.getElementById('statusSelect');
        this.descriptionInputElement = document.getElementById('descriptionInput');
        this.amountInputElement = document.getElementById('amountInput');
    }

    async init(id) {
        const orderData = await this.getOrder(id);
        if (orderData) {
            this.showOrder(orderData);
            if (orderData.freelancer) {
                await this.getFreelancers(orderData.freelancer.id);
            }
        }
    }

    async getOrder(id) {
        const result = await HttpUtils.request('/orders/' + id);
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }

        if (result.error || !result.response || (result.response && result.response.error)) {
            return alert('Возникла ошибка при запросе заказа. Обратитесь в поддержку');
        }

        this.orderOriginalData = result.response;

        return result.response;
    }

    async getFreelancers(currentFreelancerId) {
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
            if (currentFreelancerId === freelancers[i].id) {
                option.selected = true;
            }
            this.freelancersSelectElement.appendChild(option);
        }

        $(this.freelancersSelectElement).select2({
            theme: 'bootstrap4'
        });
    }

    showOrder(order) {
        const breadcrumbsElement = document.getElementById('breadcrumbs-order');
        breadcrumbsElement.href = '/orders/view?id=' + order.id;
        breadcrumbsElement.innerText = order.number;

        this.amountInputElement.value = order.amount;
        this.descriptionInputElement.value = order.description;
        for (let i = 0; i < this.statusSelectElement.options.length; i++) {
            if (this.statusSelectElement.options[i].value === order.status) {
                this.statusSelectElement.selectedIndex = i;
            }
        }

        const calendarOptions = {
            inline: true,
            locale: 'ru',
            icons: {
                time: 'far fa-clock',
            },
            useCurrent: false,
        }

        const calendarScheduled = $('#calendar-scheduled');
        calendarScheduled.datetimepicker(Object.assign({}, calendarOptions, {date: order.scheduledDate}));
        calendarScheduled.on("change.datetimepicker", (e) => {
            this.scheduledDate = e.date;
        });

        const calendarDeadline = $('#calendar-deadline');
        calendarDeadline.datetimepicker(Object.assign({}, calendarOptions, {date: order.deadlineDate}));
        calendarDeadline.on("change.datetimepicker", (e) => {
            this.deadlineDate = e.date;
        });

        const calendarComplete = $('#calendar-complete');
        calendarComplete.datetimepicker(Object.assign({}, calendarOptions, {
            date: order.completeDate,
            buttons: {
                showClear: true,
            }
        }));
        calendarComplete.on("change.datetimepicker", (e) => {
            if (e.date) {
                this.completeDate = e.date
            } else if (this.orderOriginalData.completeDate) {
                this.completeDate = false;
            } else {
                this.completeDate = null;
            }
        });
    }

    async updateOrder(e) {
        e.preventDefault();

        if (ValidationUtils.validateForm(this.validations)) {

            const changedData = {}
            if (parseInt(this.amountInputElement.value) !== parseInt(this.orderOriginalData.amount)) {
                changedData.amount = parseInt(this.amountInputElement.value);
            }
            if (this.descriptionInputElement.value !== this.orderOriginalData.description) {
                changedData.description = this.descriptionInputElement.value;
            }
            if (this.statusSelectElement.value !== this.orderOriginalData.status) {
                changedData.status = this.statusSelectElement.value;
            }
            if (this.freelancersSelectElement.value !== this.orderOriginalData.freelancer.id) {
                changedData.freelancer = this.freelancersSelectElement.value;
            }
            if (this.completeDate || this.completeDate === false) {
                changedData.completeDate = this.completeDate ? this.completeDate.toISOString() : null;
            }
            if (this.deadlineDate) {
                changedData.deadlineDate = this.deadlineDate.toISOString();
            }
            if (this.scheduledDate) {
                changedData.scheduledDate = this.scheduledDate.toISOString();
            }

            if (Object.keys(changedData).length > 0) {
                const result = await HttpUtils.request('/orders/' + this.orderOriginalData.id, "PUT", true, changedData);
                if (result.redirect) {
                    return this.openNewRoute(result.redirect);
                }

                if (result.error || !result.response || (result.response && result.response.error)) {
                    console.log(result.response.message);
                    return alert('Возникла ошибка при редактировании заказа. Обратитесь в поддержку');
                }

                return this.openNewRoute("/orders/view?id=" + this.orderOriginalData.id);
            }
        }
    }

}