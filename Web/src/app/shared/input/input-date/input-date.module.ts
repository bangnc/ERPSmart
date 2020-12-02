import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';

import { InputUtilsModule } from '../input-utils/input-utils.module';
import { InputDateComponent } from './input-date.component';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        InputUtilsModule,
        NgbDatepickerModule,
        NgbTimepickerModule,
        NgbDropdownModule,
        TextMaskModule
    ],
    declarations: [
        InputDateComponent
    ],
    exports: [
        InputDateComponent,
    ]
})
export class InputDateModule {
    static forRoot(): ModuleWithProviders { return { ngModule: InputDateModule, providers: [] }; }
}
