import React, {Component} from 'react';
import Node from './Node'
import './Dijkstra.css'
import {dijskstra, getNodesinShortestPathOrder} from './../../algorithms/DijkstraAlgo'

class DijkstraAlgo extends Component {
    constructor(props){
        super(props);
        this.state = {
            grid:[],
            mouseIsPress: false,
            selectingStartNode: false,
            selectingFinishNode: false,
            startNode: {},
            finishNode: {},
        }
    }

    componentDidMount(){
        const grid = getInitialGrid();
        this.setState({grid})
    }

    handleMouseDown=(row,col)=>{
        if(this.state.selectingStartNode){
            this.setState({startNode:{row,col}});
            this.setState({selectingStartNode:false});
            console.log(this.state.startNode);
            return
        };
        if(this.state.selectingFinishNode){
            this.setState({finishNode:{row,col}});
            this.setState({selectingFinishNode:false});
            console.log(this.state.finishNode);
            return
        };
        this.setState({mouseIsPress: true});
        const newGrid = getNewGrid(this.state.grid, row, col);
        this.setState({grid:newGrid});
    }
    handleMouseEnter=(row,col)=>{
        if(this.state.selectingStartNode){
            const newGridwithStartNode = getNewGridWithStartNode(this.state.grid, row,col);
            this.setState({grid: newGridwithStartNode});
            return;
        }
        if(this.state.selectingFinishNode){
            const newGridwithFinishNode = getNewGridWithFinishNode(this.state.grid, row,col);
            this.setState({grid: newGridwithFinishNode});
            return;
        }
        if(this.state.mouseIsPress){
            const newGrid = getNewGrid(this.state.grid, row, col);
            this.setState({grid:newGrid});
        }   
    }
    handleMouseLeave = (row,col)=>{
        if(this.state.selectingStartNode){
            const newGridwithStartNode = getNewGridWithStartNode(this.state.grid, row,col);
            this.setState({grid: newGridwithStartNode});
            return
        }
        if(this.state.selectingFinishNode){
            const newGridwithFinishNode = getNewGridWithFinishNode(this.state.grid, row,col);
            this.setState({grid: newGridwithFinishNode});
        }
    }
    handleMouseUp=(row,col)=>{
        this.setState({mouseIsPress:false});
    }
    
    visualizeDijkstra = ()=>{
        const {grid, startNode, finishNode} = this.state;
        const StartNode = grid[startNode.row][startNode.col];
        const FinishNode = grid[finishNode.row][finishNode.col];
        const visitedNodeInOrder = dijskstra(grid, StartNode, FinishNode);
        const NodesinShortestPathOrder = getNodesinShortestPathOrder(FinishNode);
        this.animateDijkstra(visitedNodeInOrder, NodesinShortestPathOrder);
    }

    animateDijkstra = (visitedNodeInOrder, NodesinShortestPathOrder)=>{
        for(let i =0; i <= visitedNodeInOrder.length; i++){
            if(i===visitedNodeInOrder.length){
                setTimeout(()=>{this.animateShortestPath(NodesinShortestPathOrder)}, 10*i);
                return;
                };
            setTimeout(()=>{
                const node = visitedNodeInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'Node node-visited';
            }, 10*i);
    }}
    animateShortestPath = (NodesinShortestPathOrder)=>{
        for(let i=0; i<NodesinShortestPathOrder.length; i++){
            setTimeout(()=>{
                const node = NodesinShortestPathOrder[i];
                console.log(node);
                document.getElementById(`node-${node.row}-${node.col}`).className = 'Node node-shortest-path'
            }, 10*i);
        }
    }
    setStartNode = ()=>{
        this.setState({selectingStartNode:true});
        this.setState({selectingFinishNode:false});
    }
    setFinishNode = ()=>{
        this.setState({selectingFinishNode:true});
        this.setState({selectingStartNode:false});
    }

    render(){
        const {grid, mouseIsPress} = this.state;
        return(
        <div className="main">
            
            <button type="button" className="btn btn-default" onClick={this.setStartNode}>Select start</button>
            
            <button type="button" className="btn btn-default" onClick={this.setFinishNode}>Select finish</button>

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
                                    onMouseEnter={this.handleMouseEnter}
                                    onMouseDown={this.handleMouseDown}
                                    onMouseUp={this.handleMouseUp}
                                    onMouseLeave={this.handleMouseLeave}
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
        isStart: false,
        isFinish: false,
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
const getNewGridWithStartNode = (grid, row, col)=>{
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node, 
        isStart: !node.isStart
    }
    newGrid[row][col] = newNode;
    return newGrid;
}
const getNewGridWithFinishNode = (grid, row, col)=>{
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node, 
        isFinish: !node.isFinish
    }
    newGrid[row][col] = newNode;
    return newGrid;
}
