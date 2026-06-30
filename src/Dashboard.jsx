function Dashboard() {
  const user = localStorage.getItem("user") || "Guest";

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h2>Welcome, {user}!</h2>
      <p>Here's your fitness summary</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "30px" }}>
        <div style={{ border: "1px solid #ccc", borderRadius: "10px", padding: "20px", width: "150px" }}>
          <h3>3</h3>
          <p>Workouts This Week</p>
        </div>

        <div style={{ border: "1px solid #ccc", borderRadius: "10px", padding: "20px", width: "150px" }}>
          <h3>1200</h3>
          <p>Calories Today</p>
        </div>

        <div style={{ border: "1px solid #ccc", borderRadius: "10px", padding: "20px", width: "150px" }}>
          <h3>5</h3>
          <p>Day Streak</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;