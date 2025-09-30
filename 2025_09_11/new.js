const z = "Zadanie: ";
console.log(z);
let x = 17;
console.log(`x = ${x}`);
let y = [6, 7, 4, 1, 63, 27];
console.log(`y = ${y}`);

function isPrime(n){
  for (let i = 2; i <= n/2; i++) {
        if (n % i == 0) {
            isPrime = false;
            break;
        }
    }
    if (isPrime) {
        console.log(`${n} jest liczbą pierwszą`);
    } else {
        console.log(`${n} nie jest liczbą pierwszą`);
    }
}

isPrime(x);

function writeNumbers(y){
  for (const a of y) {
    console.log(a);
  }
}

console.log("Elementy tablicy: ")
writeNumbers(y);

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Podaj imie?
`, name => {
  console.log(`Hello ${name}!`);
  rl.close();
});
