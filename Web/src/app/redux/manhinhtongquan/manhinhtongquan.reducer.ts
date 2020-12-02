import { dashboardActionTypes } from './manhinhtongquan.constant';
import { dashboardActionsUnion } from './manhinhtongquan.action';
import { OauthActionTypes } from '../oauth/oauth.constant';

export interface DashboardData {
    data: any;
}
// data default.
const dashboardData = {
    data: {},
};
export function dashboardReducer(state: DashboardData = dashboardData, action: dashboardActionsUnion) {
    switch (action.type) {
        case dashboardActionTypes.SET_DASHBOARD:
            state.data[action.key] = {
                tree: action.tree,
                opens: action.opens
            };
            return state;
        case OauthActionTypes.REMOVE_TOKEN:
            state.data = {};
            return state;
        default:
            return state;
    }
}
