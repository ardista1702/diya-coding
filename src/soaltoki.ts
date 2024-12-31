class solutionNomer5 {
private data:[string,number];

constructor(data:[string,number]){
this.data = data;
}

      tentukanBatasan():number{
        const result:string[] = []
        const linePertama = this.data[0];
        let batasan:number = -1;
        for(let i = 0;i<linePertama.length;i++){
            if(linePertama[i] !== `.`){
            result.push(linePertama[i])
            }
        }
        if(result[result.length - 1] === '4'){
          batasan = 1000;
        }else if(result[result.length - 1] === '3'){
            batasan =  100;
        }
       
        return batasan;
    } 
    validasiJumlahAyam():boolean{
        const banyakAyam = this.data[1]
        if(banyakAyam < 1 || banyakAyam > this.tentukanBatasan()){
            return false;
        }
        return true;
    }

    output():void{
        if(this.validasiJumlahAyam()){
            let  banyakAyamSaatIni = this.data[1];
            while(banyakAyamSaatIni >= 1){
                console.log(`anak ayam turunlah ${banyakAyamSaatIni}`);
                banyakAyamSaatIni-=1;
                if(banyakAyamSaatIni < 1){
                    console.log('mati satu tinggallah induknya');
                }else{
                    console.log(`mati satu tinggallah ${banyakAyamSaatIni}`)

                }

            }
            
            
        }else{
            console.log('jumlah ayam tidak valid');
            return;
        }
    }
    }
    

 
let data4:[string,number];
data4 = ['.1.3',0];
const sol4 = new solutionNomer5(data4);
sol4.output();