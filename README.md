# Algorithms Visualizer

An interactive web app for visualizing classic computer science algorithms. [Live Demo](https://minhhung19494.github.io/algo_demo/)

## Features

### Pathfinding Visualizer
Visualize how pathfinding algorithms explore a grid to find the shortest path between two nodes. Draw walls and weighted nodes, drag start/finish nodes, and generate mazes.

**Algorithms:**
- Dijkstra's Algorithm — weighted, guarantees shortest path
- A* Search — weighted, guarantees shortest path
- Greedy Best-First Search — weighted, does not guarantee shortest path
- Breadth-First Search — unweighted, guarantees shortest path
- Depth-First Search — unweighted, does not guarantee shortest path
- Swarm Algorithm — weighted, does not guarantee shortest path

**Maze Generation:**
- Recursive Division

### Sorting Visualizer
Watch sorting algorithms animate over a bar chart with configurable array size and speed.

**Algorithms:**
- Bubble Sort
- Selection Sort
- Merge Sort
- Quick Sort
- Heap Sort

## Getting Started

```bash
npm install
npm start       # dev server at http://localhost:3000
```

## Scripts

| Command | Description |
|---|---|
| `npm start` | Start development server |
| `npm test` | Run tests |
| `npm run build` | Production build |
| `npm run deploy` | Deploy to GitHub Pages |

## Tech Stack

- React 16 (class components)
- React Router v5 (HashRouter)
- Bootstrap 3.4
- Create React App
