import {greadyBFS, getNodesinShortestPathOrder} from './../../algorithms/GreadyAlgo'

export function visualizeGreadyBFS(grid, startNode, finishNode){
    const StartNode = grid[startNode.row][startNode.col];
    const FinishNode = grid[finishNode.row][finishNode.col];
    const visitedNodeInOrder = greadyBFS(grid, StartNode, FinishNode);
    const NodesinShortestPathOrder = getNodesinShortestPathOrder(FinishNode);
    animateAStar(visitedNodeInOrder, NodesinShortestPathOrder);
};

export function animateAStar(visitedNodeInOrder, NodesinShortestPathOrder){
    for(let i =0; i <= visitedNodeInOrder.length; i++){
        if(i===visitedNodeInOrder.length){
            setTimeout(()=>{animateShortestPath(NodesinShortestPathOrder)}, 10*i);
            return;
            };
        setTimeout(()=>{
            const node = visitedNodeInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className = 'Node node-visited';
        }, 10*i);
}}

export function animateShortestPath(NodesinShortestPathOrder){
    for(let i=0; i<NodesinShortestPathOrder.length; i++){
        setTimeout(()=>{
            const node = NodesinShortestPathOrder[i];
            console.log(node);
            document.getElementById(`node-${node.row}-${node.col}`).className = 'Node node-shortest-path'
        }, 10*i);
    }
}