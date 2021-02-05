const NUMBERS = [..."0123456789"];
const OPERATORS = [..."+-X/"];
const MAXLENGTH = 10;
let sgn         = "+";
let displayNum  = sgn + "0";
let storedNum   = null;
let op          = null;
let result      = null;

const output    = document.querySelector("div.output");


function round(number, n=3) {
    return Math.round(number * 10**n) / 10**n;
  }

function sign(num){
    return (Math.sign(num) > 0) ? "+" : "-";
}

function isInt(num){
    return num % 1 === 0;
}

function wipe(){
    sgn        = "+";
    displayNum = sgn + "0";
    storedNum  = null;
    op         = null;
}

function display(num){
    output.textContent = Number(num);
}

function clear(){
    wipe();
    display(displayNum);
}

function changeSign(){
    let temp = sgn;
    sgn = (sgn === "+") ? "-" : "+";
    displayNum = displayNum.replace(temp, sgn);
    display(displayNum);
}

function appendNumber(event){
    let num = event.target.textContent;
    if (result !== null){
        displayNum = Number(sgn + "0" + num);
        result = null;
    }
    else if (num !== "." || !displayNum.includes(".")){
        displayNum = String(Number(displayNum + num));
    }
    display(displayNum);
}

function assignOp(event){
    op = event.target.textContent;
    storedNum = displayNum;
    displayNum = "";
    sgn = "+";
}

function compute(){
    result = operate(op,storedNum,displayNum);
    wipe();
    display(result);
    displayNum = sign(result) + result;
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


wipe();
display(displayNum);
document.querySelectorAll(`button[data-key="num"]`)
        .forEach(btn => btn.addEventListener("click", appendNumber));

document.querySelectorAll(`button[data-key="op"]`)
        .forEach(btn => btn.addEventListener("click", assignOp));

document.querySelector(`button[data-key="clear"]`).addEventListener("click", clear);
document.querySelector(`button[data-key="sgn"]`).addEventListener("click",changeSign);
document.querySelector(`button[data-key="eq"]`).addEventListener("click",compute);




