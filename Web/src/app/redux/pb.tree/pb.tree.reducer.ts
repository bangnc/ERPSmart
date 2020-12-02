import { pbTreedActionTypes } from './pb.tree.constant';
import { pbTreeActionsUnion } from './pb.tree.action';
import { OauthActionTypes } from '../oauth/oauth.constant';

export interface PBTreeData {
    phongban_id: string;
}
// data default.
const pbTreeData = {
    phongban_id: ''
};
export function pbTreeReducer(state: PBTreeData = pbTreeData, action: pbTreeActionsUnion) {
    switch (action.type) {
        case pbTreedActionTypes.SET_PB_ID:
            state = {
                phongban_id: action.phongban_id
            };
            return state;

        case OauthActionTypes.REMOVE_TOKEN:
            state = {
                phongban_id: ''
            };
            return state;
        default:
            return state;
    }
}
