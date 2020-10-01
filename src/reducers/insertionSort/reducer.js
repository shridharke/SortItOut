import { createAction, handleActions } from "redux-actions";

const initState = [];

export const SET_CURRENT_INSERT_TWO = "SET_CURRENT_INSERT_TWO";
export const setCurrentInsertTwo = createAction(SET_CURRENT_INSERT_TWO);

export const currentInsertTwo = handleActions({
    SET_CURRENT_INSERT_TWO: (state, { payload }) => {
        return payload;
    },
}, initState);