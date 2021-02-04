const NUMBERS = [..."0123456789"];
const OPERATORS = [..."+-X/"];

const opButtons = {
    "plus"     : "+",
    "minus"    : "-",
    "multiply" : "X",
    "divide"   : "/",
    "clear"    : "C",
}

const numButtons = {
    "sgn"     : "+/-",
    "decimal" : ".",
    "zero"    : "0", "one": "1", "two": "2",   "three": "3", "four": "4",
    "five"    : "5", "six": "6", "seven": "7", "eight": "8", "nine": "9"
}

const operations = {
    "+":   (a,b) =>  {return a + b},
    "-":   (a,b) =>  {return a - b},
    "X":   (a,b) =>  {return a * b},
    "/":   (a,b) =>  {return a / b},
    "+/-": ()  =>  {(sgn === "+") ? sgn = "-" : sgn = "+"},
    "C":   ()  => clear(),
    "=":   (op, a,b) => {return this[op](a,b)}
}


function createButton(op, symbol, cls=null){
    let button = document.createElement("button");
    button.textContent = symbol;
    button.style.gridArea = op;
    button.classList.add(cls);
    container.appendChild(button);
}

function buildCalculator(){
    const build = (obj,cls) => {
        Object.keys(obj).map(key => createButton(key,obj[key],cls))};
    build(numButtons,null);
    build(opButtons,"op-btn");
    createButton("eq","=","eq-btn");
    clear();
    updateDisplay();
}

function clear(){
    displayNum = "0";
    sgn        = "+";
    storedNum  = null;
    op         = null;
}

function updateDisplay(){
    output.textContent = Number(sgn + displayNum);
}



let displayNum  = "0";
let sgn         = "+";
let storedNum   = null;
let op          = null;
const container = document.querySelector("div.calculator");
const output    = document.querySelector("div.output");

function handleNumberButton(e){
    let input = e.target.textContent;

    if (input === "C" || input === "+/-"){
        operations(input);
    }
    else if (NUMBERS.includes(input)){
        if (input !== "." || !displayNum.includes(".")){
            displayNum = String(Number(displayNum + input));
        }
    }
    else if (OPERATORS.includes(input)){
        op = input;
        storedNum = displayNum;
        displayNum = "";
    }
    else{
        displayNum = operations["="](op,a,b);
        storedNum  = null;
    }
    updateDisplay();
}


buildCalculator();

