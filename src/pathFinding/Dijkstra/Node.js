import React, {Component} from 'react';
import './Node.css'

class Node extends Component {

    render(){
        const {
            col,
            isStart,
            isFinish,
        } = this.props;
        const extraClassName = isFinish ? 'node-finish' : isStart ? 'node-start' : '';
        return(
        <div className={`Node ${extraClassName}`}>
        </div>
        )
    }
}
export default Node;