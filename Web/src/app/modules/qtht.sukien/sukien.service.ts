import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SuKien } from './sukien';
import { Observable } from 'rxjs';
import {CommonService } from '../../shared';
@Injectable()
export class SuKienService {

    constructor(private http: HttpClient, private commonService: CommonService) { }
    private url = 'api/qtht-SuKien';
    public codeModule = 'sys.module';
    public codeObj = 'SuKien';

    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }

    getById(id: string): Observable<SuKien> {
        return this.http.get<any>(this.url + '/' + id);
    }
    create(obj: Object): Observable<SuKien> {
        return this.http.post<any>(this.url, obj);
    }
    update(obj: SuKien, id: string): Observable<SuKien> {
        return this.http.put<any>(this.url + '/' + id, obj);
    }
    del(id: string): Observable<any> {
        return this.http.delete<any>(this.url + '/' + id);
    }
    dels(listId: Array<string>): Observable<any> {
        return this.http.post<any>(this.url + '/deletes', listId);
    }

}
