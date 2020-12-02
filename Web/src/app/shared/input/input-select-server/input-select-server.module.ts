import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputUtilsModule } from '../input-utils/input-utils.module';
import { InputSelectServerComponent } from './input-select-server.component';
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
        InputSelectServerComponent
    ],
    exports: [
        InputSelectServerComponent,
    ]
})
export class InputSelectServerModule {
    static forRoot(): ModuleWithProviders { return { ngModule: InputSelectServerModule, providers: [] }; }
 }
