import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setArray } from '../reducers/array/reducer'
import { setCurrentSorted } from '../reducers/sorted/reducer'
import { setSpeed } from '../reducers/speed/reducer'
import './BottomBar.css'

export const BottomBar = ({ array, isRunning, generateArray, updateSpeed }) => {

    useEffect(() => {
        generateArray(18);
        document.getElementById("sizeRange").value = 8;
        updateSpeed(500);
        document.getElementById("speedRange").value = 501;
    }, [])

    function handleSizeChange(evt) {
        generateArray(Math.floor((parseInt(evt.target.value) + 3) * 1.65));
    }

    const handleSpeedChange = (e) => {
        updateSpeed(1001 - parseInt(e.target.value))
    }

    return (
        <div className="bottomBar">
            <div
                id={!isRunning ? "generateArray" : "generateArrayX"}
                onClick={!isRunning ? () => generateArray(array.length) : null}>
                Randomize
            </div>
            <div class="slidecontainer">
                Change Array Size
                <input type="range" onChange={handleSizeChange} disabled={isRunning ? "disabled" : null} min="1" max="100" class="slider" id="sizeRange" />
            </div>
            <div class="slidecontainer">
                Change Speed
                <input type="range" onChange={handleSpeedChange} min="1" max="1000" class="slider" id="speedRange" />
            </div>
        </div>
    )
}

const mapStateToProps = ({ array, isRunning }) => ({
    array, isRunning
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

    updateSpeed: (speedValue) => {
        dispatch(setSpeed(speedValue))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BottomBar)
