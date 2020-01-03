export function BFSAlgo(grid, startNode, finishNode) {
    const visitedNodeInOrder = [];
    startNode.distance = 0;
    startNode.isVisited = true;
    let unvisitedNodeQueue = [];
    unvisitedNodeQueue.push(startNode);
    while (!!unvisitedNodeQueue.length) {
        const closetNode = unvisitedNodeQueue.shift();
        if (closetNode.isWall) continue;
        visitedNodeInOrder.push(closetNode);
        if (closetNode === finishNode) {
            return visitedNodeInOrder;
        };
        const finalNeighbors = updateNeighbors(closetNode, grid);
        unvisitedNodeQueue=unvisitedNodeQueue.concat(finalNeighbors);
    }
    return visitedNodeInOrder;
}
function updateNeighbors(node, grid) {
    const unvisistedNeighbors = getUnvisitedNeighbors(node, grid);
    const finalNeighbors = []
    for (const neighbors of unvisistedNeighbors) {
        neighbors.distance = node.distance + 1;
        neighbors.previousNode = node;
        neighbors.isVisited = true;
        finalNeighbors.push(neighbors);
    };
    return finalNeighbors;
}
function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
};

export function getNodesinShortestPathOrder(finishNode) {
    const nodeInShortestPath = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodeInShortestPath.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodeInShortestPath;

}