import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WavesModule } from 'angular-bootstrap-md';
import { SharedModule } from '../../shared';
import { LoaiModuleListComponent } from './list/loaimodule-list.component';
import { LoaiModuleFormComponent } from './form/loaimodule-form.component';


@NgModule({
  imports: [
    CommonModule,
    WavesModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list' },
      { path: 'list', component: LoaiModuleListComponent },
      { path: 'form/:id', component: LoaiModuleFormComponent }
    ]),

  ],
  declarations: [
    LoaiModuleListComponent,
    LoaiModuleFormComponent
  ]
})
export class LoaiModuleModule { }
