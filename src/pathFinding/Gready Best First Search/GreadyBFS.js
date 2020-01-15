import {greadyBFS, getNodesinShortestPathOrder} from './../../algorithms/GreadyAlgo'

export function visualizeGreadyBFS(grid, startNode, finishNode, speed){
    const StartNode = grid[startNode.row][startNode.col];
    const FinishNode = grid[finishNode.row][finishNode.col];
    const visitedNodeInOrder = greadyBFS(grid, StartNode, FinishNode);
    const NodesinShortestPathOrder = getNodesinShortestPathOrder(FinishNode);
    animateAStar(visitedNodeInOrder, NodesinShortestPathOrder, speed);
};

export function animateAStar(visitedNodeInOrder, NodesinShortestPathOrder, speed){
    for(let i =0; i <= visitedNodeInOrder.length; i++){
        if(i===visitedNodeInOrder.length){
            setTimeout(()=>{animateShortestPath(NodesinShortestPathOrder, speed)}, speed*i);
            return;
            };
        setTimeout(()=>{
            const node = visitedNodeInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className = 'Node node-visited';
        }, speed*i);
}}

export function animateShortestPath(NodesinShortestPathOrder, speed){
    for(let i=0; i<NodesinShortestPathOrder.length; i++){
        setTimeout(()=>{
            const node = NodesinShortestPathOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className = 'Node node-shortest-path'
        }, speed*i);
    }
}