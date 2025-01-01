import { emitKeypressEvents } from "readline";
import { isDeepStrictEqual } from "util";

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

    // buatMatrixBerdasarkanInput(): Map<number, number[][]> {
    //     let indexMatrixKeI = 0;
    //     const mapMatrix: Map<number, number[][]> = new Map();
    //     for (const ukuranMatrix of this.getArrayNumberFromData()) {
    //         const matrix:number[][] = [];
    //         const jumlahMaksimalElemen = ukuranMatrix ** 2;
    //         const elementYangAkanDiInput:number[] = new Array(jumlahMaksimalElemen)
    //         for(let i = 0;i< jumlahMaksimalElemen;i++){
    //             elementYangAkanDiInput[i] = i + 1;
    //         }
    //         for(let j = 0;j<elementYangAkanDiInput.length;j+=ukuranMatrix){
    //             matrix.push(elementYangAkanDiInput.slice(j,j+ukuranMatrix))
    //         }
    //         mapMatrix.set(indexMatrixKeI,matrix);
    //         indexMatrixKeI++;
    //     }
    //         return mapMatrix;
    // }

    //  ambilAngkaYangMengelilingiTengah(): number[][] {
    //     let result:number[][] = [];
    //     const matrix2 = this.buatMatrixBerdasarkanInput();
    //     for(const [_,matrix] of matrix2){
    //         const baris = matrix.length;
    //         const kolom = matrix[0].length;
    //         const barisTengah = Math.floor(baris / 2);
    //         const kolomTengah = Math.floor(kolom / 2);
    //         const yangMengeliliTengah:number[] = []
    //         for(let i = barisTengah - 1;i<=barisTengah + 1;i++){
    //             for(let j = kolomTengah - 1;j<=kolomTengah + 1;j++){
    //                 if(!(i === barisTengah && j === kolomTengah)){
    //                     yangMengeliliTengah.push(matrix[i][j])
    //                 }
    //             }
    //         }
    //         result.push(yangMengeliliTengah)
    //     }
    //     return result
    // }

    buatPapan():number[][]{
        const ukuranYangTersedia = this.getArrayNumberFromData();

        const papanDenganTiapUkuran:number[][] = [];
        for(const ukuranPapan of ukuranYangTersedia){
            const elemenYangAkanDiInput:number[] = [];
            for(let i = 1;i<= ukuranPapan ** 2;i++){
                elemenYangAkanDiInput[i - 1] = i;
        
            }
            papanDenganTiapUkuran.push(elemenYangAkanDiInput)
        }
        
        return papanDenganTiapUkuran;
    }

    ambilYangMengelilingiTengah():number[][]{
        const semuaAngkaYangMengelilingiYangTengahSetiapPapan:number[][] = [];
        for(const papan of this.buatPapan()){
            const ukuran = Math.sqrt(papan.length)
            const indexTengah = Math.floor(papan.length / 2);
            const barisTengah = Math.floor(indexTengah / ukuran);
            const kolomTengah = indexTengah % ukuran;

            const angkaYangMengeliliTengahPapan:number[] = [];
            for(let i = barisTengah - 1;i<=barisTengah + 1;i++){
                for(let j = kolomTengah - 1;j<=kolomTengah + 1;j++){
                    const index = (i * ukuran) + j;
                    if(i >= 0 && j >= 0 && i < ukuran && j < ukuran){
                        if(index !== indexTengah){
                            angkaYangMengeliliTengahPapan.push(papan[index])
                        }
                    }
                }
            
            }
            semuaAngkaYangMengelilingiYangTengahSetiapPapan.push(angkaYangMengeliliTengahPapan)
        }
        return semuaAngkaYangMengelilingiYangTengahSetiapPapan;

    }
    public hitungJumlah():void{
        let semuaAngkaYangMengelilingiYangTengah = this.ambilYangMengelilingiTengah();
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
console.log(sol2.buatPapan());
console.log(sol2.ambilYangMengelilingiTengah())
// console.log(sol2.buatMatrixBerdasarkanInput())
// console.log(sol2.getArrayNumberFromData())
// console.log(sol2.ambilAngkaYangMengelilingiTengah())
sol2.hitungJumlah();