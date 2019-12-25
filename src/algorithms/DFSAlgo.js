export function DFS(grid, startNode, finishNode) {
    const nodeVisited = [];
    startNode.distance = 0;
    DFSAlgo(startNode, finishNode, nodeVisited, grid);
    return nodeVisited;
}
function DFSAlgo(node, finishNode, nodeVisited, grid) {
    const neighborNodes = getNeighborNodes(node, grid);
    for (let i = 0; i < neighborNodes.length && !finishNode.isVisited; i++) {
        neighborNodes[i].isVisited = true;
        if (neighborNodes[i].isWall) continue;
        if (neighborNodes[i].distance === Infinity) {
            neighborNodes[i].previousNode = node;
            nodeVisited.push(neighborNodes[i])
        }
        if (neighborNodes[i] === finishNode) {
            return neighborNodes[i].previousNode = node;
        };
        console.log(nodeVisited);
        DFSAlgo(neighborNodes[i], finishNode, nodeVisited, grid);
    }
}

function getNeighborNodes(node, grid) {
    const neighborNodes = [];
    const { row, col } = node;
    if (row > 0) neighborNodes.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighborNodes.push(grid[row + 1][col]);
    if (col < grid[0].length - 1) neighborNodes.push(grid[row][col + 1]);
    if (col > 0) neighborNodes.push(grid[row][col - 1]);
    return neighborNodes.filter(neighbor => !neighbor.isVisited);
}

export function findShortestPath(finishNode) {
    const nodeInShortestPath = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodeInShortestPath.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodeInShortestPath;

}