export function dijkstra(grid,startNode,endNode){
    const visitedNodes=[];
    startNode.distance=0;
    const unvisitedNodes=getAllNodes(grid);
    while(!!unvisitedNodes.length){
        sortNodes(unvisitedNodes)
        const closestNode=unvisitedNodes.shift()
        if(closestNode.isWall) continue
        if(closestNode.distance===Infinity) return visitedNodesInOrder
        closestNode.isVisited=true
        visitedNodes.push(closestNode);
        if(closestNode===endNode) return visitedNodes
        updateUnvisitedNeighbors(closestNode,grid);
        
    }
}
function updateUnvisitedNeighbors(node,grid){
    const unvisitedNeighbors=getUnvisitedNeighbors(node,grid)
        for(const neighbor of unvisitedNeighbors){
            neighbor.distance=node.distance+1
            neighbor.previousNode=node
        }
}
function sortNodes(unvisitedNodes){
    unvisitedNodes.sort((nodeA,nodeB)=> nodeA.distance - nodeB.distance)
}
function getUnvisitedNeighbors(node,grid){
    const neighbor=[]
    const {row,col}=node;
    if(row>0) neighbor.push(grid[row-1][col])
    if(row<grid.length-1) neighbor.push(grid[row+1][col])
    if(col>0) neighbor.push(grid[row][col-1])
    if(col<grid[0].length-1) neighbor.push(grid[row][col+1])
    return neighbor.filter(neighbor=>!neighbor.isVisited)
}
function getAllNodes(grid){
    const nodes=[]
    for(const row of grid){
        for(const node of row){
            nodes.push(node);
        }
    }
    return nodes;
}
export function getNodeInShortestpath(endNode){
    const nodesinshortestpath=[]
    let currentNode=endNode
    while(currentNode!==null){
        nodesinshortestpath.unshift(currentNode)
        currentNode=currentNode.previousNode
    }
    return nodesinshortestpath
}