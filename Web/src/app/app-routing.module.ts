import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AuthGuardService } from './shared/authentication/auth.guard.service';

const routes: Routes = [
    {
        path: '',
        loadChildren: './layout/layout.module#LayoutModule',
        canActivate: [AuthGuardService],
        canActivateChild: [AuthGuardService],
    },
    {
        path: 'login',
        //path: 'loginthienhoang',
        loadChildren: './modules/login/login.module#LoginModule'
    },
    {
        path: 'sso',
        loadChildren: './modules/authentication-code/authentication-code.module#AuthenticationCodeModule'
    },
    {
        path: 'app-install',
        loadChildren: './modules/app.install/app.install.module#AppInstallModule'
    },
    { path: '**', redirectTo: '' }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes,
    // { preloadingStrategy: PreloadAllModules }
);

@NgModule({
    imports: [
        Routing
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
