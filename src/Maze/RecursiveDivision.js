export function recursiveDivision(grid, startNode, finishNode) {
    let orientation = chooseOrientation(grid[0].length, grid.length);
    const wallInOrder = [];
    const passNodes = [];

    for (let i = 0; i < grid[0].length; i++) {
        wallInOrder.push(grid[0][i]);
        wallInOrder.push(grid[grid.length - 1][i])
    }
    for (let i = 1; i < grid.length - 1; i++) {
        wallInOrder.push(grid[i][0]);
        wallInOrder.push(grid[i][grid[0].length - 1]);
    }
    for (let i = 0; i < wallInOrder.length; i++) {
        wallInOrder[i].isWall = true;
    }
    divide(grid, 0, 0, grid[0].length - 2, grid.length - 2, orientation, wallInOrder, passNodes);
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
function divide(grid, x, y, width, height, orientation, wallInOrder, passNodes) {
    if (width < 2 || height < 2 || (width === 2 && height === 2)) return;
    let horizontal = orientation === 'HORIZONTAL';
    let wallCheck = [];
    let wallCheck2 = [];
    let wx;
    let wy;
    let i = 0;

    do {
        wallCheck = [orientation];
        wallCheck2 = [orientation];
        wx = x + (horizontal ? 0 : Math.floor(Math.random() * (width - 3) + 2));
        wy = y + (horizontal ? Math.floor(Math.random() * (height - 3) + 2) : 0);
        let wx1 = wx + width + 1;
        let wy1 = wy + height + 1;
        i++;
        horizontal ? wallCheck2.push(wx1, wy) : wallCheck2.push(wx, wy1);
        wallCheck.push(wx, wy);
        // console.log(passNodes.map(e => e.includes(...wallCheck)));
        // console.log(passNodes.map(e => e.includes(...wallCheck2)));
        // console.log(i);

    }
    while (i < 100 && (passNodes.map(e => e.includes(...wallCheck)).reduce((a, b) => a + b, 0) > 0 || passNodes.map(e => e.includes(...wallCheck2)).reduce((a, b) => a + b, 0) > 0))

    let px;
    let py;
    let j = 0;
    if (i === 100) {
        let passCheck = [];
        let passCheck2 = [];
        do {
            passCheck = [orientation];
            passCheck2 = [orientation];
            px = wx + (horizontal ? Math.floor(Math.random() * (width - 1) + 1) : 0);
            py = wy + (horizontal ? 0 : Math.floor(Math.random() * (height - 1) + 1));
            if (horizontal) {
                passCheck.push(px + 1, py)
                passCheck2.push(px - 1, py);
            } else {
                passCheck.push(px, py + 1);
                passCheck.push(px, py - 1);
            }
            j++;
            // console.log("Day la " + j);
        } while (j < 10 && !(passNodes.map(e => e.includes(...passCheck)).reduce((a, b) => a + b, 0) > 0) && !(passNodes.map(e => e.includes(...passCheck2)).reduce((a, b) => a + b, 0) > 0))
    } else {
        px = wx + (horizontal ? Math.floor(Math.random() * (width - 1) + 1) : 0);
        py = wy + (horizontal ? 0 : Math.floor(Math.random() * (height - 1) + 1));
    }
    let length = horizontal ? width : height;
    let dx = horizontal ? 1 : 0;
    let dy = horizontal ? 0 : 1;

    let passingFinal = [horizontal ? "VERTICAL" : "HORIZONTAL", px, py];
    console.log(passNodes);
    passNodes.push(passingFinal);
    console.log(passingFinal);
    console.log(passNodes);
    if (j !== 10) {
        for (let k = 0; k < length; k++) {
            wx += dx;
            wy += dy;
            if (wx !== px || wy !== py) {
                grid[wy][wx].isWall = true;
                wallInOrder.push(grid[wy][wx]);
            }
        }
    }

    if (horizontal) {
        divide(grid, x, y, width, wy - y - 1, chooseOrientation(width, wy - y - 1), wallInOrder, passNodes);
        divide(grid, x, wy, width, y + height - wy, chooseOrientation(width, y + height - wy), wallInOrder, passNodes);
    } else {
        divide(grid, x, y, wx - x - 1, height, chooseOrientation(wx - x - 1, height), wallInOrder, passNodes);
        divide(grid, wx, y, x + width - wx, height, chooseOrientation(x + width - wx, height), wallInOrder, passNodes);
    }
};


 