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
let bills = [0.01, 0.05, 0.10, 0.25, 1, 5, 10, 20, 100]

function calculateChange(userMoney) {
    let change = userMoney - price

    for (let i = cid.length - 1; i > 0; i--) {
        while (change >= cid[i][1] && cid[i][1] > 0) {
            console.log(change)
            change -= bills[i]
            cid[i][1] -= bills[i]
        }
    }

    console.log(cid)
}

let totalCash = 0
for (let i = 0; i < cid.length; i++) {
    totalCash += cid[i][1]
}

const priceHTML = document.getElementById("price")
const penny = document.getElementById("pennies")
const nickel = document.getElementById("nickels")
const dime = document.getElementById("dimes")
const quarter = document.getElementById("quarters")
const one = document.getElementById("ones")
const five = document.getElementById("fives")
const ten = document.getElementById("tens")
const twenty = document.getElementById("twenties")
const hundred = document.getElementById("hundreds")

const output = document.getElementById("change-due")

// Add text in HTML
priceHTML.innerText = `Total: $${price}`
function updateChange() {
    penny.innerText = `${cid[0][1]}`
    nickel.innerText = `${cid[1][1]}`
    dime.innerText = `${cid[2][1]}`
    quarter.innerText = `${cid[3][1]}`
    one.innerText = `${cid[4][1]}`
    five.innerText = `${cid[5][1]}`
    ten.innerText = `${cid[6][1]}`
    twenty.innerText = `${cid[7][1]}`
    hundred.innerText = `${cid[8][1]}`
}
updateChange()

// Event listeners
const purchaseButton = document.getElementById("purchase-btn")
const userMoney = document.getElementById("cash")

purchaseButton.addEventListener('click', (e) => {
    e.preventDefault()

    if (userMoney.value < price) {
        alert("Customer does not have enough money to purchase the item")
    }
    else if (userMoney.value == price) {
        output.innerText = "No change due - customer paid with exact cash"
    }
    else {
        calculateChange(userMoney.value)
        updateChange()
    }
})