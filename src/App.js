import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./Login";
import Onboarding from "./Onboarding";
import Dashboard from "./Dashboard";
import WorkoutLog from "./WorkoutLog";
import Nutrition from "./Nutrition";
import AICoach from "./AICoach";
import Profile from "./Profile";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [onboarded, setOnboarded] = useState(false);
  const [page, setPage] = useState("dashboard");

  const logout = () => {
    signOut(auth);
    setLoggedIn(false);
    setOnboarded(false);
  };

  if (!loggedIn) {
    return <Login onLoginSuccess={() => setLoggedIn(true)} />;
  }

  if (!onboarded) {
    return <Onboarding onComplete={() => setOnboarded(true)} />;
  }

  return (
    <div style={{ maxWidth: 430, margin: "0 auto", minHeight: "100vh", background: "#f4f7f4", position: "relative", paddingBottom: 70 }}>

      {/* Header */}
      <div style={{ background: "#1a4d3a", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ color: "#4caf80", fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>FitForge</div>
          <div style={{ color: "white", fontSize: 18, fontWeight: 800 }}>Good morning! </div>
        </div>
        <button onClick={logout} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 20, padding: "6px 14px", color: "white", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          Logout
        </button>
      </div>

      {/* Page Content */}
      <div style={{ padding: "0 0 20px" }}>
        {page === "dashboard" && <Dashboard />}
        {page === "workout" && <WorkoutLog />}
        {page === "nutrition" && <Nutrition />}
        {page === "coach" && <AICoach />}
        {page === "profile" && <Profile />}
      </div>

      {/* Bottom Navigation */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 430, background: "white",
        borderTop: "1px solid #e2e8e4", display: "flex",
        justifyContent: "space-around", padding: "8px 0",
        zIndex: 100, boxShadow: "0 -2px 10px rgba(0,0,0,0.08)"
      }}>
        {[
         { id: "dashboard", emoji: "", label: "Home" },
         { id: "workout", emoji: "", label: "Workout" },
         { id: "nutrition", emoji: "", label: "Nutrition" },
         { id: "coach", emoji: "", label: "Coach" },
         { id: "profile", emoji: "", label: "Profile" },
        ].map((tab) => (
          <button key={tab.id} onClick={() => setPage(tab.id)} style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 2, background: "none", border: "none", cursor: "pointer",
            padding: "4px 16px", borderRadius: 8,
            color: page === tab.id ? "#1a4d3a" : "#9ca3af",
          }}>
            <span style={{ fontSize: 20 }}>{tab.emoji}</span>
            <span style={{ fontSize: 10, fontWeight: page === tab.id ? 700 : 500 }}>{tab.label}</span>
            {page === tab.id && (
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#1a4d3a", marginTop: 1 }} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;