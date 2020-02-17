import React, { Component } from 'react';
import Node from './Node'
import './Grid.css'
import { visualizeDijkstra as Dijkstra } from '../Dijkstra/DijkstraVisualizer'
import { DFSVisualizer as DFS } from '../Depth First Search/DFSVisualizer'
import { visualizeBFS as BFS } from '../Breadth First Search/BFSVisualizer';
import { visualizeAStar as AStar } from '../A star/AStarVisualizer';
import { visualizeGreadyBFS as GreadyBFS } from '../Gready Best First Search/GreadyBFS';
import { visualizeSwarm as swarm } from '../Swarm/SwarmVisualizer';
import { recursiveDivision as createMaze } from '../../Maze/RecursiveDivision';

class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            mouseIsPress: false,
            selectingStartNode: false,
            selectingFinishNode: false,
            startNode: { row: 10, col: 15 },
            finishNode: { row: 10, col: 40 },
        }
    }

    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({ grid });
        const { startNode, finishNode } = this.state;
        this.props.startNode.row = startNode.row;
        this.props.startNode.col = startNode.col;
        this.props.finishNode.row = finishNode.row;
        this.props.finishNode.col = finishNode.col;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.resetGrid !== this.props.resetGrid) {
            const newGrid = getInitialGrid();
            this.setState({
                grid: newGrid,
                startNode: { row: 10, col: 15 },
                finishNode: { row: 10, col: 40 },
            });
        }
        if (prevProps.clearPath !== this.props.clearPath) {
            const { grid } = this.state;
            grid.map((row) => {
                row.map((node) => {
                    node.distance = Infinity;
                    node.previousNode = null;
                    node.isVisited = false;
                    node.heuristicDistance = Infinity;
                    node.swarmIdx = Infinity;
                    node.fullDistance = Infinity;
                    return;
                })
            })
        }
        if (prevProps.triggerAlgorithm !== this.props.triggerAlgorithm) {
            switch (this.props.algorithm) {
                case 'Dijkstra':
                    this.visualizeDijkstra(this.props.speed);
                    break;
                case 'AStar':
                    this.visualizeAStar(this.props.speed);
                    break;
                case 'Depth First Search':
                    this.visualizeDFS(this.props.speed);
                    break;
                case 'BFS':
                    this.visualizeBFS(this.props.speed);
                    break;
                case 'GreadyBFS':
                    this.visualizeGreadyBFS(this.props.speed);
                    break;
                case 'Swarm':
                    this.visualizeSwarm(this.props.speed);
                    break;
                default:
                    break;
            }
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

    handleMouseDown = (row, col) => {
        const { grid } = this.state
        this.state.mouseIsPress = true;
        if (row === this.state.startNode.row && col === this.state.startNode.col) {
            this.setState({ selectingStartNode: true });
            return
        };
        if (row === this.state.finishNode.row && col === this.state.finishNode.col) {
            this.setState({ selectingFinishNode: true });
            return
        };

        if (this.props.selectingWeight) {
            grid[row][col].isWeight = !this.state.grid[row][col].isWeight;
            if (document.getElementById(`node-${row}-${col}`).className === 'Node node-weight') {
                document.getElementById(`node-${row}-${col}`).className = 'Node'
            } else {
                document.getElementById(`node-${row}-${col}`).className = 'Node node-weight';
            }
            return
        } else {
            grid[row][col].isWall = !this.state.grid[row][col].isWall;
            if (document.getElementById(`node-${row}-${col}`).className === 'Node node-wall') {
                document.getElementById(`node-${row}-${col}`).className = 'Node'
            } else {
                document.getElementById(`node-${row}-${col}`).className = 'Node node-wall';
            }
            return
        }
    }


    handleMouseEnter = (row, col) => {
        const { grid, startNode, finishNode } = this.state
        if (this.state.selectingStartNode) {
            grid[row][col].isStart = true;
            startNode.row = row;
            startNode.col = col;
            this.props.startNode.row = row;
            this.props.startNode.col = col
            document.getElementById(`node-${row}-${col}`).className = 'Node node-start'
            return;
        }
        if (this.state.selectingFinishNode) {
            grid[row][col].isFinish = true;
            finishNode.row = row;
            finishNode.col = col;
            this.props.finishNode.row = row;
            this.props.finishNode.col = col
            document.getElementById(`node-${row}-${col}`).className = 'Node node-finish'
            return;
        }
        if (this.props.selectingWeight && this.state.mouseIsPress) {
            grid[row][col].isWeight = !this.state.grid[row][col].isWeight;
            if (document.getElementById(`node-${row}-${col}`).className === 'Node node-weight') {
                document.getElementById(`node-${row}-${col}`).className = 'Node'
            } else {
                document.getElementById(`node-${row}-${col}`).className = 'Node node-weight';
            }
            return;
        }
        if (this.state.mouseIsPress) {
            grid[row][col].isWall = !this.state.grid[row][col].isWall;
            if (document.getElementById(`node-${row}-${col}`).className === 'Node node-wall') {
                document.getElementById(`node-${row}-${col}`).className = 'Node'
            } else {
                document.getElementById(`node-${row}-${col}`).className = 'Node node-wall';
            }
            return;
        }
    }
    handleMouseLeave = (row, col) => {
        const { grid } = this.state
        if (this.state.selectingStartNode) {
            grid[row][col].isStart = false;
            document.getElementById(`node-${row}-${col}`).className = 'Node'
            return
        }
        if (this.state.selectingFinishNode) {
            grid[row][col].isFinish = false;
            document.getElementById(`node-${row}-${col}`).className = 'Node'
            return
        }
    }
    handleMouseUp = (row, col) => {
        this.state.mouseIsPress = false;
        this.state.selectingStartNode = false;
        this.state.selectingFinishNode = false;
    }

    visualizeDijkstra = (speed) => {
        const { grid, startNode, finishNode } = this.state;
        Dijkstra(grid, startNode, finishNode, speed);
    }
    visualizeDFS = (speed) => {
        const { grid, startNode, finishNode } = this.state;
        DFS(grid, startNode, finishNode, speed);
    }
    visualizeBFS = (speed) => {
        const { grid, startNode, finishNode } = this.state;
        BFS(grid, startNode, finishNode, speed);
    }
    visualizeAStar = (speed) => {
        const { grid, startNode, finishNode } = this.state;
        AStar(grid, startNode, finishNode, speed);
    }
    visualizeGreadyBFS = (speed) => {
        const { grid, startNode, finishNode } = this.state;
        GreadyBFS(grid, startNode, finishNode, speed);
    }
    visualizeSwarm = (speed) => {
        const { grid, startNode, finishNode } = this.state;
        swarm(grid, startNode, finishNode, speed);
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
        const { grid } = this.state;
        return (
            <div className="grid">
                {grid.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx} className="Row">
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
                })
                }
            </div >
        )
    }
}
export default Grid;

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
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
        isStart: row === 10 && col === 15 ? true : false,
        isFinish: row === 10 && col === 40 ? true : false,
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
