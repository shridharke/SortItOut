import { setArray } from "../reducers/array/reducer";
import { setCurrentSelectionTwo, setPivot } from "../reducers/selectionSort/reducer";
import { setCurrentSwappers } from "../reducers/swappers/reducer";
import { setCurrentSorted } from "../reducers/sorted/reducer";
import { setRunning } from "../reducers/running/reducer";
import { store } from '../store';

function select(state) {
    return state.speed
}

let currentValue
function handleChange() {
    let previousValue = currentValue
    currentValue = select(store.getState())

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

const selectionSort = (stateArray, dispatch, speed) => {
    let array = stateArray.slice(0), animations = [];
    for (let i = 0; i < array.length - 1; i++) {
        animations.push(i);
        let minimum = array[i];
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            animations.push([i, j]);
            if (array[j] < minimum) {
                minimum = array[j];
                minIndex = j;
                animations.push(j);
            }
        }

        animations.push([i, minIndex, true]);
        let temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;
        animations.push(array.slice(0));
        animations.push([]);

        animations.push([true, i]);
    }
    handleDispatch(animations, dispatch, array, speed);
    return array;
}

const handleDispatch = (animations, dispatch, array, speed) => {
    if (!animations.length) {
        dispatch(setCurrentSelectionTwo(array.map((num, index) => index)));
        dispatch(setPivot(null));
        setTimeout(() => {
            dispatch(setCurrentSelectionTwo([]));
            dispatch(setCurrentSorted(array.map((num, index) => index)));
            dispatch(setRunning(false));
        }, 900);
        return;
    }
    let dispatchFunction = !(animations[0] instanceof Array) ?
        setPivot : animations[0].length > 3 ?
            setArray : animations[0].length === 3 || animations[0].length === 0 ?
                setCurrentSwappers : animations[0].length === 2 && typeof animations[0][0] === "boolean" ?
                    setCurrentSorted : setCurrentSelectionTwo;

    dispatch(dispatchFunction(animations.shift()));
    setTimeout(() => {
        handleDispatch(animations, dispatch, array, currentValue);
    }, speed);
}

export default selectionSort;