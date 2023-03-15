import {createSlice} from '@reduxjs/toolkit';

export const bugSlice = createSlice({
    name: 'bug',
    initialState: {
        activeBug: null,
        errorMsg: null
    },
    reducers: {
        onSetActiveBug: (state, {payload}) => {
            state.activeBug = payload;
        },
        onError: (state, {payload}) => {
            state.errorMsg = payload;
        },
        onCleanError: (state) => {
            state.errorMsg = null;
        }
    }
});


export const { onCleanError, onError , onSetActiveBug } = bugSlice.actions;