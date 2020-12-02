import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile, Pass } from './profile';
import { Observable } from 'rxjs';
import { TokenService } from '../../shared';
import { AuthenticationService } from '../../shared';
import { Router } from '@angular/router';

@Injectable()
export class ProfileService {
    private id: any;
    private url = 'api/user';
    constructor(
        private http: HttpClient,
        private tokenService: TokenService,
        private authenticationService: AuthenticationService,
        private router: Router
    ) {
        const token = this.tokenService.getToken();
        this.id = token.id || null;
    }
    getById(): Observable<Profile> {
        return this.http.get<any>(this.url + '/' + this.id);
    }
    update(obj: Profile): Observable<Profile> {
        return this.http.put<any>(this.url + '/' + this.id, obj);
    }
    changePass(obj: Pass): Observable<Pass> {
        return this.http.put<any>(this.url + '/changepassword/' + this.id, obj);
    }
    logout() {
        this.authenticationService.logout(this.router.url);
    }

}
