import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../../shared';

@Injectable()
export class NotificationService {
    private id: any;
    private url = 'api/notification';
    constructor(
        private http: HttpClient,
        private tokenService: TokenService
    ) {
        const token = this.tokenService.getToken();
        this.id = token.id || null;
    }
    getMineNotifies(): Observable<any> {
        return this.http.get<any>(this.url + '/mine?page=1&page_size=0');
    }
    markReadAll(): Observable<any> {
        return this.http.put<any>(`${this.url}/mark-all-read`, null);
    }
    markRead(id: string): Observable<any> {
        return this.http.put<any>(`${this.url}/${id}/mark-read`, null);
    }
    hiddenNofify(id: string): Observable<any> {
        return this.http.delete<any>(`${this.url}/${id}/hidden`);
    }
}
