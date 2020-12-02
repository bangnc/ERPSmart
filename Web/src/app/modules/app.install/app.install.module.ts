import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WavesModule } from 'angular-bootstrap-md';
import { SharedModule } from '../../shared';
import { AppInstallComponent } from './app.install.component';

@NgModule({
  imports: [
    CommonModule,
    WavesModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'form' },
      { path: 'form', component: AppInstallComponent },
    ]),

  ],
  declarations: [
    AppInstallComponent
  ],
  entryComponents: [

  ]
})
export class AppInstallModule { }
