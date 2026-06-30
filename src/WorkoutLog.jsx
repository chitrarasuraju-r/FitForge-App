import { useState, useEffect } from "react";

function WorkoutLog() {
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("workouts")) || [];
    setWorkouts(saved);
  }, []);

  const addWorkout = () => {
    if (!exercise || !sets || !reps) {
      alert("Please fill all fields");
      return;
    }

    const newWorkout = {
      id: Date.now(),
      exercise,
      sets,
      reps,
      date: new Date().toLocaleDateString(),
    };

    const updated = [...workouts, newWorkout];
    setWorkouts(updated);
    localStorage.setItem("workouts", JSON.stringify(updated));

    setExercise("");
    setSets("");
    setReps("");
  };

  const deleteWorkout = (id) => {
    const updated = workouts.filter((w) => w.id !== id);
    setWorkouts(updated);
    localStorage.setItem("workouts", JSON.stringify(updated));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🏋️ Workout Logger</h2>

      <input
        type="text"
        placeholder="Exercise name"
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "8px", width: "220px" }}
      />
      <input
        type="number"
        placeholder="Sets"
        value={sets}
        onChange={(e) => setSets(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "8px", width: "220px" }}
      />
      <input
        type="number"
        placeholder="Reps"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "8px", width: "220px" }}
      />

      <button onClick={addWorkout} style={{ padding: "8px 20px", marginTop: "10px" }}>
        Add Workout
      </button>

      <div style={{ marginTop: "30px", maxWidth: "400px", marginLeft: "auto", marginRight: "auto" }}>
        {workouts.length === 0 && <p>No workouts logged yet.</p>}

        {workouts.map((w) => (
          <div
            key={w.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
              textAlign: "left",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>{w.exercise}</strong> — {w.sets} sets x {w.reps} reps
              <br />
              <small>{w.date}</small>
            </div>
            <button onClick={() => deleteWorkout(w.id)} style={{ color: "red" }}>
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkoutLog;