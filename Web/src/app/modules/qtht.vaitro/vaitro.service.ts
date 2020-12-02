import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VaiTro } from './vaitro';
import { Observable } from 'rxjs';
import {CommonService } from '../../shared';
@Injectable()
export class VaiTroService {

    constructor(private http: HttpClient, private commonService: CommonService) { }
    private url = 'api/qtht-vaitro';
    public codeModule = 'sys.module';
    public codeObj = 'VaiTro';

    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }

    getById(id: string): Observable<VaiTro> {
        return this.http.get<any>(this.url + '/' + id);
    }
    create(obj: Object): Observable<VaiTro> {
        return this.http.post<any>(this.url, obj);
    }
    update(obj: VaiTro, id: string): Observable<VaiTro> {
        return this.http.put<any>(this.url + '/' + id, obj);
    }
    del(id: string): Observable<any> {
        return this.http.delete<any>(this.url + '/' + id);
    }
    dels(listId: Array<string>): Observable<any> {
        return this.http.post<any>(this.url + '/deletes', listId);
    }

    getAllModule(url) {
        return this.http.get<any>(url);
    }
}
