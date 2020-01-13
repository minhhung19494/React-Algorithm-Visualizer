import React, { Component } from 'react';
import './SortingVisualize.css';
import { newBubbleSort as bubbleSort } from './Algorithm/BubbleSort';
import { selectionSortAlgo as selectionSort } from './Algorithm/SelectionSort'
import { mergeSortAlgo as mergeSort } from './Algorithm/MergeSort'
import { quickSortAlgo as quickSort } from './Algorithm/QuickSort'
import { heapSortAlgo as heapSort } from './Algorithm/HeapSort'
class sortingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayNumber: [],
            numOfBar: 100
        }
    }
    componentDidMount = () => {
        this.createArray(this.state.numOfBar);
    }
    componentDidUpdate = () => {

    }
    createArray = (numOfBar) => {
        const arr = [];
        for (let i = 0; i < numOfBar; i++) {
            let num = Math.floor(Math.random() * (500 - 10) + 10);
            arr.push(num);
        }
        this.setState({ arrayNumber: arr });
    }

    createRandomArray = () => {
        const {numOfBar} = this.state;
        this.createArray(numOfBar);
        if (numOfBar !== null) {
            for (let i = 0; i < numOfBar; i++) {
                document.getElementById(`bar-${i}`).className = 'barChart';
            }
        }
    }
    visualizeBubbleSort = () => {
        const { arrayNumber } = this.state;
        var animateArr = bubbleSort([...arrayNumber]);
        let j = 0;
        let tmp = arrayNumber.length - 1
        for (let i = 0; i < animateArr.length; i++) {
            if (i !== 0 && i % (tmp) === 0) {
                j++;
                tmp = tmp + arrayNumber.length - j;
                console.log(animateArr[i][0], i)
                setTimeout(() => {
                    document.getElementById(`bar-${animateArr[i][0]}`).className = 'barChart finished';
                }, 20 * i)
            } else {
                setTimeout(() => {
                    document.getElementById(`bar-${animateArr[i][0]}`).className = 'barChart compare';
                    document.getElementById(`bar-${animateArr[i][1]}`).className = 'barChart compare';
                    this.setState({ arrayNumber: animateArr[i][2] })
                }, 20 * i);
                setTimeout(() => {
                    document.getElementById(`bar-${animateArr[i][0]}`).className = 'barChart';
                    document.getElementById(`bar-${animateArr[i][1]}`).className = 'barChart';
                }, 20 * i + 10)
            }
        }
    }
    visualizeSelectionSort = () => {
        const { arrayNumber } = this.state;
        var animateArr = selectionSort([...arrayNumber]);
        console.log(animateArr);
        for (let i = 0; i < animateArr.length; i++) {
            if (animateArr[i].state === 'done') {
                setTimeout(() => {
                    document.getElementById(`bar-${animateArr[i].barDone}`).className = 'barChart finished';
                    this.setState({ arrayNumber: animateArr[i].newArray })
                }, 20 * i)
            } else {
                setTimeout(() => {
                    document.getElementById(`bar-${animateArr[i].barCompare[0]}`).className = 'barChart compare';
                    document.getElementById(`bar-${animateArr[i].barCompare[1]}`).className = 'barChart compare';

                }, 20 * i);
                setTimeout(() => {
                    document.getElementById(`bar-${animateArr[i].barCompare[0]}`).className = 'barChart';
                    document.getElementById(`bar-${animateArr[i].barCompare[1]}`).className = 'barChart';
                }, 20 * i + 20)
            }
        }
    }
    visualizeMergeSort = () => {
        const { arrayNumber } = this.state;
        var animateArr = mergeSort([...arrayNumber]);
        console.log(animateArr);
        for (let i = 0; i < animateArr.length; i++) {
            setTimeout(() => {
                document.getElementById(`bar-${animateArr[i].barCompare[0]}`).className = 'barChart compare';
                document.getElementById(`bar-${animateArr[i].barCompare[1]}`).className = 'barChart compare';
                this.setState({ arrayNumber: animateArr[i].newArray })
            }, 20 * i);
            setTimeout(() => {
                document.getElementById(`bar-${animateArr[i].barCompare[0]}`).className = 'barChart';
                document.getElementById(`bar-${animateArr[i].barCompare[1]}`).className = 'barChart';
            }, 20 * i + 20)
        }
    }
    visualizeQuickSort = () => {
        const { arrayNumber } = this.state;
        const animateArr = quickSort([...arrayNumber]);
        for (let i = 0; i < animateArr.length; i++) {
            setTimeout(() => {
                if (animateArr[i].state === 'partionning') {
                    document.getElementById(`bar-${animateArr[i].runningPoint}`).className = 'barChart compare';
                    document.getElementById(`bar-${animateArr[i].pivotPoint}`).className = 'barChart pivot';
                    document.getElementById(`bar-${animateArr[i].comparePoint}`).className = 'barChart compare';
                    this.setState({ arrayNumber: animateArr[i].newArray });
                } else if (animateArr[i].state === 'partioned') {
                    document.getElementById(`bar-${animateArr[i].pivotPoint}`).className = 'barChart finished'
                }
                else if (animateArr[i].state === 'finish') {
                    document.getElementById(`bar-${animateArr[i].finishPoint}`).className = 'barChart finished'
                }
            }, 20 * i);
            setTimeout(() => {
                if (animateArr[i].state === 'partionning') {
                    document.getElementById(`bar-${animateArr[i].runningPoint}`).className = 'barChart';
                    document.getElementById(`bar-${animateArr[i].comparePoint}`).className = 'barChart';
                    this.setState({ arrayNumber: animateArr[i].newArray });
                }
            }, 20 * i + 20);

        }
    }
    visualizeHeapSort = () => {
        const { arrayNumber } = this.state;
        const animateArr = heapSort([...arrayNumber]);
        console.log(animateArr);
        for (let i = 0; i < animateArr.length; i++) {
            setTimeout(() => {
                if (animateArr[i].state === 'finish') {
                    document.getElementById(`bar-${animateArr[i].finish}`).className = 'barChart finished';
                    this.setState({ arrayNumber: animateArr[i].newArray });
                } else if (animateArr[i].state === 'heapify') {
                    console.log(animateArr[i].largestPoint);
                    document.getElementById(`bar-${animateArr[i].largestPoint}`).className = 'barChart pivot';
                    document.getElementById(`bar-${animateArr[i].comparePoint[0]}`).className = 'barChart compare';
                    document.getElementById(`bar-${animateArr[i].comparePoint[1]}`).className = 'barChart compare';
                    this.setState({ arrayNumber: animateArr[i].newArray });
                    setTimeout(() => {
                        document.getElementById(`bar-${animateArr[i].largestPoint}`).className = 'barChart';
                        document.getElementById(`bar-${animateArr[i].comparePoint[0]}`).className = 'barChart';
                        document.getElementById(`bar-${animateArr[i].comparePoint[1]}`).className = 'barChart';
                    }, 160)
                }
            }, 200 * i);
        }
    }
    setNumOfBar = (e) => {
        this.setState({ numOfBar: e.target.value > 250 ? 250 : e.target.value });
        this.createArray(e.target.value > 250 ? 250 : e.target.value);
    }
    render() {

        const { arrayNumber, numOfBar } = this.state;

        return (
            <div className="SortingVisualizer">
                <div>
                    <button onClick={this.createRandomArray}>Create random bar</button>
                    <button onClick={this.visualizeBubbleSort}>Bubble Sort</button>
                    <button onClick={this.visualizeSelectionSort}>Selection Sort</button>
                    <button onClick={this.visualizeMergeSort}>MergeSort</button>
                    <button onClick={this.visualizeQuickSort}>QuickSort</button>
                    <button onClick={this.visualizeHeapSort}>HeapSort</button>
                    <label>Please insert number of array
                        <input className="text" name="numOfBar" onChange={this.setNumOfBar} value={numOfBar} />
                    </label>
                </div>
                <div className="listBarChart" style={{ width: 1500, height: 500 }}>
                    {arrayNumber.map((bar, barIdx) => {
                        return (
                            <div key={barIdx} id={`bar-${barIdx}`} className="barChart" style={{ width: (1500 / numOfBar), height: bar, }}></div>
                        )
                    })
                    }
                </div>
            </div>
        );
    };
}
export default sortingVisualizer;

