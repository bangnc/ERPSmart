import { throwError as observableThrowError, Observable, BehaviorSubject } from 'rxjs';
import { take, filter, catchError, switchMap, finalize } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpSentEvent,
    HttpHeaderResponse,
    HttpProgressEvent,
    HttpResponse,
    HttpUserEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { AppSettingService } from '../../app-setting.service';
import { TokenService } from './token.service';
import { AuthenticationService } from './authentication.service';
import { ToastaService, ToastaConfig, ToastOptions, ToastData } from 'ngx-toasta';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { RemoveToken } from 'src/app/redux/oauth/oauth.action';
import { BehaviorsService } from '../behaviors/behaviors.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    appSetting: any;
    isRefreshingToken = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    constructor(
        private tokenService: TokenService,
        private appSettingService: AppSettingService,
        private store: Store<any>,
        private router: Router,
        private injector: Injector,
        private toastaService: ToastaService,
        private behaviors: BehaviorsService
    ) {
        this.appSetting = appSettingService.appSetting || {
            API_ENDPOINT: '',
        };
    }

    private updateUrl(url: string) {
        if (url.indexOf('http') !== -1) {
            return url;
        } else {
            return this.appSetting.API_ENDPOINT + url;
        }

    }
    private updateRequest(req: HttpRequest<any>, token: any): HttpRequest<any> {
        let access_token = '';
        if (token) {
            access_token = `Bearer ${token.access_token}`;
        }

        // chỉnh sửa lại request để add thêm token vào header, chỉnh sửa lại url của request
        if (req.headers.get('Authorization')) {
            access_token = req.headers.get('Authorization');
        }
        const authReq = req.clone({
            headers: req.headers.set('Authorization', access_token),
            url: this.updateUrl(req.url)
        });
        return authReq;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<
        HttpSentEvent |
        HttpHeaderResponse |
        HttpProgressEvent |
        HttpResponse<any> |
        HttpUserEvent<any>> {
        const token = this.tokenService.getToken();
        // xử lý intercept cho các http request xác thực
        // if (req.url.includes('oauth')) {
        //     return next.handle(this.updateRequest(req, token));
        // }
        // xử lý intercept cho các http bình thường thực
        return next.handle(this.updateRequest(req, token)).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    const err = error.error || {};
                    switch ((<HttpErrorResponse>error).status) {
                        case 400:
                            this.alert(err.message);
                            return this.handle400Error(error);
                        case 401:
                            return this.handle401Error(req, next, error);
                        case 304:
                            return this.handle304Error(req, next, token);
                        default:
                            this.alert(err.message);
                            return observableThrowError(error);

                    }
                } else {
                    const err = error.error || {};
                    this.alert(err.message);
                    return observableThrowError(error);
                }
            }));
    }
    handle400Error(error) {
        if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
            // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
            return this.logoutUser(error);
        }

        return observableThrowError(error);
    }
    handle401Error(req: HttpRequest<any>, next: HttpHandler, error) {
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;

            // Reset here so that the following requests wait until the token
            // comes back from the refreshToken call.
            this.tokenSubject.next(null);
            const authService = this.injector.get(AuthenticationService);

            return authService.refreshToken().pipe(
                switchMap((newToken: string) => {
                    if (newToken) {
                        this.tokenSubject.next(newToken);
                        return next.handle(this.updateRequest(req, newToken));
                    }

                    // If we don't get a new token, we are in trouble so logout.
                    return this.logoutUser('');
                }),
                catchError(err => {
                    // If there is an exception calling 'refreshToken', bad news so logout.
                    if (err) {
                        return this.logoutUser(err);
                    } else {
                        return observableThrowError(error);
                    }
                }),
                finalize(() => {
                    this.isRefreshingToken = false;
                }));
        } else {
            return this.tokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(token => {
                    return next.handle(this.updateRequest(req, token));
                }));
        }
    }
    handle304Error(req: HttpRequest<any>, next: HttpHandler, token: any) {
        const cacheReq = req.clone({
            headers: req.headers.delete('If-None-Match'),
            url: this.updateUrl(req.url)
        });
        return next.handle(this.updateRequest(cacheReq, token));
    }
    logoutUser(error) {
        // Route to the login page (implementation up to you)
        // const authService = this.injector.get(AuthenticationService);
        // authService.logout(null);
        this.store.dispatch(new RemoveToken());
        this.router.navigate(['/login']);
        return observableThrowError(error);
    }

    alert(message: string) {
        if (message) {
            // setTimeout(() => {
            //     const toastOptions: ToastOptions = {
            //         title: '',
            //         msg: message,
            //         showClose: true,
            //         timeout: 5000,
            //         theme: 'default', // default, bootstrap, material
            //         onAdd: (toast: ToastData) => {
            //         },
            //         onRemove: function (toast: ToastData) {
            //         }
            //     };
            //     // info, success, wait, error, warning
            //     this.toastaService.error(toastOptions);
            // }, 10);
            this.behaviors.alert({
                msg: message,
                size: '',
                type: 'danger'
            });
        }
    }
}
