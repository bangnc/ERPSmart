export class MetaStruct {
    page: number;
    page_size: number;
    ranger: {
        from: number,
        to: number
    };
    total: number;
    total_page: number;
    constructor() {
        this.page = 1;
        this.page_size = 0;
        this.ranger = {
            from: 0,
            to: 0
        };
        this.total = 0;
        this.total_page = 0;
    }
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

export class ShowHideOption {
    showSearch: boolean;
    isFilterOpen: boolean;
    showActionBar: boolean;
    showIconFilter: boolean;
    showTable: boolean;
    showTreeTC: boolean;
}
