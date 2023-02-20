interface Ids {
    [key: string]: number;
}

interface Bits {
    [key: string]: string;
}

type StrNumArr = [string, number][];

class Huffman {
    input: string;
    probability: StrNumArr;
    ids: Ids;
    length: number;
    res: StrNumArr;
    idsMatrix: StrNumArr;
    bits: Bits;

    constructor(input: string) {
        this.input = input;
        this.probability = [];
        this.ids = {};
        this.length = input.length - 1;
        this.res = [];
        this.idsMatrix = [];
        this.bits = {};
    };

    countLetters() {
        let left = 0;
        let right = this.length;
        const memo: Ids = {};

        for (let i = 0;; --i) {
            if (left === this.length) break;
            if (right === left - 1) {
                memo[this.input[left].toLowerCase()] = 0;
                left++;
                right = this.length;
            }
            const leftLetter = this.input[left].toLowerCase();

            if (leftLetter === this.input[right].toLowerCase() && !(leftLetter in memo)) {
                if (this.ids[leftLetter]) this.ids[leftLetter]++;
                else this.ids[leftLetter] = 1;
            }

            right--;
        }
    };

    makeIds() {
        for (const key in this.ids) {
            this.ids[key] = Number((this.ids[key] / this.length).toFixed(1));
        }

        return Object.entries(this.ids);
    };

    sorty(array: [string, number][]) {
        array.sort(([, a], [, b]) => b - a);
    };

    countBits(arr: [string, number][]): [string, number][] {
        if (arr.length === 1) return arr;
        this.sorty(arr);

        const penult = arr.length - 2;
        const last = arr.length - 1;
        const one = (arr[last][0]).split(',');
        const zero = (arr[penult][0]).split(',');

        zero.forEach(elem => {
            if (elem.trim() in this.bits) {
                this.bits[elem.trim()] += 0;
            }
        });

        one.forEach(elem => {
            if (elem.trim() in this.bits) {
                this.bits[elem.trim()] += 1;
            }
        });

        arr[penult][1] = +(arr[last][1] + arr[penult][1]).toFixed(1);
        arr[penult][0] = `${arr[last][0]}, ${arr[penult][0]}`;
        delete arr[last];

        return this.countBits(arr.filter(elem => elem !== undefined));
    };

    lAvg() {
        const prob = Object.fromEntries(this.probability);
        let res = 0;
        
        for (const key in this.bits) {
            res += prob[key] * this.bits[key].length;
        }

        return res;
    };

    init() {
        this.countLetters();
        this.idsMatrix = this.makeIds();
        this.probability = JSON.parse(JSON.stringify(this.idsMatrix));

        this.idsMatrix.forEach(elem => {
            this.bits[Object.values(elem)[0]] = '';
        });
        
        this.sorty(this.idsMatrix);
        this.countBits(this.idsMatrix);

        for (const key in this.bits) {
            this.bits[key] = this.bits[key].split('').reverse().join('');
        }

        console.log(this.bits);
        console.log(this.lAvg());
    };
}

new Huffman('Математика').init();