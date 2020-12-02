import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { SetStateToLogging, SetStateToLoginFailed, SetToken, RemoveToken } from '../../redux/oauth/oauth.action';
import { AppSettingService } from '../../app-setting.service';
import { jsonToUrlencoded } from '../utils';
import { TokenService } from './token.service';

@Injectable()
export class AuthenticationService {
    private appSetting: any;
    private headersAuth: HttpHeaders;
    private rsa: any;
    constructor(
        private http: HttpClient,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private tokenService: TokenService,
        private appSettingService: AppSettingService,
        private store: Store<any>
    ) {
        this.appSetting = appSettingService.appSetting || {};
        this.headersAuth = new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded')
        // .set('Authorization', this.appSetting.AUTHORIZATION_BASE);
        // this.rsa = new JSEncrypt();
        // this.rsa.setPublicKey(this.appSetting.PUBLIC_KEY);
    }
    login(username: string, password: string, isKeepLogin: boolean) {
        this.store.dispatch(new SetStateToLogging());
        const body = jsonToUrlencoded({
            grant_type: 'password',
            username: username,
            password: password
        });
        return this.http.post<any>(this.appSetting.API_ENDPOINT + 'token', body, {
            headers: this.headersAuth,
        }).pipe(tap(response => {
            // login successful if there's a jwt token in the response
            this.store.dispatch(new SetToken(response, isKeepLogin));
            this.pushIsLogin();
            // this.tokenService.setToken(response, isKeepLogin);
            // const returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigate(['home'], { replaceUrl: true });
        }, error => {
            this.store.dispatch(new SetStateToLoginFailed());
            console.log(error);
        }));
    }

    // logout(returnUrl: string) {
    //     return this.http.get<any>(this.appSetting.API_ENDPOINT + 'api/qtht-nhatkydangnhap/logout'
    //     ).subscribe(response => {
    //         if (response === true) {
    //             // remove user from local storage to log user out
    //             returnUrl = returnUrl || this.router.url;
    //             document.cookie = 'isLogged=';
    //             this.store.dispatch(new RemoveToken());
    //             // kiểm tra khi sử dụng login sso thì điều hướng về trang logout sso
    //             if(this.appSetting.SSO_LOGIN_URL){
    //                 window.location.href = this.appSetting.SSO_LOGOUT_URL;
    //             }else {
    //                 this.router.navigate(['/login'], { queryParams: { returnUrl: returnUrl } });
    //             }
    //         }
    //     }, error => {
    //         console.log(error);
    //     });
    // }

    logout(returnUrl: string) {
        // remove user from local storage to log user out
        returnUrl = returnUrl || this.router.url;
        document.cookie = 'isLogged=';
        this.store.dispatch(new RemoveToken());
        this.router.navigate(['/login'], { queryParams: { returnUrl: returnUrl } });
    }
    loginExternal(code: string, isKeepLogin: boolean, grant_type: string) {
        this.store.dispatch(new SetStateToLogging());
        const body = jsonToUrlencoded({
            grant_type: grant_type,
            code: code
        });
        return this.http.post<any>(this.appSetting.API_ENDPOINT + 'token', body, {
            headers: this.headersAuth,
        }).pipe(tap(response => {
            // login successful if there's a jwt token in the response
            response.is_login_sso = true;
            this.store.dispatch(new SetToken(response, isKeepLogin));
            this.pushIsLogin();
            // this.tokenService.setToken(response, isKeepLogin);
            // const returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigate(['home'], { replaceUrl: true });
        }, error => {
            this.store.dispatch(new SetStateToLoginFailed());
            console.log(error);
        }));
    }
    refreshToken(): Observable<any> {
        const curToken = this.tokenService.getToken();
        if (curToken && curToken.refresh_token) {
            const body = jsonToUrlencoded({
                grant_type: 'refresh_token',
                refresh_token: curToken.refresh_token
            });
            return this.http.post(this.appSetting.API_ENDPOINT + 'token', body, {
                headers: this.headersAuth,
            }).pipe(map(res => {
                const newToken = res;
                this.store.dispatch(new SetToken(newToken, true));
                // this.tokenService.setToken(newToken, true);
                return newToken;
            }));
        } else {
            return new Observable<any>(observable => {
                observable.next(false);
            });
        }
    }
    getExternalEndPoint(provider: string): Observable<any> {
        return this.http.get<any>(this.appSetting.API_ENDPOINT + 'oauth/endpoint/' + provider);
    }
    enCryptData(data) {
        const encrypted = this.rsa.encrypt(data);
        return encrypted;
    }

    pushIsLogin() {
        document.cookie = 'isLogged=LOGGED';
    }
    checkIsLogin() {
        return (this.getCookie('isLogged') === 'LOGGED');
    }
    getCookie(cname) {
        const name = cname + '=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }
}
