import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { RootStore } from './redux/store';
import { AppRoutingModule } from './app-routing.module';
import { AppSettingService } from './app-setting.service';
import { TokenService, AuthenticationService, SharedModule } from './shared';
import { AppComponent } from './app.component';
import { HttpInterceptorService } from './shared';
import { ToastaModule } from 'ngx-toasta';
// import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {HotkeyModule} from 'angular2-hotkeys';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export function startupServiceFactory(appSettingService: AppSettingService): Function {
  return () => appSettingService.load();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RootStore,
    SharedModule.forRoot(),
    NgbModule.forRoot(),
    ToastaModule.forRoot(),
    HotkeyModule.forRoot(),
   // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
    // ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    TokenService,
    AuthenticationService,
    AppSettingService,
    {
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [AppSettingService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
