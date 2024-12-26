class solusiNomer2 {
    private data: string;

    constructor(data_: string) {
        this.data = data_;
    }

    private ubahDataMenjadiArrayNumber(): number[] {
        let result:number[] = [];
        const splitSpasi = this.data.split(' ');
        const n = splitSpasi.length;
        for(let i = 0;i<n;i++){
            result.push(Number(splitSpasi[i]));
        }
        return result;

    }

    private petakanKasus(): number[][] {
        let kasus2: number[][] = [];
        let i = 1;
        let arrayKasus = this.ubahDataMenjadiArrayNumber();
        const n = arrayKasus.length;

        while (i < n) {
            let jumlahLantaiYangTersedia: number[] = [];

            const jumlahLantaiYangDibutuhkan = arrayKasus[i]; 

            // Ambil elemen-elemen sesuai jumlah yang didefinisikan
            for (let j = 1; j <= jumlahLantaiYangDibutuhkan && i + j < n; j++) {
                jumlahLantaiYangTersedia.push(arrayKasus[i + j]);
            }

            kasus2.push(jumlahLantaiYangTersedia);
            i += jumlahLantaiYangDibutuhkan + 1; // Pindah ke elemen berikutnya setelah kasus ini
        }

        return kasus2;
    }

    private partisi(arr: number[], low: number, high: number): number {
        const pivot = Math.abs(arr[high]);
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (Math.abs(arr[j]) > pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        return i + 1;
    }

    private sort(arr: number[], low: number, high: number): void {
        if (low < high) {
            const pivotIndex = this.partisi(arr, low, high);
            this.sort(arr, low, pivotIndex - 1);
            this.sort(arr, pivotIndex + 1, high);
        }
    }

    private urutkanDariAtasKeBawah(): number[][] {
        let arrayKasus = this.petakanKasus();
        for (const kasus of arrayKasus) {
            const high = kasus.length - 1;
            const low = 0;
            this.sort(kasus, low, high);
        }
        return arrayKasus;
    }

    outPut(): void {
        const result: string[][] = [];
        let kasusYangSudahDiOlah = this.urutkanDariAtasKeBawah();

        for (const kasus of kasusYangSudahDiOlah) {
            let i = 0;
            const n = kasus.length;
            const stack: string[] = [];

            while (i < n) {
                const start = kasus[i];
                let end = start;
                // Kelompokkan positif atau negatif
                while (i + 1 < n && (kasus[i + 1] > 0) === (start > 0)) {
                    end = kasus[i + 1];
                    i++;
                }

                if (start !== end) {
                    stack.push(`${start}->${end}`);
                } else {
                    stack.push(`${start}`);
                }

                i++;
            }

            result.push(stack); 
        }

        for(const res of result){
            console.log(res.length)
        }
    }
}

const data1 = "2 5 7 -2 6 9 -3 8 11 -9 2 5 18 17 -15 4";

let sol = new solusiNomer2(data1);
sol.outPut();