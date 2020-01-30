import React, {Component} from 'react';
import './Node.css'

class Node extends Component {
    constructor(props){
        super(props);
        this.state = {
            row: this.props.row,
            col: this.props.col
        }
    }
    handleMouseDown = (e)=>{
        const { row, col} = this.state;
        this.props.onMouseDown(row,col);
    }
    hanldeMouseEnter = (e)=>{
        const {row, col} = this.state;
        this.props.onMouseEnter(row,col);
    }
    handleMouseLeave = (e)=>{
        
    }

    render(){
        const {
            row,
            col,
            isStart,
            isFinish,
            isWall,
            onMouseEnter,
            onMouseLeave,
            onMouseUp,
            onMouseDown,
            isVisited,
            isWeight
        } = this.props;
        const extraClassName = isFinish ? 'node-finish' : isStart ? 'node-start' : isWall ? 'node-wall' : isVisited ? 'node-visisted' : isWeight ? 'node-weight':'';
        return(
        <div 
            className={`Node ${extraClassName}`} 
            onMouseEnter={this.hanldeMouseEnter}
            onMouseDown={this.handleMouseDown}
            onMouseUp={()=>onMouseUp(row,col)}
            onMouseLeave={this.handleMouseLeave}
            id={`node-${row}-${col}`}>
        </div>
        )
    }
}
export default Node;