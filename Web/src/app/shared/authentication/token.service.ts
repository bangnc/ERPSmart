import { AppSettingService } from '../../app-setting.service';
import { Router } from '@angular/router';
import { Injectable, Injector } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Injectable()
export class TokenService {
    // Subject tracks the current token, or is null if no token is currently
    // available (e.g. refresh pending).
    // private subject = new BehaviorSubject<boolean | null>(null);
    public appSetting: any;
    private token: any;
    constructor(
        private store: Store<any>) {
        this.store.pipe(
            select((state: any) => state.oauthReducer.token),
            map(token => {
                this.token = token;
                return token;
            })).subscribe();
    }
    public getToken() {
        // const token = JSON.parse(localStorage.getItem('currentUser'));
        return this.token;
    }
    public setToken(token: any, isKeepLogin: boolean) {
        if (token && token.access_token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            if (!isKeepLogin) {
                delete token.refresh_token;
            }
            localStorage.setItem('currentUser', JSON.stringify(token));
        }
    }

}
