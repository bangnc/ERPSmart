import {Pipe, PipeTransform} from '@angular/core';
// import * as moment from 'moment';
import * as moment from '../../../assets/lib/moment/moment.min';
@Pipe({
    name: 'messageTime'
})
export class TimePipe implements PipeTransform {
    value: any;
    timer: any;
    constructor() {
    }

    transform(obj: any, args?: any[]): any {
        obj = new Date(obj);
        if (obj instanceof Date) {
            this.value = obj;
            this.timer = this.getObservable();
            return this.timer;
        } else {
            return this.timer = '';
        }

    }

    private getObservable() {

            let result: string;
            // current time
            const now = new Date().getTime();
            const nowDate = new Date().getDate();
            const valueDate = new Date(this.value).getDate();
            // time since message was sent in seconds
            const delta = (now - this.value.getTime()) / 1000;
            // format string
            if (delta < 10) {
                result = 'vài giây trước';
            } else if (delta < 60) { // sent in last minute
                result = + Math.floor(delta) + ' giây trước';
            } else if (delta < 3600) { // sent in last hour
                result =  Math.floor(delta / 60) + ' phút trước';
            } else if (delta < 86400 && nowDate === valueDate) { // sent on last day
                result = Math.floor(delta / 3600) + ' giờ trước';
            // tslint:disable-next-line:max-line-length
            } else if ((delta > 86400 && (valueDate + 1)  === nowDate) || (delta < 86400 && nowDate !== valueDate)) { // sent more than one day ago
                result = 'Hôm qua lúc ' + moment(this.value).format('HH:mm');
            } else {
                result = moment(this.value).format('DD/MM/YYYY HH:mm');
            }
            return result;
    }
}
