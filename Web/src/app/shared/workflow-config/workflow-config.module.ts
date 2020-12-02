import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowConfigComponent } from './workflow-config.component';
import { SvgShapeModule } from '../svg-shape/svg-shape.module';
import { AngularDraggableModule } from 'angular2-draggable';
import {ActivityContentDirective} from './workflow-config.directive';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        CommonModule,
        SvgShapeModule,
        AngularDraggableModule,
        NgbTooltipModule
    ],
    declarations: [
        WorkflowConfigComponent,
        ActivityContentDirective
    ],
    exports: [
        WorkflowConfigComponent,
        ActivityContentDirective
    ]
})
export class WorkflowConfigModule {
    static forRoot(): ModuleWithProviders { return { ngModule: WorkflowConfigModule, providers: [] }; }
}
