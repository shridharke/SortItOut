import { createAction, handleActions } from "redux-actions";

const initState = 100;

export const SET_SPEED = "SET_SPEED";
export const setSpeed = createAction(SET_SPEED);

export const speed = handleActions({
    SET_SPEED: (state, { payload }) => {
        return payload;
    },
}, initState);