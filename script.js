const expenseForm = document.getElementById('expenseForm');
const expenseNameInput = document.getElementById('expenseName');
const expenseAmountInput = document.getElementById('expenseAmount');
const expenseList = document.getElementById('expenseList');
const totalAmountElement = document.getElementById('totalAmount');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function renderExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${expense.name}: $${expense.amount}</span>
            <button class="edit-btn" onclick="editExpense(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
        `;
        expenseList.appendChild(li);
    });
    updateTotalAmount();
}

function addOrEditExpense(name, amount, index) {
    if (index !== undefined && index !== null) {
        expenses[index] = { name, amount };
    } else {
        expenses.push({ name, amount });
    }
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
    expenseForm.reset();
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
}

function editExpense(index) {
    const expense = expenses[index];
    expenseNameInput.value = expense.name;
    expenseAmountInput.value = expense.amount;
    expenseForm.removeEventListener('submit', handleAddExpense);
    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = expenseNameInput.value.trim();
        const amount = parseFloat(expenseAmountInput.value);
        if (name && amount) {
            addOrEditExpense(name, amount, index);
            expenseForm.removeEventListener('submit', arguments.callee);
            expenseForm.addEventListener('submit', handleAddExpense);
        } else {
            alert('Please fill out all fields.');
        }
    });
}

function handleAddExpense(event) {
    event.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);
    if (name && amount) {
        addOrEditExpense(name, amount);
    } else {
        alert('Please fill out all fields.');
    }
}

function updateTotalAmount() {
    const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
    totalAmountElement.textContent = totalAmount.toFixed(2);
}

expenseForm.addEventListener('submit', handleAddExpense);

renderExpenses();