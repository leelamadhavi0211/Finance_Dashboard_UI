#  Finance Dashboard (Frontend)

##  Overview

This project is a **Finance Dashboard Web Application** built using **HTML, CSS, and JavaScript**. It allows users to track financial activity, explore transactions, and understand spending patterns through interactive visualizations.

The application simulates a simple financial management system with role-based UI behavior.

---

##  Features

###  Dashboard Overview

* Displays **Total Balance, Income, and Expenses**
* **Trend Chart (Line Chart)** to visualize financial changes over time
* **Category Breakdown (Pie Chart)** for spending distribution
* **Expense Comparison (Bar Chart)** for category-wise analysis

---

###  Transactions Management

* View all transactions with:

  * Date
  * Amount
  * Category
  * Type (Income / Expense)
* **Search** transactions by category
* **Filter** transactions (All / Income / Expense)
* **Add new transactions** (Admin only)
* **Edit existing transactions** (Admin only)
* **Delete transactions** with confirmation (Admin only)

---

###  Role-Based UI (Simulated)

* **Viewer**

  * Can only view data
* **Admin**

  * Can add, edit, and delete transactions

Role can be switched using a dropdown for demonstration purposes.

---

###  Insights

* Displays **highest spending category**
* Provides quick understanding of spending behavior

---

###  State Management

* Managed using a centralized **JavaScript state object**
* Tracks:

  * Transactions
  * Filters
  * Search input
  * User role

---

###  UI & UX

* Clean and simple design
* Responsive layout for different screen sizes
* Handles empty states (e.g., no transactions found)

---

## Tech Stack

* HTML5
* CSS3
* JavaScript
* Chart.js (for data visualization)

---

##  Setup Instructions

1. Download or clone the repository

```bash
git clone <your-repo-link>
```

2. Navigate to the project folder

```bash
cd finance-dashboard
```

3. Open the project

* Simply open `index.html` in your browser
  **OR**
* Use Live Server in VS Code for better experience

---

## 📁 Project Structure

```
/project
  ├── index.html
  ├── style.css
  ├── script.js
```

---

##  Approach & Design Decisions

* Used **modular rendering functions**:

  * `renderDashboard()`
  * `renderTransactions()`
  * `renderCharts()`
  * `renderInsights()`

* Implemented a **single source of truth (state object)** for simplicity instead of external libraries.

* Used **Chart.js** for:

  * Line chart → time-based trend
  * Pie chart → category distribution
  * Bar chart → expense comparison

* Reused a **single form** for both Add and Edit operations to keep logic simple and maintainable.

* Implemented **role-based conditional rendering** instead of backend RBAC.

---

##  Future Improvements

* Persist data using **localStorage or backend API**
* Add **authentication system**
* Improve UI with modern design (cards, modals, animations)
* Add **monthly/yearly analytics**
* Export reports (CSV/PDF)

---

##  Conclusion

This project demonstrates:

* Frontend development using Vanilla JavaScript
* State management without frameworks
* Data visualization
* UI/UX design principles
* Role-based interface handling

---
