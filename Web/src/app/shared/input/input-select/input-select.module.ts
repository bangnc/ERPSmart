import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputUtilsModule } from '../input-utils/input-utils.module';
import { InputSelectComponent } from './input-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        InputUtilsModule,
        NgSelectModule
    ],
    declarations: [
        InputSelectComponent
    ],
    exports: [
        InputSelectComponent,
    ]
})
export class InputSelectModule {
    static forRoot(): ModuleWithProviders { return { ngModule: InputSelectModule, providers: [] }; }
 }
