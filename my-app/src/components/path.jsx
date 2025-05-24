import React, { Component } from "react";
import Node from "./node";
import './Path.css';
import { dijkstra, getNodeInShortestpath } from "../Algorithm/dijkstra";
import { Bfs, BfsNodeInShortestpath } from "../Algorithm/BFS";
import { Dfs, DfsgetNodeInShortestpath } from "../Algorithm/DFS";
var startNoderow = 10;
var startNodecol = 15;
var endNoderow = 10;
var endNodecol = 35;

export default class path extends Component {
    constructor() {
        super();
        this.state = {
            grid: [],
            mouseIsPressed: false,
            startnodepressed: false,
            endNodepressed: false,
            showDropdown: false,
            selectedAlgorithm: null,
        };
        this.cleanBoard = this.cleanBoard.bind(this);
    }
    componentDidMount() {
        const grid = getGrid();

        this.setState({ grid })
    }
    handleMouseDown(row, col) {
        const newGrid = this.toggleWall(this.state.grid, row, col);
        if (newGrid) {
            this.setState({ grid: newGrid, mouseIsPressed: true });
        } else {
            this.setState({ mouseIsPressed: true }); // still need to track mouse
        }
    }
    toggleWall(grid, row, col) {
        const node = grid[row][col];
        if (node.isStart || node.isEnd || node.isWall) return null; // Skip if already wall/start/end

        const newGrid = grid.map((r, i) =>
            i === row
                ? r.map((cell, j) =>
                    j === col
                        ? { ...cell, isWall: true }
                        : cell
                )
                : r
        );
        return newGrid;
    }

    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;
        const newGrid = this.toggleWall(this.state.grid, row, col);
        if (newGrid) {
            this.setState({ grid: newGrid });
        }
    }
    handleMouseUp() {
        this.setState({
            mouseIsPressed: false,
            startnodepressed: false,
            endNodepressed: false
        });
    }
    toggleDropdown = () => {
        this.setState(prevState => ({ showDropdown: !prevState.show }))
    }
    selectAlgorithm = (algorithm) => {
        this.setState({
            selectedAlgorithm: algorithm,
            showDropdown: false,
        });
    };
    animateDijkstra(visitedNodesOrder, nodeinShortestpath) {
        for (let i = 0; i <= visitedNodesOrder.length; i++) {
            if (i === visitedNodesOrder.length) {
                setTimeout(() => {

                    this.animatshortestPath(nodeinShortestpath);

                }, 10 * i);
                return;
            }

            setTimeout(() => {
                const node = visitedNodesOrder[i]
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited'
            }, 10 * i)
        }

    }
    animateBfs(visitedNodesOrderBfs, shortestPathNodes) {
        for (let i = 0; i <= visitedNodesOrderBfs.length; i++) {
            if (i === visitedNodesOrderBfs.length) {
                setTimeout(() => {

                    this.animatshortestPathBfs(shortestPathNodes);

                }, 10 * i);
                return;
            }

            setTimeout(() => {
                const node = visitedNodesOrderBfs[i]
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited-bfs'
            }, 10 * i)
        }

    }

    animateDfs(visitedNodesOrderDfs, shortestPathNodesDfs) {
        for (let i = 0; i <= visitedNodesOrderDfs.length; i++) {
            if (i === visitedNodesOrderDfs.length) {
                setTimeout(() => {

                    this.animatshortestPathDfs(shortestPathNodesDfs);

                }, 10 * i);
                return;
            }

            setTimeout(() => {
                const node = visitedNodesOrderDfs[i]
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited-bfs'
            }, 10 * i)
        }

    }

    animatshortestPath(nodeinShortestpath) {

        console.log(nodeinShortestpath.length)
        for (let i = 0; i <= nodeinShortestpath.length - 1; i++) {
            setTimeout(() => {
                const node = nodeinShortestpath[i];

                const element = document.getElementById(`node-${node.row}-${node.col}`)
                element.className = 'node node-shortestpath ';
            }, 50 * i)
        }
    }
    animatshortestPathBfs(shortestPathNodes) {

        console.log(shortestPathNodes.length)
        for (let i = 0; i <= shortestPathNodes.length - 1; i++) {
            setTimeout(() => {
                const node = shortestPathNodes[i];

                const element = document.getElementById(`node-${node.row}-${node.col}`)
                element.className = 'node node-shortestpath ';
            }, 50 * i)
        }
    }
    animatshortestPathDfs(shortestPathNodesDfs) {

        console.log(shortestPathNodesDfs.length)
        for (let i = 0; i <= shortestPathNodesDfs.length - 1; i++) {
            setTimeout(() => {
                const node = shortestPathNodesDfs[i];

                const element = document.getElementById(`node-${node.row}-${node.col}`)
                element.className = 'node node-shortestpath ';
            }, 50 * i)
        }
    }


    wallclear() {
        const { grid } = this.state;

        const newGrid = grid.map((row, rowIndex) =>
            row.map((node, colIndex) => {
                if (node.isWall) {
                    // Avoid toggling start or end nodes
                    if (node.isStart || node.isEnd) return node;
                    return { ...node, isWall: false };
                }
                return node;
            })
        );

        this.setState({ grid: newGrid });
    }

    cleanBoard = () => {
        const newGrid = getGrid();

        // Clear all node-related visual classes
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 50; col++) {
                const nodeElement = document.getElementById(`node-${row}-${col}`);
                if (nodeElement) {
                    nodeElement.className = 'node'; // reset to base class
                }
            }
        }

        this.setState({ grid: newGrid });
    };



    handlestartnode(row, col) {
        startNoderow = row;
        startNodecol = col;
        this.setState({ startnodepressed: true })
    }
    handlestartnodepressed(row, col) {
        if (!this.state.startnodepressed) return;

        const newGrid = this.state.grid.map(r => r.map(n => {
            if (n.isStart) return { ...n, isStart: false };
            return n;
        }));

        newGrid[row][col] = {
            ...newGrid[row][col],
            isStart: true,
        };
        const nodeElement = document.getElementById(`node-${row}-${col}`);
        nodeElement.className = " node node-Node"


        startNoderow = row;
        startNodecol = col;

        this.setState({ grid: newGrid });
    }
    handleendnode(row, col) {
        endNoderow = row;
        endNodecol = col;
        this.setState({ endNodepressed: true });
    }

    handleendnodepressed(row, col) {
        if (!this.state.endNodepressed) return;

        const newGrid = this.state.grid.map(r => r.map(n => {
            if (n.isEnd) return { ...n, isEnd: false };
            return n;
        }));

        newGrid[row][col] = {
            ...newGrid[row][col],
            isEnd: true,
        };
        const nodeElement = document.getElementById(`node-${row}-${col}`);
        nodeElement.className = " node node-Node"

        endNoderow = row;
        endNodecol = col;

        this.setState({ grid: newGrid });
    }

    visualizeBfs() {
        const { grid } = this.state;
        const startNode = grid[startNoderow][startNodecol];
        const endNode = grid[endNoderow][endNodecol];



        const visitedNodesOrderDfs = Bfs(grid, startNode, endNode);
        const shortestPathNodesDfs = BfsNodeInShortestpath(endNode);
        this.animateBfs(visitedNodesOrderDfs, shortestPathNodesDfs);

    }

    visualizeDfs() {
        const { grid } = this.state
        const startNode = grid[startNoderow][startNodecol];
        const endNode = grid[endNoderow][endNodecol];



        const visitedNodesOrderDfs = Dfs(grid, startNode, endNode);
        const shortestPathNodesDfs = DfsgetNodeInShortestpath(endNode, startNode);
        this.animateDfs(visitedNodesOrderDfs, shortestPathNodesDfs);
    }
    visualizeDijkstra() {
        const { grid } = this.state

        const startNode = grid[startNoderow][startNodecol]
        const endNode = grid[endNoderow][endNodecol]


        const visitedNodesOrder = dijkstra(grid, startNode, endNode)
        const nodeinShortestpath = getNodeInShortestpath(endNode, startNode)
        this.animateDijkstra(visitedNodesOrder, nodeinShortestpath)
    }

    render() {
        const { grid, mouseIsPressed } = this.state
        return (
            <>
                <nav className="h-[50px] bg-gray-900 m-[0px] flex justify-center gap-3 items-center w-[100vw]">
                    <div className="relative border-2 border-white rounded-md flex justify-center items-center">
                        <button onClick={this.toggleDropdown} className="text-white pt-1 pl-3 pb-1  font-semibold flex items-center gap-2 hover:font-bold">
                            {this.state.selectedAlgorithm ? ` ${this.state.selectedAlgorithm}` : "Path Finding Algorithm"}

                            <div>
                                <svg className="pr-3" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                        </button>

                        {this.state.showDropdown && (
                            <div className="absolute top-full left-0 bg-gray-800 z-10 text-white rounded shadow-md">
                                <button onClick={() => this.selectAlgorithm('Dijkstra')} className="block px-4 py-2 hover:bg-gray-700 w-full text-left">Dijkstra</button>
                                <button onClick={() => this.selectAlgorithm('BFS')} className="block px-4 py-2 hover:bg-gray-700 w-full text-left">BFS</button>
                                <button onClick={() => this.selectAlgorithm('DFS')} className="block px-4 py-2 hover:bg-gray-700 w-full text-left">DFS</button>
                            </div>
                        )}

                    </div>
                    <div>
                        <button
                            onClick={() => {
                                if (this.state.selectedAlgorithm === "Dijkstra") this.visualizeDijkstra();
                                else if (this.state.selectedAlgorithm === "BFS") this.visualizeBfs();
                                else if (this.state.selectedAlgorithm === "DFS") this.visualizeDfs();
                            }}
                            className=" border-2 text-white px-3 py-1 rounded-md  font-semibold flex items-center gap-2 hover:font-bold "
                        >
                            {`Visualize ${this.state.selectedAlgorithm ?? ""}`}
                        </button>
                    </div>
                    <div className="wallclear border-2 text-white px-3 py-1 rounded-md">
                        <button className="  font-semibold flex items-center  gap-2 hover:font-bold" onClick={() => this.wallclear()}>Clear Walls</button>
                    </div>
                    <div className="Reset border-2 text-white px-3 py-1 rounded-md overflow-hidden">
                        <button
                            className="relative font-semibold flex items-center gap-2 hover:font-bold transition-all duration-300"
                            onClick={() => this.cleanBoard()}
                        >
                            Reset Board
                        </button>
                    </div>






                </nav>
                <div className="flex items-center  justify-center">
                    <div className="gird p-3">
                        {grid.map((row, rowIdx) => {
                            return <div key={rowIdx} className="flex" >

                                {row.map((node, nodeIdx) => {
                                    const { row, col, isStart, isEnd, isWall } = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            row={row}
                                            col={col}
                                            isStart={isStart}
                                            isEnd={isEnd}
                                            isWall={isWall}
                                            mouseIsPressed={mouseIsPressed}
                                            onMouseDown={(row, col) => {
                                                if (row === startNoderow && col === startNodecol) {
                                                    this.handlestartnode(row, col);
                                                } else if (row === endNoderow && col === endNodecol) {
                                                    this.handleendnode(row, col);
                                                } else {
                                                    this.handleMouseDown(row, col);
                                                }
                                            }}

                                            onMouseEnter={(row, col) => {
                                                if (this.state.startnodepressed) {
                                                    this.handlestartnodepressed(row, col);
                                                } else if (this.state.endNodepressed) {
                                                    this.handleendnodepressed(row, col);
                                                } else {
                                                    this.handleMouseEnter(row, col);
                                                }
                                            }}
                                            onMouseUp={() => this.handleMouseUp()}
                                        >
                                        </Node>
                                    )
                                })}

                            </div>
                        })}
                    </div>
                </div>



            </>
        );
    }
}

const getGrid = () => {
    const grid = []
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push(createNode(row, col));
        }
        grid.push(currentRow);
    }
    return grid;
}
const createNode = (row, col) => {
    return {
        row,
        col,
        isStart: row === startNoderow && col === startNodecol,
        isEnd: row === endNoderow && col === endNodecol,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        weight: Infinity,
        previousNode: null,
    }
}




