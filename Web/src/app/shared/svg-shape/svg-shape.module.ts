import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgArrowComponent } from './svg-arrow.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
export { LineStyle, SvgPosition } from './svg-arrow.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [
        SvgArrowComponent
    ],
    exports: [
        SvgArrowComponent
    ]
})
export class SvgShapeModule {
    static forRoot(): ModuleWithProviders { return { ngModule: SvgShapeModule, providers: [] }; }
}
