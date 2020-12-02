import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WavesModule } from 'angular-bootstrap-md';
import { SharedModule } from '../../shared';
import { InputModule } from '../../shared';
import { AuthenticationCodeComponent } from './authentication-code.component'

@NgModule({
  imports: [
    CommonModule,
    WavesModule,
    InputModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: AuthenticationCodeComponent }
    ]),
    SharedModule
  ],
  declarations: [AuthenticationCodeComponent]
})
export class AuthenticationCodeModule { }
