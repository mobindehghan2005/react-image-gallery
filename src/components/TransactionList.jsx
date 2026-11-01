import { useExpenses } from "../context/ExpenseContext";

const TransactionList = ({ transactions }) => {
  const { deleteTransaction } = useExpenses();

  return (
    <section className="panel">
      <h3>Recent Transactions</h3>

      {transactions.length === 0 ? (
        <p className="empty-message">No transactions found.</p>
      ) : (
        <div className="transaction-list">
          {transactions.map((item) => (
            <div className="transaction-item" key={item.id}>
              <div className="transaction-info">
                <div className={`transaction-icon ${item.type}`}>
                  {item.type === "income" ? "↙" : "↗"}
                </div>

                <div>
                  <strong>{item.title}</strong>
                  <span>
                    {item.category} · {item.date}
                  </span>
                </div>
              </div>

              <div className="transaction-actions">
                <strong className={item.type}>
                  {item.type === "income" ? "+" : "-"}$
                  {Number(item.amount).toLocaleString("en-US")}
                </strong>

                <button
                  className="delete-btn"
                  onClick={() => deleteTransaction(item.id)}
                  title="Delete transaction"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TransactionList;