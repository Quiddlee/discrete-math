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
    count: number;
    length: number;
    res: StrNumArr;
    idsMatrix: StrNumArr;
    bits: Bits;


    constructor(input: string) {
        this.input = input;
        this.probability = [];
        this.ids = {};
        this.count = 0;
        this.length = input.length;
        this.res = [];
        this.idsMatrix = [];
        this.bits = {};
    };

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
    };

    makeIds() {
        for (const key in this.ids) {
            this.ids[key] = Number((this.ids[key] / this.length).toFixed(2));
        }

        return Object.entries(this.ids);
    };

    sorty(array: [string, number][]) {
        array.sort(([, a], [, b]) => b - a);
    };

    countBits(arr: [string, number][]): [string, number][] {
        if (arr.length === 1) return arr;
        this.sorty(arr);

        const one = (arr[arr.length - 2][0]).split(',');
        const zero = (arr[arr.length - 1][0]).split(',');

        console.log(arr);

        // console.log(one);
        // console.log(zero);

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

        arr[arr.length - 2][1] = Number((arr[arr.length - 1][1] + arr[arr.length - 2][1]).toFixed(2));
        arr[arr.length - 2][0] = `${arr[arr.length - 1][0]}, ${arr[arr.length - 2][0]}`;
        delete arr[arr.length - 1];

        return this.countBits(arr.filter(elem => elem !== undefined));
    };

    render() {
        this.countLetters();
        this.idsMatrix = this.makeIds();
        this.probability = [...this.idsMatrix];

        this.idsMatrix.forEach(elem => {
            this.bits[Object.values(elem)[0]] = '';
        });

        this.sorty(this.idsMatrix);
        console.log(this.countBits(this.idsMatrix), this.bits);
    };
}

new Huffman('богдан').render();
