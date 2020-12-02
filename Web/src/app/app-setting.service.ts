import { Injectable } from '@angular/core';

@Injectable()
export class AppSettingService {
    errorMessage: any;

    public innerValue: any;

    constructor() { }

    // This is the method you want to call at bootstrap
    // Important: It should return a Promise
    load() {
        this.innerValue = null;
        return fetch('/app-setting.json?v=' + new Date())
            .then(response => {
                response.json().then(data => {
                    this.innerValue = data;
                });
            })
            .then(error => { this.errorMessage = <any>error; });
    }
    get appSetting(): any {
        return this.innerValue;
    }

    // set accessor including call the onchange callback
    // truyền binding ra bên ngoài component
    set appSetting(v: any) {
        this.innerValue = v;
    }
    get(): any {
        return this.innerValue;
    }
}
