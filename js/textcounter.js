//const textareaEl = document.getElementById('textarea');
const totalCounterEl = document.getElementById('total-counter');
const invoiceCounterEl = document.getElementById('invoice-counter');

function countWords() {
    let text = document.getElementById('textarea').value;

    let numWords = 0;

    for (let i = 0; i< text.length; i++){
        let currentCharacter = text[i];

        if(currentCharacter == " ") {
            numWords += 1;
            updateCounter();
            updateInvoicePrice();
        }
    }

    numWords += 1;

    function updateCounter(){
        totalCounterEl.innerText = numWords;
    }

    function updateInvoicePrice(){
        invoiceCounterEl.innerText = "$" + numWords * .41;
    }
}
