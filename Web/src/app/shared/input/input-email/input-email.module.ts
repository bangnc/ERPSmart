import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputUtilsModule } from '../input-utils/input-utils.module';
import { InputEmailComponent } from './input-email.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        InputUtilsModule
    ],
    declarations: [
        InputEmailComponent
    ],
    exports: [
        InputEmailComponent,
    ]
})
export class InputEmailModule {
    static forRoot(): ModuleWithProviders { return { ngModule: InputEmailModule, providers: [] }; }
 }
