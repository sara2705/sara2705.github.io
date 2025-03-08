let today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();
let selectedDate = null;
let expenses = {};

function updateMonthYear() {
    let monthYear = document.getElementById("month-year");
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    monthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;
}

function generateCalendar(year, month) {
    let calendarBody = document.getElementById("calendar-body");
    calendarBody.innerHTML = "";
    let firstDay = new Date(year, month, 1).getDay();
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    let row = "<tr>";

    for (let i = 0; i < firstDay; i++) {
        row += "<td></td>";
    }

    for (let day = 1; day <= daysInMonth; day++) {
        let date = new Date(year, month, day);
        let formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        if (date > today) {
            row += `<td class="disabled">${day}</td>`;
        } else {
            row += `<td onclick="openExpenseTracker('${formattedDate}')">${day}</td>`;
        }

        if ((day + firstDay) % 7 === 0) {
            row += "</tr><tr>";
        }
    }

    row += "</tr>";
    calendarBody.innerHTML = row;
    updateMonthYear();

    document.getElementById("nextBtn").disabled = (year === today.getFullYear() && month >= today.getMonth());
}

function openExpenseTracker(date) {
    selectedDate = date;
    document.getElementById("selected-date").textContent = date;
    loadExpenses();
}

document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear--;
    } else {
        currentMonth--;
    }
    generateCalendar(currentYear, currentMonth);
});

document.getElementById("nextBtn").addEventListener("click", () => {
    if (!(currentYear === today.getFullYear() && currentMonth >= today.getMonth())) {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        generateCalendar(currentYear, currentMonth);
    }
});

document.getElementById("addExpense").addEventListener("click", () => {
    if (!selectedDate) {
        alert("Please select a date first!");
        return;
    }

    let reason = document.getElementById("reason").value.trim();
    let amount = parseFloat(document.getElementById("amount").value.trim());

    if (reason === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter valid reason and amount.");
        return;
    }

    if (!expenses[selectedDate]) {
        expenses[selectedDate] = [];
    }

    expenses[selectedDate].push({ reason, amount });
    document.getElementById("reason").value = "";
    document.getElementById("amount").value = "";
    
    loadExpenses();
});

function loadExpenses() {
    let tableBody = document.querySelector("#expense-table tbody");
    tableBody.innerHTML = "";
    let total = 0;

    if (expenses[selectedDate]) {
        expenses[selectedDate].forEach((expense, index) => {
            let row = tableBody.insertRow();
            row.insertCell(0).textContent = expense.reason;
            row.insertCell(1).textContent = `₹${expense.amount}`;
            
            let actionCell = row.insertCell(2);
            let editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.classList.add("edit-btn");
            editBtn.onclick = () => editExpense(index);

            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.onclick = () => deleteExpense(index);

            actionCell.appendChild(editBtn);
            actionCell.appendChild(deleteBtn);

            total += expense.amount;
        });
    }

    document.getElementById("total-amount").textContent = total;
    updateMonthlyTotal();
}

function editExpense(index) {
    let expense = expenses[selectedDate][index];
    document.getElementById("reason").value = expense.reason;
    document.getElementById("amount").value = expense.amount;
    expenses[selectedDate].splice(index, 1);
    loadExpenses();
}

function deleteExpense(index) {
    expenses[selectedDate].splice(index, 1);
    loadExpenses();
}

function updateMonthlyTotal() {
    let monthlyTotal = 0;
    let monthPrefix = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;

    for (let date in expenses) {
        if (date.startsWith(monthPrefix)) {
            expenses[date].forEach(expense => {
                monthlyTotal += expense.amount;
            });
        }
    }

    document.getElementById("monthly-total").textContent = monthlyTotal;
}

window.onload = function () {
    generateCalendar(currentYear, currentMonth);
};
