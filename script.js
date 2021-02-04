const NUMBERS = [..."0123456789"];

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
    "zero"    : "0",  "one":   "1",  "two": "2",
    "three"   : "3",  "four":  "4",  "five": "5",
    "six"     : "6",  "seven": "7",  "eight": "8", "nine": "9"}

const container = document.querySelector("div.calculator");

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
}

const add      = (a,b) => {return a + b}
const subtract = (a,b) => {return a - b}
const multiply = (a,b) => {return a * b}
const divide   = (a,b) => {return a / b}

function operate(op,a,b){
    return op(a,b);
}

buildCalculator();
