/*======================================================
BANK VALIDATOR DASHBOARD
FINAL SCRIPT.JS
======================================================*/

/*==============================
ELEMENT
==============================*/

const textarea = document.getElementById("pasteData");

const processBtn = document.getElementById("processBtn");
const resetBtn = document.getElementById("resetBtn");
const exportBtn = document.getElementById("exportBtn");
const copyBtn = document.getElementById("copyBtn");

const totalValidasi = document.getElementById("totalValidasi");
const grandTotal = document.getElementById("grandTotal");
const clock = document.getElementById("clock");

const loading = document.getElementById("loading");
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

/*==============================
BANK LIST
==============================*/

const BANKS = [
    {name:"BCA",id:"bca"},
    {name:"BNI",id:"bni"},
    {name:"BRI",id:"bri"},
    {name:"BSI",id:"bsi"},
    {name:"MANDIRI",id:"mandiri"},
    {name:"DANAMON",id:"danamon"},
    {name:"CIMB",id:"cimb"},
    {name:"OCBC",id:"ocbc"},
    {name:"MEGA",id:"mega"},
    {name:"SINARMAS",id:"sinarmas"},
    {name:"PERMATA",id:"permata"},
    {name:"PANIN",id:"panin"},
    {name:"BANK JAGO",id:"bankjago"},
    {name:"MAYBANK",id:"maybank"},
    {name:"SEABANK",id:"seabank"},
    {name:"OVO",id:"ovo"},
    {name:"GOPAY",id:"gopay"},
    {name:"DANA",id:"dana"},
    {name:"LINKAJA",id:"linkaja"},
    {name:"ALLOBANK",id:"allobank"}
];

/*==============================
TOAST
==============================*/

function showToast(msg){
    toastMessage.innerText = msg;
    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    },2000);
}

/*==============================
LOADING
==============================*/

function showLoading(){
    loading.style.display = "flex";
}

function hideLoading(){
    loading.style.display = "none";
}

/*==============================
RESET
==============================*/

function resetTable(){

    BANKS.forEach(b=>{
        document.getElementById(b.id).innerText = 0;
    });

    totalValidasi.innerText = 0;
    grandTotal.innerText = 0;
}

/*==============================
PROCESS DATA
==============================*/

function processData(){

    let text = textarea.value.trim();

    if(!text){
        showToast("Data masih kosong");
        return;
    }

    showLoading();

    setTimeout(()=>{

        let total = 0;

        BANKS.forEach(bank=>{

            let regex = new RegExp(bank.name.replace(" ","\\s?"),"gi");

            let match = text.match(regex);

            let count = match ? match.length : 0;

            document.getElementById(bank.id).innerText = count;

            total += count;

        });

        totalValidasi.innerText = total;
        grandTotal.innerText = total;

        hideLoading();
        showToast("Proses selesai");

    },300);

}

/*==============================
EVENT PROCESS
==============================*/

processBtn.addEventListener("click",processData);

/*==============================
RESET
==============================*/

resetBtn.addEventListener("click",()=>{

    textarea.value = "";
    resetTable();
    showToast("Reset berhasil");

});

/*==============================
COPY (ONLY BANK - NO TOTAL)
==============================*/

copyBtn.addEventListener("click",()=>{

    let row = [];

    // ❌ TOTAL VALIDASI DIHAPUS

    BANKS.forEach(b=>{
        let el = document.getElementById(b.id);
        row.push(el.innerText || 0);
    });

    let result = row.join("\t");

    navigator.clipboard.writeText(result);

    showToast("Copy berhasil");

});

/*==============================
EXPORT CSV
==============================*/

exportBtn.addEventListener("click",()=>{

    let header = BANKS.map(b=>b.name);
    let values = BANKS.map(b=>{
        return document.getElementById(b.id).innerText || 0;
    });

    let csv = [
        header.join(","),
        values.join(",")
    ].join("\n");

    let blob = new Blob([csv],{type:"text/csv"});
    let url = URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href = url;
    a.download = "bank-validator.csv";
    a.click();

    URL.revokeObjectURL(url);

    showToast("CSV downloaded");

});

/*==============================
CLOCK
==============================*/

setInterval(()=>{

    let now = new Date();

    let h = String(now.getHours()).padStart(2,"0");
    let m = String(now.getMinutes()).padStart(2,"0");
    let s = String(now.getSeconds()).padStart(2,"0");

    clock.innerText = `${h}:${m}:${s}`;

},1000);

/*==============================
AUTO FOCUS
==============================*/

window.onload = ()=>{
    textarea.focus();
};