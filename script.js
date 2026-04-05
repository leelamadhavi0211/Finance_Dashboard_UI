console.log("JS running");
// ================= STATE =================
let state = {
  role: "viewer",
  filter: "all",
  search: "",
  transactions: [
    { date: "2026-04-01", amount: 5000, category: "Salary", type: "income" },
    { date: "2026-04-02", amount: 200, category: "Food", type: "expense" },
    { date: "2026-04-03", amount: 1000, category: "Shopping", type: "expense" },
    { date: "2026-04-04", amount: 300, category: "Transport", type: "expense" }
  ]
};

let editIndex = null;
let categoryChart, trendChart, expenseChart;

// ================= DASHBOARD =================
function renderDashboard() {
  let income = 0, expenses = 0;

  state.transactions.forEach(t => {
    if (t.type === "income") income += t.amount;
    else expenses += t.amount;
  });

  document.getElementById("balance").innerText = "Balance: ₹" + (income - expenses);
  document.getElementById("income").innerText = "Income: ₹" + income;
  document.getElementById("expenses").innerText = "Expenses: ₹" + expenses;
}

// ================= TRANSACTIONS =================
function renderTransactions() {
  const list = document.getElementById("transactionList");
  list.innerHTML = "";

  let filtered = state.transactions.filter(t => {
    return (
      (state.filter === "all" || t.type === state.filter) &&
      t.category.toLowerCase().includes(state.search.toLowerCase())
    );
  });

  if (filtered.length === 0) {
    list.innerHTML = `<tr><td colspan="5">No data found</td></tr>`;
    return;
  }

  filtered.forEach(t => {
    const index = state.transactions.indexOf(t);

    list.innerHTML += `
      <tr>
        <td>${t.date}</td>
        <td>₹${t.amount}</td>
        <td>${t.category}</td>
        <td>${t.type}</td>
        ${
          state.role === "admin"
            ? `<td>
                <button onclick="editTransaction(${index})">Edit</button>
                <button onclick="deleteTransaction(${index})">Delete</button>
              </td>`
            : ""
        }
      </tr>
    `;
  });
}

// ================= ROLE =================
function updateRoleUI() {
  const btn = document.getElementById("addBtn");
  const form = document.getElementById("formContainer");

  if (state.role === "admin") {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
    form.classList.add("hidden");
  }
}

// ================= INSIGHTS =================
function renderInsights() {
  let map = {};

  state.transactions.forEach(t => {
    if (t.type === "expense") {
      map[t.category] = (map[t.category] || 0) + t.amount;
    }
  });

  let highest = Object.keys(map).length
    ? Object.keys(map).reduce((a, b) => (map[a] > map[b] ? a : b))
    : "N/A";

  document.getElementById("insightContent").innerText =
    "Highest spending category: " + highest;
}

// ================= CHARTS =================
function renderCharts() {
  // ===== CATEGORY PIE =====
  let categoryData = {};

  state.transactions.forEach(t => {
    if (t.type === "expense") {
      categoryData[t.category] = (categoryData[t.category] || 0) + t.amount;
    }
  });

  if (categoryChart) categoryChart.destroy();

  categoryChart = new Chart(document.getElementById("categoryChart"), {
    type: "pie",
    data: {
      labels: Object.keys(categoryData),
      datasets: [{ data: Object.values(categoryData) }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });

  // ===== TREND LINE =====
  let trendData = {};

  state.transactions.forEach(t => {
    if (!trendData[t.date]) trendData[t.date] = 0;

    if (t.type === "income") trendData[t.date] += t.amount;
    else trendData[t.date] -= t.amount;
  });

  const dates = Object.keys(trendData).sort();
  const values = dates.map(d => trendData[d]);

  if (trendChart) trendChart.destroy();

  trendChart = new Chart(document.getElementById("trendChart"), {
    type: "line",
    data: {
      labels: dates,
      datasets: [{
        label: "Balance Trend",
        data: values,
        tension: 0.3
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });

  // ===== EXPENSE BAR =====
  let expenseData = {};

  state.transactions.forEach(t => {
    if (t.type === "expense") {
      expenseData[t.category] = (expenseData[t.category] || 0) + t.amount;
    }
  });

  if (expenseChart) expenseChart.destroy();

  expenseChart = new Chart(document.getElementById("expenseChart"), {
    type: "bar",
    data: {
      labels: Object.keys(expenseData),
      datasets: [{
        label: "Expenses",
        data: Object.values(expenseData)
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });
}

// ================= ADD BUTTON =================
document.getElementById("addBtn").addEventListener("click", () => {
  if (state.role !== "admin") {
    alert("Only admin can add");
    return;
  }

  document.getElementById("dateInput").value = "";
  document.getElementById("amountInput").value = "";
  document.getElementById("categoryInput").value = "";
  document.getElementById("typeInput").value = "expense";

  editIndex = null;

  document.getElementById("formContainer").classList.remove("hidden");
});

// ================= SAVE =================
document.getElementById("saveBtn").addEventListener("click", () => {
  const date = document.getElementById("dateInput").value;
  const amount = document.getElementById("amountInput").value;
  const category = document.getElementById("categoryInput").value;
  const type = document.getElementById("typeInput").value;

  if (!date || !amount || !category) {
    alert("Fill all fields");
    return;
  }

  const newTx = {
    date,
    amount: Number(amount),
    category,
    type
  };

  if (editIndex === null) {
    state.transactions.push(newTx);
  } else {
    state.transactions[editIndex] = newTx;
    editIndex = null;
  }

  document.getElementById("formContainer").classList.add("hidden");

  refreshUI();
});

// ================= EDIT =================
function editTransaction(index) {
  if (state.role !== "admin") return;

  const t = state.transactions[index];

  document.getElementById("dateInput").value = t.date;
  document.getElementById("amountInput").value = t.amount;
  document.getElementById("categoryInput").value = t.category;
  document.getElementById("typeInput").value = t.type;

  editIndex = index;

  document.getElementById("formContainer").classList.remove("hidden");
}

// ================= DELETE =================
function deleteTransaction(index) {
  if (state.role !== "admin") return;

  if (confirm("Delete this transaction?")) {
    state.transactions.splice(index, 1);
    refreshUI();
  }
}

// ================= FILTERS =================
document.getElementById("filter").addEventListener("change", e => {
  state.filter = e.target.value;
  renderTransactions();
});

document.getElementById("search").addEventListener("input", e => {
  state.search = e.target.value;
  renderTransactions();
});

document.getElementById("role").addEventListener("change", e => {
  state.role = e.target.value;
  //updateRoleUI();
  refreshUI();
});

// ================= INIT =================
function refreshUI() {
  renderDashboard();
  renderTransactions();
  renderInsights();
  renderCharts();
  updateRoleUI();
}

refreshUI();