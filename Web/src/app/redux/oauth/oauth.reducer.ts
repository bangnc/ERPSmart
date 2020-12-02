import { OauthActionTypes } from './oauth.constant';
import { OauthActionsUnion } from './oauth.action';
import { AppConst } from '../../shared';

export interface OauthData {
    isLogging: boolean;
    token: any;
    isKeepLogin: boolean;
    dieu_huong: Array<any>;
    man_hinh_tong_quan: any;
    chuc_nang: any;
    profile: any;
    ds_duong_dan: Array<any>;
    tai_khoan_ban: boolean;
    tai_khoan_cum: boolean;
    tai_khoan_doan_cong_tac: boolean;
    is_login_sso: boolean;
}
// data default.
const oauthData = {
    isLogging: false,
    token: null,
    isKeepLogin: true,
    dieu_huong: [],
    man_hinh_tong_quan: {
        left: [],
        right: []
    },
    chuc_nang: {},
    profile: {},
    ds_duong_dan: [],
    tai_khoan_ban: false,
    tai_khoan_cum: false,
    tai_khoan_doan_cong_tac: false,
    is_login_sso: false
};

export function oauthReducer(state: OauthData = oauthData, action: OauthActionsUnion) {
    switch (action.type) {
        // xử lý action chuyển trạng thái xác thực sang đang xác thực
        case OauthActionTypes.SET_TO_LOGGING:
            state.isLogging = true;
            return state;
        // xử lý action chuyển trạng thái xác thực không thành công
        case OauthActionTypes.SET_TO_LOGIN_FAILED:
            state.isLogging = false;
            return state;
        // xử lý action khi đã xác thực thành công gán token vào store và chuyển sang trạng thái đã xác thực
        case OauthActionTypes.SET_TOKEN:
            if (action.token && action.token.access_token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                if (!action.isKeepLogin) {
                    delete action.token.refresh_token;
                }
                // xử lý thông tin cơ bản của người dùng
                state.profile = JSON.parse(action.token.profile);
                delete action.token.profile;
                // #region Xử lý thông tin quyền người dùng
                // const perms = JSON.parse(action.token.perms);
                // tslint:disable-next-line:no-shadowed-variable
                // const dieu_huong = perms.dieu_huong || [];
                // tslint:disable-next-line:no-shadowed-variable
                const man_hinh_tong_quan = {
                    left: [],
                    right: []
                };
                delete action.token.perms;
                // #endregion
                state.token = action.token;
                state.isKeepLogin = action.isKeepLogin;
                state.isLogging = false;
                return state;
            }
            return oauthData;
        // xử lý action khi logout xóa token ra khỏi store
        case OauthActionTypes.REMOVE_TOKEN:
            return {
                isLogging: false,
                token: null,
                isKeepLogin: true,
                dieu_huong: [],
                man_hinh_tong_quan: {
                    left: [],
                    right: []
                },
                chuc_nang: {},
                profile: {},
                ds_duong_dan: [],
                tai_khoan_ban: false,
                tai_khoan_cum: false,
                tai_khoan_doan_cong_tac: false
            };
        // xử lý action khi thực hiện set quyền vào store
        case OauthActionTypes.SET_QUYEN:
            action.data = action.data || {};
            const dieu_huong = action.data.dieu_huong || [];
            const man_hinh_tong_quan = {
                left: [],
                right: []
            };
            const ds_duong_dan = [];
            dieu_huong.forEach(loai_module => {
                loai_module.ds_module.forEach(mdul => {
                    if (AppConst.MANHINHTONGQUAN.left[mdul.ma]) {
                        man_hinh_tong_quan.left.push(mdul);
                    }
                    if (AppConst.MANHINHTONGQUAN.right[mdul.ma]) {
                        man_hinh_tong_quan.right.push(mdul);
                    }
                    mdul.ds_dieu_huong.forEach(element => {
                        if (element.duong_dan) {
                            ds_duong_dan.push(element.duong_dan);
                        }
                    });
                });
            });
            state.ds_duong_dan = ds_duong_dan;
            state.dieu_huong = dieu_huong;
            state.man_hinh_tong_quan = man_hinh_tong_quan;
            state.chuc_nang = action.data.chuc_nang || {};
            state.tai_khoan_ban = action.data.tai_khoan_ban || false;
            state.tai_khoan_cum = action.data.tai_khoan_cum || false;
            state.tai_khoan_doan_cong_tac = action.data.tai_khoan_doan_cong_tac || false;
            return state;
        default:
            return state;
    }
}
