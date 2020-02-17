export function swarmAlgo(grid, startNode, finishNode) {
    const visitedNodeInOrder = [];
    const unvisitedNode = getAllNodes(grid);
    startNode.distance = 0;
    startNode.heuristicDistance = calculateDistanceBetweenNodes(startNode, finishNode);
    startNode.swarmIdx = 0;
    startNode.fullDistance = startNode.distance + 0.2 * startNode.heuristicDistance + 0.15 * startNode.swarmIdx;
    while (!!unvisitedNode.length) {
        sortNodeByDistance(unvisitedNode)
        const closetNode = unvisitedNode.shift();
        if (closetNode.isWall) continue;
        if (closetNode.distance === Infinity) {
            return visitedNodeInOrder;
        }
        closetNode.isVisited = true;
        visitedNodeInOrder.push(closetNode);
        if (closetNode === finishNode) {
            return visitedNodeInOrder;
        }
        updateUnvisitedNeighbors(closetNode, grid, finishNode, visitedNodeInOrder);
    };
}
function updateUnvisitedNeighbors(node, grid, finishNode, visitedNodeInOrder) {
    const neighborNodes = getNeighborNodes(node, grid);
    for (const neighbors of neighborNodes) {
        calculateUnvisitedDistance(neighbors, node, finishNode, visitedNodeInOrder);
        neighbors.previousNode = node;
    }
}
function calculateUnvisitedDistance(neighbors, node, finishNode, visitedNodeInOrder) {
    neighbors.heuristicDistance = calculateDistanceBetweenNodes(neighbors, finishNode);
    neighbors.swarmIdx = calculateSwarmIdx(neighbors, visitedNodeInOrder, finishNode);
    if (neighbors.isWeight) {
        neighbors.distance = node.distance + 15;
    } else {
        neighbors.distance = node.distance + 1;
    }
    neighbors.fullDistance = neighbors.distance + 0.2 * neighbors.heuristicDistance + 0.15 * neighbors.swarmIdx;
}
function calculateSwarmIdx(node, visitedNodeInOrder, finishNode) {
    const groupBestLocation = getGroupBestLocation(visitedNodeInOrder, finishNode);
    const swarmIdx = calculateDistanceBetweenNodes(node, groupBestLocation);
    return swarmIdx;
}

function getGroupBestLocation(visitedNodeInOrder, finishNode) {
    let sumRow = null;
    let sumCol = null;
    for (const node of visitedNodeInOrder) {
        sumRow += node.row;
        sumCol += node.col;
    }
    const avgRow = Math.round(((sumRow / visitedNodeInOrder.length) + finishNode.row) / 2);
    const avgCol = Math.round(((sumCol / visitedNodeInOrder.length) + finishNode.col) / 2);
    const groupBestLocation = {
        row: avgRow,
        col: avgCol,
    }
    return groupBestLocation
}

function calculateDistanceBetweenNodes(nodeA, nodeB) {
    let heuristicDistance = null;
    const row = Math.abs(nodeB.row - nodeA.row);
    const col = Math.abs(nodeB.col - nodeA.col);
    heuristicDistance = row + col;
    return heuristicDistance;
}

function getNeighborNodes(node, grid) {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
};

function sortNodeByDistance(unvisitedNode) {
    unvisitedNode.sort((nodeA, nodeB) => nodeA.fullDistance - nodeB.fullDistance);
}
function getAllNodes(grid) {
    const allNodes = [];
    for (const row of grid) {
        for (const node of row) {
            allNodes.push(node);
        }
    }
    return allNodes;
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