import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NhatKyHeThong } from './nhatkyhethong';
import { Observable } from 'rxjs';
import {CommonService } from '../../shared';
@Injectable()
export class NhatKyHeThongService {

    constructor(private http: HttpClient, private commonService: CommonService) { }
    private url = 'api/qtht-nhatkyhethong';
    public codeModule = 'sys.module';
    public codeObj = 'NhatKyHeThong';

    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }

    getById(id: string): Observable<NhatKyHeThong> {
        return this.http.get<any>(this.url + '/' + id);
    }
    create(obj: Object): Observable<NhatKyHeThong> {
        return this.http.post<any>(this.url, obj);
    }
    update(obj: NhatKyHeThong, id: string): Observable<NhatKyHeThong> {
        return this.http.put<any>(this.url + '/' + id, obj);
    }
    del(id: string): Observable<any> {
        return this.http.delete<any>(this.url + '/' + id);
    }
    dels(listId: Array<string>): Observable<any> {
        return this.http.post<any>(this.url + '/deletes', listId);
    }
    getaction(): Observable<any> {
        return this.http.get<any>(this.url + '/action');
    }
}
