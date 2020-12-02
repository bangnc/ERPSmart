import { pageOptionActionTypes } from './page-option.constant';
import { pageOptionActionsUnion } from './page-option.action';
import { OauthActionTypes } from '../oauth/oauth.constant';

export interface PageOptionData {
    data: any;
}
// data default.
const pageOptionData = {
    data: {}
};
// data default.
export function pageOptionReducer(state: PageOptionData = pageOptionData, action: pageOptionActionsUnion) {
    switch (action.type) {
        // xử lý action chọn danh sách cán bộ
        case pageOptionActionTypes.SET_PAGE_OPTION:
            state.data[action.url] = action.pageOption;
            return state;
        case OauthActionTypes.REMOVE_TOKEN:
            state = {
                data: {}
            };
            return state;
        default:
            return state;
    }
}
