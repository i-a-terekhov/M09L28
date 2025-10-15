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
}