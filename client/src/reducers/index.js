import { combineReducers } from 'redux';

import admin from './admin_reducer';
import blog from './blog_reducer';
import product from './product_reducer';
import original from '../store/reducer';
import order from './order_reducer';

const rootReducer = combineReducers({
    original,
    admin,
    product,
    blog,
    order
});

export default rootReducer;
