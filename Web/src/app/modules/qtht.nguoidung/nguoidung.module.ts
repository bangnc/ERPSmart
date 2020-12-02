import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WavesModule } from 'angular-bootstrap-md';
import { SharedModule } from '../../shared';
import { NguoiDungListComponent } from './list/nguoidung-list.component';
import { NguoiDungFormComponent } from './form/nguoidung-form.component';


@NgModule({
  imports: [
    CommonModule,
    WavesModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list' },
      { path: 'list', component: NguoiDungListComponent },
      { path: 'form/:id', component: NguoiDungFormComponent }
    ]),

  ],
  declarations: [
    NguoiDungListComponent,
    NguoiDungFormComponent
  ]
})
export class NguoiDungModule { }
