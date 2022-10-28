const userAmount = document.getElementById('user-amount')
const incomeAmount = document.getElementById('income-amount')
const expensesAmount = document.getElementById('expenses-amount')
const budgetName = document.getElementById('budget-name')
const budgetNumber = document.getElementById('budget-num')
const budgetOption = document.getElementById('budget-options')
const budgetSubmit = document.getElementById('submitBtn')
const submittedName = document.getElementById('submitted-name')
const submittedAmount = document.getElementById('submitted-amount')
const budgetListIncome = document.getElementById('income-tab')
const budgetListExpense = document.getElementById('expense-tab')
const expensePercentage = document.getElementById('expense-percentage')
const inputBtn = document.querySelectorAll(".form-input");

const year = document.getElementById('year')
const month = document.getElementById('month')

const months = [
    'Januar',
    'Februar',
    'Mart',
    'April',
    'Maj',
    'Jun',
    'Juli',
    'Avgust',
    'Septembar',
    'Oktobar',
    'Novembar',
    'Decembar',
]

// IZDVAJANJE MESECA I GODINE
let date = new Date()
month.innerText = ' - ' + months[date.getMonth()] + ', '
year.innerText = date.getFullYear() + '.'

// INICIJALIZACIJA
let income = 0
let expense = 0
const opcija = parseInt(budgetOption.value)
let initValue = 0
userAmount.innerText = initValue
let totalIncomes = 0
let totalExpenses = 0

let listOfIncome = []
let listofExpense = []

// ONCLICK EVENT 
budgetSubmit.addEventListener('click', addValue)
budgetListIncome.addEventListener('click', obrisiValueIncome)
budgetListExpense.addEventListener('click', obrisiValueExpense)
budgetListIncome.addEventListener('click', prikaziBtn)
budgetListExpense.addEventListener('click', prikaziBtn)

// LOCAL STORAGE
document.addEventListener('DOMContentLoaded', getLocalIncome)
document.addEventListener('DOMContentLoaded', getLocalExpense)

// ---- PRIKAZ BTN
function prikaziBtn(e){
    const item = e.target
    item.classList.toggle('active')
}

// ---- BRISANJE
//brisanje podatka za prihod
function obrisiValueIncome(e){
    const item = e.target
    console.log(item.value);

    if(item.classList[0] === 'obrisiBtn'){
        const lista = item.parentElement
        removeLocalIncome(lista)
        lista.remove()
    }
}

//Brisanje podatka za rashod
function obrisiValueExpense(e){
    const item = e.target
    console.log(item.value);

    if(item.classList[0] === 'obrisiBtn'){
        const lista = item.parentElement
        removeLocalExpense(lista)
        lista.remove()
    }
}

// DODAVANJE
function addValue(e){

    e.preventDefault()

    if(budgetName.value === '' || budgetNumber.value === ''){
        alert('Sva polja su obavezna')
        return
    }

    if(budgetName.value.length > 50){
        alert('Ime prihoda / rashoda ne moze biti veca od 50 karaktera!')
        return
    }

    if(budgetNumber.value < 1){
        alert('Cena mora biti veca od 1!')
        return
    }

    const opcija = parseInt(budgetOption.value)
    const numVrednost = parseInt(budgetNumber.value)

    if(opcija === 0){ //income value
        // DODAVANJE U TABELU
        const div = document.createElement('div')
        div.classList.add('main-card')
        
        const newBudget = document.createElement('h2')
        newBudget.innerText = budgetName.value
        newBudget.classList.add('main-info')
        div.appendChild(newBudget)
        
        const newValue = document.createElement('p')
        newValue.innerText = '+ ' + numVrednost + ' rsd'
        newValue.classList.add('submitted-amount')
        div.appendChild(newValue)

        const newBtn = document.createElement('button')
        newBtn.innerHTML = 'obriši<ion-icon name="trash-outline"></ion-icon>'
        newBtn.classList.add('obrisiBtn')
        div.appendChild(newBtn)

        budgetListIncome.appendChild(div)

        saveLocalIncome(budgetNumber.value, budgetName.value)

        income += numVrednost
        incomeAmount.innerText = income + " rsd"

        initValue += numVrednost
        userAmount.innerText = initValue + " rsd"

    } else { //expense value
        const procenat = (totalExpenses / totalIncomes) * 100
        console.log(income, expense, procenat);

        // DODAVANJE U TABELU
        const div = document.createElement('div')
        div.classList.add('main-card')
        
        const newBudget = document.createElement('h2')
        newBudget.innerText = budgetName.value
        newBudget.classList.add('main-info')
        div.appendChild(newBudget)
        
        const newValue = document.createElement('p')
        newValue.innerText = '- ' + numVrednost + ' rsd'
        newValue.classList.add('submitted-amount')
        div.appendChild(newValue)
        // console.log(div);
        budgetListExpense.appendChild(div)

        const newProcenat = document.createElement("span")
     
        // newProcenat.innerText = percentage
        // newProcenat.classList.add('expenses-percentage')
        // expensePercentage.appendChild(newProcenat)

        const newBtn = document.createElement('button')
        newBtn.innerHTML = 'obriši<ion-icon name="trash-outline"></ion-icon>'
        newBtn.classList.add('obrisiBtn')
        div.appendChild(newBtn)

        saveLocalExpense(budgetNumber.value, budgetName.value)

        expense += numVrednost
        expensesAmount.innerText = expense + " rsd"

        initValue -= numVrednost
        userAmount.innerText = initValue + " rsd"

        // const percentage = Math.round((expense / income) * 100)
    }
    budgetName.value = ''
    budgetNumber.value = ''
}


function saveLocalIncome(income, title){
    let incomes

    if(localStorage.getItem('incomes') === null){
        incomes = []
    } else {
        incomes = JSON.parse(localStorage.getItem('incomes'))
    }

    incomes.push({title, income})
    localStorage.setItem('incomes', JSON.stringify(incomes))
}

function getLocalIncome(){
    let incomes

    if(localStorage.getItem('incomes') === null){
        incomes = []
    } else {
        incomes = JSON.parse(localStorage.getItem('incomes'))
    }

    incomes.forEach(function(id){

        const div = document.createElement('div')
        div.classList.add('main-card')
        
        const newBudget = document.createElement('h2')
        newBudget.innerText = id.title
        
        newBudget.classList.add('main-info')
        div.appendChild(newBudget)
        
        const newValue = document.createElement('p')
        newValue.innerText = '+ ' + id.income + ' rsd'
        newValue.classList.add('submitted-amount')
        div.appendChild(newValue)

        const newBtn = document.createElement('button')
        newBtn.innerHTML = 'obriši<ion-icon name="trash-outline"></ion-icon>'
        newBtn.classList.add('obrisiBtn')
        div.appendChild(newBtn)

        budgetListIncome.appendChild(div)

        totalIncomes += parseInt(id.income)
    })
    incomeAmount.innerText = totalIncomes + ' rsd'
    userAmount.innerText = totalIncomes - totalExpenses + ' rsd'
    return totalIncomes
}

function saveLocalExpense(expense, title){
    let expenses

    if(localStorage.getItem('expenses') === null){
        expenses = []
    } else {
        expenses = JSON.parse(localStorage.getItem('expenses'))
    }

    expenses.push({title, expense})
    localStorage.setItem('expenses', JSON.stringify(expenses))
}

function getLocalExpense(){
    let expenses

    if(localStorage.getItem('expenses') === null){
        expenses = []
    } else {
        expenses = JSON.parse(localStorage.getItem('expenses'))
    }

    expenses.forEach(function(id){
        // DODAVANJE U TABELU
        const div = document.createElement('div')
        div.classList.add('main-card')
        
        const newBudget = document.createElement('h2')
        newBudget.innerText = id.title
        newBudget.classList.add('main-info')
        div.appendChild(newBudget)
        
        const newValue = document.createElement('p')
        newValue.innerText = '- ' + id.expense + ' rsd'
        newValue.classList.add('submitted-amount')
        div.appendChild(newValue)
        // console.log(div);
        budgetListExpense.appendChild(div)

        const newProcenat = document.createElement("span")
     
        // newProcenat.innerText = procenat
        // newProcenat.classList.add('expenses-percentage')
        // expensePercentage.appendChild(newProcenat)

        const newBtn = document.createElement('button')
        newBtn.innerHTML = 'obriši<ion-icon name="trash-outline"></ion-icon>'
        newBtn.classList.add('obrisiBtn')
        div.appendChild(newBtn)
       
        totalExpenses += parseInt(id.expense)
       
    })
    expensesAmount.innerText = totalExpenses + ' rsd'
    userAmount.innerText = totalIncomes - totalExpenses + ' rsd'
    return totalExpenses
}

function removeLocalIncome(income){
    let incomes
    if(localStorage.getItem('incomes') === null){
        incomes = []
    } else {
        incomes = JSON.parse(localStorage.getItem('incomes'))
    }

    const incomeIndex  = income.children[0].innerText
    console.log(incomeIndex);
    incomes.splice(incomes.indexOf(incomeIndex), 1)
    localStorage.setItem('incomes', JSON.stringify(incomes))
}

function removeLocalExpense(expense){
    let expenses
    if(localStorage.getItem('expenses') === null){
        expenses = []
    } else {
        expenses = JSON.parse(localStorage.getItem('expenses'))
    }

    const expenseIndex  = expense.children[0].innerText
    console.log(expenseIndex);
    expenses.splice(expenses.indexOf(expenseIndex), 1)
    localStorage.setItem('expenses', JSON.stringify(expenses))
}

function changeColor() {
    let dugme = parseInt(budgetOption.value)
    // console.log(dugme);
    if(dugme === 0){
        budgetSubmit.style.backgroundColor = 'rgb(11, 18, 51)'
        budgetSubmit.style.border = '4px solid rgb(11, 18, 51)'
        budgetSubmit.innerHTML = '<p>dodaj prihod &nbsp;&nbsp;</p><ion-icon name="checkmark-outline"></ion-icon>'
    } else {
        budgetSubmit.style.backgroundColor = 'rgb(192, 33, 33)'
        budgetSubmit.style.border = '4px solid rgb(192, 33, 33)'
        budgetSubmit.innerHTML = '<p>dodaj rashod &nbsp;&nbsp;</p> <ion-icon name="checkmark-outline"></ion-icon>'   
    }
}