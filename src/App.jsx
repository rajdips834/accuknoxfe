import { useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import { Provider } from "react-redux";
import store from "./context/store";
const chartData = [
  { name: "Sales", value: 120 },
  { name: "Marketing", value: 80 },
  { name: "Development", value: 150 },
  { name: "Support", value: 50 },
];

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [widgetsOnDashboard, setWidgetsOnDashboard] = useState([]);

  return (
    <>
      <Provider store={store}>
        <Dashboard />
      </Provider>
    </>
  );
}

export default App;
