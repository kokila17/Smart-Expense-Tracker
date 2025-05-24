let totalAmount = 0;

document.getElementById("expense-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const amount = parseFloat(document.getElementById("amount").value);
  const description = document.getElementById("description").value;
  const recipient = document.getElementById("recipient").value;
  const date = document.getElementById("date").value;

  if (!amount || !description || !recipient || !date) {
    alert("Please fill all fields.");
    return;
  }

  totalAmount += amount;
  document.getElementById("total").innerText = totalAmount.toFixed(2);

  const li = document.createElement("li");
  li.textContent = `${date} - ₹${amount.toFixed(2)} | ${description} | To: ${recipient}`;
  document.getElementById("expense-list").appendChild(li);

  // Reset form
  document.getElementById("expense-form").reset();

  // Save to local storage
  const expenseData = {
    amount,
    description,
    recipient,
    date
  };
  saveToLocalStorage(expenseData);
});

// Store all entries
function saveToLocalStorage(entry) {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.push(entry);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Load existing data
window.onload = function() {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.forEach((exp) => {
    const li = document.createElement("li");
    li.textContent = `${exp.date} - ₹${exp.amount.toFixed(2)} | ${exp.description} | To: ${exp.recipient}`;
    document.getElementById("expense-list").appendChild(li);
    totalAmount += exp.amount;
  });
  document.getElementById("total").innerText = totalAmount.toFixed(2);
};
