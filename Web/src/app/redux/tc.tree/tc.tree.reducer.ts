import { tcTreedActionTypes } from './tc.tree.constant';
import { tcTreeActionsUnion } from './tc.tree.action';
import { OauthActionTypes } from '../oauth/oauth.constant';

export interface TCTreeData {
    data: any;
    logout: boolean;
    refresh: boolean;
    key: string;
    selectedItem: any;
}
// data default.
const tcTreeData = {
    data: {},
    logout: false,
    refresh: false,
    key: null,
    selectedItem: {}
};
export function tcTreeReducer(state: TCTreeData = tcTreeData, action: tcTreeActionsUnion) {
    switch (action.type) {
        case tcTreedActionTypes.SET_TC_TREE:
            state.data[action.url] = {
                tree: action.tree,
                selectedItem: action.selectedItem
            };
            return state;
        case tcTreedActionTypes.SET_TC_LOGOUT:
            state.logout = action.logout;
            return state;
        case tcTreedActionTypes.SET_TC_REFRESH:
            state.refresh = action.refresh;
            return state;
        case tcTreedActionTypes.SET_TC_KEY:
            state.key = action.key;
            return state;
        case tcTreedActionTypes.SET_TC_SELECTED:
                state.selectedItem = action.selectedItem;
                return state;
        case OauthActionTypes.REMOVE_TOKEN:
            state = {
                data: {},
                logout: true,
                refresh: false,
                key: null,
                selectedItem: {}
            };
            return state;
        default:
            return state;
    }
}
