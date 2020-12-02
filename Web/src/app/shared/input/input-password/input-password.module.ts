import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputUtilsModule } from '../input-utils/input-utils.module';
import { InputPasswordComponent } from './input-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        InputUtilsModule
    ],
    declarations: [
        InputPasswordComponent
    ],
    exports: [
        InputPasswordComponent,
    ]
})
export class InputPasswordModule {
    static forRoot(): ModuleWithProviders { return { ngModule: InputPasswordModule, providers: [] }; }
}
