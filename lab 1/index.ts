'use strict';

const input: string = 'Математика';
const probability = {};
const ids: {[key: string]: number} = {};
let count: number = 0;

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

const sorty = (array: [string, number][]): [string, number][] => {
    return array.sort(([, a], [, b]) => b - a);
};

const idsMatrix = Object.entries(ids);

// console.log(idsMatrix);

const res: [string, number][] = [];

const huffman = (array: [string, number][]) => {
    if (res.length === array.length - 1) return res;
    const sortedArr: [string, number][] = sorty(array);
    console.log(sortedArr);
    // array[array.length - 1] + array[array.length - 2];
    res.push(sortedArr[sortedArr.length - 2]);
    res.push(sortedArr[sortedArr.length - 1]);
    return res; 
    // return huffman(array);

};
console.log(huffman(idsMatrix));



// function Huffman(arr, memo = {}) {
//     if (arr.length === 1) return arr[0];
//     const checked = arr.sort((a, b) => a - b);

//     console.log(checked);
    
//     checked[1] = +(checked[0] + checked[1]).toFixed(2);
//     // // checked[checked.length - 2][0] = `${checked[checked.length - 1][0]}, ${checked[checked.length - 2][0]}`;
//     delete checked[0];

//     memo[arr[0]] = 01;

//     return Huffman(checked.filter(elem => elem !== undefined), );
// }
// console.log(Huffman(wassup));