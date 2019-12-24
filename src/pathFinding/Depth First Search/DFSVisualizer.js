import { DFS, findShortestPath } from './../../algorithms/DFSAlgo'

export function DFSVisualizer(grid, startNode, finishNode) {
    const StartNode = grid[startNode.row][startNode.col];
    const FinishNode = grid[finishNode.row][finishNode.col];
    const nodeVisited = DFS(grid, StartNode, FinishNode);
    const nodeInShortestPath = findShortestPath(FinishNode);
    animateDFS(nodeVisited, nodeInShortestPath);
}
function animateDFS(nodeVisited, nodeInShortestPath) {
    for (let i = 0; i <= nodeVisited.length-1; i++) {
        if (i === nodeVisited.length -1) {
            setTimeout(()=>animateNodeInShortestPath(nodeInShortestPath), 50*i);
            return
            }
        const node= nodeVisited[i];
        setTimeout(() => {
            document.getElementById(`node-${node.row}-${node.col}`).className = 'Node node-visited'
        }, 50 * i);
    }

}
function animateNodeInShortestPath(nodeInShortestPath){
    for(let i =0; i<nodeInShortestPath.length; i++){
        const node = nodeInShortestPath[i];
        setTimeout(()=>{
            document.getElementById(`node-${node.row}-${node.col}`).className = 'Node node-shortest-path'
        }, 50*i)
    }
}