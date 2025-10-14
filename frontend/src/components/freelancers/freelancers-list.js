import {HttpUtils} from "../../utils/http-utils";
import {AuthUtils} from "../../utils/auth-utils";

export class FreelancersList {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        this.getFreelancers().then();
    }

    async getFreelancers() {
        const result = await HttpUtils.request('/freelancers');
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }

        if (result.error || !result.response || (result.response && (result.response.error || !result.response.freelancers))) {
            return alert('Возникла ошибка при запросе фрилансеров. Обратитесь в поддержку');
        }

        this.showRecords(result.response.freelancers);
    }

    showRecords(freelancers) {
        console.log(freelancers);
    }
}