import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogged: 'checking',
        user: {},
        errorMsg: null
    },
    reducers: {
        onChecking: (state) => {
            state.isLogged = 'checking';
            state.user = {};
            state.errorMsg = null;
        },
        onLogin: (state, {payload}) => {
            state.isLogged = "authenticated";
            state.user = payload;
            state.errorMsg = null;
        },
        onLogout: (state, {payload}) => {
            state.isLogged = "not-authenticated";
            state.user = null;
            state.errorMsg = payload;
        },
        cleanErrorMsg: (state) => {
            state.errorMsg = null;
        }
    }
});

export const { cleanErrorMsg, onChecking, onLogin, onLogout } = authSlice.actions;