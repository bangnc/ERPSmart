import { oauthReducer } from './oauth/oauth.reducer';
import { pageOptionReducer } from './page-option/page-option.reducer';
// tslint:disable-next-line:max-line-length

import { dashboardReducer } from './manhinhtongquan/manhinhtongquan.reducer';
import { tcTreeReducer } from './tc.tree/tc.tree.reducer';
import { pbTreeReducer } from './pb.tree/pb.tree.reducer';

export const Reducers = {
    oauthReducer,
    pageOptionReducer,
    dashboardReducer,
    tcTreeReducer,
    pbTreeReducer,
};
