import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputUtilsModule } from '../input-utils/input-utils.module';
import { InputSelectIconComponent } from './input-select-icon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        InputUtilsModule,
        NgSelectModule,
    ],
    declarations: [
        InputSelectIconComponent
    ],
    exports: [
        InputSelectIconComponent,
    ]
})
export class InputSelectIconModule {
    static forRoot(): ModuleWithProviders { return { ngModule: InputSelectIconModule, providers: [] }; }
 }
