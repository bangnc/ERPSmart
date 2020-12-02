import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WavesModule } from 'angular-bootstrap-md';
import { SharedModule } from '../../shared';
import { LoaiChucNangListComponent } from './list/loaichucnang-list.component';
import { LoaiChucNangFormComponent } from './form/loaichucnang-form.component';


@NgModule({
  imports: [
    CommonModule,
    WavesModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list' },
      { path: 'list', component: LoaiChucNangListComponent },
      { path: 'form/:id', component: LoaiChucNangFormComponent }
    ]),

  ],
  declarations: [
    LoaiChucNangListComponent,
    LoaiChucNangFormComponent
  ]
})
export class LoaiChucNangModule { }
