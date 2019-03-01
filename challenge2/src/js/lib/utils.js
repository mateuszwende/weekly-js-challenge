export function objToArr(obj) {
    let arr = [];
    for (let prop in obj) {
        arr.push(obj[prop]);
    }
    return arr;
}