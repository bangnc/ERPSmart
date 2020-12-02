import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from '../../shared';
import { map } from 'rxjs/operators';
@Injectable()
export class LoaiChucVuService {

    constructor(private http: HttpClient, private commonService: CommonService) { }
    private url = 'api/dm-loaichucvu';
    public codeModule = 'sys.module';
    public codeObj = 'LoaiChucVu';

    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }
}
