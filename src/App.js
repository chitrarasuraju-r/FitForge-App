import { useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import WorkoutLog from "./WorkoutLog";
import Nutrition from "./Nutrition";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("dashboard");

  const logout = () => {
    localStorage.removeItem("user");
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return <Login onLoginSuccess={() => setLoggedIn(true)} />;
  }

  return (
    <div>
      <nav style={{ textAlign: "center", padding: "15px", borderBottom: "1px solid #ccc" }}>
        <button onClick={() => setPage("dashboard")} style={{ margin: "0 10px" }}>Dashboard</button>
        <button onClick={() => setPage("workout")} style={{ margin: "0 10px" }}>Log Workout</button>
        <button onClick={() => setPage("nutrition")} style={{ margin: "0 10px" }}>Nutrition</button>
        <button onClick={logout} style={{ margin: "0 10px", color: "red" }}>Logout</button>
      </nav>

      {page === "dashboard" && <Dashboard />}
      {page === "workout" && <WorkoutLog />}
      {page === "nutrition" && <Nutrition />}
    </div>
  );
}

export default App;