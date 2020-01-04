import React, { Component } from 'react';
import Node from './Node'
import './Grid.css'
import { visualizeDijkstra as Dijkstra } from './../Dijkstra/DijkstraVisualizer'
import { DFSVisualizer as DFS } from './../Depth First Search/DFSVisualizer'
import { visualizeBFS as BFS } from './../Breadth First Search/BFSVisualizer';
import { visualizeAStar as AStar } from './../A star/AStarVisualizer';
import { visualizeGreadyBFS as GreadyBFS } from './../Gready Best First Search/GreadyBFS';
import { visualizeSwarm as swarm } from './../Swarm/SwarmVisualizer';
import { recursiveDivision as createMaze } from '../../Maze/RecursiveDivision';
class DijkstraAlgo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            mouseIsPress: false,
            selectingWeight: false,
            selectingStartNode: false,
            selectingFinishNode: false,
            startNode: {},
            finishNode: {},
            ctrIsPress: false,
        }
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({ grid })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.triggerAlgorithm !== this.props.triggerAlgorithm) {
            console.log('hasChange');
            if (this.props.triggerAlgorithm) {
                switch (this.props.algorithm) {
                    case 'Dijkstra':
                        this.visualizeDijkstra();
                        break;
                    case 'A star':
                        this.visualizeAStar();
                        break;
                    case 'Depth First Search':
                        this.visualizeDFS();
                        break;
                    case 'Breadth First Search':
                        this.visualizeBFS();
                        break;
                    case 'Gready Best First Search':
                        this.visualizeGreadyBFS();
                        break;
                    case 'Swarm':
                        this.visualizeSwarm();
                        break;
                    default:
                        break;
                }
            }
        }
        if (prevProps.resetGrid !== this.props.resetGrid) {
            const { grid } = this.state;
            const newGrid = grid.slice();
            newGrid.forEach(row => {
                row.forEach(node => {
                    node.isVisited = false;
                    node.previousNode = null;
                    node.isWall = false;
                    node.isWeight = false;
                    node.distance = Infinity;
                    node.heuristicDistance = Infinity;
                    node.fullDistance = Infinity
                })
            });
            this.setState({ grid: newGrid });
        }
    }

    setStartNode = () => {
        this.setState({ selectingStartNode: true });
        this.setState({ selectingFinishNode: false });
    }
    setFinishNode = () => {
        this.setState({ selectingFinishNode: true });
        this.setState({ selectingStartNode: false });
    }

    selectWeight = () => {
        this.setState({ selectingWeight: !this.state.selectingWeight });
        console.log(this.state.selectingWeight);
    }
    // selectWeight = () => {
    //     window.onkeydown = (e) => {
    //         if (e.keyCode === 87) {
    //             this.setState({ selectingWeight: true });
    //         };
    //     }
    //     window.onkeyup = (e) => {
    //         this.setState({ selectWeight: false });
    //     }
    // }

    handleMouseDown = (row, col) => {
        if (this.state.selectingStartNode) {
            this.setState({ startNode: { row, col } });
            this.setState({ selectingStartNode: false });
            return
        };
        if (this.state.selectingFinishNode) {
            this.setState({ finishNode: { row, col } });
            this.setState({ selectingFinishNode: false });
            return
        };
        this.setState({ mouseIsPress: true });

        if (this.state.selectingWeight) {
            const newGridwithWeight = getNewGridWithWeight(this.state.grid, row, col);
            this.setState({ grid: newGridwithWeight });
            return
        }
        const newGrid = getNewGrid(this.state.grid, row, col);
        this.setState({ grid: newGrid });
    }


    handleMouseEnter = (row, col) => {
        if (this.state.selectingStartNode) {
            const newGridwithStartNode = getNewGridWithStartNode(this.state.grid, row, col);
            this.setState({ grid: newGridwithStartNode });
            return;
        }
        if (this.state.selectingFinishNode) {
            const newGridwithFinishNode = getNewGridWithFinishNode(this.state.grid, row, col);
            this.setState({ grid: newGridwithFinishNode });
            return;
        }
        if (this.state.selectingWeight && this.state.mouseIsPress) {
            const newGridwithWeight = getNewGridWithWeight(this.state.grid, row, col);
            this.setState({ grid: newGridwithWeight });
            return
        }
        if (this.state.mouseIsPress) {
            this.state.grid[row][col].isWall = !this.state.grid[row][col].isWall;
            if (document.getElementById(`node-${row}-${col}`).className == 'Node node-wall') {
                document.getElementById(`node-${row}-${col}`).className = 'Node'
            } else {
                document.getElementById(`node-${row}-${col}`).className = 'Node node-wall';
                // const newGrid = getNewGrid(this.state.grid, row, col);
                // this.setState({ grid: newGrid });
            }
        }
    }
    handleMouseLeave = (row, col) => {
        if (this.state.selectingStartNode) {
            const newGridwithStartNode = getNewGridWithStartNode(this.state.grid, row, col);
            this.setState({ grid: newGridwithStartNode });
            return
        }
        if (this.state.selectingFinishNode) {
            const newGridwithFinishNode = getNewGridWithFinishNode(this.state.grid, row, col);
            this.setState({ grid: newGridwithFinishNode });
        }
    }
    handleMouseUp = (row, col) => {
        this.setState({ mouseIsPress: false });
    }

    visualizeDijkstra = () => {
        const { grid, startNode, finishNode } = this.state;
        Dijkstra(grid, startNode, finishNode);
        console.log(this.state.grid);
    }
    visualizeDFS = () => {
        const { grid, startNode, finishNode } = this.state;
        DFS(grid, startNode, finishNode);
    }
    visualizeBFS = () => {
        const { grid, startNode, finishNode } = this.state;
        BFS(grid, startNode, finishNode);
    }
    visualizeAStar = () => {
        const { grid, startNode, finishNode } = this.state;
        AStar(grid, startNode, finishNode);
    }
    visualizeGreadyBFS = () => {
        const { grid, startNode, finishNode } = this.state;
        GreadyBFS(grid, startNode, finishNode);
    }
    visualizeSwarm = () => {
        const { grid, startNode, finishNode } = this.state;
        swarm(grid, startNode, finishNode);
    }
    visualizeMaze = () => {
        const { grid, startNode, finishNode } = this.state;
        const wallInOrder = [...createMaze(grid, startNode, finishNode)];
        for (let i = 0; i < wallInOrder.length; i++) {
            setTimeout(() => {
                const node = wallInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'Node node-wall';
            }, 50 * i)
        };
    }
    render() {
        const { grid, mouseIsPress } = this.state;
        return (
            <div className="main">

                <button type="button" className="btn btn-default" onClick={this.setStartNode}>Select start</button>
                <button type="button" className="btn btn-default" onClick={this.setFinishNode}>Select finish</button>
                <button type="button" className="btn btn-default" onClick={this.selectWeight}>Select Weight</button>
                <button type="button" className="btn btn-default" onClick={this.visualizeMaze}>Create Maze</button>
                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const { row, col, isFinish, isStart, isWall, isWeight } = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            row={row}
                                            col={col}
                                            isFinish={isFinish}
                                            isStart={isStart}
                                            isWall={isWall}
                                            isWeight={isWeight}
                                            onClick={this.onClick}
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

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row <= 20; row++) {
        const currentRow = [];
        for (let col = 0; col <= 50; col++) {
            currentRow.push(createNode(row, col));
        };
        grid.push(currentRow);
    };
    return grid;
}

const createNode = (row, col) => {
    return {
        row,
        col,
        isStart: false,
        isFinish: false,
        isWall: false,
        distance: Infinity,
        previousNode: null,
        isVisited: false,
        isWeight: false,
        heuristicDistance: Infinity,
        swarmIdx: Infinity,
        fullDistance: Infinity,
    }
}
const getNewGrid = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall
    }
    newGrid[row][col].isWall = true;
    return newGrid;
}
const getNewGridWithStartNode = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isStart: !node.isStart
    }
    newGrid[row][col] = newNode;
    return newGrid;
}
const getNewGridWithFinishNode = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isFinish: !node.isFinish
    }
    newGrid[row][col] = newNode;
    return newGrid;
}
const getNewGridWithWeight = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWeight: !node.isWeight
    }
    newGrid[row][col] = newNode;
    return newGrid;
}
