import { setArray } from "../reducers/array/reducer";
import { setCurrentQuickTwo, setPivot } from "../reducers/quickSort/reducer";
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

function quickSort(stateArray, dispatch, speed) {
    let array = stateArray.slice(0),
        animations = [];
    quickSortHelper(array, 0, array.length - 1, animations);
    handleDispatch(animations, dispatch, array, speed);
    return array;
}

function quickSortHelper(array, start, end, animations) {
    if (start >= end) {
        animations.push([true, start]);
        return;
    }
    let pivot = start,
        left = start + 1,
        right = end;
    animations.push(pivot);
    animations.push([left, right]);
    while (right >= left) {
        if (array[right] < array[pivot] && array[left] > array[pivot]) {
            animations.push([left, right, true]);
            let temp = array[right];
            array[right] = array[left];
            array[left] = temp;
            animations.push(array.slice(0));
            animations.push([]);
        }
        if (array[right] >= array[pivot]) {
            right--;
        }
        if (array[left] <= array[pivot]) {
            left++;
        }
        if (right >= left) animations.push([left, right]);
    }
    animations.push([pivot, right]);
    if (pivot !== right) {
        let temp = array[right];
        array[right] = array[pivot];
        array[pivot] = temp;
        animations.push([pivot, right, true]);
        animations.push(array.slice(0));
        animations.push([]);
        animations.push([true, right]);
    }
    quickSortHelper(array, start, right - 1, animations);
    quickSortHelper(array, right + 1, end, animations);
}

function handleDispatch(animations, dispatch, array, speed) {
    if (!animations.length) {
        dispatch(setPivot(null));
        // dispatch(setCurrentQuickTwo(array.map((num, index) => index)));
        setTimeout(() => {
            dispatch(setCurrentQuickTwo([]));
            dispatch(setRunning(false));
        }, currentValue);
        return;
    }
    let dispatchFunction = !(animations[0] instanceof Array) ?
        setPivot : animations[0].length > 3 ?
            setArray : animations[0].length !== 2 ?
                setCurrentSwappers : animations[0].length === 2 && typeof animations[0][0] === "boolean" ?
                    setCurrentSorted : setCurrentQuickTwo;
    dispatch(dispatchFunction(animations.shift()));
    if (dispatchFunction === setPivot) dispatch(setCurrentQuickTwo(animations.shift()));
    setTimeout(() => {
        handleDispatch(animations, dispatch, array, currentValue);
    }, speed);
}

export default quickSort;