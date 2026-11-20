import { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { collection, addDoc, deleteDoc, doc, query, where, onSnapshot } from "firebase/firestore";

const EXERCISES = ["Bench Press", "Squats", "Deadlift", "Pull Ups", "Push Ups", "Running", "Cycling", "Yoga", "HIIT", "Plank"];

function WorkoutLog() {
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;
    const q = query(collection(db, "workouts"), where("uid", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setWorkouts(data);
    });
    return () => unsubscribe();
  }, []);

  const addWorkout = async () => {
    if (!exercise || !sets || !reps) {
      alert("Please fill all fields");
      return;
    }
    const user = auth.currentUser;
    await addDoc(collection(db, "workouts"), {
      uid: user.uid, exercise, sets, reps,
      date: new Date().toLocaleDateString(),
    });
    setExercise(""); setSets(""); setReps("");
    setShowForm(false);
  };

  const deleteWorkout = async (id) => {
    await deleteDoc(doc(db, "workouts", id));
  };

  const totalSets = workouts.reduce((s, w) => s + Number(w.sets || 0), 0);
  const totalReps = workouts.reduce((s, w) => s + Number(w.reps || 0), 0);

  return (
    <div style={{ background: "#0a0f0d", minHeight: "100vh", paddingBottom: 80 }}>

      {/* Header */}
      <div style={{
        background: "linear-gradient(160deg, #0d2b1f, #1a4d3a)",
        padding: "24px 20px 30px", position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 150, height: 150, borderRadius: "50%", background: "radial-gradient(circle, rgba(76,175,128,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ color: "#4caf80", fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 4 }}>FITNESS TRACKER</div>
        <div style={{ color: "white", fontSize: 24, fontWeight: 900 }}>Workout Log 🏋️</div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginTop: 4 }}>Track every rep, every set</div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          {[
            { label: "Total Workouts", value: workouts.length },
            { label: "Total Sets", value: totalSets },
            { label: "Total Reps", value: totalReps },
          ].map((s) => (
            <div key={s.label} style={{
              flex: 1, background: "rgba(255,255,255,0.08)",
              borderRadius: 14, padding: "10px 8px", textAlign: "center",
              border: "1px solid rgba(76,175,128,0.2)"
            }}>
              <div style={{ color: "#4caf80", fontSize: 20, fontWeight: 900 }}>{s.value}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 9, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "20px 16px" }}>

        {/* Quick Add Exercises */}
        <div style={{
          background: "#111814", borderRadius: 20, padding: 16,
          border: "1px solid rgba(255,255,255,0.06)", marginBottom: 16
        }}>
          <div style={{ color: "white", fontSize: 14, fontWeight: 800, marginBottom: 12 }}> Quick Select Exercise</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {EXERCISES.map((ex) => (
              <button key={ex} onClick={() => { setExercise(ex); setShowForm(true); }} style={{
                background: exercise === ex ? "linear-gradient(135deg, #1a4d3a, #2d7a5f)" : "rgba(255,255,255,0.05)",
                border: exercise === ex ? "1px solid #4caf80" : "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20, padding: "7px 14px",
                color: exercise === ex ? "#4caf80" : "rgba(255,255,255,0.6)",
                fontSize: 12, fontWeight: 600, cursor: "pointer"
              }}>{ex}</button>
            ))}
          </div>
        </div>

        {/* Add Form */}
        {showForm && (
          <div style={{
            background: "#111814", borderRadius: 20, padding: 18,
            border: "1px solid rgba(76,175,128,0.3)",
            boxShadow: "0 0 20px rgba(76,175,128,0.08)",
            marginBottom: 16
          }}>
            <div style={{ color: "white", fontSize: 15, fontWeight: 800, marginBottom: 16 }}>
               Log: {exercise || "Select exercise"}
            </div>

            <input
              type="text" placeholder="Exercise name..."
              value={exercise} onChange={(e) => setExercise(e.target.value)}
              style={{ width: "100%", padding: "13px 16px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white", fontSize: 14, marginBottom: 10, outline: "none", boxSizing: "border-box" }}
            />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              <div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 600, marginBottom: 6 }}>SETS</div>
                <input type="number" placeholder="e.g. 3" value={sets}
                  onChange={(e) => setSets(e.target.value)}
                  style={{ width: "100%", padding: "13px 16px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white", fontSize: 16, fontWeight: 700, outline: "none", boxSizing: "border-box" }}
                />
              </div>
              <div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 600, marginBottom: 6 }}>REPS</div>
                <input type="number" placeholder="e.g. 12" value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  style={{ width: "100%", padding: "13px 16px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white", fontSize: 16, fontWeight: 700, outline: "none", boxSizing: "border-box" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowForm(false)} style={{
                flex: 1, padding: "13px", background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12,
                color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 600, cursor: "pointer"
              }}>Cancel</button>
              <button onClick={addWorkout} style={{
                flex: 2, padding: "13px",
                background: "linear-gradient(135deg, #1a4d3a, #2d7a5f)",
                border: "none", borderRadius: 12, color: "white",
                fontSize: 14, fontWeight: 700, cursor: "pointer",
                boxShadow: "0 4px 15px rgba(76,175,128,0.3)"
              }}>Log Workout ✓</button>
            </div>
          </div>
        )}

        {/* Add Button */}
        {!showForm && (
          <button onClick={() => setShowForm(true)} style={{
            width: "100%", padding: "15px",
            background: "linear-gradient(135deg, #1a4d3a, #2d7a5f)",
            border: "none", borderRadius: 16, color: "white",
            fontSize: 15, fontWeight: 700, cursor: "pointer",
            boxShadow: "0 4px 20px rgba(76,175,128,0.3)",
            marginBottom: 20, display: "flex", alignItems: "center",
            justifyContent: "center", gap: 8
          }}>
            <span style={{ fontSize: 20 }}>+</span> Add Workout
          </button>
        )}

        {/* Workout List */}
        <div style={{ color: "white", fontSize: 15, fontWeight: 800, marginBottom: 12 }}>
          📋 Workout History
        </div>

        {workouts.length === 0 ? (
          <div style={{
            background: "#111814", borderRadius: 20, padding: 32,
            border: "1px solid rgba(255,255,255,0.06)", textAlign: "center"
          }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>🏋️</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>No workouts logged yet.</div>
            <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, marginTop: 4 }}>Add your first workout above!</div>
          </div>
        ) : (
          workouts.map((w, i) => (
            <div key={w.id} style={{
              background: "#111814", borderRadius: 16, padding: "14px 16px",
              marginBottom: 10, border: "1px solid rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center", gap: 12
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: "linear-gradient(135deg, #1a4d3a, #2d7a5f)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20
              }}>💪</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "white", fontSize: 14, fontWeight: 700 }}>{w.exercise}</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 2 }}>{w.date}</div>
                <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                  <span style={{ background: "rgba(76,175,128,0.15)", borderRadius: 8, padding: "2px 8px", color: "#4caf80", fontSize: 11, fontWeight: 700 }}>{w.sets} sets</span>
                  <span style={{ background: "rgba(76,175,128,0.15)", borderRadius: 8, padding: "2px 8px", color: "#4caf80", fontSize: 11, fontWeight: 700 }}>{w.reps} reps</span>
                </div>
              </div>
              <button onClick={() => deleteWorkout(w.id)} style={{
                background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: 10, padding: "8px 10px", color: "#ef4444",
                fontSize: 14, cursor: "pointer"
              }}>🗑️</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default WorkoutLog;