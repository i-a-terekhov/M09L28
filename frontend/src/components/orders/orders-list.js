import {CommonUtils} from "../../utils/common-utils";
import {OrdersService} from "../../services/orders-services";

export class OrdersList {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.getOrders().then();
    }

    async getOrders() {
        const response = await OrdersService.getOrders();

        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }

        this.showRecords(response.orders);
    }

    showRecords(orders) {
        const recordsElement = document.getElementById('records');
        for (let i = 0; i < orders.length; i++) {
            const statusInfo = CommonUtils.getStatusInfo(orders[i].status);

            const trElement = document.createElement('tr');
            trElement.insertCell().innerText = orders[i].number;
            trElement.insertCell().innerText = orders[i].owner.name + ' ' + orders[i].owner.lastName;
            trElement.insertCell().innerHTML = '<a href="/freelancers/view?id=' + orders[i].freelancer.id + '">' + orders[i].freelancer.name + ' ' + orders[i].freelancer.lastName + '</a>';
            trElement.insertCell().innerText = (new Date(orders[i].scheduledDate)).toLocaleString('ru-RU');
            trElement.insertCell().innerText = (new Date(orders[i].deadlineDate)).toLocaleString('ru-RU');
            trElement.insertCell().innerHTML = '<span class="badge badge-' + statusInfo.color + '">' + statusInfo.name + '</span>'
            trElement.insertCell().innerText = orders[i].completeDate ? (new Date(orders[i].completeDate)).toLocaleString('ru-RU') : '';
            trElement.insertCell().innerHTML = CommonUtils.generateGridToolsColumn('orders', orders[i].id);

            recordsElement.appendChild(trElement);
        }

        new DataTable('#data-table', {
            language: {
                "lengthMenu":     "Показывать _MENU_ записей на странице",
                "search":         "Фильтр:",
                "info":           "Страница _PAGE_ из _PAGES_",
                "paginate": {
                    "next":       "Вперед",
                    "previous":   "Назад"
                },
            }
        });
    }
}