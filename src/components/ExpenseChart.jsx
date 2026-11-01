import { useExpenses } from "../context/ExpenseContext";

const ExpenseChart = () => {
  const { transactions } = useExpenses();

  const expenses = transactions.filter(
    (item) => item.type === "expense"
  );

  const categoryTotals = {};

  expenses.forEach((item) => {
    categoryTotals[item.category] =
      (categoryTotals[item.category] || 0) + Number(item.amount);
  });

  const colors = [
    "#7658e8",
    "#16b88a",
    "#f5a623",
    "#ef6461",
    "#4095df",
    "#bd69d8",
    "#8793a5",
  ];

  const totalExpense = expenses.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  let currentAngle = 0;

  const gradientParts = Object.entries(categoryTotals).map(
    ([category, amount], index) => {
      const start = currentAngle;
      const end = start + (amount / (totalExpense || 1)) * 360;
      currentAngle = end;

      return `${colors[index % colors.length]} ${start}deg ${end}deg`;
    }
  );

  const pieBackground =
    gradientParts.length > 0
      ? `conic-gradient(${gradientParts.join(", ")})`
      : "#e9eaf0";

  const now = new Date();
  const months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);

    return {
      name: date.toLocaleString("en-US", { month: "short" }),
      month: date.getMonth(),
      year: date.getFullYear(),
    };
  });

  const monthlyData = months.map((month) => {
    const income = transactions
      .filter(
        (item) =>
          item.type === "income" &&
          new Date(item.date + "T00:00:00").getMonth() === month.month &&
          new Date(item.date + "T00:00:00").getFullYear() === month.year
      )
      .reduce((sum, item) => sum + Number(item.amount), 0);

    const expense = transactions
      .filter(
        (item) =>
          item.type === "expense" &&
          new Date(item.date + "T00:00:00").getMonth() === month.month &&
          new Date(item.date + "T00:00:00").getFullYear() === month.year
      )
      .reduce((sum, item) => sum + Number(item.amount), 0);

    return { ...month, income, expense };
  });

  const maxValue = Math.max(
    ...monthlyData.flatMap((item) => [item.income, item.expense]),
    1
  );

  const getPoints = (key) =>
    monthlyData
      .map((item, index) => {
        const x = 25 + index * 70;
        const y = 145 - (item[key] / maxValue) * 120;
        return `${x},${y}`;
      })
      .join(" ");

  return (
    <div className="charts-grid">
      <section className="panel chart-panel">
        <h3>Expenses by Category</h3>

        <div className="pie-container">
          <div
            className="pie-chart"
            style={{ background: pieBackground }}
          >
            <div className="pie-center">
              <strong>${totalExpense.toLocaleString("en-US")}</strong>
              <span>Total Expense</span>
            </div>
          </div>
        </div>

        <div className="chart-legend">
          {Object.entries(categoryTotals).map(
            ([category, amount], index) => (
              <div className="legend-item" key={category}>
                <span
                  className="legend-dot"
                  style={{
                    background: colors[index % colors.length],
                  }}
                />
                <span>{category}</span>
                <strong>
                  ${amount.toLocaleString("en-US")}
                </strong>
              </div>
            )
          )}

          {expenses.length === 0 && (
            <p className="empty-message">No expense data yet.</p>
          )}
        </div>
      </section>

      <section className="panel chart-panel">
        <h3>Income vs Expenses</h3>

        <div className="chart-legend">
          <span className="income">● Income</span>
          <span className="expense">● Expenses</span>
        </div>

        <div className="line-chart">
          <svg viewBox="0 0 400 175" preserveAspectRatio="none">
            {[25, 65, 105, 145].map((y) => (
              <line
                key={y}
                x1="20"
                y1={y}
                x2="375"
                y2={y}
                stroke="#e8eaf0"
                strokeDasharray="4 4"
              />
            ))}

            <polyline
              points={getPoints("income")}
              fill="none"
              stroke="#16b88a"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            <polyline
              points={getPoints("expense")}
              fill="none"
              stroke="#ef6461"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {monthlyData.map((item, index) => (
              <text
                key={item.name + item.year}
                x={25 + index * 70}
                y="170"
                fontSize="11"
                textAnchor="middle"
                fill="#8992a4"
              >
                {item.name}
              </text>
            ))}
          </svg>
        </div>
      </section>
    </div>
  );
};

export default ExpenseChart;