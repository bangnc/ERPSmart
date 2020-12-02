import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WavesModule } from 'angular-bootstrap-md';
import { SharedModule } from '../../shared';
import { SuKienListComponent } from './list/sukien-list.component';
import { SuKienFormComponent } from './form/sukien-form.component';


@NgModule({
  imports: [
    CommonModule,
    WavesModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list' },
      { path: 'list', component: SuKienListComponent },
      { path: 'form/:id', component: SuKienFormComponent }
    ]),

  ],
  declarations: [
    SuKienListComponent,
    SuKienFormComponent
  ]
})
export class SuKienModule { }
