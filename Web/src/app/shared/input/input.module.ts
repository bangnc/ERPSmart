import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChecklistModule } from 'angular-checklist';
import { InputTextModule } from './input-text/input-text.module';
import { InputEmailModule } from './input-email/input-email.module';
import { InputNumberModule } from './input-number/input-number.module';
import { InputPercentModule } from './input-percent/input-percent.module';
import { InputCurrencyModule } from './input-currency/input-currency.module';
import { InputPasswordModule } from './input-password/input-password.module';
import { InputDateModule } from './input-date/input-date.module';
import { InputTextAreaModule } from './input-textarea/input-textarea.module';
import { InputRadioGroupModule } from './input-radio-group/input-radio-group.module';
import { InputCheckBoxGroupModule } from './input-checkbox-group/input-checkbox-group.module';
import { InputFileModule } from './input-file/input-file.module';
import { InputSelectModule } from './input-select/input-select.module';
import { InputSelectServerModule } from './input-select-server/input-select-server.module';
import { InputSelectIconModule } from './input-select-icon/input-select-icon.module';

const MODULE_LIST = [
    FormsModule,
    ChecklistModule,
    InputTextModule,
    InputEmailModule,
    InputNumberModule,
    InputPercentModule,
    InputCurrencyModule,
    InputPasswordModule,
    InputDateModule,
    InputTextAreaModule,
    InputRadioGroupModule,
    InputCheckBoxGroupModule,
    InputFileModule,
    InputSelectModule,
    InputSelectServerModule,
    InputSelectIconModule
];

@NgModule({
    imports: [
        FormsModule,
        ChecklistModule,
        InputTextModule.forRoot(),
        InputEmailModule.forRoot(),
        InputNumberModule.forRoot(),
        InputPercentModule.forRoot(),
        InputCurrencyModule.forRoot(),
        InputPasswordModule.forRoot(),
        InputDateModule.forRoot(),
        InputTextAreaModule.forRoot(),
        InputRadioGroupModule.forRoot(),
        InputCheckBoxGroupModule.forRoot(),
        InputFileModule.forRoot(),
        InputSelectModule.forRoot(),
        InputSelectServerModule.forRoot(),
        InputSelectIconModule.forRoot()
    ],
    exports: MODULE_LIST
})
export class InputRootdModule {
}

@NgModule({
    imports: MODULE_LIST,
    exports: MODULE_LIST
})
export class InputModule {
    static forRoot(): ModuleWithProviders { return {ngModule: InputRootdModule, providers: []}; }
 }
