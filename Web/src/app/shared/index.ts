import { NgModule, ModuleWithProviders } from '@angular/core';
import { WavesModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImgFallbackModule } from 'ngx-img-fallback';
import { HttpInterceptorService } from './authentication/http-interceptor.service';
import { AuthenticationService } from './authentication/authentication.service';
import { TokenService } from './authentication/token.service';
import { InputModule } from './input/input.module';
import { PageModule } from './page/page.modules';
import { BehaviorsModule } from './behaviors/behaviors.module';
import { AppCommonModule } from './app-common/app-common.module';
// import { SvgShapeModule } from './svg-shape/svg-shape.module';
// import { WorkflowConfigModule } from './workflow-config/workflow-config.module';
import { FabsModule } from './fabs/fabs.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ModalModule } from './modals/modal.module';

export {
    HttpInterceptorService,
    AuthenticationService,
    TokenService,
    InputModule,
    ModalModule,
    PageModule,
    BehaviorsModule,
    AppCommonModule,
    // SvgShapeModule,
    // WorkflowConfigModule,
    FabsModule,
    AuthenticationModule

};
export { MetaStruct, PageOption, ShowHideOption } from './page/page-list/page-list.module';
export { BehaviorsService } from './behaviors/behaviors.service';
export { CommonService } from './app-common/app-common.service';
export { SignalrService } from './app-common/app-signalr.service';
export { StatePipe } from './app-common/state.pipe';
export { TimePipe } from './app-common/time.pipe';
export { SafeHtmlPipe } from './app-common/safehtml.pipe';
export { PERMSConstant } from './authentication/app-permission.const';
// export { LOAICHUCVUConstant } from './authentication/app-permission.const';
export { AppConst } from './app-common/app.const';
// export { UPLOADFile } from './authentication/app-permission.const';

// export { LineStyle, SvgPosition } from './svg-shape/svg-shape.module';
const MODULE_LIST = [
    NgbModule,
    ImgFallbackModule,
    WavesModule,
    InputModule,
    ModalModule,
    PageModule,
    BehaviorsModule,
    AppCommonModule,
    // TimKiemDonViCoSoModule,
    // SvgShapeModule,
    // WorkflowConfigModule,
    FabsModule,
    AuthenticationModule
];

@NgModule({
    imports: [
        NgbModule,
        WavesModule,
        InputModule.forRoot(),
        ModalModule.forRoot(),
        PageModule.forRoot(),
        BehaviorsModule.forRoot(),
        AppCommonModule.forRoot(),
        // SvgShapeModule.forRoot(),
        // WorkflowConfigModule.forRoot(),
        FabsModule.forRoot(),
        AuthenticationModule.forRoot()
    ],
    exports: MODULE_LIST
})
export class ShareRootdModule {
}

@NgModule({
    imports: MODULE_LIST,
    exports: MODULE_LIST
})
export class SharedModule {
    static forRoot(): ModuleWithProviders { return { ngModule: ShareRootdModule }; }
}
