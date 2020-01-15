export function mergeSortAlgo(arr) {
    const animateArr = [];
    // const addArray = [...arr]; when use merSortWithAddArray
    mergeSortInPlace(arr, 0, arr.length - 1, animateArr);
    return animateArr;
}
function mergeSortWithAddArray(arr, addArray, startPoint, endPoint, animateArr) {
    if (startPoint === endPoint) { return }
    let middlePoint = (endPoint - startPoint + 1) / 2;
    let newStart = Math.ceil(endPoint - middlePoint + 1);
    let newEnd = Math.ceil(startPoint + middlePoint - 1);
    console.log(startPoint, newEnd, newStart, endPoint);
    mergeSortWithAddArray(arr, addArray, startPoint, newEnd, animateArr);
    mergeSortWithAddArray(arr, addArray, newStart, endPoint, animateArr);
    let j = newStart;
    let i = startPoint;
    for (let idx = startPoint; idx <= endPoint; idx++) {
        if (arr[j] <= arr[i] && j <= endPoint && i <= newEnd) {
            addArray[idx] = arr[j];
            animateArr.push({
                newArray: [...addArray],
                barCompare: [i, j]
            });
            j++;
        } else if (arr[i] <= arr[j] && i <= newEnd && j <= endPoint) {
            addArray[idx] = arr[i];
            animateArr.push({
                newArray: [...addArray],
                barCompare: [i, j]
            });
            i++;
        } else if (i > newEnd) {
            addArray[idx] = arr[j];
            animateArr.push({
                newArray: [...addArray],
                barCompare: [i - 1, j]
            });
            j++;
        } else if (j > endPoint) {
            addArray[idx] = arr[i];
            animateArr.push({
                newArray: [...addArray],
                barCompare: [i, j - 1]
            });
            i++;
        }
    }
    for (let k = startPoint; k <= endPoint; k++) {
        arr[k] = addArray[k];
    }
}
function mergeSortInPlace(arr, startPoint, endPoint, animateArr) {
    if (startPoint === endPoint) { return }
    let middlePoint = Math.floor(startPoint + (endPoint - startPoint) / 2);
    mergeSortInPlace(arr, startPoint, middlePoint, animateArr);
    mergeSortInPlace(arr, middlePoint + 1, endPoint, animateArr);
    merge(arr, startPoint, middlePoint, endPoint, animateArr)

}
function merge(arr, startPoint, midPoint, endPoint, animateArr) {
    let start2 = midPoint + 1;
    if (arr[midPoint] <= arr[start2]) return;
    while (startPoint <= midPoint && start2 <= endPoint) {
        if (arr[startPoint] <= arr[start2]) {
            animateArr.push({
                newArray: [...arr],
                barCompare: [startPoint, start2]
            })
            startPoint++;
        } else {
            let tmpValue = arr[start2];
            let index = start2;
            while (index > startPoint) {
                arr[index] = arr[index - 1];
                index--;
            }
            arr[startPoint] = tmpValue;
            animateArr.push({
                newArray: [...arr],
                barCompare: [startPoint, start2]
            })
            startPoint++;
            start2++;
            midPoint++;
        }
    }
    while (startPoint <= midPoint) {
        animateArr.push({
            newArray: [...arr],
            barCompare: [startPoint, start2-1]
        })
        startPoint++;
    }
    while (start2 <= endPoint) {
        animateArr.push({
            newArray: [...arr],
            barCompare: [startPoint-1, start2]
        });
        start2++;
    }

}
