import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Module } from './module';
import { Observable } from 'rxjs';
import {CommonService } from '../../shared';
@Injectable()
export class ModuleService {

    constructor(private http: HttpClient, private commonService: CommonService) { }
    private url = 'api/SystemModule';
    public codeModule = 'sys.module';
    public codeObj = 'Module';

    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }

    getById(id: string): Observable<Module> {
        return this.http.get<any>(this.url + '/' + id);
    }
    insert(obj: Object): Observable<Module> {
        return this.http.post<any>(this.url, obj);
    }
    update(obj: Module, id: string): Observable<Module> {
        return this.http.put<any>(this.url + '/' + id, obj);
    }
    del(id: string): Observable<any> {
        return this.http.delete<any>(this.url + '/' + id);
    }
    dels(listId: Array<string>): Observable<any> {
        return this.http.post<any>(this.url + '/deletes', listId);
    }

}
