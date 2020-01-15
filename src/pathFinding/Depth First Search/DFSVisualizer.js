import { DFS, findShortestPath } from './../../algorithms/DFSAlgo'

export function DFSVisualizer(grid, startNode, finishNode, speed) {
    const StartNode = grid[startNode.row][startNode.col];
    const FinishNode = grid[finishNode.row][finishNode.col];
    const nodeVisited = DFS(grid, StartNode, FinishNode);
    const nodeInShortestPath = findShortestPath(FinishNode);
    animateDFS(nodeVisited, nodeInShortestPath, speed);
}
function animateDFS(nodeVisited, nodeInShortestPath, speed) {
    for (let i = 0; i <= nodeVisited.length-1; i++) {
        if (i === nodeVisited.length -1) {
            setTimeout(()=>animateNodeInShortestPath(nodeInShortestPath, speed), speed*i);
            return
            }
        const node= nodeVisited[i];
        setTimeout(() => {
            document.getElementById(`node-${node.row}-${node.col}`).className = 'Node node-visited'
        }, speed * i);
    }

}
function animateNodeInShortestPath(nodeInShortestPath, speed){
    for(let i =0; i<nodeInShortestPath.length; i++){
        const node = nodeInShortestPath[i];
        setTimeout(()=>{
            document.getElementById(`node-${node.row}-${node.col}`).className = 'Node node-shortest-path'
        }, speed*i)
    }
}