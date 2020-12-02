export class AppConst {
    // #region Biến const cho màn hình tổng quan trang home
    public static MANHINHTONGQUAN = {
        left: {
            HV: 'HV',
            CB: 'CV',
            CBN: 'CBN',
            TDKT: 'TDKT'
        },
        right: {
            TC: 'TC',
            VB: 'VB',
            DM: 'DM',
            QTHT: 'QTHT'
        }
    };

    // #endregion

    // #region Biến const cho lĩnh vực đào tạo trong hồ sơ
    public static LinhVucDaoTao = {
        LyLuanChinhTri: 'LLCT',
        NghiepVuCongTacHoi: 'NVCTH',
        TinHoc: 'TH',
        GiaoDucPhoThong: 'GDPT',
        QuanLyNhaNuoc: 'QLNN',
        ChuyenMon: 'CM',
        NgoaiNgu: 'NN'
    };
    // #endregion

    public static GDPT = {
        MuChu: 'GDPT_30'
    };

    // #region Biến const xác định các loại đơn vị đặc thù
    public static DonViDacThu = {
        LucLuongVuTrangDacThuCongAn: 'LLVTDT.CA',
        LucLuongVuTrangDacThuQuanDoi: 'LLVTDT.QD',
        ToChucThanhVienHoiNuTriThuc: 'TCTV.HNTT',
        ToChucThanhVienHoiNuDoanhNhan: 'TCTV.HNDN',
        ToChucCacDonViDacThuTonGiao: 'TCCDVDT.03.TG',
        ToChucCacDonViDacThuTruongHoc: 'TCCDVDT.02.TH',
        ToChucCacDonViDacThuTrungTamThuongMai: 'TCCDVDT.01.TTTM',
        BanNuCong: 'BNC'
    };
    // #endregion

    // #region Biến const xác định đơn vị theo địa bàn hành chính hoặc đặc thù
    public static TOCHUC = {
        DONVIDACTHU: ['LLVTDT.CA', 'LLVTDT.QD', 'TCTV.HNTT', 'TCTV.HNDN'],
        DBHC: 'DBHC',
        DACTHU: [],
        BANNUCONG: 'BNC',
        HOIVIENTHEODANCU: 'TCCDVDT.01.TTTM,TCCDVDT.02.TH,TCCDVDT.03.TG,TCCDVDT.04.KHAC,DBHC'
    };
    // #endregion

    // #region Biến const Cấu hình thư mục uploadfile
    public static UPLOADFILE = {
        URL: 'UploadFile'
    };
    // #endregion

    // #region Biến const xác định các loại chức vụ trong hội
    public static LOAICHUCVU = {
        BCH_HOI: '001.005',
        CHUTICH_HLHPN: '001_CTHLHPN',
        PHOCHUTICH_HLHPN: '002_PCTHLHPN',
        UYVIEN_BCH: '001_UVBCH',
        UYVIEN_BTV: '002_UVBTV',
        CHUCDANHTRONGDANG: '002',
        CHUCDANHTRONGHDND: '003',
        MATTRANTOQUOC: '001',
        CHINHQUYEN: '004',
        // cán bộ
        // modal thêm mới cán bộ
        UYVIEN_BTV_BCH_TINHHUYEN: ['010.003', '010.004'],
        UYVIEN_BTV_BCH_XA: ['010.002', '010.003', '010.004'],
        //  form cán bộ
        DANG_TINHHUYENXA: ['007'],
        DANG_TW: ['001', '003'],
        HDND: ['009'],
        QUOCHOI: ['002', '005'],
        NOT_CHUCVUKHAC: ['001', '002', '003', '005', '007', '009'],
        KHOIDANGVACOQUANDANG: ['001', '003', '007'],
        DAIBIEUQHHDND: ['002', '005', '009'],
        DOANTHE_TINHHUYENXA: '010',
        DOANTHE_TW: '006',
        KHAC: '008',
        CT_PCT_UVBTV_UVBCH: '010.001,010.002,010.003,010.004',

        // sắp xếp chức vụ
        SORT_DANG: ['001', '003', '007'],
        SORT_QHHDND: ['002', '005', '009'],
        SORT_CVHOI: ['010'],
        SORT_DOANTHE: ['006'],
        SORT_CVKHAC: ['004', '008']
    };
    // #endregion

    public static NHOM = {
        HOIDONG_TDKT: '09HDTDKT'
    };

    // #region Biến const xác định các chức vụ trong hội
    public static CHUCVU = {
        ChuTichHoiLHPNXa: '001.034',
        HDND_TINH: '009.005.001',
        HDND_HUYEN: '009.005.002',
        HDND_XA: '009.005.003',

        BCH_TINH: '007.004.001',
        BCH_HUYEN: '007.004.003',
        BCH_XA: '007.004.004',

        HLHPN_CHUTICH_HUYEN: '001.033',
        HLHPN_CHUTICH_XA: '001.034',
        HLHPN_PHOCHUTICH_HUYEN: '001.037',
        HLHPN_PHOCHUTICH_XA: '001.038',
        KIEMNHIEM_KHAC: '011.007'
    };
    // #endregion

    public static DanToc = {
        Khac: 'KHAC',
        Kinh: 'KINH'
    };
    public static OPTION_BAOCAO = [
        { id: 1, name: 'TW HLHPN Việt Nam' },
        { id: 2, name: 'Cụm thi đua' },
        { id: 3, name: 'Hội cấp tỉnh/tp' }
    ];
    public static OPTION_CHUYEN_TRACH = [
        { id: 1, name: 'Chuyên trách cấp tỉnh/huyện' },
        { id: 2, name: 'Chuyên trách cấp huyện' },
    ];
    public static TDKT = {
        NHIEMKY_DAUNAM: 'TRUE'
    };

    public static KEY = {
        HoiVien: 'HV',
        ToChuc: 'TC',
        CanBo: 'CB',
        CanBoNu: 'CBN',
        ThiDuaKT: 'TDKT'
    };
    public static LOAIDULIEU = [
        { id: 1, name: 'Tổ chức Hội' },
        { id: 2, name: 'Hội viên' },
        { id: 7, name: 'Cán bộ Hội' },
        { id: 3, name: 'Uỷ viên BCH, BTV' },
        { id: 4, name: 'Cán bộ chuyên trách' },
        { id: 5, name: 'Chi hội trưởng' },
        { id: 6, name: 'Cán bộ nữ lãnh đạo' }
    ];
    public static CAP = [
        { id: 1, name: 'TW' },
        { id: 2, name: 'Tỉnh/Thành phố' },
        { id: 3, name: 'Quận/Huyện' },
        { id: 4, name: 'Cơ sở' },
        { id: 5, name: 'Chi' },
        { id: 6, name: 'Tổ' }
    ];
    // bangnc
    public static XepLoai = [
        { id: 'xuatsac', ten: 'Hoàn thành xuất sắc nhiệm vụ' },
        { id: 'totnhiemvu', ten: 'Hoàn thành tốt nhiệm vụ' },
        { id: 'hoanthanhnhiemvu', ten: 'Hoàn thành nhiệm vụ' },
        { id: 'khonghoanthanhnhiemvu', ten: 'Không hoàn thành nhiệm vụ' },
    ];
    // danh cho báo cáo cán bộ nữ
    public static LoaiToChucs = [
        { id: 1, name: 'Trung ương' },
        { id: 2, name: 'Tỉnh / Thành phố' },
        { id: 3, name: 'Quận / Huyện' },
        { id: 4, name: 'Xã /Phường' },
    ];
    // danh cho mô hình
    public static LinhVuc = [
        { id: 1, ten: 'Mô hình phát triển kinh tế, xóa đói giảm nghèo' },
        { id: 2, ten:  'Mô hình xây dựng gia đình hạnh phúc' },
        { id: 3, ten:  'Mô hình xây dựng tổ chức Hội vững mạnh' },
        { id: 4, ten:  'Mô hình khác' }
    ];
    // chuc nang
    public static ChucNang = {
        CB: {},
        CBN: {},
        DM: {},
        HV: {},
        QTHT: {},
        TC: {},
        TDKT: {},
        VB: {}
    };
    // Khai báo dùng chung tiêu đề:
    // Phần cán bộ
    /**
     * THEO DÕI CÁN BỘ HỘI .
     */
    public static CB_Title_Theo_doi_cb = 'THEO DÕI CÁN BỘ HỘI ';

    public static TyLeHoanThanhXuatSac = 20;
}
