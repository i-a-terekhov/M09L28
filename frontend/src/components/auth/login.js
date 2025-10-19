import {AuthUtils} from "../../utils/auth-utils";
import {HttpUtils} from "../../utils/http-utils";
import {ValidationUtils} from "../../utils/validation-utils";

export class Login {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        if (AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            return this.openNewRoute('/');
        }

        this.emailElement = document.getElementById("email");
        this.passwordElement = document.getElementById("password");
        this.rememberMeElement = document.getElementById("remember-me");
        this.commonErrorElement = document.getElementById("common-error");

        this.validations = [
            {element: this.passwordElement},
            {element: this.emailElement, options: {pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/}},
        ];

        document.getElementById("process-button").addEventListener("click", this.login.bind(this));
    }

    async login() {
        this.commonErrorElement.style.display = "none";
        if (ValidationUtils.validateForm(this.validations)) {

            const result = await HttpUtils.request('/login', 'POST', false, {
                email: this.emailElement.value,
                password: this.passwordElement.value,
                rememberMe: this.rememberMeElement.checked,
            });

            if (result.error || !result.response || (result.response && !result.response.accessToken || !result.response.refreshToken || !result.response.id || !result.response.name)) {
                this.commonErrorElement.style.display = "block";
                return;
            }

            AuthUtils.setAuthInfo(result.response.accessToken, result.response.refreshToken, {
                id: result.response.id,
                name: result.response.name
            });

            this.openNewRoute('/');

        }
    }
}