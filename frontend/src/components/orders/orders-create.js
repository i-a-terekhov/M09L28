export class OrdersCreate {
    constructor() {
        $('#calendar-scheduled').datetimepicker({
            inline: true,
            locale: 'ru',
            icons: {
                time: 'far fa-clock',
            },
            useCurrent: false,
        });
        $('#calendar-complete').datetimepicker({
            inline: true,
            locale: 'ru',
            icons: {
                time: 'far fa-clock',
            },
            buttons: {
                showClear: true,
            },
            useCurrent: false,
        });
        $('#calendar-deadline').datetimepicker({
            inline: true,
            locale: 'ru',
            icons: {
                time: 'far fa-clock',
            },
            useCurrent: false,
        });
    }

}