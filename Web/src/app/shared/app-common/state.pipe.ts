import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'state' })
export class StatePipe implements PipeTransform {

    constructor() { }

    transform(value: any, states: any): any {
        if (states) {
            return states[value];
        }
        return '';
    }

}
