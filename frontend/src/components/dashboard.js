import {HttpUtils} from "../utils/http-utils";
import config from "../config/config";

export class Dashboard {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.getOrders().then();
    }

    async getOrders() {
        const result = await HttpUtils.request('/orders');
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }

        if (result.error || !result.response || (result.response && (result.response.error || !result.response.orders))) {
            return alert('Возникла ошибка при запросе заказов. Обратитесь в поддержку');
        }

        this.loadOrdersInfo(result.response.orders);
        this.loadCalendarInfo(result.response.orders);
    }

    loadOrdersInfo(orders) {
        document.getElementById('count-orders').innerText = orders.length;
        document.getElementById('done-orders').innerText = orders.filter(order => order.status === config.orderStatuses.success).length;
        document.getElementById('in-progress-orders').innerText = orders.filter(order => [config.orderStatuses.new, config.orderStatuses.confirmed].includes(order.status)).length;
        document.getElementById('canceled-orders').innerText = orders.filter(order => order.status === config.orderStatuses.canceled).length;
    }

    loadCalendarInfo(orders) {
        const preparedEvents = [];

        for (let i = 0; i < orders.length; i++) {
            let color = null;
            if (orders[i].status === config.orderStatuses.success) {
                color = 'gray';
            }

            if (orders[i].scheduledDate) {
                const scheduledDate = new Date(orders[i].scheduledDate);
                preparedEvents.push({
                    title: orders[i].freelancer.name + ' ' + orders[i].freelancer.lastName + ' выполняет заказ ' + orders[i].number,
                    start: scheduledDate,
                    backgroundColor: color ? color : '#00c0ef',
                    borderColor: color ? color : '#00c0ef',
                    allDay: true
                });
            }
            if (orders[i].deadlineDate) {
                const deadlineDate = new Date(orders[i].deadlineDate);
                preparedEvents.push({
                    title: 'Дедлайн заказа ' + orders[i].number,
                    start: deadlineDate,
                    backgroundColor: color ? color : '#f39c12',
                    borderColor: color ? color : '#f39c12',
                    allDay: true
                });
            }
            if (orders[i].completeDate) {
                const completeDate = new Date(orders[i].completeDate);
                preparedEvents.push({
                    title: 'Заказ ' + orders[i].number + ' выполнен фрилансером ' + orders[i].freelancer.name,
                    start: completeDate,
                    backgroundColor: color ? color : '#00a65a',
                    borderColor: color ? color : '#00a65a',
                    allDay: true
                });
            }
        }


        var date = new Date()
        var d = date.getDate(),
            m = date.getMonth(),
            y = date.getFullYear();
        const calendarElement = document.getElementById('calendar');
        const calendar = new FullCalendar.Calendar(calendarElement, {
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: ''
            },
            firstDay: 1,
            locale: 'ru',
            themeSystem: 'bootstrap',
            //Random default events
            events: preparedEvents,
            // events: [
            //     {
            //         title: 'All Day Event',
            //         start: new Date(y, m, 1),
            //         backgroundColor: '#f56954', //red
            //         borderColor: '#f56954', //red
            //         allDay: true
            //     },
            //     {
            //         title: 'Long Event',
            //         start: new Date(y, m, d - 5),
            //         end: new Date(y, m, d - 2),
            //         backgroundColor: '#f39c12', //yellow
            //         borderColor: '#f39c12' //yellow
            //     },
            //     {
            //         title: 'Meeting',
            //         start: new Date(y, m, d, 10, 30),
            //         allDay: false,
            //         backgroundColor: '#0073b7', //Blue
            //         borderColor: '#0073b7' //Blue
            //     },
            //     {
            //         title: 'Lunch',
            //         start: new Date(y, m, d, 12, 0),
            //         end: new Date(y, m, d, 14, 0),
            //         allDay: false,
            //         backgroundColor: '#00c0ef', //Info (aqua)
            //         borderColor: '#00c0ef' //Info (aqua)
            //     },
            //     {
            //         title: 'Birthday Party',
            //         start: new Date(y, m, d + 1, 19, 0),
            //         end: new Date(y, m, d + 1, 22, 30),
            //         allDay: false,
            //         backgroundColor: '#00a65a', //Success (green)
            //         borderColor: '#00a65a' //Success (green)
            //     },
            //     {
            //         title: 'Click for Google',
            //         start: new Date(y, m, 28),
            //         end: new Date(y, m, 29),
            //         url: 'https://www.google.com/',
            //         backgroundColor: '#3c8dbc', //Primary (light-blue)
            //         borderColor: '#3c8dbc' //Primary (light-blue)
            //     }
            // ],
        });

        calendar.render();
    }
}