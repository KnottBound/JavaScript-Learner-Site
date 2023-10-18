const textareaEl = document.getElementById('textarea');
const totalCounterEl = document.getElementById('total-counter');
const invoiceCounterEl = document.getElementById('invoice-counter');

textareaEl.addEventListener("keyup", ()=>{
    updateCounter();
    updateInvoicePrice();

});

function updateCounter(){
    totalCounterEl.innerText = textareaEl.value.length;
}

function updateInvoicePrice(){
    invoiceCounterEl.innerText = "$" + textareaEl.value.length * .41;
}