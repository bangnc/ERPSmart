import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DieuHuong } from './dieuhuong';
import { Observable } from 'rxjs';
import {CommonService } from '../../shared';
@Injectable()
export class DieuHuongService {

    constructor(private http: HttpClient, private commonService: CommonService) { }
    private url = 'api/qtht-dieuhuong';
    public codeModule = 'sys.module';
    public codeObj = 'DieuHuong';

    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }

    getById(id: string): Observable<DieuHuong> {
        return this.http.get<any>(this.url + '/' + id);
    }
    create(obj: Object): Observable<DieuHuong> {
        return this.http.post<any>(this.url, obj);
    }
    update(obj: DieuHuong, id: string): Observable<DieuHuong> {
        return this.http.put<any>(this.url + '/' + id, obj);
    }
    del(id: string): Observable<any> {
        return this.http.delete<any>(this.url + '/' + id);
    }
    dels(listId: Array<string>): Observable<any> {
        return this.http.post<any>(this.url + '/deletes', listId);
    }

}
