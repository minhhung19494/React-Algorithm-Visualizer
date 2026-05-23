# TODO

A prioritized list of improvements for the Algorithms Visualizer project.

---

## High Priority (Bugs / Correctness)

- [ ] **DFS uses recursion** — will stack overflow on large grids or dense mazes. Rewrite `DFSAlgo` iteratively using an explicit stack.
- [ ] **A* heuristic is applied to already-visited nodes** — `updateUnvisitedNeighbors` in `AstarAlgo.js` re-processes visited nodes, which is incorrect. The visited check should gate the entire neighbor update, not just the distance recalculation branch.
- [ ] **Greedy BFS is nearly identical to A*** — `GreadyAlgo.js` duplicates most of `AstarAlgo.js` but sorts by `heuristicDistance` only. Extract shared neighbor/heuristic helpers into a shared utility to eliminate the duplication and the latent bugs that come with it.
- [ ] **`console.log` calls left in production code** — `DFSAlgo.js`, `RecursiveDivision.js`, `SortingVisualizer.js`, and `DijkstraVisualizer.js` all have `console.log` statements that should be removed.
- [ ] **`mouseIsPress` and `selectingStartNode` mutated directly** — `Grid.js` sets `this.state.mouseIsPress = false` directly instead of using `setState`. This bypasses React's state management and can cause subtle bugs.
- [ ] **Dijkstra typo** — function is exported as `dijskstra` (transposed letters). Rename to `dijkstra` and update the import in `DijkstraVisualizer.js`.

---

## Medium Priority (Features / UX)

- [ ] **Add Bidirectional BFS** — searches from both start and finish simultaneously; meets in the middle. Add `BiDirectionalBFSAlgo.js` in `src/algorithms/` and a visualizer + menu entry following the existing pattern.
- [ ] **Prevent re-running algorithm while animation is in progress** — clicking "Visualize" mid-animation queues up a second wave of `setTimeout` calls and corrupts the display. Add an `isAnimating` flag to block re-triggers.
- [ ] **Clear Path does not reset node distances** — after clearing the visual path, the underlying node objects still hold stale `distance`/`previousNode` values. Running a second algorithm without a full board reset produces wrong results.
- [ ] **Maze generation button missing from the UI** — `Grid.js` has `visualizeMaze()` implemented but it is never wired up to a button in `PathFinding.js`.
- [ ] **Sorting: no visual indication when sorting is complete** — all bars should turn green (or similar) when the sort finishes. Currently only some algorithms mark bars as `finished`.
- [ ] **Sorting: running a second sort without resetting corrupts the animation** — add a guard or auto-reset before starting a new sort.

---

## Low Priority (Code Quality / Maintainability)

- [ ] **Massive code duplication across visualizer files** — `animateShortestPath` is copy-pasted into `DijkstraVisualizer.js`, `BFSVisualizer.js`, `AStarVisualizer.js`, and `GreadyBFS.js`. Extract to a shared `animationUtils.js`.
- [ ] **`getNodesinShortestPathOrder` duplicated in every algorithm file** — same function exists in `DijkstraAlgo.js`, `BFSAlgo.js`, `AstarAlgo.js`, `GreadyAlgo.js`, `SwarmAlgo.js`. Move to a shared `pathUtils.js`.
- [ ] **`getAllNodes` duplicated across algorithm files** — same as above; consolidate into shared utility.
- [ ] **Inconsistent naming conventions** — mix of `PascalCase`, `camelCase`, and `Gready` (misspelling of "Greedy") across file names, function names, and route strings. Standardize and fix the typo (`Greedy`).
- [ ] **Upgrade dependencies** — React 16, React Router v5, and several other packages are significantly out of date. Plan a migration to React 18 + React Router v6.
- [ ] **No error boundaries** — a runtime error in the grid or sorting visualizer will crash the entire app. Add a React error boundary around each visualizer.
- [ ] **`src/App.test.js` only has a smoke test** — expand test coverage, at minimum for the pure algorithm functions which are easy to unit test.
- [ ] **`Constraint.js` PUBLIC_URL is unused** — the constant is defined but never imported anywhere. Either use it or remove it.
