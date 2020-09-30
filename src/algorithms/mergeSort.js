import { setArray } from "../reducers/array/reducer";
import { setCurrentMergeX } from "../reducers/mergeSort/reducer";
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

function mergeSort(stateArray, dispatch, speed) {
    let array = stateArray.slice(0),
        animations = [];
    let finalArray = mergeSortHelper(array.map((num, idx) => [num, idx]), animations, 0, array.length - 1, { array: array.slice(0) });
    handleDispatch(animations, dispatch, finalArray, speed);
}

function mergeSortHelper(array, animations, start, end, obj) {
    if (array.length === 1) {
        return array;
    }
    let half = Math.floor(array.length / 2),
        first = array.slice(0, half),
        second = array.slice(half),
        indexHalf = Math.floor((end + 1 + start) / 2),
        actualFirst = mergeSortHelper(first, animations, start, indexHalf - 1, obj),
        actualSecond = mergeSortHelper(second, animations, indexHalf, end, obj),
        isFinalMerge = false;
    if (actualFirst.length + actualSecond.length === obj.array.length) isFinalMerge = true;
    return actualSort(actualFirst, actualSecond, animations, obj, start, end, isFinalMerge);
}

function actualSort(first, second, animations, obj, start, end, isFinalMerge) {
    let sortedArray = [];
    let indexToPush = start;
    while (first.length && second.length) {
        animations.push([first[0][1], second[0][1]]);
        if (first[0][0] <= second[0][0]) {
            indexToPush++;
            sortedArray.push(first.shift());
        } else {
            animations.push([first[0][1], second[0][1], true]);
            second[0][1] = indexToPush++;
            sortedArray.push(second.shift());
            first.forEach(subArr => subArr[1]++);
            if (start === 0) {
                obj.array = sortedArray.map(subArr => subArr[0]).concat(first.map(subArr => subArr[0])).concat(second.map(subArr => subArr[0])).concat(obj.array.slice(end + 1));
            } else {
                obj.array = obj.array.slice(0, start).concat(sortedArray.map(subArr => subArr[0])).concat(first.map(subArr => subArr[0])).concat(second.map(subArr => subArr[0])).concat(obj.array.slice(end + 1));
            }
            animations.push(obj.array.concat([indexToPush - 1, indexToPush]));
            animations.push([]);
        }
        if (isFinalMerge) animations.push([true, indexToPush - 1]);
    }
    return sortedArray.concat(first).concat(second);
}

function handleDispatch(animations, dispatch, array, speed) {
    if (!animations.length) {
        dispatch(setCurrentMergeX(array.map((num, index) => index)));
        setTimeout(() => {
            dispatch(setCurrentMergeX([]));
            dispatch(setCurrentSorted(array.map((num, index) => index)));
            dispatch(setRunning(false));
        }, 900);
        return;
    }
    let dispatchFunction = animations[0].length > 3 ?
        setArray : animations[0].length === 3 && typeof animations[0][2] === "boolean" || animations[0].length === 0 ?
            setCurrentSwappers : animations[0].length === 2 && typeof animations[0][0] === "boolean" ?
                setCurrentSorted : setCurrentMergeX;
    if (dispatchFunction === setArray) {
        let currentanimations = animations.shift();
        dispatch(dispatchFunction(currentanimations.slice(0, currentanimations.length - 2)));
        dispatch(setCurrentSwappers([]));
        dispatch(setCurrentMergeX([]));
        dispatch(setCurrentSwappers([currentanimations[currentanimations.length - 2], currentanimations[currentanimations.length - 1]]));
        dispatch(setCurrentMergeX([currentanimations[currentanimations.length - 2], currentanimations[currentanimations.length - 1]]));
    } else {
        dispatch(dispatchFunction(animations.shift()));
    }
    setTimeout(() => {
        handleDispatch(animations, dispatch, array, currentValue);
    }, speed);
}

export default mergeSort;