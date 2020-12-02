import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WavesModule } from 'angular-bootstrap-md';
import { SharedModule } from '../../shared';
import { NhatKyHeThongListComponent } from './list/nhatkyhethong-list.component';
import { NhatKyHeThongFormComponent } from './form/nhatkyhethong-form.component';


@NgModule({
  imports: [
    CommonModule,
    WavesModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list' },
      { path: 'list', component: NhatKyHeThongListComponent },
      { path: 'form/:id', component: NhatKyHeThongFormComponent }
    ]),

  ],
  declarations: [
    NhatKyHeThongListComponent,
    NhatKyHeThongFormComponent
  ]
})
export class NhatKyHeThongModule { }
