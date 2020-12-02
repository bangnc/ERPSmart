import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorsService } from './behaviors.service';
import { AlertContentComponent } from './behavior-alert.component';
import { ConfirmContentComponent } from './behavior-confirm.component';
import { AppCommonModule } from '../app-common/app-common.module';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        AppCommonModule
    ],
    declarations: [
        AlertContentComponent,
        ConfirmContentComponent
    ],
    exports: [],
    entryComponents: [
        AlertContentComponent,
        ConfirmContentComponent
    ],
    providers: [
        BehaviorsService
    ]
})
export class BehaviorsModule {
    static forRoot(): ModuleWithProviders { return {ngModule: BehaviorsModule, providers: [BehaviorsService]}; }
 }
