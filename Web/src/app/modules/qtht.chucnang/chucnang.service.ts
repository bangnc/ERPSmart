import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChucNang } from './chucnang';
import { Observable } from 'rxjs';
import {CommonService } from '../../shared';
@Injectable()
export class ChucNangService {

    constructor(private http: HttpClient, private commonService: CommonService) { }
    private url = 'api/qtht-chucnang';
    public codeModule = 'sys.module';
    public codeObj = 'ChucNang';

    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }

    getById(id: string): Observable<ChucNang> {
        return this.http.get<any>(this.url + '/' + id);
    }
    create(obj: Object): Observable<ChucNang> {
        return this.http.post<any>(this.url, obj);
    }
    update(obj: ChucNang, id: string): Observable<ChucNang> {
        return this.http.put<any>(this.url + '/' + id, obj);
    }
    del(id: string): Observable<any> {
        return this.http.delete<any>(this.url + '/' + id);
    }
    dels(listId: Array<string>): Observable<any> {
        return this.http.post<any>(this.url + '/deletes', listId);
    }

}
