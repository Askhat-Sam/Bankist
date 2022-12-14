'use strict';

///////////////////////////////////////////////
///////////////////////////////////////////////
//BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const displayMovement = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, index) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">
            ${index + 1} ${type}
          </div>
          <div class="movements__value">${mov}</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// displayMovement(account1.movements);

const creatrUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};
creatrUsernames(accounts);

const updateUI=function(acc){
  // display movements
  displayMovement(acc.movements)
  // display balance
  calcDisplayBalance(acc)
  // display summary
  calcDisplaySummary(acc)
}


const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, i) => acc + i, 0);
  labelBalance.textContent = `${acc.balance} €`;

};
// calcDisplayBalance(account2.movements);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${incomes} `;

  const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(out)} `;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(Deposit => (Deposit * acc.interestRate) / 100)
    .reduce((acc, int) => acc + int);
  labelSumInterest.textContent = interest;
};
// calcDisplaySummary(account1.movements);
///////////////////////////////////////////////
///////////////////////////////////////////////
// LECTURES;
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
const eurToUSD = 1.1;
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUSD)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);

const ages1 = [5, 2, 4, 1, 15, 8, 3];
// const ages2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = (ages)=> ages.map(dogAge => dogAge <= 2 ? dogAge * 2 : 16 + dogAge * 4)
.filter(i => i >= 18).reduce((acc, age, i, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAge(ages1));
// console.log(calcAverageHumanAge(ages2));


const firstWithdrawal=movements.find(mov=>mov<0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);

const account = accounts.find(acc=>acc.owner==="Jessica Davis");
console.log(account);

//Event handler for log in function
let currentAccount;
btnLogin.addEventListener('click', function (e){
  e.preventDefault()
  currentAccount=accounts.find(acc=>acc.username===inputLoginUsername.value)
  console.log(currentAccount)
  if (currentAccount?.pin===Number(inputLoginPin.value)) {
    //display UI and welcome message
    labelWelcome.textContent=`Welcome back ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity=100;
    //clear input fields
    inputLoginUsername.value=inputLoginPin.value='';
    inputLoginPin.blur()
    //Update UI
    updateUI(currentAccount)
    
  }
})

btnTransfer.addEventListener('click', function(e){
  e.preventDefault()
  const amount=Number(inputTransferAmount.value);
  const receiverAcc= accounts.find(acc=>acc.username===inputTransferTo.value);
  inputTransferAmount.value=inputTransferTo.value='';

  if(amount>0 && currentAccount.balance>=amount&&receiverAcc&& 
    receiverAcc?.username!==currentAccount.username)
    {
    //Doing the transfer
    currentAccount.movements.push(-amount);
    console.log(currentAccount)
    receiverAcc.movements.push(amount)
    //Update UI
    updateUI(currentAccount)
    
    
  }
})
//Close account
btnClose.addEventListener('click', function(e){
  e.preventDefault()
  
  if (currentAccount.username===inputCloseUsername.value && 
    currentAccount.pin===Number(inputClosePin.value))
    {
      const index = accounts.findIndex(acc=>acc.username===currentAccount.username)
      
      accounts.splice(index,1)
      containerApp.style.opacity=0;

  }
  inputCloseUsername.value=inputClosePin.value='';
})




