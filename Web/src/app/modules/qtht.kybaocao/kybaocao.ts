export class KyBaoCao {
    id: string;
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
    tinh_trang: Boolean;
    ngay_bat_dau: number;
    thang_bat_dau: number;
    ngay_ket_thuc: number;
    thang_ket_thuc: number;
    ngay_hien_tai: Date;
    constructor() {
        this.tinh_trang = true;
    }
}
