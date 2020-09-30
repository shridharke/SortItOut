import { createAction, handleActions } from "redux-actions";

const initState = false;

export const SET_THEME = "SET_THEME";
export const setTheme = createAction(SET_THEME);

export const theme = handleActions({
    SET_THEME: (state, { payload }) => {
        return payload;
    },
}, initState);