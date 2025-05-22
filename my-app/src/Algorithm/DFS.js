export function Dfs(grid,startNode,endNode){
    const OrderofVisitedNodes=[];
    const stack=[];
    stack.push(startNode);
    while(stack.length>0){
        const currNode=stack.pop();
        if(currNode.isWall || currNode.isVisited) continue
        currNode.isVisited=true
        OrderofVisitedNodes.push(currNode)

        if(currNode===endNode) return OrderofVisitedNodes;
        const neighbors=getUnvisitedNeighbors(currNode,grid)
        for(const neighbor of neighbors){
            neighbor.previousNode=currNode
            stack.push(neighbor)
        }


    }
    return OrderofVisitedNodes;
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

export function DfsgetNodeInShortestpath(endNode, startNode) {
    const nodesInPath = [];
    let current = endNode;
    while (current !== null && current !== startNode) {
        nodesInPath.unshift(current);
        current = current.previousNode;
    }
    if (current === startNode) nodesInPath.unshift(startNode); // include start node if path exists
    return nodesInPath;
}

