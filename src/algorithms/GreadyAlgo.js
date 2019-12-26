export function greadyBFS(grid, startNode, finishNode) {
    const visitedNodeInOrder = [];
    const unvisitedNode = getAllNodes(grid);
    startNode.distance = 0;
    startNode.heuristicDistance = calculateHeuristic(startNode, finishNode);
    startNode.fullDistance = startNode.distance +startNode.heuristicDistance;
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
        updateUnvisitedNeighbors(closetNode, grid, finishNode);
    };
}
function updateUnvisitedNeighbors(node, grid, finishNode) {
    const neighborNodes = getNeighborNodes(node, grid);
    for (const neighbors of neighborNodes) {
        if (neighbors.isVisited) {
            let newDistance = null;
            let heuristicDistance = calculateHeuristic(neighbors, finishNode);
            if (neighbors.isWeight) {
                newDistance = node.distance + 15;
            } else {
                newDistance = node.distance + 1;
            }
            if (neighbors.distance > newDistance) {
                neighbors.distance = newDistance;
                neighbors.fullDistance = newDistance + heuristicDistance;
                neighbors.previousNode = node;
            }
        } else {
            calculateUnvisitedDistance(neighbors, node, finishNode);
            neighbors.previousNode = node;
        };
    }
}
function calculateUnvisitedDistance(neighbors, node, finishNode) {
    neighbors.heuristicDistance = calculateHeuristic(neighbors, finishNode);
    if (neighbors.isWeight) {
        neighbors.distance = node.distance + 15;
    } else {
        neighbors.distance = node.distance + 1;
    }
    neighbors.fullDistance = neighbors.distance + neighbors.heuristicDistance;
}

function calculateHeuristic(node, finishNode) {
    let heuristicDistance = null;
    const row = Math.abs(finishNode.row - node.row);
    const col = Math.abs(finishNode.col - node.col);
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
    return neighbors;
};

function sortNodeByDistance(unvisitedNode) {
    unvisitedNode.sort((nodeA, nodeB) => nodeA.heuristicDistance - nodeB.heuristicDistance);
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
