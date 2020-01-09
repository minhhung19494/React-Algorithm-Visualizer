export function selectionSortAlgo(arr){
    const animateArr = [];
    for(let i=0; i<arr.length; i++){
        let minIdx = i;
        for(let j=i; j<arr.length; j++){
            if(arr[j]<arr[minIdx]){
                minIdx = j;
            }
            animateArr.push({
                state: 'compare',
                barCompare: [minIdx, j] 
            })
        }
        let tmp = arr[i];
        arr[i]= arr[minIdx];
        arr[minIdx] = tmp;
        animateArr.push({
            state: 'done',
            barDone: i,
            newArray: [...arr]
        })
    }
    return animateArr;

}