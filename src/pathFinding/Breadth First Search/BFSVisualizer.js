import {BFSAlgo, getNodesinShortestPathOrder} from '../../algorithms/BFSAlgo'

export function visualizeBFS(grid, startNode, finishNode, speed){
    const StartNode = grid[startNode.row][startNode.col];
    const FinishNode = grid[finishNode.row][finishNode.col];
    const visitedNodeInOrder = BFSAlgo(grid, StartNode, FinishNode);
    const NodesinShortestPathOrder = getNodesinShortestPathOrder(FinishNode);
    animateBFS(visitedNodeInOrder, NodesinShortestPathOrder, speed);
};

export function animateBFS(visitedNodeInOrder, NodesinShortestPathOrder, speed){
    for(let i =0; i <= visitedNodeInOrder.length; i++){
        if(i===visitedNodeInOrder.length){
            setTimeout(()=>{animateShortestPath(NodesinShortestPathOrder, speed)}, speed*i);
            return;
            };
        setTimeout(()=>{
            const node = visitedNodeInOrder[i];
            const el = document.getElementById(`node-${node.row}-${node.col}`);
            if (el) el.className = 'Node node-visited';
        }, speed*i);
}}

export function animateShortestPath(NodesinShortestPathOrder, speed){
    for(let i=0; i<NodesinShortestPathOrder.length; i++){
        setTimeout(()=>{
            const node = NodesinShortestPathOrder[i];
            const el = document.getElementById(`node-${node.row}-${node.col}`);
            if (el) el.className = 'Node node-shortest-path';
        }, speed*i);
    }
}