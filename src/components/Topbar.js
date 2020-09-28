import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setArray } from '../reducers/array/reducer'
import { setAlgorithm } from '../reducers/algorithm/reducer'
import { setCurrentSorted } from '../reducers/sorted/reducer'
import { setRunning } from '../reducers/running/reducer'
import bubbleSort from '../algorithms/bubbleSort'
import mergeSort from '../algorithms/mergeSort'
import './Topbar.css'

export const Topbar = ({ array, algorithm, sort, isRunning, generateArray, updateAlgorithm }) => {

    useEffect(() => {
        generateArray(10);
        // document.getElementById("changeSize").value = 50;
    }, [])

    function handleClick(algorithm) {
        updateAlgorithm(algorithm);
    }

    function handleChange(evt) {
        generateArray(Math.floor((parseInt(evt.target.value) + 3) * 1.65));
    }

    const speed = 500;
    // 570 - Math.pow(array.length, 2) > 0 ? 570 - Math.pow(array.length, 2) : 0;

    const color = isRunning ? "rgba(214, 29, 29, 0.8)" : "white";

    const cursor = isRunning ? "auto" : "pointer";

    return (
        <div id="toolbar">
            {/* <div 
                id={!isRunning ? "generateArray" : "generateArrayX"}
                style={{ color: color, cursor: cursor }}
                onClick={!isRunning ? () => generateArray(array.length) : null}>
                Generate New Array
            </div> */}
            {/* <div
                id="arraySize"
                style={{ color: color }}>
                Change Array Size & Sorting Speed
            </div> */}
            {/* <input
                id="changeSize"
                type="range"
                min="0"
                max="100"
                style={{ background: color, cursor: cursor }}
                disabled={isRunning ? "disabled" : null}
                onChange={handleChange}
            /> */}
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
            {/* { algorithm ? <div
                id="sort"
                style={{ color: color, cursor: cursor }}
                onClick={!isRunning ? () => sort(algorithm, array, speed) : null}>
                Sort!
            </div> : null
            } */}
        </div>
    )
}

const mapStateToProps = ({ array, algorithm, isRunning }) => ({
    array, algorithm, isRunning
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
                mergeSort : null;
        dispatch(setCurrentSorted([]));
        dispatch(setRunning(true));
        doSort(array, dispatch, speed);
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)
