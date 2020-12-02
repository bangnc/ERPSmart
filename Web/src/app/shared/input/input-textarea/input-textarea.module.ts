import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputUtilsModule } from '../input-utils/input-utils.module';
import { InputTextAreaComponent } from './input-textarea.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        InputUtilsModule
    ],
    declarations: [
        InputTextAreaComponent
    ],
    exports: [
        InputTextAreaComponent,
    ]
})
export class InputTextAreaModule {
    static forRoot(): ModuleWithProviders { return { ngModule: InputTextAreaModule, providers: [] }; }
}
