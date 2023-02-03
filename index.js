'use strict';
const input = 'Математика';
const probability = {};
const ids = {};
let count = 0;
const countLetters = () => {
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input.length; j++) {
            if (input[i] === input[j]) {
                count++;
                ids[input[i].toLowerCase()] = count;
            }
        }
        count = 0;
    }
};
countLetters();
for (const key in ids) {
    ids[key] = ids[key] / input.length;
}
const sorty = (array) => {
    return array.sort(([, a], [, b]) => b - a);
};
const idsMatrix = Object.entries(ids);
// console.log(idsMatrix);
const res = [];
const huffman = (array) => {
    if (res.length === array.length - 1)
        return res;
    const sortedArr = sorty(array);
    console.log(sortedArr);
    // array[array.length - 1] + array[array.length - 2];
    res.push(sortedArr[sortedArr.length - 2]);
    res.push(sortedArr[sortedArr.length - 1]);
    return res;
    // return huffman(array);
};
console.log(huffman(idsMatrix));
