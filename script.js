const NUMBERS = [..."0123456789"];
const OPERATORS = [..."+-X/"];
const MAXLENGTH = 10;
let sgn         = "+";
let displayNum  = sgn + "0";
let storedNum   = null;
let op          = null;
let result      = null;

const container = document.querySelector("div.calculator");
const output    = document.querySelector("div.output");


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


