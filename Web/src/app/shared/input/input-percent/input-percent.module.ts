import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputUtilsModule } from '../input-utils/input-utils.module';
import { InputPercentComponent } from './input-percent.component';
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
        InputPercentComponent
    ],
    exports: [
        InputPercentComponent,
    ]
})
export class InputPercentModule {
    static forRoot(): ModuleWithProviders { return { ngModule: InputPercentModule, providers: [] }; }
}
