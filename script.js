let price = 3.26;
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
let bills = [0.01, 0.05, 0.10, 0.25, 1, 5, 10, 20, 100];

function calculateChange(userMoney) {
    let change = userMoney - price; // <-- Mantener como número
    const outputText = JSON.parse(JSON.stringify(cid)); // Copia profunda para el vuelto

    for (let i = cid.length - 1; i >= 0; i--) {
        const billValue = bills[i];
        let available = cid[i][1];
        let used = 0;

        while (change >= billValue && available > 0) {
            change -= billValue;
            available -= billValue;
            used += billValue;
            change = Math.round(change * 100) / 100; // Evitar errores de precisión
        }

        // Actualizar cid y guardar el vuelto usado
        cid[i][1] = available;
        outputText[i][1] = used; // Cantidad usada para el vuelto
    }

    return outputText.filter(item => item[1] > 0); // Mostrar solo denominaciones usadas
}

let totalCash = 0;
function updateTotalCash() {
    totalCash = cid.reduce((sum, item) => sum + item[1], 0);
}
updateTotalCash();

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

const purchaseButton = document.getElementById("purchase-btn");
const userMoney = document.getElementById("cash");

const output = document.getElementById("change-due")
priceHTML.innerText = `Total: $${price}`

function updateChange() {
    // Mostrar valores formateados, pero mantener cid como números
    penny.innerText = Number(cid[0][1]).toFixed(2)
    nickel.innerText = Number(cid[1][1]).toFixed(2)
    dime.innerText = Number(cid[2][1]).toFixed(2)
    quarter.innerText = Number(cid[3][1]).toFixed(2)
    one.innerText = Number(cid[4][1]).toFixed(2)
    five.innerText = Number(cid[5][1]).toFixed(2)
    ten.innerText = Number(cid[6][1]).toFixed(2)
    twenty.innerText = Number(cid[7][1]).toFixed(2)
    hundred.innerText = Number(cid[8][1]).toFixed(2)
}
updateChange()

function haveChange() {
    let change = userMoney.value - price
    let minBillIndex = 0
    let availableChange = 0

    for(let i = 0; i < bills.length; i++){
        if(change < bills[i]){
            minBillIndex = i - 1
            break
        }
    }

    for(let i = 0; i <= minBillIndex; i++){
        availableChange += cid[i][1]
    }
    
    return availableChange >= change
}

// Event listeners
purchaseButton.addEventListener('click', (e) => {
    e.preventDefault();
    output.innerText = "";

    const change = parseFloat(userMoney.value);
    const priceValue = parseFloat(price);

    if (change < priceValue) {
        alert("Customer does not have enough money to purchase the item");
    } else if (change === priceValue) {
        output.innerText = "No change due - customer paid with exact cash";
    } else {
        updateTotalCash();
        if (change > totalCash || !haveChange()) {
            output.innerText = "Status: INSUFFICIENT_FUNDS";
        } else {
            const changeBreakdown = calculateChange(change);

            updateTotalCash();
            updateChange();

            if (totalCash == 0) {
                output.innerHTML = "Status: Status: CLOSED" +
                    changeBreakdown.map(item => `${item[0]}: $${item[1].toFixed(2)}`).join("<br>");
            } else {
                output.innerHTML = "Status: OPEN" +
                    changeBreakdown.map(item => `${item[0]}: $${item[1].toFixed(2)}`).join("<br>");
            }
        }
    }
});