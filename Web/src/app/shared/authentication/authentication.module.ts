import { NgModule, ModuleWithProviders } from '@angular/core';
import { AppPermissionDirective } from './app-permission.directive';

@NgModule({
    imports: [
    ],
    declarations: [
        AppPermissionDirective
    ],
    exports: [
        AppPermissionDirective
    ],
    providers: [
    ]
})
export class AuthenticationModule {
    static forRoot(): ModuleWithProviders { return { ngModule: AuthenticationModule, providers: [] }; }
}
