import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from './app-common.service';
import { SignalrService } from './app-signalr.service';
import { StatePipe } from './state.pipe';
import { TimePipe } from './time.pipe';
import { SafeHtmlPipe } from './safehtml.pipe';
import { GroupByPipe } from './group.pipe';

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
    ],
    declarations: [
        StatePipe,
        TimePipe,
        SafeHtmlPipe,
        GroupByPipe
    ],
    exports: [
        StatePipe,
        TimePipe,
        SafeHtmlPipe,
        GroupByPipe
    ],
    providers: [
        CommonService,
        SignalrService,

    ]
})
export class AppCommonModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AppCommonModule, providers:
                [
                    CommonService,
                    SignalrService
                ]
        };
    }
}
