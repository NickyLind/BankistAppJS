'use strict';
// BANKIST APP

// Data
const account1 = {
  owner: 'Nick Lindau',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300, 120, -35],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
    '2021-07-29T10:51:36.790Z',
    '2021-07-27T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// Function for creating usernames based off user's initials
const createUsernames = function(accs) {
  accs.forEach(function(acc) {
    acc.username = acc.owner
    .toLowerCase()
    .split(' ')
    .map(e => e[0])
    .join('');
  });
};

createUsernames(accounts);   

const formatMovementDate = function(date) {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date)
  console.log(daysPassed);
  if(daysPassed === 0) return 'Today';
  if(daysPassed === 1) return 'Yesterday';
  if(daysPassed <= 7) return `${daysPassed} days ago`
  else{
    const day = `${date.getDate()}`.padStart(2, '0');
    const month = `${date.getMonth()+ 1}`.padStart(2, 0) ;
    const year = date.getFullYear();
    return `${month}/${day}/${year}` 
  }
}



// Function for displaying rows of deposits/withdrawls
const displayMovements = function(acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements

  movs.forEach(function(mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal'
    const date = new Date(acc.movementsDates[i])
    const displayDate = formatMovementDate(date)


    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${mov.toFixed(2)}€</div>
    </div>
    `
    containerMovements.insertAdjacentHTML('afterbegin', html)
  });
};


// Function for displaying account summary
const calcDisplaySummary = function(acc){
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0)
  labelSumIn.textContent = `${incomes.toFixed(2)}€`

  const out = acc.movements
  .filter(mov => mov < 0)
  .reduce((acc, mov) => acc - mov, 0)
  labelSumOut.textContent = `${out.toFixed(2)}€`

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * acc.interestRate/100)
    .filter((int, i, array) => int >= 1
    )
    .reduce((acc, int) => acc + int, 0)
  labelSumInterest.textContent = `${interest.toFixed(2)}€`
}

// Function for displaying total account balance
const calcDisplayBalance = function(acc) {
  acc.balance = acc.movements.reduce(function(acc, mov) {
    return acc + mov
  }, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`
};

// Function for updating the UI
const updateUI = function(acc){
      //Display movements
      displayMovements(acc)

      //Display balance
      calcDisplayBalance(acc)
  
      //Display summary
      calcDisplaySummary(acc)
}


//Event handler
let currentAccount;

//TODO Temp LOGGED IN
currentAccount = account1
updateUI(currentAccount)
containerApp.style.opacity = 100;
//TODO Remove Temp LOGGED IN




btnLogin.addEventListener('click', function(event){
  event.preventDefault()
  //a button on a form will submit and reload the page by default
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}!`;
    containerApp.style.opacity = 100;

    // Create current date and time
    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, '0');
    const month = `${now.getMonth()+ 1}`.padStart(2, 0) ;
    const year = now.getFullYear();
    const hours = `${now.getHours()}`.padStart(2, 0);
    const minutes = `${now.getMinutes()}`.padStart(2, 0);
    labelDate.textContent = `${month}/${day}/${year}, ${hours}:${minutes}`

    //Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur()

    //Update UI
    updateUI(currentAccount)
  }
});

btnTransfer.addEventListener('click', function(event){
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAccount = accounts.find(acc => acc.username === inputTransferTo.value)
  inputTransferTo.value = inputTransferAmount.value = '';

  if(amount > 0 && 
    recieverAccount &&
    currentAccount.balance >= amount && 
    recieverAccount?.username !== currentAccount.username) {
      // Doing the transfer
      currentAccount.movements.push(-amount);
      recieverAccount.movements.push(amount);

      // Add transfer date
      currentAccount.movementsDates.push(new Date().toISOString());
      recieverAccount.movementsDates.push(new Date().toISOString())

      // Update UI
      updateUI(currentAccount)
  }
});

btnLoan.addEventListener('click', function(event){
  event.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if(amount> 0 && currentAccount.movements.some(mov => mov >= amount / 10)) {
    //Add movement
    currentAccount.movements.push(amount);

    //Add loan date
    currentAccount.movementsDates.push(new Date().toISOString())

    //Update UI
    updateUI(currentAccount)
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function(event){
  event.preventDefault();
  inputCloseUsername.value = inputClosePin.value = '';

  if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin){
    const index = accounts.findIndex(acc => acc.username === currentAccount.username)
    console.log(index);

    //Delete Account
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
  }
});

let sorted = false
btnSort.addEventListener('click', function(event) {
  event.preventDefault();
  displayMovements(currentAccount, !sorted)
  sorted = !sorted
});

console.log(accounts);