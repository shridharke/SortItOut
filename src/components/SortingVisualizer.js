import React from 'react'
import { connect } from 'react-redux'

export const SortingVisualizer = ({ array, algorithm, currentBubbleTwo, currentMergeX, currentQuickTwo, pivot, currentHeapThree, currentSelectionTwo, currentInsertTwo, spivot, currentSorted, currentSwappers, isRunning, speed }) => {

    const numWidth = Math.floor(window.innerWidth / (array.length * 1.5));
    const width = `${numWidth}px`;
    const numMargin = array.length < 5 ? 10 : array.length < 8 ? 8 : array.length < 11 ? 6 : array.length < 20 ? 4 : array.length < 50 ? 3.5 : array.length < 100 ? 3 : array.length < 130 ? 2.5 : 2;
    const margin = `${numMargin}px`;
    const color = numWidth > 20 ? "white" : "transparent";
    const numFont = numWidth > 70 ? 20 : numWidth > 60 ? 18 : numWidth > 50 ? 16 : numWidth > 40 ? 14 : numWidth > 30 ? 12 : numWidth > 20 ? 10 : 8;
    const fontSize = `${numFont}px`

    return (
        <div id="bodyContainer" style={{ width: "100%", height: "80vh", backgroundColor: "transparent", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
            { array.length ? array.map((number, index) => {
                const backgroundColor = currentSwappers.includes(index) ?
                    "rgba(255, 7, 58, 0.8)" : currentBubbleTwo.includes(index) || currentMergeX.includes(index) || currentQuickTwo.includes(index) || currentHeapThree.includes(index) || currentSelectionTwo.includes(index) || currentInsertTwo.includes(index) ?
                        "rgba(0, 123, 255, 0.8)" : pivot === index ?
                            "rgba(237, 234, 59, 0.8)" : spivot === index ?
                                "rgba(237, 234, 59, 0.8)" : currentSorted.includes(index) ?
                                    "rgba(40, 167, 69, 0.8)" : "rgba(108, 117, 125, 0.8)";
                return <div
                    className="arrayElement"
                    key={index}
                    style={{ display: "flex", paddingBottom: "10px", transition: `${speed < 200 ? 0 : 0.1}s`, alignItems: "flex-end", justifyContent: "center", height: `${number / 2.3}%`, width: width, marginLeft: margin, backgroundColor: backgroundColor, color: color, fontSize: fontSize }}>
                    {number}
                </div>
            }) : null
            }
        </div>
    )
}

const mapStateToProps = ({ array, algorithm, currentBubbleTwo, currentMergeX, currentQuickTwo, pivot, currentHeapThree, currentSelectionTwo, currentInsertTwo, spivot, currentSorted, currentSwappers, isRunning, speed }) => ({
    array, algorithm, currentBubbleTwo, currentMergeX, currentQuickTwo, pivot, currentHeapThree, currentSelectionTwo, currentInsertTwo, spivot, currentSorted, currentSwappers, isRunning, speed
})

const mapDispatchToProps = () => dispatch => {

}

export default connect(mapStateToProps, mapDispatchToProps)(SortingVisualizer)
