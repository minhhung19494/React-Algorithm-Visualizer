import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './SortingVisualize.css';
import { newBubbleSort as bubbleSort } from './Algorithm/BubbleSort';

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
        console.log(animateArr);
        let j = 0;
        let tmp = arrayNumber.length - 1
        for (let i = 0; i < animateArr.length; i++) {
            if (i !== 0 && i % (tmp) === 0) {
                j++;
                tmp = tmp + arrayNumber.length - j;
                console.log(animateArr[i][0],i)
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

    render() {

        const { arrayNumber } = this.state;

        return (
            <div className="SortingVisualizer">
                <div>
                    <button onClick={this.createRandomArray}>Create random bar</button>
                    <button onClick={this.visualizeBubbleSort}>Sort</button>
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

