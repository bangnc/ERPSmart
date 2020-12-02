import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WavesModule } from 'angular-bootstrap-md';
import { SharedModule } from '../../shared';
import { VaiTroListComponent } from './list/vaitro-list.component';
import { VaiTroFormComponent } from './form/vaitro-form.component';
import { ChecklistModule } from 'angular-checklist';


@NgModule({
  imports: [
    CommonModule,
    WavesModule,
    SharedModule,
    ChecklistModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'list' },
      { path: 'list', component: VaiTroListComponent },
      { path: 'form/:id', component: VaiTroFormComponent }
    ]),

  ],
  declarations: [
    VaiTroListComponent,
    VaiTroFormComponent
  ]
})
export class VaiTroModule { }
