import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setArray } from '../reducers/array/reducer'
import { setAlgorithm } from '../reducers/algorithm/reducer'
import { setCurrentSorted } from '../reducers/sorted/reducer'
import { setRunning } from '../reducers/running/reducer'
import bubbleSort from '../algorithms/bubbleSort'
import mergeSort from '../algorithms/mergeSort'
import quickSort from '../algorithms/quickSort'
import heapSort from '../algorithms/heapSort'
import './Topbar.css'

export const Topbar = ({ array, algorithm, sort, isRunning, generateArray, updateAlgorithm, speed }) => {

    function handleClick(algorithm) {
        updateAlgorithm(algorithm);
    }

    function handleChange(evt) {
        generateArray(Math.floor((parseInt(evt.target.value) + 3) * 1.65));
    }

    const color = isRunning ? "rgba(214, 29, 29, 0.8)" : "white";

    const cursor = isRunning ? "auto" : "pointer";

    return (
        <div id="toolbar">
            <div className="left-menu">
                <div
                    className={algorithm === "mergeSort" ? "currentAlgorithmButton" : "algorithmButton"}
                    onClick={() => handleClick("mergeSort")}>
                    Merge Sort
                </div>
                <div
                    className={algorithm === "quickSort" ? "currentAlgorithmButton" : "algorithmButton"}
                    onClick={() => handleClick("quickSort")}>
                    Quick Sort
                </div>
                <div
                    className={algorithm === "heapSort" ? "currentAlgorithmButton" : "algorithmButton"}
                    onClick={() => handleClick("heapSort")}>
                    Heap Sort
                </div>
            </div>
            <div className="sort-button" style={{ color: "black", cursor: cursor }} onClick={algorithm ? !isRunning ? () => sort(algorithm, array, speed) : null : null}>Sort it Out!</div>
            <div className="right-menu">
                <div
                    className={algorithm === "bubbleSort" ? "currentAlgorithmButton" : "algorithmButton"}
                    onClick={() => handleClick("bubbleSort")}>
                    Bubble Sort
                </div>
                <div
                    className={algorithm === "selectionSort" ? "currentAlgorithmButton" : "algorithmButton"}
                    onClick={() => handleClick("selectionSort")}>
                    Selection Sort
                </div>
                <div
                    className={algorithm === "insertionSort" ? "currentAlgorithmButton" : "algorithmButton"}
                    onClick={() => handleClick("insertionSort")}>
                    Insertion Sort
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ array, algorithm, isRunning, speed }) => ({
    array, algorithm, isRunning, speed
})

const mapDispatchToProps = () => dispatch => ({
    generateArray: (length) => {
        let array = [];
        while (array.length < length) {
            array.push(Math.floor(Math.random() * 200) + 10);
        }
        dispatch(setArray(array));
        dispatch(setCurrentSorted([]));
    },

    updateAlgorithm: (algorithm) => {
        dispatch(setAlgorithm(algorithm));
    },

    sort: (algorithm, array, speed) => {
        let doSort = algorithm === "bubbleSort" ?
            bubbleSort : algorithm === "mergeSort" ?
                mergeSort : algorithm === "quickSort" ?
                    quickSort : algorithm === "heapSort" ?
                        heapSort : null;
        dispatch(setCurrentSorted([]));
        dispatch(setRunning(true));
        doSort(array, dispatch, speed);
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)
