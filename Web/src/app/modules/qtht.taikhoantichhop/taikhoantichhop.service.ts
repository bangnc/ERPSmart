import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TaiKhoanTichHop } from './taikhoantichhop';
import { Observable } from 'rxjs';
import {CommonService } from '../../shared';
@Injectable() export class TaiKhoanTichHopService {

    constructor(private http: HttpClient, private commonService: CommonService) { }
    private url = 'api/qtht-taikhoantichhop';
    public codeModule = 'sys.module';
    public codeObj = 'TaiKhoanTichHop';

    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }

    getById(id: string): Observable<TaiKhoanTichHop> {
        return this.http.get<any>(this.url + '/' + id);
    }
    create(obj: Object): Observable<TaiKhoanTichHop> {
        return this.http.post<any>(this.url, obj);
    }
    update(obj: TaiKhoanTichHop, id: string): Observable<TaiKhoanTichHop> {
        return this.http.put<any>(this.url + '/' + id, obj);
    }
    del(id: string): Observable<any> {
        return this.http.delete<any>(this.url + '/' + id);
    }
    dels(listId: Array<string>): Observable<any> {
        return this.http.post<any>(this.url + '/deletes', listId);
    }

}