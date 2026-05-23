# Project Structure

```
src/
  App.js                        # Root component, top-level routing
  Constraint.js                 # Shared constants (PUBLIC_URL)
  pathFinding/
    PathFinding.js              # Pathfinding page — navbar + state management
    PathFinding.css
    GridAndNode/
      Grid.js                   # Grid component; owns grid state, triggers algorithms
      Node.js                   # Individual cell component
      Grid.css / Node.css
    Dijkstra/ BFS/ DFS/ A star/
    Gready Best First Search/
    Swarm/                      # Each folder has a *Visualizer.js that animates the algorithm
  algorithms/
    DijkstraAlgo.js             # Pure algorithm logic (no React) — returns visited nodes in order
    BFSAlgo.js / DFSAlgo.js / AstarAlgo.js / GreadyAlgo.js / SwarmAlgo.js
  Maze/
    RecursiveDivision.js        # Maze generation algorithm
  SortingVisualize/
    SortingVisualizer.js        # Sorting page — owns all sorting state and animation
    SortingVisualize.css
    Algorithm/
      BubbleSort.js / HeapSort.js / MergeSort.js / QuickSort.js / SelectionSort.js
public/
  index.html                    # Loads Bootstrap 3.4 CSS/JS from vendored folder
  bootstrap 3.4/                # Vendored Bootstrap (do not modify)
```

## Conventions

- Algorithm logic lives in `src/algorithms/` (pathfinding) or `src/SortingVisualize/Algorithm/` (sorting) as pure functions — no React imports
- Visualizer files (e.g. `DijkstraVisualizer.js`) bridge algorithm output to DOM animation via `setTimeout`
- Grid state is a 2D array of node objects; node properties: `row`, `col`, `isStart`, `isFinish`, `isWall`, `isWeight`, `isVisited`, `distance`, `previousNode`, `heuristicDistance`, `swarmIdx`, `fullDistance`
- Visual state (visited, shortest-path highlights) is applied by directly mutating DOM class names — not via React re-renders
- Folder names with spaces are intentional (e.g. `A star`, `Breadth First Search`) — match exactly when importing
- Routes: `/` (home nav), `/PathFinding`, `/SortingVisualizer`
