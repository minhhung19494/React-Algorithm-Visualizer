import React, { Component } from 'react';
import './SortingVisualize.css';
import { newBubbleSort as bubbleSort } from './Algorithm/BubbleSort';
import { selectionSortAlgo as selectionSort } from './Algorithm/SelectionSort'
import { mergeSortAlgo as mergeSort } from './Algorithm/MergeSort'

class sortingVisualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayNumber: []
        }
    }
    componentDidMount = () => {
        this.createRandomArray();
    }

    createRandomArray = () => {
        const arr = [];
        for (let i = 0; i < 100; i++) {
            let num = Math.floor(Math.random() * (500 - 10) + 10);
            arr.push(num);
        }
        this.setState({ arrayNumber: arr });

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
            }, 100 * i);
            setTimeout(() => {
                document.getElementById(`bar-${animateArr[i].barCompare[0]}`).className = 'barChart';
                document.getElementById(`bar-${animateArr[i].barCompare[1]}`).className = 'barChart';
            }, 100 * i + 100)
        }
    }

    render() {

        const { arrayNumber } = this.state;

        return (
            <div className="SortingVisualizer">
                <div>
                    <button onClick={this.createRandomArray}>Create random bar</button>
                    <button onClick={this.visualizeBubbleSort}>Bubble Sort</button>
                    <button onClick={this.visualizeSelectionSort}>Selection Sort</button>
                    <button onClick={this.visualizeMergeSort}>MergeSort</button>
                </div>
                <div className="listBarChart">
                    {arrayNumber.map((bar, barIdx) => {
                        return (
                            <div key={barIdx} id={`bar-${barIdx}`} className="barChart" style={{ width: 10, height: bar, }}></div>

                        )
                    })
                    }
                </div>
            </div>
        );
    };
}
export default sortingVisualizer;

