import React, { Component } from 'react';
import './SortingVisualize.css';
import { Link } from 'react-router-dom'
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
            noBarCache: null,
            numOfBar: 50,
            algorithmName: null,
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

    createRandomArray = (e) => {
        e.preventDefault()
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

                }, speed * i);
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

    selectAlgo = (e) => {
        e.preventDefault();
        this.setState({ sortingAlgorithm: e.target.name });
        this.setState({algorithmName: e.target.text})
    }
    startSorting = (e) => {
        e.preventDefault();
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
    selectSpeed = (e) => {
        e.preventDefault()
        const { name } = e.target
        switch (name) {
            case 'fast':
                this.setState({ speed: 30 });
                break;
            case 'medium':
                this.setState({ speed: 60 });
                break;
            case 'slow':
                this.setState({ speed: 100 });
                break;
        }
    }
    handleOnChange = (e) => {
        this.setState({ noBarCache: e.target.value })
    }
    setNumOfBar = (e) => {
        e.preventDefault();
        const { noBarCache } = this.state
        if (noBarCache == null || noBarCache == 0) {
            alert("Please insert number of Bar !")
            return
        }
        this.setState({ numOfBar: noBarCache });
        this.createArray(noBarCache);
    }
    render() {

        const { arrayNumber, numOfBar,algorithmName} = this.state;
        return (
            <div className="SortingVisualizer">
                <div className="navbar">
                    <Link className="navbar-brand" to='/'>Home</Link>
                    <Link className="navbar-brand" to="/PathFinding">PathFinding Visualizer</Link>
                    <ul className="nav nav-pill nav-justified">
                        <li className="nav-item dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="#">Algorithms<span className="caret"></span></a>
                            <ul className="dropdown-menu" id="AlgorithmList">
                                <li><a className="dropdown-item" onClick={this.selectAlgo} name="BubbleSort" href="#">Bubble Sort</a></li>
                                <li><a className="dropdown-item" onClick={this.selectAlgo} name="SelectionSort" href="#">Selection Sort</a></li>
                                <li><a className="dropdown-item" onClick={this.selectAlgo} name="HeapSort" href="#">Heap Sort</a></li>
                                <li><a className="dropdown-item" onClick={this.selectAlgo} name="MergeSort" href="#">Merge Sort</a></li>
                                <li><a className="dropdown-item" onClick={this.selectAlgo} name="QuickSort" href="#">Quick Sort</a></li>
                            </ul>
                        </li>
                        <li className="nav-item main-btn" >
                            <a onClick={this.startSorting} href="#">{algorithmName !=null ? algorithmName: "Please select algorithm"}</a>
                        </li>
                        <li className="nav-item">
                            <a className="dropdow-toggle" data-toggle="dropdown" href="#">Speed <span className="caret"></span></a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdow-item" onClick={this.selectSpeed} name='fast' href="#">Fast</a></li>
                                <li><a className="dropdow-item" onClick={this.selectSpeed} name='medium' href="#">Medium</a></li>
                                <li><a className="dropdow-item" onClick={this.selectSpeed} name='slow' href="#">Slow</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a onClick={this.createRandomArray} href="#">Create Random Array</a>
                        </li>
                        <li className="nav-item">
                            <form onSubmit={this.setNumOfBar} className="navbar-form navbar-left" role="search">
                                <div className="form-group">
                                    <input className="form-control" type="text" placeholder="Number of Bars" name="numOfBar" onChange={this.handleOnChange} />
                                </div>
                                <button type="submit" className="btn btn-default ml-5"> Send!</button>
                            </form>
                        </li>
                    </ul>
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

