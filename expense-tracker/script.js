const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("transaction-list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateValues() {

    const amounts = transactions.map(item => item.amount);

    const total = amounts.reduce((a,b)=>a+b,0).toFixed(2);

    const incomeTotal = amounts
        .filter(item => item > 0)
        .reduce((a,b)=>a+b,0)
        .toFixed(2);

    const expenseTotal = (
        amounts
        .filter(item => item < 0)
        .reduce((a,b)=>a+b,0) * -1
    ).toFixed(2);

    balance.innerText = `$${total}`;
    income.innerText = `+$${incomeTotal}`;
    expense.innerText = `-$${expenseTotal}`;
}

function addTransactionDOM(transaction){

    const li = document.createElement("li");

    li.classList.add(transaction.amount < 0 ? "minus":"plus");

    li.innerHTML = `
        ${transaction.text}
        <span>$${transaction.amount}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">
            X
        </button>
    `;

    list.appendChild(li);
}

function render(){

    list.innerHTML="";

    transactions.forEach(addTransactionDOM);

    updateValues();

    saveTransactions();
}

form.addEventListener("submit",function(e){

    e.preventDefault();

    if(text.value.trim()==="" || amount.value===""){
        return;
    }

    const transaction={
        id:Date.now(),
        text:text.value,
        amount:+amount.value
    };

    transactions.push(transaction);

    text.value="";
    amount.value="";

    render();

});

function removeTransaction(id){

    transactions = transactions.filter(item=>item.id!==id);

    render();
}

render();