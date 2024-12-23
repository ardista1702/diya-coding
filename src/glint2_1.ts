class Solution {
    private data: string;
    private column_length: number = 20;
    private interval: number;

    constructor(data: string, interval: number) {
        this.data = data;
        this.interval = interval;
    }

    public string_to_number(): number[] {
        let result:number[] = [];
        const splittedString = this.data.split(' ');
        const n = splittedString.length;
        for(let i = 0;i<n;i++){
            result.push(parseInt(splittedString[i]));
        }
        return result;
    }

    public convert_into_matrix(): number[][] {
        const input = this.string_to_number();
        const result: number[][] = [];
        const column_length = this.column_length;

        for (let i = 0; i < input.length; i += column_length) {
            result.push(input.slice(i, i + column_length));
        }
        return result;
    }

    private max_multiplication(arr: number[]): {max:number,subArray:number[]} {
        let max = -Infinity;
        let left = 0;
        let result = 1;
        const len = arr.length;
        let bestSubArray:number[] = [];
        while(left <= len - this.interval){
            let currentSubArray:number[] = [];

            for(let right = left;right < this.interval + left;right++){
                result *= arr[right];
                currentSubArray.push(arr[right]);
            }
            if(result > max){
                max = result;
                 bestSubArray = [...currentSubArray];
            }
           
            result = 1;
            left++
        }
        return {max:max,subArray:bestSubArray}
    }

    public horizontal_max(): {max:number,subArray:number[]} {
        const matrix = this.convert_into_matrix();
        let max_horizontal = -Infinity;
        let bestSubArray:number[] = [];
        for (const row of matrix) {
            const {max,subArray} = this.max_multiplication(row)
            if(max > max_horizontal){
                max_horizontal = max;
                bestSubArray = [...subArray]

            }
            // console.log(`Update max horizontal menjadi: ${max_horizontal}`);
            // console.log('--------------');
        }

        return {max:max_horizontal,subArray:bestSubArray};
    }

    public vertikal_max(): {max:number,subArray:number[]} {
        const matrix = this.convert_into_matrix();
        // const interval = this.interval;
        const colLength = matrix[0].length;
        const rowLength = matrix.length;
        let bestSubArray:number[] = []
        let max_ver = -Infinity;

        // console.log('Menghitung bagian vertikal');
        for (let col = 0; col < colLength; col++) {
            let columnElements: number[] = [];
            for (let row = 0; row < rowLength; row++) {
                columnElements.push(matrix[row][col]);
            }
            // console.log(columnElements.length)
            if (columnElements.length >= this.interval) {
                const{max,subArray} = this.max_multiplication(columnElements);
                if(max > max_ver){
                    max_ver = max;
                    bestSubArray = [...subArray]
                }
                // console.log(`Update max vertikal menjadi: ${max_ver}`);
                // console.log('--------------');
            }
        }

        return {max:max_ver,subArray:bestSubArray};
    }

    public all_diagonal_max(): {max:number,subArray:number[]} {
        const matrix = this.convert_into_matrix();
        const interval = this.interval;
        const colLength = matrix[0].length;
        const rowLength = matrix.length;
        let max_diagonal = -Infinity;
        let bestSubArray:number[] = [];
        // console.log('Menghitung diagonal pertama');
        for (let startRow = 0; startRow < rowLength; startRow++) {
            let diagonal1: number[] = [];
            for (let i = 0; startRow + i < rowLength && i < colLength; i++) {
                diagonal1.push(matrix[startRow + i][i]);
                // console.log(`diagonal 1 : `,[startRow + i,i])
            }
            if (diagonal1.length >= interval) {
                const {max,subArray} = this.max_multiplication(diagonal1);
                if(max > max_diagonal){
                    max_diagonal = max;
                    bestSubArray = [...subArray];
                }
            }
        }

        // console.log('Menghitung sub-diagonal pertama');
        for (let startCol = 1; startCol < colLength; startCol++) {
            let sub_diagonal1: number[] = [];
            for (let i = 0; startCol + i < colLength && i < rowLength; i++) {
                sub_diagonal1.push(matrix[i][startCol + i]);
                // console.log('sub diagonal pertama: ',[i,startCol + i])
            }
            if (sub_diagonal1.length >= interval) {
                const {max,subArray} = this.max_multiplication(sub_diagonal1);
                if(max > max_diagonal){
                    max_diagonal = max;
                    bestSubArray = [...subArray];
                }
            }
        }

        // console.log('Menghitung diagonal kedua');
        // bataasan:ketika row di geser,row tidak boleh ke luar dari matrix artinya ketika row + shifter ditambah jumlah nya tidak boleh lebih dari jumlah row nya*/
        for (let startRow = 0; startRow < rowLength; startRow++) {
            let diagonal2: number[] = [];
            for (let i = 0; startRow + i < rowLength && colLength - i - 1 >= 0; i++) {
                diagonal2.push(matrix[startRow + i][colLength - i - 1]);
                // console.log('diagonal kedua : ',[startRow + i,colLength - i - 1])
            }
            if (diagonal2.length >= interval) {
                const {max,subArray} = this.max_multiplication(diagonal2);
                if(max > max_diagonal){
                    max_diagonal = max;
                    bestSubArray = [...subArray];
                }
            }
        }

        // console.log('Menghitung sub-diagonal kedua');
        for (let startCol = colLength - 2; startCol >= 0; startCol--) {
            let sub_diagonal2: number[] = [];
            for (let i = 0; startCol - i >= 0 && i < rowLength; i++) {
                sub_diagonal2.push(matrix[i][startCol - i]);
                // console.log('sub diagonal kedua :  ',[i,startCol-i])
            }
            if (sub_diagonal2.length >= interval) {
                const {max,subArray} = this.max_multiplication(sub_diagonal2);
                if(max > max_diagonal){
                    max_diagonal = max;
                    bestSubArray = [...subArray];
                }
            }
        }

        return {max:max_diagonal,subArray:bestSubArray};
    }
    public getTheMaxOfAll():void{
        const {max:horizontalMax,subArray:horizontalSubArray} = this.horizontal_max()
        const {max:vertikalMax,subArray:vertikalSubArray} = this.vertikal_max()
        const {max:diagonalMax,subArray:DiagonalSubArray} = this.all_diagonal_max()
        const the_greatest = Math.max(horizontalMax,vertikalMax,diagonalMax);
        let direction:string = '';
        let bestSubArray:number[] = [];
        if(the_greatest === horizontalMax){
            direction += 'Horizontal';
            bestSubArray = horizontalSubArray;
        }else if(the_greatest === vertikalMax){
            direction += 'Vertikal'
            bestSubArray = vertikalSubArray
        }else if(the_greatest === diagonalMax){
            direction += 'Diagonal'
            bestSubArray = DiagonalSubArray;
        }


        console.log(`perkalian empat angka diantara digonal,vertikal,dan horizontal adalah ${the_greatest} pada ${direction} dengan angka angka ${bestSubArray}`)
        }
}
// Testing
const data = '08 02 22 97 38 15 00 40 00 75 04 05 07 78 52 12 50 77 91 08 49 49 99 40 17 81 18 57 60 87 17 40 98 43 69 48 04 56 62 00 81 49 31 73 55 79 14 29 93 71 40 67 53 88 30 03 49 13 36 65 52 70 95 23 04 60 11 42 69 24 68 56 01 32 56 71 37 02 36 91 22 31 16 71 51 67 63 89 41 92 36 54 22 40 40 28 66 33 13 80 24 47 32 60 99 03 45 02 44 75 33 53 78 36 84 20 35 17 12 50 32 98 81 28 64 23 67 10 26 38 40 67 59 54 70 66 18 38 64 70 67 26 20 68 02 62 12 20 95 63 94 39 63 08 40 91 66 49 94 21 24 55 58 05 66 73 99 26 97 17 78 78 96 83 14 88 34 89 63 72 21 36 23 09 75 00 76 44 20 45 35 14 00 61 33 97 34 31 33 95 78 17 53 28 22 75 31 67 15 94 03 80 04 62 16 14 09 53 56 92 16 39 05 42 96 35 31 47 55 58 88 24 00 17 54 24 36 29 85 57 86 56 00 48 35 71 89 07 05 44 44 37 44 60 21 58 51 54 17 58 19 80 81 68 05 94 47 69 28 73 92 13 86 52 17 77 04 89 55 40 04 52 08 83 97 35 99 16 07 97 57 32 16 26 26 79 33 27 98 66 88 36 68 87 57 62 20 72 03 46 33 67 46 55 12 32 63 93 53 69 04 42 16 73 38 25 39 11 24 94 72 18 08 46 29 32 40 62 76 36 20 69 36 41 72 30 23 88 34 62 99 69 82 67 59 85 74 04 36 16 20 73 35 29 78 31 90 01 74 31 49 71 48 86 81 16 23 57 05 54 01 70 54 71 83 51 54 69 16 92 33 48 61 43 52 01 89 19 67 48'
const obj = new Solution(data,4);
// console.log(`Max Horizontal = ${obj.horizontal_max()}`);
// console.log(`Max Vertikal = ${obj.vertikal_max()}`);
// console.log(`Max Diagonal = ${obj.all_diagonal_max()}`);
console.log(obj.convert_into_matrix())
// console.log(obj.string_to_number())
obj.getTheMaxOfAll();
