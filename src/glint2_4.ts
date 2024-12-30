class SolusiNomer4 {
    private data: string[] = [];

    constructor(data_: string[]) {
        if (data_[0] === '0') {
            console.error("Program tidak dapat dieksekusi karena nilai indeks pertama adalah 0.");
            process.exit()
        }
        this.data = data_;
    }

    olahDataInputMenjadiArrayString(): string[] {
        if(this.data[1] === '0'){
            return [this.data[0]];
        }
        const splitSpasi = this.data[1].split(' ');
        return splitSpasi;
    }

    buatPermutasiDariDataYangDiolah(): string[] {
        const result: string[] = [];
        const data = this.olahDataInputMenjadiArrayString();

        function permute(start: number): void {
            if (start === data.length) {
                result.push([...data].join(''));
                return;
            }
            for (let i = start; i < data.length; i++) {
                [data[i], data[start]] = [data[start], data[i]];

                permute(start + 1);

                [data[i], data[start]] = [data[start], data[i]];
            }
        }
        permute(0);
        return result;
    }

    cariAngkaTerbesar(): number {
        const data: string[] = this.buatPermutasiDariDataYangDiolah();
        let maxNumber = -1;
        for (let i = 0; i < data.length; i++) {
            if (parseInt(data[i]) > maxNumber) {
                maxNumber = parseInt(data[i]);
            }
        }
        return maxNumber;
    }
}

// Contoh penggunaan
const data2 = ['3', '2 5 8'];
const sol3 = new SolusiNomer4(data2); // Program akan langsung keluar jika indeks pertama adalah '0'
console.log(sol3.olahDataInputMenjadiArrayString());
console.log(sol3.buatPermutasiDariDataYangDiolah());
console.log(sol3.cariAngkaTerbesar());
