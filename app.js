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
function handleNumberClick(numStr) {
  const currentValueString = getValueAsString();

  // replaces 0 as first digit
  if (currentValueString === '0') {
    setStrAsValue(numStr);
  } else {
  // Adds comma
  setStrAsValue(currentValueString + numStr);
  }
  
}


// Add event listener for buttons, convert number to string 
numberBtn.forEach(button => {
  button.addEventListener('click', () => {
    let n = button.innerText;
    handleNumberClick(n.toString());
  })
})

decimalBtn.addEventListener('click', () => {
  const currenValueString = getValueAsString();
  if (!currenValueString.includes('.')) {
    setStrAsValue(currenValueString + '.');
  }

})
