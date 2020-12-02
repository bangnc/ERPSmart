import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { KyBaoCao } from './kybaocao';
import { Observable } from 'rxjs';
import {CommonService } from '../../shared';
@Injectable()
export class KyBaoCaoService {

    constructor(private http: HttpClient, private commonService: CommonService) { }
    private url = 'api/qtht-kybaocao';
    public codeModule = 'sys.module';
    public codeObj = 'KyBaoCao';

    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }

    getById(id: string): Observable<KyBaoCao> {
        return this.http.get<any>(this.url + '/' + id);
    }
    create(obj: Object): Observable<KyBaoCao> {
        return this.http.post<any>(this.url, obj);
    }
    update(obj: KyBaoCao, id: string): Observable<KyBaoCao> {
        return this.http.put<any>(this.url + '/' + id, obj);
    }
    del(id: string): Observable<any> {
        return this.http.delete<any>(this.url + '/' + id);
    }
    dels(listId: Array<string>): Observable<any> {
        return this.http.post<any>(this.url + '/deletes', listId);
    }
    getKyBCDefault(ngay: number, thang: number): Observable<any> {
        return this.http.get<any>('api/qtht-kybaocao/default?ngay=' + ngay + '&thang=' + thang);
    }

}
