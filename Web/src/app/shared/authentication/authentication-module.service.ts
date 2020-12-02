import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationModuleService implements CanActivate, CanActivateChild {
    ds_duong_dan: any;
    constructor(private router: Router,
        private store: Store<any>
    ) {

        this.store.pipe(select((state: any) => state.oauthReducer.ds_duong_dan), map(result => {
            this.ds_duong_dan = result;
        })).subscribe();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // return true;
        let module_name = "/" + route.routeConfig.path;
        let authModule = this.ds_duong_dan.includes(module_name);
        if(authModule){
            return true;
        }
        this.router.navigate(['/unauthorized']);
        return false;

    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return true;
    }
}