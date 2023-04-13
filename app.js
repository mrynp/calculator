// get time
const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');

const updateTime = () => {
  const currentTime = new Date();

  let currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  if (currentHour > 12) {
    currentHour -= 12;
  }
  hourEl.textContent = currentHour.toString();
  minuteEl.textContent = currentMinute.toString().padStart(2, '0');
}
setInterval(updateTime, 1000);
updateTime();



const value = document.querySelector('.value');
const numberBtn = document.querySelectorAll('.number');
const operatorBtn = document.querySelectorAll('.operator');
const clearBtn = document.querySelector('.clear');
const negativeBtn = document.querySelector('.negative');
const percentBtn = document.querySelector('.percent');
const decimalBtn = document.querySelector('.decimal');
const equalsBtn = document.querySelector('.equals');
 
let previousValue = null;
let previousOperator = null;

function getValueAsString() {
  return value.textContent.split(',').join('');
}

function getValueAsNum() {
  return parseFloat(getValueAsString());
}


function setStrAsValue(valueString) {
  if (valueString[valueString.length - 1] === '.') {
    value.textContent += '.';
    return;
  }

  const [wholeNumStr, decimalStr] = valueString.split('.');
  if (decimalStr) {
    value.textContent = 
      parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr;
  } else {
    value.textContent = parseFloat(wholeNumStr).toLocaleString();
  }
  
}



// displays number
function displayNumber(numStr) {
  const currentValueString = getValueAsString();

  // replaces 0 as first digit
  if (currentValueString === '0') {
    setStrAsValue(numStr);
  } else {
  // Adds comma
  setStrAsValue(currentValueString + numStr);
  }
  
}

function getResultOfOperationAsStr() {
  const currentValueNum = getValueAsNum();
  const previousValueNum = parseFloat(previousValue);
  let newValueNum;
  if (previousOperator === 'add') {
    newValueNum = previousValueNum + currentValueNum;
  } else if (previousOperator === 'subtract') {
    newValueNum = previousValueNum - currentValueNum;
  } else if (previousOperator === 'multiply') {
    newValueNum = previousValueNum * currentValueNum;
  } else if (previousOperator === 'divide') {
    newValueNum = previousValueNum / currentValueNum;
  }

  return newValueNum.toString();

}


function chooseOperation (operator) {
  const currentValueStr = getValueAsString();

  if (!previousValue) {
    previousValue = currentValueStr;
    previousOperator = operator;
    setStrAsValue('0');
    return;
  }
  previousValue = getResultOfOperationAsStr();
  previousOperator = operator;
  setStrAsValue('0');
}



// Add event listener for buttons, convert number to string 
numberBtn.forEach(button => {
  button.addEventListener('click', () => {
    displayNumber(button.innerText.toString());
  })
})

decimalBtn.addEventListener('click', () => {
  const currenValueString = getValueAsString();
  if (!currenValueString.includes('.')) {
    setStrAsValue(currenValueString + '.');
  }

})

clearBtn.addEventListener('click', () => {
  setStrAsValue('0');
  previousValue = null;
  previousOperator = null;
});

negativeBtn.addEventListener('click', () => {
  const currentValueNum = getValueAsNum();
  const currentValueString = getValueAsString();

  if (currentValueString === '-0') {
    setStrAsValue('0');
    return;
  }

  if (currentValueNum >= 0) {
    setStrAsValue('-' + currentValueString);
  } else {
    setStrAsValue(currentValueString.substring(1));
  }
});

percentBtn.addEventListener('click', () => {
  const currentValueNum = getValueAsNum();
  const newValueNum = currentValueNum / 100;
  setStrAsValue(newValueNum.toString());
  previousValue = null;
  previousOperator = null;
});

operatorBtn.forEach(button => {
  button.addEventListener('click', () => {
    chooseOperation(button.getAttribute('id'));
  })
})


equalsBtn.addEventListener('click', () => {
  if (previousValue) {
    setStrAsValue(getResultOfOperationAsStr());
    previousValue = null;
    previousOperator = null;
  }
});