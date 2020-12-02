import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputUtilsModule } from '../input-utils/input-utils.module';
import { InputFileComponent } from './input-file.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        InputUtilsModule
    ],
    declarations: [
        InputFileComponent
    ],
    exports: [
        InputFileComponent,
    ]
})
export class InputFileModule {
    static forRoot(): ModuleWithProviders { return { ngModule: InputFileModule, providers: [] }; }
 }
