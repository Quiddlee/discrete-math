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
for (const key in ids) {
    ids[key] = ids[key] / input.length;
}
const sorty = (array) => {
    return array.sort(([, a], [, b]) => b - a);
};
const idsMatrix = Object.entries(ids);
console.log(idsMatrix);
const huffman = (array) => {
    if (array.length === 1)
        return array[0];
    const sortedArr = sorty(array);
    return huffman(array[array.length - 1][1]) + huffman(array[array.length - 2][1]);
};
console.log(huffman(idsMatrix));
