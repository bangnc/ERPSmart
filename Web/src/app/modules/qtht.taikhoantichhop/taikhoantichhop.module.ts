import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WavesModule } from 'angular-bootstrap-md';
import { SharedModule } from '../../shared';
import { TaiKhoanTichHopListComponent } from './list/taikhoantichhop-list.component';
import { TaiKhoanTichHopFormComponent } from './form/taikhoantichhop-form.component';


@NgModule({
  imports: [
    CommonModule,
    WavesModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list' },
      { path: 'list', component: TaiKhoanTichHopListComponent },
      { path: 'form/:id', component: TaiKhoanTichHopFormComponent }
    ]),

  ],
  declarations: [
    TaiKhoanTichHopListComponent,
    TaiKhoanTichHopFormComponent
  ]
})
export class TaiKhoanTichHopModule { }
