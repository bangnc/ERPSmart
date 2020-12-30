import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NguoiDung } from './nguoidung';
import { Observable } from 'rxjs';
import { CommonService } from '../../shared';
@Injectable()
export class NguoiDungService {

    constructor(private http: HttpClient, private commonService: CommonService) { }
    private url = 'api/SystemUser';
    public codeModule = 'sys.module';
    public codeObj = 'NguoiDung';

    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }

    getById(id: string): Observable<NguoiDung> {
        return this.http.get<any>(this.url + '/' + id);
    }
    create(obj: Object): Observable<NguoiDung> {
        return this.http.post<any>(this.url + '/Register', obj);
    }
    update(obj: NguoiDung, id: string): Observable<NguoiDung> {
        return this.http.put<any>(this.url + '/Update/' + id, obj);
    }
    del(id: string): Observable<any> {
        return this.http.delete<any>(this.url + '/' + id);
    }
    dels(listId: Array<string>): Observable<any> {
        return this.http.post<any>(this.url + '/deletes', listId);
    }
    syncUser(): Observable<any> {
        return this.http.get<any>(this.url + '/syncuserportal');
    }
    /**
     * Lấy danh sách người dùng theo danh sách tổ chức
     *
     * bangnc
     */
    getByTochucs(ds_to_chuc_id: Array<string>): Observable<any> {
        return this.http.post<any>(this.url + '/getbydstochuc', ds_to_chuc_id);
    }

}
