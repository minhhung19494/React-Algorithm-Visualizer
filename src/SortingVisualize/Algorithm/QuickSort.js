export function quickSortAlgo(arr) {
    const animateArr = [];
    quickSortHelper(arr, 0, arr.length - 1, animateArr)
    return animateArr;
}
function quickSortHelper(arr, startPoint, endPoint, animateArr) {
    // console.log(arr);
    if (startPoint === endPoint) {
        animateArr.push(
            {
                state: 'finish',
                newArray: [...arr],
                runningPoint: null,
                pivotPoint: null,
                comparePoint: null,
                finishPoint: startPoint
            });
            return;
    }
    let pivot = endPoint;
    let runningPoint = startPoint;
    // console.log(runningPoint);
    for (let i = startPoint + 1; i <= endPoint; i++) {
        if (i === endPoint && arr[runningPoint] <= arr[pivot] && runningPoint < endPoint - 1) {
            runningPoint++;
            let tmp = arr[pivot];
            arr[pivot] = arr[runningPoint];
            arr[runningPoint] = tmp;
        } else if (i === endPoint && arr[runningPoint] <= arr[pivot] && runningPoint === endPoint - 1) {
            runningPoint++;
        } else if (i === endPoint && arr[runningPoint] > arr[pivot]) {
            let tmp = arr[pivot];
            arr[pivot] = arr[runningPoint];
            arr[runningPoint] = tmp;
        } else if (arr[i] <= arr[pivot]) {
            let tmp = arr[i];
            arr[i] = arr[runningPoint];
            arr[runningPoint] = tmp;
            runningPoint++;
            if (runningPoint < i) {
                i--;
            };
        }
        animateArr.push(
            {
                state: 'partionning',
                newArray: [...arr],
                runningPoint: runningPoint,
                pivotPoint: pivot,
                comparePoint: i
            })
    }
    animateArr.push(
        {
            state: 'partioned',
            newArray: [...arr],
            runningPoint: null,
            pivotPoint: runningPoint,
            comparePoint: null
        });
    console.log(runningPoint);
    // console.log(arr);
    // return
    if (runningPoint > startPoint) {
        quickSortHelper(arr, startPoint, runningPoint - 1, animateArr);
    }
    if (runningPoint < endPoint) {
        quickSortHelper(arr, runningPoint + 1, endPoint, animateArr);
    }
}

