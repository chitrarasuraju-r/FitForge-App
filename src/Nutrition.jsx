import { useState, useEffect } from "react";

function Nutrition() {
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState("");
  const [mealType, setMealType] = useState("Breakfast");
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("meals")) || [];
    setMeals(saved);
  }, []);

  const addMeal = () => {
    if (!mealName || !calories) {
      alert("Please fill all fields");
      return;
    }

    const newMeal = {
      id: Date.now(),
      mealName,
      calories: Number(calories),
      mealType,
      date: new Date().toLocaleDateString(),
    };

    const updated = [...meals, newMeal];
    setMeals(updated);
    localStorage.setItem("meals", JSON.stringify(updated));

    setMealName("");
    setCalories("");
  };

  const deleteMeal = (id) => {
    const updated = meals.filter((m) => m.id !== id);
    setMeals(updated);
    localStorage.setItem("meals", JSON.stringify(updated));
  };

  const today = new Date().toLocaleDateString();
  const todayMeals = meals.filter((m) => m.date === today);
  const totalCalories = todayMeals.reduce((sum, m) => sum + m.calories, 0);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🥗 Calorie Tracker</h2>
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>
        Total Today: {totalCalories} kcal
      </p>

      <input
        type="text"
        placeholder="Meal name"
        value={mealName}
        onChange={(e) => setMealName(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "8px", width: "220px" }}
      />
      <input
        type="number"
        placeholder="Calories"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "8px", width: "220px" }}
      />
      <select
        value={mealType}
        onChange={(e) => setMealType(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "8px", width: "236px" }}
      >
        <option>Breakfast</option>
        <option>Lunch</option>
        <option>Dinner</option>
        <option>Snack</option>
      </select>

      <button onClick={addMeal} style={{ padding: "8px 20px", marginTop: "10px" }}>
        Add Meal
      </button>

      <div style={{ marginTop: "30px", maxWidth: "400px", marginLeft: "auto", marginRight: "auto" }}>
        {meals.length === 0 && <p>No meals logged yet.</p>}

        {meals.map((m) => (
          <div
            key={m.id}
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
              <strong>{m.mealName}</strong> — {m.calories} kcal ({m.mealType})
              <br />
              <small>{m.date}</small>
            </div>
            <button onClick={() => deleteMeal(m.id)} style={{ color: "red" }}>
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Nutrition;