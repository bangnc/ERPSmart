import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class AppInstallService {

    constructor(private http: HttpClient) { }
    private url = 'api/qtht-nguoidung';

    creates(pass: string): Observable<any> {
        return this.http.post<any>(this.url + '/creates?pass=' + pass, null);
    }
}
