const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = calculator.querySelector('.calculator__display')
const operatorKeys = keys.querySelectorAll('[data-type="operator"]')

keys.addEventListener('click', event => {
  if (!event.target.closest('button')) return

  const key = event.target
  const keyValue = key.textContent
  const displayValue = display.textContent
  const { type } = key.dataset
  const { previousKeyType } = calculator.dataset

  if (type === 'number') {
    if (
      displayValue === '0' ||
      previousKeyType === 'operator'
    ) {
      display.textContent = keyValue
    } else {
      display.textContent = displayValue + keyValue
    }
  }

  if (type === 'operator') {
    operatorKeys.forEach(el => { el.dataset.state = '' })
    key.dataset.state = 'selected'

    calculator.dataset.firstNumber = displayValue
    calculator.dataset.operator = key.dataset.key
  }

  if (type === 'equals') {
    // Perform a calculation
    const firstNumber = calculator.dataset.firstNumber
    const operator = calculator.dataset.operator
    const secondNumber = displayValue
    display.textContent = calculate(firstNumber, operator, secondNumber)
  }

  if (type === 'clear') {
    display.textContent = '0'
    delete calculator.dataset.firstNumber
    delete calculator.dataset.operator
  }

  calculator.dataset.previousKeyType = type
})

function calculate (firstNumber, operator, secondNumber) {
  firstNumber = parseInt(firstNumber)
  secondNumber = parseInt(secondNumber)

  if (operator === 'plus') return firstNumber + secondNumber
  if (operator === 'minus') return firstNumber - secondNumber
  if (operator === 'times') return firstNumber * secondNumber
  if (operator === 'division') return firstNumber / secondNumber
  if (operator === 'sin') return Math.sin(Math.PI / firstNumber)
  if (operator === 'cos') return Math.cos(firstNumber)
  if (operator === 'tan') return  Math.tan(firstNumber * Math.PI / 180)
  if (operator === 'root') return Math.sqrt(firstNumber)
  if (operator === 'pie') return Math.PI
  if (operator === 'percent') return (firstNumber / 100)
  if (operator === 'in') return Math.log2(firstNumber)
  if (operator === 'log') return Math.log(firstNumber)
  if (operator === 'power') return Math.pow(firstNumber, secondNumber)
  if (operator === 'rad') return firstNumber / (Math.PI / 180)
  if (operator === 'deg') return firstNumber * (180 / Math.PI)

  if (operator === 'factorial') return (firstNumber) * (firstNumber - 1) * (firstNumber - 2) * (firstNumber - 3) * (firstNumber - 4)
  if (operator === 'bracket1') return firstNumber
}

