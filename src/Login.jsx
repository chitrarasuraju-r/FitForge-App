import { useState } from "react";

function Login({ onLoginSuccess }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    localStorage.setItem("user", userId);
    onLoginSuccess();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Welcome to FitFuture</h2>
      <input
        type="text"
        placeholder="Enter your user ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "8px" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "8px" }}
      />
      <button onClick={handleLogin} style={{ padding: "8px 20px" }}>
        Login
      </button>
    </div>
  );
}

export default Login;