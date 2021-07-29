import {
    LOGIN,
    LOADING,
    ADD_USER,
    FETCH_USERS,
    DELETE_USERS,
    AUTH,
    STOP_LOADING,
    LOGOUT,
    FETCH_USAGE,
    CHANGE_YEAR,
    ADD_BLOG,
    DELETE_BLOG,
    FETCH_BLOGS,
    ADD_PRODUCT,
    FETCH_PRODUCT,
    DELETE_PRODUCT,
    FETCH_ORDERS,
    UPDATE_ORDER,
    FETCH_BOOKING
} from './types';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import axios from 'axios';
import setAuthorization from '../config/setAuthorization';
const moment = require('moment');
let url = 'api/admin/login';
let url2 = '/api/admin/add-user';
let url3 = '/api/admin/fetch-users';
let url4 = '/api/admin/delete-user';
let url5 = '/api/admin/update-user';
let url6 = '/api/user/total-users';
let url7 = '/api/user/fetch-usage';
let url8 = '/api/product/add-product';
let url9 = '/api/product/fetch-products';
let url10 = '/api/product/delete-product';
let url11 = '/api/blog/add-blog';
let url12 = '/api/blog/fetch-blogs';
let url13 = '/api/blog/delete-blog';
let url14 = '/api/order/fetch-orders';
let url15 = '/api/order/update-order';
let url16 = '/api/booking/fetch-bookings';

let notyf = new Notyf({
    position: {
        x: 'right',
        y: 'top'
    }
});
export const loading = () => {
    return {
        type: LOADING
    };
};

export function signUserIn(data) {
    return function (dispatch) {
        dispatch(loading());
        axios
            .post(
                url,
                {
                    email: data.email,
                    password: data.password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                const token = response.data.access_token;
                const name =
                    response.data.first_name + ' ' + response.data.last_name;

                localStorage.setItem('userToken', token);
                setAuthorization(token);

                dispatch({ type: LOGIN, name });
                dispatch({ type: AUTH });

                data.history.push('/dashboard');
                notyf.success('Sign In successful');
                dispatch({ type: STOP_LOADING });
            })
            .catch(error => {
                if (error.response.status === 500) {
                    notyf.error('login failed');
                } else {
                    notyf.error('login failed');
                }
                dispatch({ type: STOP_LOADING });
            });
    };
}
export function addProduct(data, pictures) {
    return function (dispatch) {
        dispatch(loading());
        let productform = new FormData();
        console.log(data);
        productform.append('file', pictures[0]);
        productform.append('file', pictures[1]);
        productform.append('file', pictures[2]);
        productform.append('file', pictures[3]);

        productform.append('name', data.name);
        productform.append('description', data.description);
        productform.append('price', data.price);
        productform.append('days', data.days);
        productform.append('category_id', data.category_id);
        productform.append('subcategory', data.subcategory);
        axios
            .post(url8, productform, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then(response => {
                dispatch({ type: ADD_PRODUCT, data });
                notyf.success('Product Added Successfully');
                dispatch({ type: STOP_LOADING });
            })
            .catch(error => {
                if (error) {
                    if (error.response.status === 500) {
                        notyf.error('No Internet');
                    } else {
                        notyf.error('Add Failed');
                    }
                    dispatch({ type: STOP_LOADING });
                }
            });
    };
}
export function addUserUp(data) {
    return function (dispatch) {
        dispatch(loading());
        axios
            .post(
                url2,
                {
                    email: data.email,
                    password: data.password,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    access_level: data.access_level
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                dispatch({ type: ADD_USER, data });
                notyf.success('User Added Successfully');
                dispatch({ type: STOP_LOADING });
            })
            .catch(error => {
                if (error) {
                    if (error.response.status === 500) {
                        notyf.error('No Internet');
                    } else {
                        notyf.error(error.response.data);
                    }
                    dispatch({ type: STOP_LOADING });
                }
            });
    };
}
export function addBlog(data) {
    return function (dispatch) {
        dispatch(loading());
        axios
            .post(
                url11,
                {
                    name: data.name,
                    body: data.body
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                dispatch({ type: ADD_BLOG, data });
                notyf.success('Blog Added Successfully');
                dispatch({ type: STOP_LOADING });
            })
            .catch(error => {
                if (error) {
                    if (error.response.status === 500) {
                        notyf.error('No Internet');
                    } else {
                        notyf.error(error.response.data);
                    }
                    dispatch({ type: STOP_LOADING });
                }
            });
    };
}
export function updateOrder(data) {
    return function (dispatch) {
        dispatch(loading());
        axios
            .post(
                url15,
                {
                    id: data
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                notyf.success('Order Updated');
                dispatch({ type: STOP_LOADING });
            })
            .catch(error => {
                if (error) {
                    if (error.response.status === 500) {
                        notyf.error('No Internet');
                    } else {
                        notyf.error('User Update Failed');
                    }

                    dispatch({ type: STOP_LOADING });
                }
            });
    };
}
export function updateUser(data) {
    return function (dispatch) {
        dispatch(loading());
        axios
            .post(
                url5,
                {
                    email: data.email,
                    password: data.password,
                    access_level: data.access_level,
                    last_name: data.last_name,
                    first_name: data.first_name,
                    id: data.id
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                notyf.success('User Updated');
                dispatch({ type: STOP_LOADING });
            })
            .catch(error => {
                if (error) {
                    if (error.response.status === 500) {
                        notyf.error('No Internet');
                    } else {
                        notyf.error('User Update Failed');
                    }

                    dispatch({ type: STOP_LOADING });
                }
            });
    };
}
export function fetchUsers() {
    return function (dispatch) {
        axios
            .get(
                url3,

                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                dispatch({ type: FETCH_USERS, users: response.data });
            })
            .catch(error => {
                if (error) {
                }
            });
    };
}
export function fetchBookings() {
    return function (dispatch) {
        axios
            .get(
                url16,

                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                dispatch({ type: FETCH_BOOKING, data: response.data });
            })
            .catch(error => {
                if (error) {
                }
            });
    };
}
export function fetchBlogs() {
    return function (dispatch) {
        axios
            .get(
                url12,

                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                dispatch({ type: FETCH_BLOGS, blogs: response.data });
            })
            .catch(error => {
                if (error) {
                    notyf.error('No Internet');
                }
            });
    };
}
export function fetchOrders() {
    return function (dispatch) {
        axios
            .get(
                url14,

                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                dispatch({ type: FETCH_ORDERS, data: response.data });
            })
            .catch(error => {
                if (error) {
                }
            });
    };
}
export function fetchProducts() {
    return function (dispatch) {
        axios
            .get(
                url9,

                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                dispatch({ type: FETCH_PRODUCT, products: response.data });
            })
            .catch(error => {
                if (error) {
                }
            });
    };
}

export function deleteUser(data) {
    return function (dispatch) {
        axios
            .get(
                url4,
                {
                    params: {
                        email: data
                    }
                },

                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                dispatch({ type: DELETE_USERS, data });
                notyf.success('User Deleted');
            })
            .catch(error => {
                if (error) {
                    if (error.response.status === 500) {
                        notyf.error('No Internet');
                    } else {
                        notyf.error('Delete failed');
                    }
                    dispatch({ type: STOP_LOADING });
                }
            });
    };
}
export function deleteProduct(data) {
    return function (dispatch) {
        axios
            .get(
                url10,
                {
                    params: {
                        product_id: data
                    }
                },

                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                dispatch({ type: DELETE_PRODUCT, data });
                notyf.success('Product Deleted');
            })
            .catch(error => {
                if (error) {
                    if (error.response.status === 500) {
                        notyf.error('No Internet');
                    } else {
                        notyf.error('Delete failed');
                    }
                    dispatch({ type: STOP_LOADING });
                }
            });
    };
}
export function deleteBlog(data) {
    return function (dispatch) {
        axios
            .get(
                url13,
                {
                    params: {
                        blog_id: data
                    }
                },

                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                dispatch({ type: DELETE_BLOG, data });
                notyf.success('Product Deleted');
            })
            .catch(error => {
                if (error) {
                    if (error.response.status === 500) {
                        notyf.error('No Internet');
                    } else {
                        notyf.error('Delete failed');
                    }
                    dispatch({ type: STOP_LOADING });
                }
            });
    };
}
export function logout(data) {
    return function (dispatch) {
        localStorage.clear();
        dispatch({ type: LOGOUT });
        data.push('/sign');
    };
}
export function searchYear(data) {
    return function (dispatch) {
        dispatch({ type: CHANGE_YEAR, year: data });
    };
}

export function fetchUsage() {
    return function (dispatch) {
        axios
            .get(
                url7,

                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            .then(response => {
                let current_day = moment().format('MMMM Do YYYY').toLowerCase();

                let temp_data = response.data;

                let current_day_count = temp_data.filter(
                    temp => temp.day === current_day
                );
                if (current_day_count.length === 0) {
                    dispatch({
                        type: FETCH_USAGE,
                        current_day: 0,
                        all_day: temp_data
                    });
                } else {
                    dispatch({
                        type: FETCH_USAGE,
                        current_day: current_day_count[0].usage_count.toString(),
                        all_day: temp_data
                    });
                }
            })
            .catch(error => {
                if (error) {
                    if (error.response.status === 500) {
                        notyf.error('No Internet');
                    }
                }
            });
    };
}
