export function mergeSortAlgo(arr) {
    const animateArr = [];
    const resultArr = [...arr];
    mergeSortHelper(arr, resultArr, 0, arr.length - 1, animateArr);
    return animateArr;
}
function mergeSortHelper(arr, resultArr, startPoint, endPoint, animateArr) {
    if (startPoint === endPoint) { return }
    let middlePoint = (endPoint - startPoint + 1) / 2;
    let newStart = Math.ceil(endPoint - middlePoint + 1);
    let newEnd = Math.ceil(startPoint + middlePoint - 1);
    console.log(startPoint, newEnd, newStart, endPoint);
    mergeSortHelper(arr, resultArr, startPoint, newEnd, animateArr);
    mergeSortHelper(arr, resultArr, newStart, endPoint, animateArr);
    let j = newStart;
    let i = startPoint;
    for (let idx = startPoint; idx <= endPoint; idx++) {
        if (arr[j] <= arr[i] && j <= endPoint && i <= newEnd) {
            resultArr[idx] = arr[j];
            animateArr.push({
                newArray: [...resultArr],
                barCompare: [i, j]
            });
            j++;
        } else if (arr[i] <= arr[j] && i <= newEnd && j <= endPoint) {
            resultArr[idx] = arr[i];
            animateArr.push({
                newArray: [...resultArr],
                barCompare: [i, j]
            });
            i++;
        } else if (i > newEnd) {
            resultArr[idx] = arr[j];
            animateArr.push({
                newArray: [...resultArr],
                barCompare: [i-1, j]
            });
            j++;
        } else if (j > endPoint) {
            resultArr[idx] = arr[i];
            animateArr.push({
                newArray: [...resultArr],
                barCompare: [i, j-1]
            });
            i++;
        }
    }
    for(let k=startPoint; k<=endPoint; k++){
        arr[k]= resultArr[k];
    }
}
