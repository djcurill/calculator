const NUMBERS = [..."0123456789"];
const OPERATORS = [..."+-X/"];
const MAXLENGTH = 10;
let sgn         = "+";
let displayNum  = sgn + "0";
let storedNum   = null;
let op          = null;
let result      = null;

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

const container = document.querySelector("div.calculator");
const output    = document.querySelector("div.output");

function createButton(op, symbol, cls=null){
    let button = document.createElement("button");
    button.addEventListener("click",logic);
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
}

function round(number, pow=3) {
    return Math.round(number * 10**pow) / 10**pow;
  }

function sign(num){
    return (Math.sign(num) > 0) ? "+" : "-";
}

function isInt(num){
    return num % 1 === 0;
}

function clear(){
    sgn        = "+";
    displayNum = sgn + "0";
    storedNum  = null;
    op         = null;
}

function display(num){
    output.textContent = Number(num);
}

const operations = {
    "+":   (a,b) =>  {return a + b},
    "-":   (a,b) =>  {return a - b},
    "X":   (a,b) =>  {return a * b},
    "/":   (a,b) =>  {return a / b}
}

function operate(op,a,b){
    let result = operations[op](Number(a),Number(b));
    if (!isInt(result)) (result = round(result,3));
    return String(result);
}

function logic(e){
    let input = e.target.textContent;

    if (input === "C"){
        clear();
        display(displayNum);
    }
    else if (input === "+/-"){
        let temp = sgn;
        sgn = (sgn === "+") ? "-" : "+";
        displayNum = displayNum.replace(temp, sgn);
        display(displayNum);
    }
    else if (NUMBERS.includes(input)){
        if (result !== null){
            displayNum = Number(sgn + "0" + input);
            result = null;
        }
        else if (input !== "." || !displayNum.includes(".")){
            displayNum = String(Number(displayNum + input));
        }
        display(displayNum);
    }
    else if (OPERATORS.includes(input)){
        op = input;
        storedNum = displayNum;
        displayNum = "";
        sgn = "+";
    }
    else{
        result = operate(op,storedNum,displayNum);
        clear();
        display(result);
        displayNum = sign(result) + result;
    }
    
}

buildCalculator();
clear();
display(displayNum);


