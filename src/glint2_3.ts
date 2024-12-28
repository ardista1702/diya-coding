class SolusiNomer3 {
    private data: string;

    constructor(data_: string) {
        this.data = data_;
    }

    getArrayNumberFromData(): number[] {

        const result: number[] = [];
        const splitSpasi = this.data.split(' ');
        const n = splitSpasi.length;
        for (let i = 0; i < n; i++) {
            result.push(Number(splitSpasi[i]));
        }
        result.shift(); //hapus angka pertama,karena yang dibutuhkan adalah data dari angka kedua dst
        return result;
    }

    buatMatrixBerdasarkanInput(): Map<number, number[][]> {
        let indexMatrixKeI = 0;
        const mapMatrix: Map<number, number[][]> = new Map();
        for (const ukuranMatrix of this.getArrayNumberFromData()) {
            const matrix:number[][] = [];
            const jumlahMaksimalElemen = ukuranMatrix ** 2;
            const elementYangAkanDiInput:number[] = new Array(jumlahMaksimalElemen)
            for(let i = 0;i< jumlahMaksimalElemen;i++){
                elementYangAkanDiInput[i] = i + 1;
            }
            for(let j = 0;j<elementYangAkanDiInput.length;j+=ukuranMatrix){
                matrix.push(elementYangAkanDiInput.slice(j,j+ukuranMatrix))
            }
            mapMatrix.set(indexMatrixKeI,matrix);
            indexMatrixKeI++;
        }
            return mapMatrix;
    }

     ambilAngkaYangMengelilingiTengah(): number[][] {
        let result:number[][] = [];
        const matrix2 = this.buatMatrixBerdasarkanInput();
        for(const [_,matrix] of matrix2){
            const baris = matrix.length;
            const kolom = matrix[0].length;
            const barisTengah = Math.floor(baris / 2);
            const kolomTengah = Math.floor(kolom / 2);
            const yangMengeliliTengah:number[] = []
            for(let i = barisTengah - 1;i<=barisTengah + 1;i++){
                for(let j = kolomTengah - 1;j<=kolomTengah + 1;j++){
                    if(!(i === barisTengah && j === kolomTengah)){
                        yangMengeliliTengah.push(matrix[i][j])
                    }
                }
            }
            result.push(yangMengeliliTengah)
        }
        return result
    }

    public hitungJumlah():void{
        let semuaAngkaYangMengelilingiYangTengah = this.ambilAngkaYangMengelilingiTengah();
        for(const matrix of semuaAngkaYangMengelilingiYangTengah){
            let result = matrix[0];
            for(let i = 1;i<matrix.length;i++){
                result+=matrix[i]
            }
            console.log(result);
        }
    }
}

const data3 = '10 9 11 45 23 67 71 13 101 165 133 5'; 
const sol2 = new SolusiNomer3(data3);
// console.log(sol2.buatMatrixBerdasarkanInput())
// console.log(sol2.getArrayNumberFromData())
console.log(sol2.ambilAngkaYangMengelilingiTengah())
sol2.hitungJumlah();