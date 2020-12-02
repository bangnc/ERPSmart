import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './layout-routing.module';
import { AppsModule } from './apps/apps.module';
import { NotificationModule } from './notification/notification.module';
import { ProfileModule } from './profile/profile.module';
import { LayoutComponent } from './layout.component';
import { SharedModule } from '../shared';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';


@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    AppsModule,
    NotificationModule,
    ProfileModule,
  ],
  declarations: [
    LayoutComponent,
    UnauthorizedComponent
  ]
})
export class LayoutModule { }
