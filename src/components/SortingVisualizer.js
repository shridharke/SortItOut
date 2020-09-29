import React from 'react'
import { connect } from 'react-redux'

export const SortingVisualizer = ({ array, algorithm, currentBubbleTwo, currentSorted, currentSwappers, isRunning }) => {

    const numWidth = Math.floor(window.innerWidth / (array.length * 1.5));
    const width = `${numWidth}px`;
    const numMargin = array.length < 5 ?
        10 : array.length < 8 ?
            8 : array.length < 11 ?
                6 : array.length < 20 ?
                    4 : array.length < 50 ?
                        3.5 : array.length < 100 ?
                            3 : array.length < 130 ?
                                2.5 : 2;
    const margin = `${numMargin}px`;
    const color = numWidth > 20 ? "white" : "transparent";
    const numFont = numWidth > 70 ?
        20 : numWidth > 60 ?
            18 : numWidth > 50 ?
                16 : numWidth > 40 ?
                    14 : numWidth > 30 ?
                        12 : numWidth > 20 ?
                            10 : 8;
    const fontSize = `${numFont}px`

    return (
        <div id="bodyContainer" style={{ width: "100%", height: "80vh", backgroundColor: "transparent", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
            { array.length ? array.map((number, index) => {
                const backgroundColor = currentSwappers.includes(index) ?
                    "rgba(255, 7, 58, 0.6)" : currentBubbleTwo.includes(index) ?
                        "rgba(0, 123, 255, 0.6)" : currentSorted.includes(index) ?
                            "rgba(40, 167, 69, 0.6)" : "rgba(108, 117, 125, 0.6)";
                return <div
                    className="arrayElement"
                    key={index}
                    style={{ display: "flex", paddingBottom: "10px", transition: "0.1s", borderRadius: "5px 5px 0px 0px", alignItems: "flex-end", justifyContent: "center", height: `${number / 2.3}%`, width: width, marginLeft: margin, backgroundColor: backgroundColor, color: color, fontSize: fontSize }}>
                    {number}
                </div>
            }) : null
            }
        </div>
    )
}

const mapStateToProps = ({ array, algorithm, currentBubbleTwo, currentSorted, currentSwappers, isRunning }) => ({
    array, algorithm, currentBubbleTwo, currentSorted, currentSwappers, isRunning
})

const mapDispatchToProps = () => dispatch => {

}

export default connect(mapStateToProps, mapDispatchToProps)(SortingVisualizer)
