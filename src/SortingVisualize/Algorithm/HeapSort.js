export function heapSortAlgo(arr) {
    const animateArr = [];
    for (let i = Math.floor(arr.length / 2 - 1); i >= 0; i--) {
        heapHelper(arr, i, arr.length, animateArr)
    }
    for (let n = arr.length - 1; n >= 0; n--) {
        swap(arr, n, 0);
        animateArr.push({
            state: 'finish',
            finish: n,
            newArray: [...arr]
        })
        heapHelper(arr, 0, n, animateArr)
    }
    return animateArr;
}

function heapHelper(arr, i, lengthArray, animateArr) {
    let leftPoint = 2 * i + 1;
    let rightPoint = 2 * i + 2;
    let largestPoint = i;
    if (leftPoint < lengthArray && rightPoint < lengthArray) {
        animateArr.push({
            state: 'heapify',
            comparePoint: [leftPoint, rightPoint],
            largestPoint: largestPoint,
            newArray: [...arr]
        });
    }
    if (arr[leftPoint] > arr[largestPoint] && leftPoint < lengthArray) {
        largestPoint = leftPoint;
    }
    if (arr[rightPoint] > arr[largestPoint] && rightPoint < lengthArray) {
        largestPoint = rightPoint;
    }
    if (largestPoint !== i) {
        swap(arr, i, largestPoint);
        heapHelper(arr, largestPoint, lengthArray, animateArr);
    }
}
function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}