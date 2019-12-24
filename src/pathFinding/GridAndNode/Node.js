import React, {Component} from 'react';
import './Node.css'

class Node extends Component {

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
            isVisited
        } = this.props;
        const extraClassName = isFinish ? 'node-finish' : isStart ? 'node-start' : isWall ? 'node-wall' : isVisited ? 'node-visisted' :'';
        return(
        <div 
            className={`Node ${extraClassName}`} 
            onMouseEnter={()=>onMouseEnter(row,col)}
            onMouseDown={()=>onMouseDown(row,col)}
            onMouseUp={()=>onMouseUp(row,col)}
            onMouseLeave={()=>onMouseLeave(row,col)}
            id={`node-${row}-${col}`}>
        </div>
        )
    }
}
export default Node;