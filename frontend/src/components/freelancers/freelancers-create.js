import {HttpUtils} from "../../utils/http-utils";

export class FreelancersCreate {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        document.getElementById('saveButton').addEventListener('click', this.saveFreelancer.bind(this));

        this.nameInputElement = document.getElementById('nameInput');
        this.lastNameInputElement = document.getElementById('lastNameInput');
        this.emailInputElement = document.getElementById('emailInput');
        this.educationInputElement = document.getElementById('educationInput');
        this.locationInputElement = document.getElementById('locationInput');
        this.skillsInputElement = document.getElementById('skillsInput');
        this.infoInputElement = document.getElementById('infoInput');
        this.levelSelectElement = document.getElementById('levelSelect');
        this.avatarInputElement = document.getElementById('avatarInput');
    }

    validateForm() {
        let isValid = true;

        let textInputArray = [this.nameInputElement, this.lastNameInputElement, this.educationInputElement, this.locationInputElement, this.skillsInputElement, this.infoInputElement]

        for (let i = 0; i < textInputArray.length; i++) {
            if (textInputArray[i].value) {
                textInputArray[i].classList.remove("is-invalid");
            } else {
                textInputArray[i].classList.add("is-invalid");
                isValid = false;
            }
        }

        if (this.emailInputElement.value && this.emailInputElement.value.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
            this.emailInputElement.classList.remove("is-invalid");
        } else {
            this.emailInputElement.classList.add("is-invalid");
            isValid = false;
        }

        return isValid;
    }


    async saveFreelancer(e) {
        e.preventDefault();

        if (this.validateForm()) {
            const result = await HttpUtils.request('/freelancers', "POST", true, {
                name: this.nameInputElement.value,
                lastName: this.lastNameInputElement.value,
                email: this.emailInputElement.value,
                level: this.levelSelectElement.value,
                education: this.educationInputElement.value,
                location: this.locationInputElement.value,
                skills: this.skillsInputElement.value,
                info: this.infoInputElement.value
            });
            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }

            if (result.error || !result.response || (result.response && result.response.error)) {
                console.log(result.response.message);
                return alert('Возникла ошибка при запросе фрилансера. Обратитесь в поддержку');
            }

            return this.openNewRoute("/freelancers/view?id=" + result.response.id);
        }
    }
}