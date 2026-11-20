import { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async () => {
    setError("");
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onLoginSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#2b052f", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 24 }}>

      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ color: "white", fontSize: 30, fontWeight: 800, marginTop: 8 }}>FitForge</div>
        <div style={{ color: "#fefefe", fontSize: 15, marginTop: 4 }}>Your AI Fitness Partner</div>
      </div>

      {/* Card */}
      <div style={{ background: "white", borderRadius: 24, padding: 28, width: "100%", maxWidth: 380 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, color: "#010101" }}>
          {isRegister ? "Create Account" : "Welcome Back"}
        </h2>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: "block", width: "100%", padding: "13px 16px", borderRadius: 14, border: "1px solid #e2e8e4", fontSize: 14, marginBottom: 12, outline: "none", boxSizing: "border-box" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", width: "100%", padding: "13px 16px", borderRadius: 14, border: "1px solid #e2e8e4", fontSize: 14, marginBottom: 16, outline: "none", boxSizing: "border-box" }}
        />

        {error && <p style={{ color: "#ef4444", fontSize: 12, marginBottom: 12 }}>{error}</p>}

        <button onClick={handleAuth} style={{ width: "100%", padding: "14px", background: "#050105", color: "white", border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          {isRegister ? "Create Account" : "Login"}
        </button>

        <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "#000000" }}>
          {isRegister ? "Already have an account?" : "New to FitForge?"}{" "}
          <span onClick={() => setIsRegister(!isRegister)} style={{ color: "#050c09", fontWeight: 700, cursor: "pointer" }}>
            {isRegister ? "Login" : "Register"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;