import React, {Component} from 'react';
import Node from './Node'
import './Dijkstra.css'

const START_NODE_ROW = 10;
const START_NODE_COL = 25;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

class DijkstraAlgo extends Component {
    constructor(props){
        super(props);
        this.state = {
            grid:[]
        }
    }

    componentDidMount(){
        const grid = getInitialGrid();
        this.setState({grid})
    }



    render(){
        const {grid} = this.state;
        return(
        <div className="main">
            <div className="grid">
                {grid.map((row, rowIdx)=>{
                    return(
                    <div key={rowIdx}>
                        {row.map((node, nodeIdx)=>{
                            const{row, col, isFinish, isStart} = node;
                            return(
                                <Node
                                    key={nodeIdx} 
                                    col={col}
                                    isFinish={isFinish}
                                    isStart={isStart}
                                ></Node>
                                );
                            })
                        }
                    </div>
                    );
                })}
            </div>
        </div>        
        )
    }
}
export default DijkstraAlgo;

const getInitialGrid = ()=>{
    const grid =[];
    for(let row = 0; row<=20; row++){
        const currentRow = [];
        for(let col = 0 ; col<=50; col ++){
            currentRow.push(createNode(row,col));
        };
        grid.push(currentRow);
    };
    return grid;
}

const createNode = (row, col)=>{
    return {
        row,
        col,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL
    }
}