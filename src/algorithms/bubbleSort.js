import { setArray } from "../reducers/array/reducer";
import { setCurrentBubbleTwo } from "../reducers/bubbleSort/reducer";
import { setCurrentSwappers } from "../reducers/swappers/reducer";
import { setCurrentSorted } from "../reducers/sorted/reducer";
import { setRunning } from "../reducers/running/reducer";

const bubbleSort = (stateArray, dispatch, speed) => {
    let array = stateArray.slice(0), animations = [], sorted = false, round = 0;
    while (!sorted) {
        sorted = true;
        for (let i = 0; i < array.length - 1 - round; i++) {
            animations.push([i, i + 1]);
            if (array[i] > array[i + 1]) {
                animations.push([i, i + 1, true]);
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                sorted = false;
                animations.push(array.slice(0));
                animations.push([]);
            }
        }
        animations.push([true, array.length - 1 - round]);
        round++;
    }
    handleDispatch(animations, dispatch, array, speed);
    return array;
}

const handleDispatch = (animations, dispatch, array, speed) => {
    if (!animations.length) {
        dispatch(setCurrentBubbleTwo(array.map((num, index) => index)));
        setTimeout(() => {
            dispatch(setCurrentBubbleTwo([]));
            dispatch(setCurrentSorted(array.map((num, index) => index)));
            dispatch(setRunning(false));
        }, 900);
        return;
    }
    let dispatchFunction = animations[0].length > 3 ?
        setArray : animations[0].length === 3 || animations[0].length === 0 ?
            setCurrentSwappers : animations[0].length === 2 && typeof animations[0][0] === "boolean" ?
                setCurrentSorted : setCurrentBubbleTwo;
    dispatch(dispatchFunction(animations.shift()));
    setTimeout(() => {
        handleDispatch(animations, dispatch, array, speed);
    }, speed);
}

export default bubbleSort;