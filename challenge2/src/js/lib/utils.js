export function objToArr(obj) {
    let arr = [];
    for (const key in obj) {
        arr.push(obj[key]);
    }
    return arr;
}