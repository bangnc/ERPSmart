import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppsComponent } from './apps.component';


@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: [
    AppsComponent
  ],
  exports: [
    AppsComponent
  ]
})
export class AppsModule { }
