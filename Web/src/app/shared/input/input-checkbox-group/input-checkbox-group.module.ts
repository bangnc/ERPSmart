import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputUtilsModule } from '../input-utils/input-utils.module';
import { InputCheckBoxGroupComponent } from './input-checkbox-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChecklistModule } from 'angular-checklist';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ChecklistModule,
        InputUtilsModule
    ],
    declarations: [
        InputCheckBoxGroupComponent
    ],
    exports: [
        InputCheckBoxGroupComponent,
    ]
})
export class InputCheckBoxGroupModule {
    static forRoot(): ModuleWithProviders { return { ngModule: InputCheckBoxGroupModule, providers: [] }; }
}
