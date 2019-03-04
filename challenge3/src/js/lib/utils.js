export function objToArr(obj) {
    let arr = [];
    for (let prop in obj) {
        arr.push(obj[prop]);
    }
    return arr;
}

export function capitalize(str) {
    return str
            .split("")
            .map((letter, i) => i === 0 ? letter.toUpperCase() : letter)
            .join("");
}