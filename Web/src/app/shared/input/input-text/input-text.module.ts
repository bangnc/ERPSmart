import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputUtilsModule } from '../input-utils/input-utils.module';
import { InputTextComponent } from './input-text.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        InputUtilsModule
    ],
    declarations: [
        InputTextComponent
    ],
    exports: [
        InputTextComponent,
    ]
})
export class InputTextModule {
    static forRoot(): ModuleWithProviders { return { ngModule: InputTextModule, providers: [] }; }
}
