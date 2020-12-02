import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoaiChucNang } from './loaichucnang';
import { Observable } from 'rxjs';
import {CommonService } from '../../shared';
@Injectable()
export class LoaiChucNangService {

    constructor(private http: HttpClient, private commonService: CommonService) { }
    private url = 'api/qtht-loaichucnang';
    public codeModule = 'sys.module';
    public codeObj = 'LoaiChucNang';

    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }

    getById(id: string): Observable<LoaiChucNang> {
        return this.http.get<any>(this.url + '/' + id);
    }
    create(obj: Object): Observable<LoaiChucNang> {
        return this.http.post<any>(this.url, obj);
    }
    update(obj: LoaiChucNang, id: string): Observable<LoaiChucNang> {
        return this.http.put<any>(this.url + '/' + id, obj);
    }
    del(id: string): Observable<any> {
        return this.http.delete<any>(this.url + '/' + id);
    }
    dels(listId: Array<string>): Observable<any> {
        return this.http.post<any>(this.url + '/deletes', listId);
    }

}
