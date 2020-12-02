import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoaiModule } from './loaimodule';
import { Observable } from 'rxjs';
import {CommonService } from '../../shared';
@Injectable()
export class LoaiModuleService {

    constructor(private http: HttpClient, private commonService: CommonService) { }
    private url = 'api/qtht-loaimodule';
    public codeModule = 'sys.module';
    public codeObj = 'LoaiModule';

    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }

    getById(id: string): Observable<LoaiModule> {
        return this.http.get<any>(this.url + '/' + id);
    }
    create(obj: Object): Observable<LoaiModule> {
        return this.http.post<any>(this.url, obj);
    }
    update(obj: LoaiModule, id: string): Observable<LoaiModule> {
        return this.http.put<any>(this.url + '/' + id, obj);
    }
    del(id: string): Observable<any> {
        return this.http.delete<any>(this.url + '/' + id);
    }
    dels(listId: Array<string>): Observable<any> {
        return this.http.post<any>(this.url + '/deletes', listId);
    }

}
