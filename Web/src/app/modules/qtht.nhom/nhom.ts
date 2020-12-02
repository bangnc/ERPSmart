export class Nhom {
    id: string;
    ma: string;
    ten: string;
    mo_ta: string;
    bieu_quyet: boolean;
    nguoi_tao_id: string;
    tai_khoan_nguoi_tao: string;
    ten_nguoi_tao: string;
    ngay_tao: Date;
    nguoi_chinh_sua_id: string;
    ten_nguoi_chinh_sua: string;
    tai_khoan_nguoi_chinh_sua: string;
    ngay_chinh_sua: Date;
    ds_vai_tro: any;
    ds_vai_tro_id: any;
    ds_nguoi_dung: any;
    ds_nguoi_dung_add: any;
    ds_nguoi_dung_remove: any;
    constructor() {
        this.ds_nguoi_dung_add = [];
        this.ds_nguoi_dung_remove = [];
    }
}
