import { useExpenses } from "../context/ExpenseContext";

const SummaryCards = () => {
  const { income, expense, balance } = useExpenses();

  const cards = [
    {
      title: "Total Balance",
      amount: balance,
      icon: "💰",
      color: "purple",
    },
    {
      title: "Total Income",
      amount: income,
      icon: "📈",
      color: "green",
    },
    {
      title: "Total Expense",
      amount: expense,
      icon: "📉",
      color: "red",
    },
  ];

  return (
    <div className="summary-grid">
      {cards.map((card) => (
        <div className={`summary-card ${card.color}`} key={card.title}>
          <div className="card-top">
            <span>{card.title}</span>
            <span className="card-icon">{card.icon}</span>
          </div>

          <h2>
            ${card.amount.toLocaleString("en-US")}
          </h2>

          <p>Financial overview</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;