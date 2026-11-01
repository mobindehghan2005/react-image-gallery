import { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";

import SummaryCards from "./SummaryCards";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import ExpenseChart from "./ExpenseChart";
import FilterBar from "./FilterBar";

const Dashboard = () => {
  const { transactions, categories } = useExpenses();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("all");

  const filteredTransactions = transactions.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      String(item.amount).includes(search);

    const matchesCategory =
      category === "All" || item.category === category;

    const matchesType = type === "all" || item.type === type;

    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <main className="dashboard">
      <div className="welcome">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back! Here's your financial overview.</p>
        </div>

        <div className="today">
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      <SummaryCards />

      <ExpenseChart />

      <div className="content-grid">
        <TransactionForm />

        <section className="panel transactions-panel">
          <h3>Transaction History</h3>

          <FilterBar
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            type={type}
            setType={setType}
            categories={categories}
          />

          <TransactionList transactions={filteredTransactions} />
        </section>
      </div>
    </main>
  );
};

export default Dashboard;