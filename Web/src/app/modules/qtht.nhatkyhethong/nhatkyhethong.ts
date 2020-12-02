export class NhatKyHeThong {
    id: string;
    bang: string;
    ban_ghi_id: string;
    nguoi_thuc_hien_id: string;
    hanh_dong: string;
    noi_dung: Date;
    ngay_tao: Date;
    ban_ghi: string;
    ban_ghi_json: any;
    nguoi_tao_id: string;
    nguoi_thuc_hien: {};
    to_chuc: {};
    constructor() {
        this.nguoi_thuc_hien = {};
        this.to_chuc = {};
    }
}
