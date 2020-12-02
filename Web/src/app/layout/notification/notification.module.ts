import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    SharedModule
  ],
  declarations: [
    NotificationComponent
  ],
  providers: [NotificationService],
  exports: [
    NotificationComponent
  ]
})
export class NotificationModule { }
