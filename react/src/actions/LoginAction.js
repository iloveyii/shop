import {
    LOGIN, LOGIN_SUCCESS, LOGIN_FAIL,
    LOGOUT
} from '../types/Login';

export const loginAction = (user) => {
    console.log('Inside loginAction', user);

    return {
        type: LOGIN,
        payload: {
            user
        }
    }
};

export const loginSuccessAction = (resp) => {
    console.log('Inside loginSuccessAction');
    return {
        type: LOGIN_SUCCESS,
        payload: {
            user : resp
        }
    }
};

export const loginFailAction = (err) => {
    console.log('Inside loginFailAction');
    console.log(err);
    return {
        type: LOGIN_FAIL,
        payload: {err}
    }
};


export const logoutAction = (user) => {
    console.log('Inside logoutAction', user);

    return {
        type: LOGOUT,
        payload: {
            user
        }
    }
};
