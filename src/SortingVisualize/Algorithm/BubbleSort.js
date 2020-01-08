export function newBubbleSort(arr) {
    const animateArr = [];
    for (let i = arr.length-1; i >= 0; i--) {
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                let tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
            animateArr.push([j,j+1,[...arr]])
        }
        animateArr.push([i, [...arr]])
    }
    return animateArr;
}