import {HttpUtils} from "../../utils/http-utils";
import {UrlUtils} from "../../utils/url-utils";

export class OrdersDelete {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        const id = UrlUtils.getUrlParam('id');
        if (!id) {
            return this.openNewRoute('/');
        }

        this.deleteOrder(id).then();
    }

    async deleteOrder(id) {
        const result = await HttpUtils.request('/orders/' + id, "DELETE", true);
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }

        if (result.error || !result.response || (result.response && result.response.error)) {
            console.log(result.response.message);
            return alert('Возникла ошибка при удалении заказа. Обратитесь в поддержку');
        }

        return this.openNewRoute("/orders");
    }

}