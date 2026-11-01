import { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";

const TransactionForm = () => {
  const { addTransaction, categories, addCategory } = useExpenses();

  const [type, setType] = useState("expense");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || Number(amount) <= 0) return;

    addTransaction({
      title,
      amount: Number(amount),
      category,
      date,
      type,
    });

    setTitle("");
    setAmount("");
  };

  const handleNewCategory = () => {
    const newCategory = prompt("Enter category name:");

    if (newCategory?.trim()) {
      addCategory(newCategory.trim());
      setCategory(newCategory.trim());
    }
  };

  return (
    <section className="panel">
      <h3>Add New Transaction</h3>

      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="type-buttons">
          <button
            type="button"
            className={type === "expense" ? "active expense-btn" : ""}
            onClick={() => setType("expense")}
          >
            Expense
          </button>

          <button
            type="button"
            className={type === "income" ? "active income-btn" : ""}
            onClick={() => setType("income")}
          >
            Income
          </button>
        </div>

        <label>Title</label>
        <input
          type="text"
          placeholder="Transaction title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Amount ($)</label>
        <input
          type="number"
          min="1"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <label>Category</label>
        <div className="category-input">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <button type="button" onClick={handleNewCategory}>
            +
          </button>
        </div>

        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button type="submit" className="submit-btn">
          Add Transaction
        </button>
      </form>
    </section>
  );
};

export default TransactionForm;