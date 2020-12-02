import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WavesModule } from 'angular-bootstrap-md';
import { SharedModule } from '../../shared';
import { DieuHuongListComponent } from './list/dieuhuong-list.component';
import { DieuHuongFormComponent } from './form/dieuhuong-form.component';


@NgModule({
  imports: [
    CommonModule,
    WavesModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list' },
      { path: 'list', component: DieuHuongListComponent },
      { path: 'form/:id', component: DieuHuongFormComponent }
    ]),

  ],
  declarations: [
    DieuHuongListComponent,
    DieuHuongFormComponent
  ]
})
export class DieuHuongModule { }
