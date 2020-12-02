export interface MetaStruct {
    page: number;
    page_size: number;
    ranger: {
        from: number,
        to: number
    };
    total: number;
    total_page: number;
}
export class PageOption {
    currentPage: number;
    pageSize: number;
    sort: any;
    filter: any;
    search: string;
    constructor() {
        this.currentPage = 1;
        this.pageSize = 20;
        this.sort = {};
        this.filter = {};
        this.search = '';
    }
}
