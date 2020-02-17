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
            isWeight,
        } = this.props;
        const extraClassName = isFinish ? 'node-finish' : isStart ? 'node-start' : isWall ? 'node-wall' : isVisited ? 'node-visisted' : isWeight ? 'node-weight':'';
        return(
        <div 
            className={`Node ${extraClassName}`} 
            onMouseEnter={()=>onMouseEnter(row,col)}
            onMouseDown={()=>onMouseDown(row,col)}
            onMouseUp={()=>onMouseUp(row,col)}
            onMouseLeave={()=>onMouseLeave(row,col)}
            id={`node-${row}-${col}`}
            style={{width:(window.innerWidth-100)/50, height:(window.innerHeight-100)/20}}>
        </div>
        )
    }
}
export default Node;