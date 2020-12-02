import { NgModule, ModuleWithProviders } from '@angular/core';
import { PageListModule } from './page-list/page-list.module';
import { PageFormModule } from './page-form/page-form.module';
import { PageUtilsModule } from './page-utils/page-utils.module';
import { TableModule } from './table/table.module';

const MODULE_LIST = [
    PageListModule,
    PageFormModule,
    PageUtilsModule,
    TableModule
];

@NgModule({
    imports: [
        PageListModule.forRoot(),
        PageFormModule.forRoot(),
        PageUtilsModule.forRoot(),
        TableModule.forRoot()
    ],
    exports: MODULE_LIST
})
export class PageRootdModule {
}


@NgModule({
    imports: MODULE_LIST,
    exports: MODULE_LIST
})
export class PageModule {
    static forRoot(): ModuleWithProviders { return { ngModule: PageRootdModule, providers: [] }; }
}

