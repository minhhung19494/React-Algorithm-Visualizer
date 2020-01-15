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
            numOfBar: 100,
            sortingAlgorithm: null,
            speed: 60
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
        const { numOfBar } = this.state;
        this.createArray(numOfBar);
        if (numOfBar !== null) {
            for (let i = 0; i < numOfBar; i++) {
                document.getElementById(`bar-${i}`).className = 'barChart';
            }
        }
    }
    visualizeBubbleSort = () => {
        const { arrayNumber, speed } = this.state;
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
                }, speed * i)
            } else {
                setTimeout(() => {
                    document.getElementById(`bar-${animateArr[i][0]}`).className = 'barChart compare';
                    document.getElementById(`bar-${animateArr[i][1]}`).className = 'barChart compare';
                    this.setState({ arrayNumber: animateArr[i][2] })
                }, speed * i);
                setTimeout(() => {
                    document.getElementById(`bar-${animateArr[i][0]}`).className = 'barChart';
                    document.getElementById(`bar-${animateArr[i][1]}`).className = 'barChart';
                }, speed * i + speed * 0.8)
            }
        }
    }
    visualizeSelectionSort = () => {
        const { arrayNumber, speed } = this.state;
        var animateArr = selectionSort([...arrayNumber]);
        console.log(animateArr);
        for (let i = 0; i < animateArr.length; i++) {
            if (animateArr[i].state === 'done') {
                setTimeout(() => {
                    document.getElementById(`bar-${animateArr[i].barDone}`).className = 'barChart finished';
                    this.setState({ arrayNumber: animateArr[i].newArray })
                }, speed * i)
            } else {
                setTimeout(() => {
                    document.getElementById(`bar-${animateArr[i].barCompare[0]}`).className = 'barChart compare';
                    document.getElementById(`bar-${animateArr[i].barCompare[1]}`).className = 'barChart compare';

                }, 20 * i);
                setTimeout(() => {
                    document.getElementById(`bar-${animateArr[i].barCompare[0]}`).className = 'barChart';
                    document.getElementById(`bar-${animateArr[i].barCompare[1]}`).className = 'barChart';
                }, speed * i + speed * 0.8)
            }
        }
    }
    visualizeMergeSort = () => {
        const { arrayNumber, speed } = this.state;
        var animateArr = mergeSort([...arrayNumber]);
        for (let i = 0; i < animateArr.length; i++) {
            setTimeout(() => {
                document.getElementById(`bar-${animateArr[i].barCompare[0]}`).className = 'barChart compare';
                document.getElementById(`bar-${animateArr[i].barCompare[1]}`).className = 'barChart compare';
                this.setState({ arrayNumber: animateArr[i].newArray })
            }, speed * i);
            setTimeout(() => {
                document.getElementById(`bar-${animateArr[i].barCompare[0]}`).className = 'barChart';
                document.getElementById(`bar-${animateArr[i].barCompare[1]}`).className = 'barChart';
            }, speed * i + speed * 0.8)
        }
    }
    visualizeQuickSort = () => {
        const { arrayNumber, speed } = this.state;
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
            }, speed * i);
            setTimeout(() => {
                if (animateArr[i].state === 'partionning') {
                    document.getElementById(`bar-${animateArr[i].runningPoint}`).className = 'barChart';
                    document.getElementById(`bar-${animateArr[i].comparePoint}`).className = 'barChart';
                    this.setState({ arrayNumber: animateArr[i].newArray });
                }
            }, speed * i + speed * 0.8);

        }
    }
    visualizeHeapSort = () => {
        const { arrayNumber, speed } = this.state;
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
                    }, speed * 0.8)
                }
            }, speed * i);
        }
    }
    setNumOfBar = (e) => {
        let numBar = e.target.value;
        if (numBar === null || numBar <= 10) {
            this.setState({ numOfBar: 10 });
            numBar = 10;
        } else {
            this.setState({ numOfBar: numBar > 250 ? 250 : numBar });
            numBar = numBar > 250 ? 250 : numBar;
        }
        this.createArray(numBar);
    }
    selectAlgo = (e) => {
        this.setState({ sortingAlgorithm: e.target.name });
    }
    startSorting = () => {
        const { sortingAlgorithm } = this.state;
        switch (sortingAlgorithm) {
            case 'QuickSort':
                this.visualizeQuickSort();
                break;
            case 'BubbleSort':
                this.visualizeBubbleSort();
                break;
            case 'SelectionSort':
                this.visualizeSelectionSort();
                break;
            case 'HeapSort':
                this.visualizeHeapSort();
                break;
            case 'MergeSort':
                this.visualizeMergeSort();
                break;
            default:
                alert('Please select Algorithm');
        }
    }
    selectSpeed = (speed) => {
        this.setState({ speed: speed })
    }
    render() {

        const { arrayNumber, numOfBar } = this.state;

        return (
            <div className="SortingVisualizer">
                <div className="navbar">
                    <a className="navbar-brand" href="/">Home</a>
                    <a className="navbar-brand" href="/SortingVisualizer">Sorting Visualizer</a>
                    <ul className="nav navbar-nav">
                        <li className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="#">Algorithms</a>
                            <ul className="dropdown-menu" id="AlgorithmList">
                                <li className="navbar-nav">
                                    <a onClick={this.selectAlgo} href="#" name="BubbleSort">Bubble Sort</a>
                                </li>
                                <li className="navbar-nav">
                                    <a onClick={this.selectAlgo} name="SelectionSort" href="#">Selection Sort</a>
                                </li>
                                <li className="navbar-nav">
                                    <a onClick={this.selectAlgo} name="HeapSort" href="#">Heap Sort</a>
                                </li>
                                <li className="navbar-nav">
                                    <a onClick={this.selectAlgo} name="MergeSort" href="#">Merge Sort</a>
                                </li>
                                <li className="navbar-nav">
                                    <a onClick={this.selectAlgo} name="QuickSort" href="#">Quick Sort</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a className="navbar-brand" onClick={this.startSorting} href="#">Sort</a>
                        </li>
                        <li>
                            <a className="dropdow-toggle" data-toggle="dropdown" href="#">Speed</a>
                            <ul className="dropdown-menu">
                                <li>
                                    <a onClick={() => { this.selectSpeed(30) }} href="#">Fast</a>
                                </li>
                                <li>
                                    <a onClick={() => { this.selectSpeed(60) }} href="#">Medium</a>
                                </li>
                                <li>
                                    <a onClick={() => { this.selectSpeed(100) }} href="#">Slow</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a onClick={this.createRandomArray} href="#">Create Random Array</a>
                        </li>
                    </ul>
                </div>

                <div>
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

