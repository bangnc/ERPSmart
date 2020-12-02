import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { Reducers } from './reducers';
function encryptFunction(data: any) {
    return btoa(unescape(encodeURIComponent((data))));
}
function decryptFunction(data: any) {
    return decodeURIComponent(escape(atob(data)));
}
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({ keys: [{ oauthReducer: { encrypt: encryptFunction, decrypt: decryptFunction } }], rehydrate: true })(reducer);
}
export function sessionStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    // tslint:disable-next-line:max-line-length
    return localStorageSync({
        keys: ['chucvucbReducer',
            'HVDaTungThamGiaHoiReducer',
            'chiTieuReducer',
            'chucvucbnReducer',
            'quatrinhthamgiahoiReducer',
            'quanlybiendongReducer',
            'tinhtrangchinhtriReducer',
            'chucvuhoihvReducer',
            'hoiviendatungthamgiacaulacbohvReducer',
            'qttghhoiviendatungthamgiacaulacbohvReducer',
            'tinhtrangchinhtrihvReducer',
            'banchaphanhcbReducer',
            'quochoihoidongnhandancbReducer',
            'chucvuhoihvcaulacboReducer',
            'hoivienbiendongCLBReducer',
            'tinhtrangchinhtrihvclbReducer',
            'hoivienbiendongReducer',
            'quatrinhthamgiahoihvReducer',
            'tochucidafterfilterhosocuCLBReducer',
            'tochucidafterfilterhosocuDBHCReducer',
            'hoivientheotochucDBHCReducer',
            'hoivientheocaulacboCLBReducer',
            'tdktBanPTReducer',
            // 'dashboardReducer',
            //  'tcTreeReducer',
            'dxktReducer',
            'themmoicbnReducer',
            'themmoihvReducer'
        ], rehydrate: true, storage: sessionStorage
    })(reducer);
}
export const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer, sessionStorageSyncReducer];
export const RootStore = StoreModule.forRoot(Reducers, { metaReducers });
