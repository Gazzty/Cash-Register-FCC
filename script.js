/* let price = 3.26;
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
    let change = (userMoney - price).toFixed(2)

    for (let i = cid.length-1; i >= 0; i--) {

        while (change >= bills[i] && cid[i][1] > 0) {
            
            cid[i][1] -= bills[i]
            change -= bills[i]
            
            cid[i][1] = Number(cid[i][1].toFixed(2))
            change = Number(change.toFixed(2))
        }
    }
}

let totalCash = 0
function updateTotalCash(){
    totalCash = cid.reduce((sum, item) => sum + item[1], 0);
}
updateTotalCash()

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

// Event listeners
const purchaseButton = document.getElementById("purchase-btn")
const userMoney = document.getElementById("cash")

purchaseButton.addEventListener('click', (e) => {
    e.preventDefault()
    output.innerText = ""

    userMoney.value = Number(userMoney.value)
    price = Number(price)

    if (userMoney.value < price) {
        alert("Customer does not have enough money to purchase the item")
    }
    else if (userMoney.value == price) {
        output.innerText = "No change due - customer paid with exact cash"
    }
    else if(userMoney.value > totalCash){
        output.innerText = "Status: INSUFFICIENT_FUNDS"
    }
    else if(userMoney.value == totalCash){
        calculateChange(userMoney.value)
        output.innerText = "Status: CLOSED"
    }   
    else {
        calculateChange(userMoney.value)
        output.innerText = "Status: OPEN"
    }
    
    updateTotalCash()
    updateChange()
}) */

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

// Event listeners
const purchaseButton = document.getElementById("purchase-btn");
const userMoney = document.getElementById("cash");

purchaseButton.addEventListener('click', (e) => {
    e.preventDefault();
    output.innerText = "";

    const cashValue = parseFloat(userMoney.value);
    const priceValue = parseFloat(price);

    if (isNaN(cashValue)) { // Validar entrada
        alert("Ingrese un valor numérico válido");
        return;
    }

    if (cashValue < priceValue) {
        alert("El cliente no tiene suficiente dinero");
    } else if (cashValue === priceValue) {
        output.innerText = "No hay vuelto - pago exacto";
    } else {
        updateTotalCash();
        if (cashValue > totalCash) {
            output.innerText = "Estado: FONDOS_INSUFICIENTES";
        } else {
            const changeBreakdown = calculateChange(cashValue);
            output.innerHTML = "<strong>Vuelto:</strong><br>" +
                changeBreakdown.map(item => `${item[0]}: $${item[1].toFixed(2)}`).join("<br>");

            // Actualizar la caja registradora
            updateTotalCash();
            updateChange();
        }
    }
});