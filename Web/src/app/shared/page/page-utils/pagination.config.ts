export class PaginationConfig {
    itemsPerPage: number;
    boundaryLinks: boolean;
    directionLinks: boolean;
    firstText: string;
    previousText: string;
    nextText: string;
    lastText: string;
    constructor() {
        this.itemsPerPage = 20;
        this.boundaryLinks = true;
        this.directionLinks = true;
        this.firstText = 'Trang đầu';
        this.previousText = '«';
        this.nextText = '»';
        this.lastText = 'Trang cuối';
    }
}
