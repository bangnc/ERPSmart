export class VaiTro {
    id: string;
    ma: string;
    ten: string;
    mo_ta: string;
    nguoi_tao_id: string;
    tai_khoan_nguoi_tao: string;
    ten_nguoi_tao: string;
    ngay_tao: Date;
    nguoi_chinh_sua_id: string;
    ten_nguoi_chinh_sua: string;
    tai_khoan_nguoi_chinh_sua: string;
    ngay_chinh_sua: Date;
    ds_module_dieu_huong_id: Array<string>;
    ds_module_chuc_nang_id: Array<string>;
    ds_loai_chuc_nang_id: Array<string>;
    ds_dieu_huong_id: Array<string>;
    ds_chuc_nang_id: Array<string>;
    constructor() {
        this.ds_module_dieu_huong_id = new Array<string>();
        this.ds_module_chuc_nang_id = new Array<string>();
        this.ds_loai_chuc_nang_id = new Array<string>();
        this.ds_dieu_huong_id = new Array<string>();
        this.ds_chuc_nang_id = new Array<string>();
        
    }
}
