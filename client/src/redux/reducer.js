import { combineReducers } from "redux";
import user from './user/reducer';
import order from './order/reducer';
import solOrder from './solOrder/reducer';
import request from './request/reducer';
import storehouse from './storehouse/reducer';
import workflow from './workflow/reducer';
import navigation from '../reducers/navigation'

const reducer = combineReducers({
    user,
    order,
    solOrder,
    request,
    storehouse,
    workflow,
    navigation
});

export default reducer;