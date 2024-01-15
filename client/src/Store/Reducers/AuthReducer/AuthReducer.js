import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    LoginUser: false,
    UserDetail: [],
    TokenId: [],
};

export const AuthReducer = createSlice({
    name: 'Concept',
    initialState,
    reducers: {
        LoginUser: (state, action) => {
            state.LoginUser = action.payload;
        },
        UserDetail: (state, action) => {
            state.UserDetail = action.payload;
        },
        TokenId: (state, action) => {
            state.TokenId = action.payload;
        },
        LogOut: (state, action) => {
            (state.LoginUser = false), (state.UserDetail = []), (state.TokenId = []);
        },
    },
});

export const { LoginUser, UserDetail, TokenId, LogOut } = AuthReducer.actions;
export default AuthReducer.reducer;