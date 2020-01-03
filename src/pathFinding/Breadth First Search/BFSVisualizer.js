import {BFSAlgo, getNodesinShortestPathOrder} from '../../algorithms/BFSAlgo'

export function visualizeBFS(grid, startNode, finishNode){
    const StartNode = grid[startNode.row][startNode.col];
    const FinishNode = grid[finishNode.row][finishNode.col];
    const visitedNodeInOrder = BFSAlgo(grid, StartNode, FinishNode);
    const NodesinShortestPathOrder = getNodesinShortestPathOrder(FinishNode);
    animateBFS(visitedNodeInOrder, NodesinShortestPathOrder);
};

export function animateBFS(visitedNodeInOrder, NodesinShortestPathOrder){
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
            document.getElementById(`node-${node.row}-${node.col}`).className = 'Node node-shortest-path'
        }, 10*i);
    }
}