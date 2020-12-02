import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputUtilsModule } from '../input-utils/input-utils.module';
import { InputRadioGroupComponent } from './input-radio-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        InputUtilsModule
    ],
    declarations: [
        InputRadioGroupComponent
    ],
    exports: [
        InputRadioGroupComponent,
    ]
})
export class InputRadioGroupModule {
    static forRoot(): ModuleWithProviders { return { ngModule: InputRadioGroupModule, providers: [] }; }
}
