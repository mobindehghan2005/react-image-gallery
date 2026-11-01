import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import { ExpenseProvider } from "./context/ExpenseContext";

function App() {
  return (
    <ExpenseProvider>
      <div className="app">
        <Header />
        <Dashboard />
      </div>
    </ExpenseProvider>
  );
}

export default App;