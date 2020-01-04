export function recursiveDivision(grid, startNode, finishNode) {
    let orientation = chooseOrientation(grid[0].length, grid.length);
    const wallInOrder = [];
    for(let i=0; i<grid[0].length; i++){
        wallInOrder.push(grid[0][i]);
        wallInOrder.push(grid[grid.length-1][i])
    }
    for(let i=1; i<grid.length-1; i++){
        wallInOrder.push(grid[i][0]);
        wallInOrder.push(grid[i][grid[0].length-1]);
    }
    for(let i = 0; i<wallInOrder.length; i++){
        wallInOrder[i].isWall = true;
    }
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
    let wx = x + (horizontal ? 0 : Math.floor(Math.random() * (width - 2)));
    let wy = y + (horizontal ? Math.floor(Math.random() * (height - 2)) : 0);
    let px = wx + (horizontal ? Math.floor(Math.random() * (width - 2)) : 0);
    let py = wy + (horizontal ? 0 : Math.floor(Math.random() * (height - 2)));
    // console.log(wx, wy);
    // console.log(orientation);

    let dx = horizontal ? 1 : 0;
    let dy = horizontal ? 0 : 1;
    let countX = wx;
    let countY = wy;
    while (countX < width + x && countY < height + y) {
        if (countX !== px || countY !== py) {
            grid[countY][countX].isWall = true;
            wallInOrder.push(grid[countY][countX]);
        }
        countX += dx;
        countY += dy;
    }
    console.log(wallInOrder);
    if (horizontal) {
        divide(grid, x, y, width, wy - y, chooseOrientation(width, wy - y), wallInOrder);
        divide(grid, x, wy + 1, width, height - wy, chooseOrientation(width, height - wy), wallInOrder);
    } else {
        divide(grid, x, y, wx - x, height, chooseOrientation(wx - x, height), wallInOrder);
        divide(grid, wx + 1, y, width - wx, height, chooseOrientation(width - wx, height), wallInOrder);
    };
}

 