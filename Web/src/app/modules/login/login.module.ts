import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WavesModule } from 'angular-bootstrap-md';

import { InputModule } from '../../shared';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    WavesModule,
    InputModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: LoginComponent }
    ]),
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
