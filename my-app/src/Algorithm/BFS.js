export function Bfs(grid, startNode, endNode) {
    const visitedNodesinOrder = [];
    const queue = [];
    queue.push(startNode);
    startNode.isVisited=true;
    while (queue.length > 0) {
        const currNode = queue.shift();
        if (currNode.isWall) continue;
        visitedNodesinOrder.push(currNode);

        if (currNode === endNode) return visitedNodesinOrder;

        const neighbors = getUnvisitedNeighbors(currNode, grid);
        for (const neighbor of neighbors) {
            neighbor.isVisited = true
            neighbor.previousNode = currNode;
            queue.push(neighbor);
        }

    }
    return visitedNodesinOrder;

}

function getUnvisitedNeighbors(Node, grid) {
    const neighbors = [];
    const { row, col } = Node;
    if (row > 0) neighbors.push(grid[row - 1][col])
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
    if (col > 0) neighbors.push(grid[row][col - 1])
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])

    return neighbors.filter(n => !n.isVisited);
}

export function BfsNodeInShortestpath(endNode){
    const shortestpathNode=[];
    let currentNode=endNode;
    while(currentNode!==null){
        shortestpathNode.unshift(currentNode);
        currentNode=currentNode.previousNode;
    }
    return shortestpathNode;
}