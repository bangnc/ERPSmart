import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WavesModule } from 'angular-bootstrap-md';
import { SharedModule } from '../../shared';
import { NhatKyangNhapListComponent } from './list/nhatkydangnhap-list.component';


@NgModule({
  imports: [
    CommonModule,
    WavesModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list' },
      { path: 'list', component: NhatKyangNhapListComponent }
    ]),

  ],
  declarations: [
    NhatKyangNhapListComponent
  ]
})
export class NhatKyDangNhapModule { }
