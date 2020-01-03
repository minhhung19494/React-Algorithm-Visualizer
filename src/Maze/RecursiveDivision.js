export function recursiveDivision(grid, startNode, finishNode) {
    let orientation = chooseOrientation(grid[0].length, grid.length);
    const wallInOrder = [];
    divide(grid, 1, 1, grid[0].length - 2, grid.length - 2, orientation, wallInOrder);
    return wallInOrder;
}
function chooseOrientation(width, height) {
    let orientation;
    if (width < height) {
        orientation = 'HORIZONTAL';
    } else if (height < width) {
        orientation = 'VERTICAL';
    } else {
        orientation = (Math.random() > 0.5) ? 'HORIZONTAL' : 'VERTICAL'
    };
    return orientation
}
function divide(grid, x, y, width, height, orientation, wallInOrder) {
    if (width < 2 || height < 2) return;
    let horizontal = orientation === 'HORIZONTAL';
    let wx = x + (horizontal ? 0 : Math.floor(Math.random() * (width - 2)) + 1);
    let wy = y + (horizontal ? Math.floor(Math.random() * (height - 2)) + 1 : 0);
    let px = wx + (horizontal ? Math.floor(Math.random() * (width - 2)) + 1 : 0);
    let py = wy + (horizontal ? 0 : Math.floor(Math.random() * (height - 2)) + 1);
    // console.log(wx, wy);
    // console.log(orientation);

    let dx = horizontal ? 1 : 0;
    let dy = horizontal ? 0 : 1;
    let countX = wx;
    let countY = wy;
    while (countX < width + x && countY < height + y) {
        if (countX !== px || countY !== py) {
            console.log(countX, countY);
            grid[countY][countX].isWall = true;
            wallInOrder.push(grid[countY][countX]);
        }
        countX += dx;
        countY += dy;
    }
    console.log(wallInOrder);
    // let w1, h1 = horizontal ? [width, wy - y] : [wx - x, height];
    // let w2, h2 = horizontal ? [width, height - wy - 1] : [width - wx - 1, height]
    // let nx, ny = horizontal ? [x, wy + 1] : [wx + 1, y];
    // console.log(w1,h1,w2,h2);
    // console.log(nx, ny);
    // console.log(nx);
    if (horizontal) {
        divide(grid, x, y, width, wy - y, chooseOrientation(width, wy - y), wallInOrder);
        divide(grid, x, wy + 1, width, height - wy, chooseOrientation(width, height - wy));
    } else {
        divide(grid, x, y, wx - x, height, chooseOrientation(wx - x, height), wallInOrder);
        divide(grid, wx + 1, y, width - wx, height, chooseOrientation(width - wx, height), wallInOrder);
    };
    // divide(grid, x, y, w1, h1, chooseOrientation(w1, h1));
    // divide(grid, nx, ny, w2, h2, chooseOrientation(w2, h2));
}

