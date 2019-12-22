import React, {Component} from 'react';
import Node from './Node'
import './Dijkstra.css'
import {dijskstra, getNodesinShortestPathOrder} from './../../algorithms/DijkstraAlgo'

const START_NODE_ROW = 10;
const START_NODE_COL = 25;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

class DijkstraAlgo extends Component {
    constructor(props){
        super(props);
        this.state = {
            grid:[],
            mouseIsPress: false
        }
    }

    componentDidMount(){
        const grid = getInitialGrid();
        this.setState({grid})
    }
    resetGrid = ()=>{
        const initialGrid = getInitialGrid();
        this.setState({grid:initialGrid});
    }

    onMouseDown=(row,col)=>{
        this.setState({mouseIsPress: true});
        const newGrid = getNewGrid(this.state.grid, row, col);
        this.setState({grid:newGrid});
    }
    onMouseEnter=(row,col)=>{
        if(this.state.mouseIsPress){
            const newGrid = getNewGrid(this.state.grid, row, col);
            this.setState({grid:newGrid})
        }
    }
    onMouseUp=()=>{
        this.setState({mouseIsPress:false});
    }
    
    visualizeDijkstra = ()=>{
        const {grid} = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodeInOrder = dijskstra(grid, startNode, finishNode);
        const NodesinShortestPathOrder = getNodesinShortestPathOrder(finishNode);
        console.log (visitedNodeInOrder);
        this.animateDijkstra(visitedNodeInOrder, NodesinShortestPathOrder);
    }

    animateDijkstra = (visitedNodeInOrder)=>{
        for(let i =0; i <= visitedNodeInOrder.length; i++){
            if(i===visitedNodeInOrder.length){
                setTimeout(()=>{
                });
                return;
            };
            setTimeout(()=>{
                const node = visitedNodeInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'Node node-visited';
            }, 10*i);
        }
    }

    render(){
        const {grid, mouseIsPress} = this.state;
        return(
        <div className="main">
            
            <button type="button" className="btn btn-default" onClick={this.visualizeDijkstra}>Visualize Dijkstra</button>
            
            <button type="button" className="btn btn-default" onClick={this.resetGrid}>ResetGrid</button>
            <div className="grid">
                {grid.map((row, rowIdx)=>{
                    return(
                    <div key={rowIdx}>
                        {row.map((node, nodeIdx)=>{
                            const{row, col, isFinish, isStart, isWall} = node;
                            return(
                                <Node
                                    key={nodeIdx}
                                    row={row} 
                                    col={col}
                                    isFinish={isFinish}
                                    isStart={isStart}
                                    isWall={isWall}
                                    onClick = {this.onClick}
                                    mouseIsPress={mouseIsPress}
                                    onMouseEnter={this.onMouseEnter}
                                    onMouseDown={this.onMouseDown}
                                    onMouseUp={this.onMouseUp}
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
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        isWall: false,
        distance: Infinity,
        previousNode: null,
        isVisited: false
    }
}
const getNewGrid = (grid, row, col)=>{
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node, 
        isWall: !node.isWall
    }
    newGrid[row][col] = newNode;
    return newGrid;
}
