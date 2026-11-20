import { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

function Dashboard() {
  const user = auth.currentUser;
  const name = user ? user.email.split("@")[0] : "Champion";
  const [workoutCount, setWorkoutCount] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [water, setWater] = useState(0);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  useEffect(() => {
    if (!user) return;
    const wq = query(collection(db, "workouts"), where("uid", "==", user.uid));
    onSnapshot(wq, (snap) => setWorkoutCount(snap.docs.length));
    const mq = query(collection(db, "meals"), where("uid", "==", user.uid));
    onSnapshot(mq, (snap) => {
      const today = new Date().toLocaleDateString();
      const todayMeals = snap.docs.filter(d => d.data().date === today);
      const total = todayMeals.reduce((s, d) => s + (d.data().calories || 0), 0);
      setTotalCalories(total);
    });
  }, [user]);

  return (
    <div style={{ background: "#0a0f0d", minHeight: "100vh", padding: "0 0 80px" }}>

      {/* Hero Header */}
      <div style={{
        background: "linear-gradient(160deg, #0d2b1f 0%, #1a4d3a 60%, #0a1628 100%)",
        padding: "28px 20px 36px", position: "relative", overflow: "hidden"
      }}>
        {/* Glow effects */}
        <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(76,175,128,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: -20, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(45,122,95,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ color: "#4caf80", fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 4 }}>
                {greeting.toUpperCase()} 
              </div>
              <div style={{ color: "white", fontSize: 26, fontWeight: 900, lineHeight: 1.2 }}>
                {name.charAt(0).toUpperCase() + name.slice(1)} 
              </div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 4 }}>
                Let's crush today's goals 
              </div>
            </div>
            <div style={{
              background: "rgba(76,175,128,0.15)", border: "1px solid rgba(76,175,128,0.3)",
              borderRadius: 16, padding: "8px 14px", textAlign: "center"
            }}>
              <div style={{ color: "#4caf80", fontSize: 20, fontWeight: 900 }}>5</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 9, fontWeight: 600, letterSpacing: 1 }}>DAY STREAK </div>
            </div>
          </div>

          {/* Calorie Ring */}
          <div style={{
            marginTop: 24, background: "rgba(255,255,255,0.05)",
            borderRadius: 20, padding: "16px 20px",
            border: "1px solid rgba(76,175,128,0.2)",
            display: "flex", alignItems: "center", gap: 16
          }}>
            <div style={{ position: "relative", width: 64, height: 64 }}>
              <svg width="64" height="64" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                <circle cx="32" cy="32" r="26" fill="none" stroke="#4caf80" strokeWidth="6"
                  strokeDasharray={`${Math.min((totalCalories / 2000) * 163, 163)} 163`}
                  strokeLinecap="round" />
              </svg>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
                <div style={{ color: "white", fontSize: 11, fontWeight: 800 }}>{Math.round((totalCalories / 2000) * 100)}%</div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, marginBottom: 2 }}>Daily Calories</div>
              <div style={{ color: "white", fontSize: 22, fontWeight: 900 }}>{totalCalories} <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>/ 2000 kcal</span></div>
              <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 99, height: 4, marginTop: 8 }}>
                <div style={{ width: `${Math.min((totalCalories / 2000) * 100, 100)}%`, height: "100%", background: "linear-gradient(90deg, #1a4d3a, #4caf80)", borderRadius: 99 }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 16px" }}>

        {/* Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
          {[
            { emoji: "", value: workoutCount, label: "Workouts", color: "#4caf80" },
            { emoji: "", value: `${water}L`, label: "Water", color: "#38bdf8" },
            { emoji: "", value: "7h", label: "Sleep", color: "#a78bfa" },
          ].map((s) => (
            <div key={s.label} style={{
              background: "#111814", borderRadius: 16, padding: "14px 10px",
              textAlign: "center", border: "1px solid rgba(255,255,255,0.06)"
            }}>
              <div style={{ fontSize: 22 }}>{s.emoji}</div>
              <div style={{ color: s.color, fontSize: 18, fontWeight: 900, marginTop: 4 }}>{s.value}</div>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 10, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Water Tracker */}
        <div style={{
          background: "#111814", borderRadius: 20, padding: 18,
          border: "1px solid rgba(255,255,255,0.06)", marginBottom: 16
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ color: "white", fontSize: 15, fontWeight: 800 }}>Water Tracker</div>
            <div style={{ color: "#38bdf8", fontSize: 13, fontWeight: 700 }}>{water} / 8 glasses</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} onClick={() => setWater(i + 1)} style={{
                flex: 1, height: 36, borderRadius: 8, cursor: "pointer",
                background: i < water ? "linear-gradient(180deg, #38bdf8, #0ea5e9)" : "rgba(255,255,255,0.06)",
                border: i < water ? "none" : "1px solid rgba(255,255,255,0.08)",
                transition: "all 0.2s"
              }} />
            ))}
          </div>
        </div>

        {/* Today's Plan */}
        <div style={{
          background: "#111814", borderRadius: 20, padding: 18,
          border: "1px solid rgba(255,255,255,0.06)", marginBottom: 16
        }}>
          <div style={{ color: "white", fontSize: 15, fontWeight: 800, marginBottom: 14 }}>Today's Plan</div>
          {[
            { time: "7:00 AM", task: "Morning Workout", done: true, emoji: "", color: "#4caf80" },
            { time: "9:00 AM", task: "Breakfast Log", done: true, emoji: "", color: "#fb923c" },
            { time: "1:00 PM", task: "Log Lunch", done: false, emoji: "", color: "#4caf80" },
            { time: "6:00 PM", task: "Evening Run", done: false, emoji: "", color: "#38bdf8" },
            { time: "9:00 PM", task: "Log Dinner", done: false, emoji: "", color: "#a78bfa" },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "11px 0",
              borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none"
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: item.done ? `${item.color}22` : "rgba(255,255,255,0.04)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16
              }}>{item.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: item.done ? "rgba(255,255,255,0.3)" : "white", textDecoration: item.done ? "line-through" : "none" }}>{item.task}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 1 }}>{item.time}</div>
              </div>
              <div style={{
                width: 20, height: 20, borderRadius: "50%",
                background: item.done ? "#1a4d3a" : "rgba(255,255,255,0.06)",
                border: item.done ? "none" : "1px solid rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, color: "#4caf80"
              }}>{item.done ? "✓" : ""}</div>
            </div>
          ))}
        </div>

        {/* Coach Arya */}
        <div style={{
          background: "linear-gradient(135deg, #0d2b1f, #1a4d3a)",
          borderRadius: 20, padding: 18,
          border: "1px solid rgba(76,175,128,0.2)",
          boxShadow: "0 0 30px rgba(76,175,128,0.08)", marginBottom: 16
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: "rgba(76,175,128,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20
            }}></div>
            <div>
              <div style={{ color: "#4caf80", fontSize: 10, fontWeight: 700, letterSpacing: 1.5 }}>COACH</div>
              <div style={{ color: "white", fontSize: 15, fontWeight: 800 }}>Coach Zenith</div>
            </div>
            <div style={{
              marginLeft: "auto", background: "rgba(76,175,128,0.15)",
              borderRadius: 20, padding: "4px 10px",
              color: "#4caf80", fontSize: 10, fontWeight: 700
            }}>● LIVE</div>
          </div>
          <div style={{
            background: "rgba(0,0,0,0.2)", borderRadius: 12, padding: 12, marginBottom: 12
          }}>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 1.6 }}>
              "Great consistency this week! Add 10 mins of stretching after your workout today for better recovery. You're on track to hit your goal! "
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["  Suggest workout", " Plan meals", " Motivate me"].map((q) => (
              <div key={q} style={{
                background: "rgba(76,175,128,0.1)",
                border: "1px solid rgba(76,175,128,0.25)",
                borderRadius: 20, padding: "6px 12px",
                color: "#4caf80", fontSize: 11, fontWeight: 600, cursor: "pointer"
              }}>{q}</div>
            ))}
          </div>
        </div>

        {/* Weekly Progress */}
        <div style={{
          background: "#111814", borderRadius: 20, padding: 18,
          border: "1px solid rgba(255,255,255,0.06)"
        }}>
          <div style={{ color: "white", fontSize: 15, fontWeight: 800, marginBottom: 16 }}> Weekly Progress</div>
          <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 80 }}>
            {[
              { day: "Mon", val: 80 },
              { day: "Tue", val: 60 },
              { day: "Wed", val: 90 },
              { day: "Thu", val: 40 },
              { day: "Fri", val: 70 },
              { day: "Sat", val: 85 },
              { day: "Sun", val: 30 },
            ].map((d, i) => (
              <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{
                  width: "100%", height: `${d.val}%`,
                  background: i === 2 ? "linear-gradient(180deg, #4caf80, #1a4d3a)" : "rgba(76,175,128,0.2)",
                  borderRadius: 6, transition: "all 0.3s"
                }} />
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 9 }}>{d.day}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;