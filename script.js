function createButton(op, symbol, cls=null){
    let button = document.createElement("button");
    button.addEventListener("click",handleNumberButton);
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
    sgn        = "+";
    displayNum = sgn + "0";
    storedNum  = null;
    op         = null;
}

function updateDisplay(){
    output.textContent = Number(displayNum);
}

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
    "/":   (a,b) =>  {return a / b}
}

function operate(op,a,b){
    console.log(a);
    console.log(b);
    return String(operations[op](Number(a),Number(b)));
}

let sgn         = "+";
let displayNum  = sgn + "0";
let storedNum   = null;
let op          = null;
const container = document.querySelector("div.calculator");
const output    = document.querySelector("div.output");

function handleNumberButton(e){
    let input = e.target.textContent;

    if (input === "C"){
        clear();
        updateDisplay();
    }
    else if (input === "+/-"){
        let temp = sgn;
        sgn = (sgn === "+") ? "-" : "+";
        displayNum = displayNum.replace(temp, sgn);
        updateDisplay();
    }
    else if (NUMBERS.includes(input)){
        if (input !== "." || !displayNum.includes(".")){
            displayNum = String(Number(displayNum + input));
        }
        updateDisplay();
    }
    else if (OPERATORS.includes(input)){
        op = input;
        storedNum = displayNum;
        displayNum = "";
        sgn = "+";
    }
    else{
        displayNum = operate(op,storedNum,displayNum);
        storedNum  = null;
        updateDisplay();
    }
    
}


buildCalculator();


