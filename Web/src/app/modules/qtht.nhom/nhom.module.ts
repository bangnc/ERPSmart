import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WavesModule } from 'angular-bootstrap-md';
import { SharedModule } from '../../shared';
import { NhomListComponent } from './list/nhom-list.component';
import { NhomFormComponent } from './form/nhom-form.component';
import { NguoiDungModalComponent } from './modal/nguoidung-modal.component';


@NgModule({
  imports: [
    CommonModule,
    WavesModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list' },
      { path: 'list', component: NhomListComponent },
      { path: 'form/:id', component: NhomFormComponent }
    ]),

  ],
  declarations: [
    NhomListComponent,
    NhomFormComponent,
    NguoiDungModalComponent
  ],
  entryComponents: [
    NguoiDungModalComponent
  ]
})
export class NhomModule { }
