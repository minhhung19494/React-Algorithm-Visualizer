import {dijskstra, getNodesinShortestPathOrder} from './../../algorithms/DijkstraAlgo'

export function visualizeDijkstra(grid, startNode, finishNode, speed){
    const StartNode = grid[startNode.row][startNode.col];
    const FinishNode = grid[finishNode.row][finishNode.col];
    const visitedNodeInOrder = dijskstra(grid, StartNode, FinishNode);
    const NodesinShortestPathOrder = getNodesinShortestPathOrder(FinishNode);
    animateDijkstra(visitedNodeInOrder, NodesinShortestPathOrder, speed)
};

export function animateDijkstra(visitedNodeInOrder, NodesinShortestPathOrder, speed){
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
            console.log(node);
            document.getElementById(`node-${node.row}-${node.col}`).className = 'Node node-shortest-path'
        }, speed*i);
    }
}