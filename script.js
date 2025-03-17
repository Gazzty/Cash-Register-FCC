let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const priceHTML = document.getElementById("price")
const penny = document.getElementById("pennies")
const nickel = document.getElementById("nickels")
const dime = document.getElementById("dimes")
const quarter = document.getElementById("quarters")
const one = document.getElementById("ones")
const five = document.getElementById("fives")
const ten = document.getElementById("tens")
const hundred = document.getElementById("hundreds")

// Add text in HTML
priceHTML.innerText = `Total: $${price}`
penny.innerText += `${cid[0][1]}`
nickel.innerText += `${cid[1][1]}`
dime.innerText += `${cid[2][1]}`
quarter.innerText += `${cid[3][1]}`
one.innerText += `${cid[4][1]}`
five.innerText += `${cid[5][1]}`
ten.innerText += `${cid[6][1]}`
hundred.innerText += `${cid[7][1]}`