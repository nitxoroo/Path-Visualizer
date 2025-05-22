import React, { Component } from "react";
import './Node.css'
// Replace export default class Node... with:
const Node = React.memo((props) => {
  const {
    row,
    col,
    isStart,
    isEnd,
    isWall,
    onMouseDown,
    onMouseEnter,
    onMouseUp,
  } = props;

  const extraClassName = isStart ? 'node-start' : isEnd ? 'node-end' : isWall ? 'node-wall' : '';

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
    >
      {isStart ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="2" fill="none" />
          <polygon points="10,8 16,12 10,16" fill="#10B981" />
        </svg>
      ) : isEnd ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="4" stroke="#EF4444" strokeWidth="2" fill="none" />
          <path d="M9 6V18" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
          <path d="M9 6L16 8L9 10" fill="#EF4444" />
        </svg>
      ) : null}
    </div>
  );
});

export default Node;


