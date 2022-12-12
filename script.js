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

displayMovement(account1.movements);

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

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, i) => acc + i, 0);
  labelBalance.innerHTML = `${balance} EURO`;
};
calcDisplayBalance(account2.movements);

const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${incomes} `;

  const out = movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov);
  labelSumOut.textContent = `${Math.abs(out)} `;

  const interest = movements
    .filter(mov => mov > 0)
    .map(Deposit => (Deposit * 1.2) / 100)
    .reduce((acc, int) => acc + int);
  labelSumInterest.textContent = interest;
};
calcDisplaySummary(account1.movements);
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

/////////////////////////////////////////////////

//Coding chanllenge 1
// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice();
//   dogsJuliaCorrected.splice(0);
//   dogsJuliaCorrected.splice(-2);
//   const joinedDogs = dogsJuliaCorrected.concat(dogsKate);
//   joinedDogs.forEach(function (dog, index) {
//     if (dog < 3) {
//       console.log(`Dog number ${index + 1} is still a puppy`);
//     } else {
//       console.log(
//         `Dog number ${index + 1} is an adult, and is ${dog} years old`
//       );
//     }
//   });
// };

// // checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const maxValue = movements.reduce((acc, i) => {
//   return i < acc ? acc : i;
// });

// console.log(maxValue);

// const euroToUSD = 1.1;
// const movementsUSD = movements.map(i => i * euroToUSD);

// console.log(movementsUSD);

// const movementsDescription = movements.map(function (i, index, arr) {
//   if (i > 0) return;
// });

// const deposits = movements.filter(function (i) {
//   return i > 0;
// });

// const withdrawals = movements.filter(i => i < 0);

// console.log(movements);
// console.log(deposits);
// console.log(withdrawals);
// console.log(movements);
// const balance = movements.reduce((acc, i, index, arr) => acc + i, 0);

// console.log(balance);

/*
Дело №39 (2009)
Забытое (2004)
*/

const ages1 = [5, 2, 4, 1, 15, 8, 3];
// const ages2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = (ages)=> ages.map(dogAge => dogAge <= 2 ? dogAge * 2 : 16 + dogAge * 4)
.filter(i => i >= 18).reduce((acc, age, i, arr) => acc + age, 0) / arr.lenght;



console.log(calcAverageHumanAge(ages1));
// console.log(calcAverageHumanAge(ages2));
