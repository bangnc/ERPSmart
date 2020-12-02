import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputUtilsModule } from '../input-utils/input-utils.module';
import { InputCurrencyComponent } from './input-currency.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        InputUtilsModule,
        TextMaskModule
    ],
    declarations: [
        InputCurrencyComponent
    ],
    exports: [
        InputCurrencyComponent,
    ]
})
export class InputCurrencyModule {
    static forRoot(): ModuleWithProviders { return { ngModule: InputCurrencyModule, providers: [] }; }
 }
