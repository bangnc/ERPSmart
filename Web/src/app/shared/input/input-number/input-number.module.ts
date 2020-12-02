import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputUtilsModule } from '../input-utils/input-utils.module';
import { InputNumberComponent } from './input-number.component';
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
        InputNumberComponent
    ],
    exports: [
        InputNumberComponent,
    ]
})
export class InputNumberModule {
    static forRoot(): ModuleWithProviders { return { ngModule: InputNumberModule, providers: [] }; }
}
