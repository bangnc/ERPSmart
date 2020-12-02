import { Pipe, PipeTransform } from '@angular/core';
import * as numeral from 'numeral';
import * as currency from 'currency.js';


numeral.register('locale', 'vi-VN', {
    delimiters: {
        thousands: ' ',
        decimal: ','
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal: function (number) {
        return number === 1 ? 'er' : 'ème';
    },
    currency: {
        symbol: '₫'
    }
});
numeral.locale('vi-VN');

@Pipe({
    name: 'currency'
})
export class CurrencyPipe implements PipeTransform {
    private _latestValue: any = null;
    private _latestReturnedValue: any = null;
    transform(value: any, type: string,
        formatWithSymbol: boolean = false,
        symbol: string = '',
        separator: string = ' ',
        decimal: string = ',',
        precision: number = 0): any {
        const option = {
            pattern: '# !',
            separator: separator,
            decimal: decimal,
            symbol: symbol,
            formatWithSymbol: formatWithSymbol,
            precision: precision
        }
        let val = null;
        switch (type) {
            case 'unFormat':
                val = currency(value, option).value;
                break;
            case 'format':
                val = currency(value, option).format();
                break;
            default:
                val = currency(value, option).format();
                break;
        }
        return val;
    }
}




@Pipe({
    name: 'numeral'
})
export class NumeralPipe implements PipeTransform {
    private _latestValue: any = null;
    private _latestReturnedValue: any = null;
    transform(value: any, type: string): any {
        let val = null;
        switch (type) {
            case 'toNum':
                val = numeral(value).value();
                break;
            case 'num':
                val = numeral(value).format('0,0[.]0000');
                break;
            case 'currency':
                val = numeral(value).format('0,0[.]000000 $');
                break;
            case 'percent':
                val = numeral(value).format('0,0.000%');
                break;
            default:
                val = numeral(value).format();
                break;
        }
        return val;
    }
}
