import {LOGIN_SUCCESS, LOGOUT} from '../types/Login';

const initState = {
    login: {},
};

const LoginReducer = (state = initState, action = {}) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            console.log('Inside LoginReducer LOGIN_SUCCESS', action.payload);
            return Object.assign({}, action.payload.user);

        case LOGOUT:
            console.log('Inside LoginReducer LOGOUT', action.payload);
            state.authenticated = false;
            return Object.assign({}, state);

        default:
            return initState;
    }
};

export default LoginReducer;
