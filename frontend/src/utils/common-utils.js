import config from "../config/config";

export class CommonUtils {
    static getLevelHtml(level) {
        let levelHtml = null;
        switch (level) {
            case config.freelancerLevels.junior:
                levelHtml = '<span class="badge badge-info">Junior</span>'
                break;
            case config.freelancerLevels.middle:
                levelHtml = '<span class="badge badge-warning">Middle</span>'
                break;
            case config.freelancerLevels.senior:
                levelHtml = '<span class="badge badge-success">Senior</span>'
                break;
            default:
                levelHtml = '<span class="badge badge-secondary">Unknown</span>'
        }

        return levelHtml;
    }

    static getStatusInfo(status) {
        let statusHtml = null;
        switch (status) {
            case config.orderStatuses.new:
                statusHtml = '<span class="badge badge-secondary">Новый</span>'
                break;
            case config.orderStatuses.confirmed:
                statusHtml = '<span class="badge badge-info">Подтвержден</span>'
                break;
            case config.orderStatuses.success:
                statusHtml = '<span class="badge badge-success">Выполнен</span>'
                break;
            case config.orderStatuses.canceled:
                statusHtml = '<span class="badge badge-danger">Отменен</span>'
                break;
            default:
                statusHtml = '<span class="badge badge-secondary">Неизвестно</span>'
        }

        return statusHtml;
    }
}