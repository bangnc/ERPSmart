import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenService } from './token.service';
import { AuthenticationService } from './authentication.service';
import { AppSettingService } from '../../app-setting.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate, CanActivateChild {
    private appSetting: any;
    constructor(private router: Router,
        private tokenService: TokenService,
        private authService: AuthenticationService,
        private appSettingService: AppSettingService,
    ) {
        this.appSetting = appSettingService.appSetting || {};
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const curToken = this.tokenService.getToken();
        if (curToken) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.reDirectPage(route, state);
        return false;
    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const curToken = this.tokenService.getToken();
        if (curToken) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.reDirectPage(route, state);
        return false;
    }
    private reDirectPage(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const returnUrl = this.router.url;
        localStorage.removeItem('currentUser');
        // kiểm tra khi sử dụng login sso thì điều hướng về trang login sso
        if (this.appSetting.SSO_LOGIN_URL) {
            const tokenKey = route.queryParams.tokenKey;
            if (tokenKey) {
                this.router.navigate(['/sso'], { queryParams: { tokenKey: tokenKey } });
            } else {
                window.location.href = this.appSetting.SSO_LOGIN_URL;
            }

        } else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: returnUrl } });
        }

    }
}
