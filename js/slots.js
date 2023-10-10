/* Learning : Install Node.js + npm Package
Commands:
Installed Node.js (After Downloading) - npm init
Installed Package - npm i prompt-sync
Run Node.js JS Script - node \js\node.js


Advanced: After making it for the terminal with Node.js. 
I wanted to challenge myself to make it for the browser
so it would be with the rest of my projects. This seems tough!!
Installed express package and opened up ChatGPT to teach

Project Objectives:
1- Deposit Some Money
2- Determine # of Lines to Bet On
3- Collect a Bet
4- Spin Slot Machine
5- Check if User Won
6- Give the User Winnings / Take Bet
7- Play Again/No Money
*/

//Global Variables : Slot Machine
const ROWS = 3;
const COLS = 3;


document.addEventListener('DOMContentLoaded', (event) => {
    
    let balance = 0;

    function updateBalanceDisplay() {
        document.getElementById('balance').textContent = balance.toString();
    }

    document.getElementById('add-deposit-btn').addEventListener('click', () => {
        const depositAmountInput = document.getElementById('deposit-input');
        const depositAmount = parseFloat(depositAmountInput.value);
        
        if (isNaN(depositAmount) || depositAmount <= 0) {
            alert("Invalid deposit amount, try again.");
        } else {
            balance += depositAmount;  // Add deposit to the existing balance
            updateBalanceDisplay();
            depositAmountInput.value = '';  // Clear the input after adding to the balance
        }
    });
    
    document.getElementById('spinButton').addEventListener('click', () => {
    const lines = parseFloat(document.getElementById('lines').value);
    const bet = parseFloat(document.getElementById('bet').value);

    // Deduct the bet immediately
    const totalBet = bet * lines;
    if (balance < totalBet) {
        alert("Insufficient funds for this bet!");
        return;
    }
    balance -= totalBet;
    updateBalanceDisplay();

    const reels = spin();
    const rows = tranpose(reels);

    // Update the displayed rows with the result...
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            document.getElementById(`symbol-${i+1}-${j+1}`).textContent = rows[i][j];
        }
    }

    // Calculate and display winnings...
    const winnings = getWinnings(rows, bet, lines);
    balance += winnings;  // Add back the winnings
    updateBalanceDisplay();
    document.getElementById('output').innerText = "You won $" + winnings.toString();

    });

    const spin = () => {
        //generates an array of all possible symbols when creating a reel
        const symbols = []; 
        for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
            for (let i = 0; i < count; i++){
                symbols.push(symbol);
            }
        }
        //creates an array of all reels
            const reels = [];
            for (let i = 0; i < COLS; i++){
                    //for every COLS we will add an [] to the array above| Example: [[],[],[]]
                    reels.push([]);
                    //copies the symbols for this specify reel = Unique Symbols for Reel
                    const reelSymbols = [...symbols];
                //Loop through rows, select and insert symbol into Reel & remove it.    
                for (let j = 0; j < ROWS; j++){
                    const randomIndex = Math.floor(Math.random() * reelSymbols.length);
                        const selectedSymbol = reelSymbols[randomIndex];
                        reels[i].push(selectedSymbol);
                        reelSymbols.splice(randomIndex, 1);
                }
            }
        return reels;
    };
});




//Object with keys != Array since we're naming the properties.
const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8,
};

//Multiplier of the Symbols
const SYMBOL_VALUES = {
    "A": 75,
    "B": 25,
    "C": 10,
    "D": 4,
};

const tranpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++){
        rows.push([]);
        for (let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

//Needed for Getting Winnings
const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for(let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            } 
        }
        
        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }
    return winnings;
};


//Possibly Junk 
/*    //let balance = parseFloat(document.getElementById('deposit').value);
//updateBalanceDisplay();
function spinSlots() {
    const lines = parseFloat(document.getElementById('lines').value);
    const bet = parseFloat(document.getElementById('bet').value);

    // Deduct the bet immediately
    const totalBet = bet * lines;
    if (balance < totalBet) {
        alert("Insufficient funds for this bet!");
        return;
    }
    balance -= totalBet;
    updateBalanceDisplay();

    const reels = spin();
    const rows = tranpose(reels);

    // Update the displayed rows with the result...
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].length; j++) {
            document.getElementById(`symbol-${i+1}-${j+1}`).textContent = rows[i][j];
        }
    }

    // Calculate and display winnings...
    const winnings = getWinnings(rows, bet, lines);
    balance += winnings;  // Add back the winnings
    updateBalanceDisplay();
    document.getElementById('output').innerText = "You won $" + winnings.toString();
}

    //let balance = 0;

    /*const updateBalanceDisplay = () => {
        document.getElementById('balance-display').textContent = balance.toString();
    };

    document.getElementById('deposit-btn').addEventListener('click', () => {
        const depositAmountInput = document.getElementById('deposit');
        const depositAmount = parseFloat(depositAmountInput.value);
    
        if (isNaN(depositAmount) || depositAmount <= 0) {
            alert("Invalid deposit amount, try again.");
        } else {
            balance += depositAmount;
            updateBalanceDisplay();
            depositAmountInput.value = '';  // Clear the input after adding to the balance
        }
    });
          const lines = parseFloat(document.getElementById('lines').value);
        const bet = parseFloat(document.getElementById('bet').value);

        // You'd check the balance and lines/bet validity as in your game logic.
        // Then you'd call the spin function to get the results
        const reels = spin(); 
        const rows = tranpose(reels);
        // Update the displayed rows with the result, perhaps using innerText

        for (let i = 0; i < rows.length; i++) {
            for (let j = 0; j < rows[i].length; j++) {
                document.getElementById(`symbol-${i+1}-${j+1}`).textContent = rows[i][j];
            }
        }

        const winnings = getWinnings(rows, bet, lines);
        balance += winnings;
        updateBalanceDisplay();
        document.getElementById('output').innerText = "You won $" + winnings.toString();

        // Additional logic like checking if the user has run out of money, etc.
*/


//Create Function: Old Way
/* This is One Way (Old Way)
function deposit () {
    return 1;
}
const x = deposit();*/

//Create Function : New Way
//This was the Tutorial Version | Node.js
/*
Imports + Libraries
const prompt = require("prompt-sync")();

const deposit = () => { 
    //Continue asking until a valid amount is given
    while(true) {
        const depositAmount = prompt("Enter a Deposit Amount: ");
        //The prompt input is a string. parseFloat() makes it a number, if not a number input = NaN
        const numberDepositAmount = parseFloat(depositAmount);
    
        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid deposit amount, try again.");
        } else {
            return numberDepositAmount;
        }
    }
};

const getNumberOfLines = () => {
    while(true) {
        const lines = prompt("Enter Number of Lines to Bet On (1-3): ");
        //The prompt input is a string. parseFloat() makes it a number, if not a number input = NaN
        const numberOfLines = parseFloat(lines);
    
        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
            console.log("Invalid number of Rows amount, try again.");
        } else {
            return numberOfLines;
        }
    }
};

//this one requires a parameter
const getBet = (balance, lines) => {
    while(true) {
        const bet = prompt("Enter bet per line: ");
        //The prompt input is a string. parseFloat() makes it a number, if not a number input = NaN
        const numberBet = parseFloat(bet);
    
        if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            console.log("Invalid bet amount, try again.");
        } else {
            return numberBet;
        }
    }
};

const spin = () => {
    //generates an array of all possible symbols when creating a reel
    const symbols = []; 
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }
    //creates an array of all reels
        const reels = [];
        for (let i = 0; i < COLS; i++){
                //for every COLS we will add an [] to the array above| Example: [[],[],[]]
                reels.push([]);
                //copies the symbols for this specify reel = Unique Symbols for Reel
                const reelSymbols = [...symbols];
            //Loop through rows, select and insert symbol into Reel & remove it.    
            for (let j = 0; j < ROWS; j++){
                const randomIndex = Math.floor(Math.random() * reelSymbols.length);
                    const selectedSymbol = reelSymbols[randomIndex];
                    reels[i].push(selectedSymbol);
                    reelSymbols.splice(randomIndex, 1);
            }
        }
    return reels;
};

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()){
            rowString += symbol;
            if (i != row.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
};

const game = () => {
    let balance = deposit();

    while (true) {
        console.log("You have a balance of $" + balance);
    const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
    const reels = spin();
    const rows = tranpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    console.log("You won, $" + winnings.toString());

    if (balance <= 0) {
        console.log("You ran out of money!");
        break;
        }
        const playAgain = prompt("Do you want to play again? (y/n): ");
        if (playAgain != "y") break;
    }
};

game();*/






/* Transposing an Array :
This is what we're currently getting : [[A B C], [A C D], [A C C]]
We need to transpose the array to get this: [[A A A],[C C C],[C D C]]
*/