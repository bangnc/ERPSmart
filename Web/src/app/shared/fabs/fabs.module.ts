import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FabsComponent } from './fabs.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
    ],
    declarations: [
        FabsComponent
    ],
    exports: [
        FabsComponent
    ]
})
export class FabsModule {
    static forRoot(): ModuleWithProviders { return { ngModule: FabsModule, providers: [] }; }
}
