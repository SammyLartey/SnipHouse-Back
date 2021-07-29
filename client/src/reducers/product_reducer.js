import { ADD_PRODUCT, DELETE_PRODUCT, FETCH_PRODUCT } from '../actions/types';

let INITIAL_STATE = {
    products: [],
    product: 'big bag',
    number_products: ''
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case ADD_PRODUCT:
            let new_product = state.products.concat(action.data);

            return { ...state, products: new_product, loading: false };
        case DELETE_PRODUCT:
            let new_products = state.products.filter(
                deletedProduct => deletedProduct.id !== action.data
            );

            return { ...state, products: new_products, loading: false };
        case FETCH_PRODUCT:
            let tempProduct = action.products;

            return {
                ...state,
                number_products: tempProduct.length,
                products: tempProduct
            };
        default:
            return state;
    }
}
