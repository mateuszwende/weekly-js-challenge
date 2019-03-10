export function objToArr(obj) {
    let arr = [];
    for (const key in obj) {
        arr.push(obj[key]);
    }
    return arr;
}

export function capitalize(str) {
    return str
            .split("")
            .map((letter, i) => i === 0 ? letter.toUpperCase() : letter)
            .join("");
}

export function composeDateStr(date) {
    const day = date.getDay() < 10 ? `0${date.getDay()}` : date.getDay();
    const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
    const dateStr = `${day}.${month}.${date.getFullYear()}`;
    const timeStr = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    
    return `${dateStr}, ${timeStr}`;
}

export function isEmptyArr(arr) {
    return !Array.isArray(arr) || !arr.length;
}