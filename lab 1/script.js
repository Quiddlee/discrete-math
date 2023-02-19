"use strict";
class Huffman {
    input;
    probability;
    ids;
    count;
    length;
    res;
    idsMatrix;
    constructor(input) {
        this.input = input;
        this.probability = {};
        this.ids = {};
        this.count = 0;
        this.length = input.length;
        this.res = [];
        this.idsMatrix = [];
    }
    ;
    countLetters() {
        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < this.length; j++) {
                if (this.input[i] === this.input[j]) {
                    this.count++;
                    this.ids[this.input[i].toLowerCase()] = this.count;
                }
            }
            this.count = 0;
        }
    }
    ;
    makeIds() {
        for (const key in this.ids) {
            this.ids[key] = this.ids[key] / this.length;
        }
        return Object.entries(this.ids);
    }
    ;
    sorty(array) {
        return array.sort(([, a], [, b]) => b - a);
    }
    ;
    render() {
        this.countLetters();
        this.idsMatrix = this.makeIds();
        this.sorty(this.idsMatrix);
        console.log(this.idsMatrix);
    }
    ;
}
new Huffman('Математика').render();
// const huffman = (array: [string, number][]) => {
//     if (res.length === array.length - 1) return res;
//     const sortedArr: [string, number][] = sorty(array);
//     console.log(sortedArr);
//     // array[array.length - 1] + array[array.length - 2];
//     res.push(sortedArr[sortedArr.length - 2]);
//     res.push(sortedArr[sortedArr.length - 1]);
//     return res;
//     // return huffman(array);
//
// };
// console.log(huffman(idsMatrix));
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
