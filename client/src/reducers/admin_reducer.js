import {
    LOADING,
    LOGIN,
    FETCH_ADMIN,
    DELETE_USERS,
    ADD_USER,
    FETCH_USERS,
    LOGOUT,
    STOP_LOADING,
    AUTH,
    FETCH_NUMBER_USERS,
    FETCH_NUMBER_USERS_INFO
} from '../actions/types';

let INITIAL_STATE = {
    loading: false,
    username: 'Lebron James',
    message: '',
    error: false,
    isAuth: false,
    totalUsers: '3',
    dailyUsage: '0',
    allDays: [],
    year: '2020',
    tip_message: 'lol',
    users: [
        {
            id: '',
            email: '',
            access_level: '',
            first_name: '',
            last_name: ''
        }
    ]
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: true };
        case AUTH:
            return { ...state, isAuth: true };
        case DELETE_USERS:
            let new_user = state.users.filter(
                user => user.email !== action.data
            );

            return { ...state, users: new_user, loading: false };
        case LOGIN:
            let temp_name = action.name;
            return { ...state, username: temp_name };

        case LOGOUT:
            return INITIAL_STATE;
        case FETCH_USERS:
            let tempUsers = action.users;
            return { ...state, users: tempUsers };

        case FETCH_NUMBER_USERS:
            let temp_number_users = action.users;
            //let temp_users_data = action.users_data;

            return {
                ...state,
                totalUsers: temp_number_users.toString()
            };
        case FETCH_NUMBER_USERS_INFO:
            let temp_users_data = action.users_data;

            return {
                ...state,

                app_users_data: temp_users_data
            };
        case ADD_USER:
            let new_users = state.users.concat(action.data);

            return { ...state, users: new_users, loading: false };

        case STOP_LOADING:
            return { ...state, loading: false };

        default:
            return state;
    }
}
