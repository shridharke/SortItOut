import { setArray } from "../reducers/array/reducer";
import { setCurrentInsertTwo } from "../reducers/insertionSort/reducer";
import { setCurrentSwappers } from "../reducers/swappers/reducer";
import { setCurrentSorted } from "../reducers/sorted/reducer";
import { setRunning } from "../reducers/running/reducer";
import { store } from '../store';

function select(state) {
    return state.speed
}

function getCurrentArray(state) {
    return state.currentInsertTwo
}

let currentValue, currentInsert
function handleChange() {
    let previousValue = currentValue
    currentValue = select(store.getState())
    currentInsert = getCurrentArray(store.getState())

    if (previousValue !== currentValue) {
        console.log(
            'Some deep nested property changed from',
            previousValue,
            'to',
            currentValue
        )
    }
}

const unsubscribe = store.subscribe(handleChange)

const insertionSort = (stateArray, dispatch, speed) => {
    let array = stateArray.slice(0), animations = [];
    for (let i = 1; i < array.length; i++) {
        let j = i;
        animations.push([i, j]);
        while (j > 0 && array[j] < array[j - 1]) {
            animations.push([j, j - 1, true]);
            let temp = array[j];
            array[j] = array[j - 1];
            array[j - 1] = temp;
            animations.push(array.slice(0));
            animations.push([]);
            j = j - 1;
            animations.push([true, j]);
        }
        // animations.push(array.filter((num, index) => index < i));
        // for (j = 0; j < i; j++) {
        //     if (!currentInsert.includes(j)) {
        //         animations.push([true, j]);
        //     }
        // }
    }
    handleDispatch(animations, dispatch, array, speed);
    return array;
}

const handleDispatch = (animations, dispatch, array, speed) => {
    if (!animations.length) {
        dispatch(setCurrentInsertTwo(array.map((num, index) => index)));
        setTimeout(() => {
            dispatch(setCurrentInsertTwo([]));
            dispatch(setCurrentSorted(array.map((num, index) => index)));
            dispatch(setRunning(false));
        }, 900);
        return;
    }
    let dispatchFunction = animations[0].length > 3 ?
        setArray : animations[0].length === 3 || animations[0].length === 0 ?
            setCurrentSwappers : animations[0].length === 2 && typeof animations[0][0] === "boolean" ?
                setCurrentSorted : setCurrentInsertTwo;
    dispatch(dispatchFunction(animations.shift()));
    setTimeout(() => {
        handleDispatch(animations, dispatch, array, currentValue);
    }, speed);
}

export default insertionSort;