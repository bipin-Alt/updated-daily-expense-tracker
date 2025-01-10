// add event listener to execute the script after the html is loaded//
document.addEventListener("DOMContentLoaded", () =>{
 const expenseForm = document.getElementById("expense-form");
 const expenseList = document.getElementById("expense-list");
 const totalAmount = document.getElementById("total-amount");
 const filterCategory = document.getElementById("filter-category"); 


//for displaying the added expense //
 const displayExpense = (expenseArr) =>{
    expenseList.innerHTML = '';
    expenseArr.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.name}</td>
          <td>${item.amount.toFixed(2)}</td>
          <td>${item.category}</td>
          <td>${item.date}</td>
          <td>
            <button class="edit-btn" data-id="${item.id}">Edit</button>
            <button class="delete-btn" data-id="${item.id}">Delete</button>
          </td>
        `;
        expenseList.appendChild(row);
    });
}
//for updating the total amount of expense every time user add a new expense//
const UpdateTotalAmount = () =>{
    const total = expenseArr.reduce((sum, expenses) => sum + expenses.amount,0);
    totalAmount.textContent = total.toFixed(2);
}

 //expense array to store expense name categories also converting the string form in the local storage back to the array or obj//
  let expenseArr = JSON.parse(localStorage.getItem("expenses"))||[];
  displayExpense(expenseArr);
  UpdateTotalAmount();

  //event listener to the expense form//
 expenseForm.addEventListener("submit", (e)=>{
        e.preventDefault();
        const name = document.getElementById('expense-name').value;
        const amount = parseFloat(document.getElementById('expense-amount').value);//converting the amount entered by user//
        const category = document.getElementById('expense-category').value;
        const date = document.getElementById('expense-date').value;
        
        const expenses = {
            id : Date.now(),
            name,
            amount,
            category,
            date,
        }
             expenseArr.push(expenses);
             localStorage.setItem("expenses", JSON.stringify(expenseArr));

             displayExpense(expenseArr);
             UpdateTotalAmount(); 
             expenseForm.reset();

 });
 //event listener to the expense list //
    expenseList.addEventListener("click", (e)=>{
         if(e.target.classList.contains("delete-btn")){
            const id = parseInt(e.target.dataset.id);
            expenseArr = expenseArr.filter(item => item.id !==id);

            //update the array after deleting the stringifying expense //
            localStorage.setItem("expenses", JSON.stringify(expenseArr));

            displayExpense(expenseArr);
            UpdateTotalAmount();
         }
         if(e.target.classList.contains("edit-btn")){
            const id = parseInt(e.target.dataset.id);
            const expense = expenseArr.find(item => item.id === id);
            document.getElementById("expense-name").value = expense.name;
            document.getElementById("expense-amount").value = expense.amount;
            document.getElementById("expense-category").value = expense.category;
            document.getElementById("expense-date").value = expense.date;
            
            expenseArr = expenseArr.filter(expense => expense.id !==id);
           // update the array using JSON.stringify//
           localStorage.setItem("expenses", JSON.stringify(expenseArr));
            displayExpense(expenseArr);
            UpdateTotalAmount();
        }
    });
    filterCategory.addEventListener("change", (e)=>{
           const category = e.target.value;
           if(category ==="All"){
            displayExpense(expenseArr);
           }
           else {
            const filteredExpenses = expenseArr.filter( item => item.category === category);
            displayExpense(filteredExpenses);
           }
    });

});