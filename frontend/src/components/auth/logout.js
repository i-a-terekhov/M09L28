import {AuthUtils} from "../../utils/auth-utils";
import {AuthService} from "../../services/auth-service";

export class Logout {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute('/login');
        }

        this.logout().then();
    }

    async logout() {
        await  AuthService.logOut({
            refreshToken: AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey),
        });
        AuthUtils.removeAuthInfo();

        this.openNewRoute('/');
    }
}