import { combineReducers } from 'redux'
import { array } from "./array/reducer"
import { algorithm } from "./algorithm/reducer"
import { currentBubbleTwo } from "./bubbleSort/reducer"
import { currentMergeX } from "./mergeSort/reducer"
import { currentQuickTwo, pivot } from "./quickSort/reducer";
import { currentHeapThree } from "./heapSort/reducer";
import { currentSwappers } from "./swappers/reducer"
import { currentSorted } from "./sorted/reducer"
import { isRunning } from "./running/reducer"
import { speed } from "./speed/reducer"

export default combineReducers({
    array, algorithm, currentBubbleTwo, currentMergeX, currentQuickTwo, pivot, currentHeapThree, currentSorted, currentSwappers, isRunning, speed
})