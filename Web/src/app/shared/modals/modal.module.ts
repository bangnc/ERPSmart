import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';

const MODULE_LIST = [
];

@NgModule({
    imports: [
        FormsModule,
    ],
    exports: MODULE_LIST
})
export class ModalRootdModule {
}

@NgModule({
    imports: MODULE_LIST,
    exports: MODULE_LIST
})
export class ModalModule {
    static forRoot(): ModuleWithProviders { return {ngModule: ModalRootdModule, providers: []}; }
 }
