import { createAction, handleActions } from "redux-actions";

const initialStateOne = [];
const initialStateTwo = null;

export const SET_CURRENT_SELECTION_TWO = "SET_CURRENT_SELECTION_TWO";
export const setCurrentSelectionTwo = createAction(SET_CURRENT_SELECTION_TWO);
export const SET_PIVOT = "SET_PIVOT";
export const setPivot = createAction(SET_PIVOT);

export const currentSelectionTwo = handleActions({
    SET_CURRENT_SELECTION_TWO: (state, { payload }) => {
        return payload;
    },
}, initialStateOne);
export const spivot = handleActions({
    SET_PIVOT: (state, { payload }) => {
        return payload;
    },
}, initialStateTwo);