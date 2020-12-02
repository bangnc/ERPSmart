import { NgModule, ModuleWithProviders } from '@angular/core';
import { AppInputActiveDirective, AutofocusDirective } from './input-active.directive';
import { NumeralPipe, CurrencyPipe } from './input-numeral.pipes';

@NgModule({
    imports: [
    ],
    declarations: [
        AppInputActiveDirective,
        NumeralPipe,
        CurrencyPipe,
        AutofocusDirective
    ],
    exports: [
        AppInputActiveDirective,
        NumeralPipe,
        CurrencyPipe,
        AutofocusDirective
    ],
    providers: [
        NumeralPipe,
        CurrencyPipe
    ]
})
export class InputUtilsModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: InputUtilsModule, providers: []
        };
    }
}
