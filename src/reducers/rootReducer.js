import { combineReducers } from 'redux'
import { array } from "./array/reducer"
import { algorithm } from "./algorithm/reducer"
import { currentBubbleTwo } from "./bubbleSort/reducer"
import { currentSwappers } from "./swappers/reducer"
import { currentSorted } from "./sorted/reducer"
import { isRunning } from "./running/reducer"

export default combineReducers({
    array, algorithm, currentBubbleTwo, currentSorted, currentSwappers, isRunning
})