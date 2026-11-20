import { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { collection, addDoc, deleteDoc, doc, query, where, onSnapshot } from "firebase/firestore";

const MEAL_TYPES = ["Breakfast", "Lunch", "Snack", "Dinner"];
const QUICK_FOODS = [
  { name: "Idli (2 pcs)", cal: 150, emoji: "" },
  { name: "Dosa", cal: 200, emoji: "" },
  { name: "Rice + Dal", cal: 350, emoji: "" },
  { name: "Chapati (2)", cal: 180, emoji: "" },
  { name: "Banana", cal: 90, emoji: "" },
  { name: "Egg (boiled)", cal: 70, emoji: "" },
  { name: "Chicken 100g", cal: 165, emoji: "" },
  { name: "Paneer 100g", cal: 265, emoji: "" },
];

function Nutrition() {
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState("");
  const [mealType, setMealType] = useState("Breakfast");
  const [meals, setMeals] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;
    const q = query(collection(db, "meals"), where("uid", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMeals(data);
    });
    return () => unsubscribe();
  }, []);

  const addMeal = async () => {
    if (!mealName || !calories) {
      alert("Please fill all fields");
      return;
    }
    const user = auth.currentUser;
    await addDoc(collection(db, "meals"), {
      uid: user.uid, mealName,
      calories: Number(calories), mealType,
      date: new Date().toLocaleDateString(),
    });
    setMealName(""); setCalories("");
    setShowForm(false);
  };

  const deleteMeal = async (id) => {
    await deleteDoc(doc(db, "meals", id));
  };

  const today = new Date().toLocaleDateString();
  const todayMeals = meals.filter((m) => m.date === today);
  const totalCalories = todayMeals.reduce((s, m) => s + m.calories, 0);
  const goal = 2000;
  const pct = Math.min((totalCalories / goal) * 100, 100);

  const mealsByType = MEAL_TYPES.reduce((acc, type) => {
    acc[type] = todayMeals.filter(m => m.mealType === type);
    return acc;
  }, {});

  return (
    <div style={{ background: "#0a0f0d", minHeight: "100vh", paddingBottom: 80 }}>

      {/* Header */}
      <div style={{
        background: "linear-gradient(160deg, #1a2d0d, #2d4d1a)",
        padding: "24px 20px 30px", position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 150, height: 150, borderRadius: "50%", background: "radial-gradient(circle, rgba(76,175,128,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ color: "#4caf80", fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 4 }}>NUTRITION TRACKER</div>
        <div style={{ color: "white", fontSize: 24, fontWeight: 900 }}>Food Log </div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginTop: 4 }}>Fuel your transformation</div>

        {/* Calorie Progress */}
        <div style={{
          marginTop: 20, background: "rgba(255,255,255,0.08)",
          borderRadius: 18, padding: 16,
          border: "1px solid rgba(76,175,128,0.2)"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>Today's Intake</div>
              <div style={{ color: "white", fontSize: 26, fontWeight: 900 }}>{totalCalories} <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>kcal</span></div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>Remaining</div>
              <div style={{ color: totalCalories > goal ? "#ef4444" : "#4caf80", fontSize: 26, fontWeight: 900 }}>{Math.max(goal - totalCalories, 0)} <span style={{ fontSize: 13, fontWeight: 400 }}>kcal</span></div>
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 99, height: 8 }}>
            <div style={{
              width: `${pct}%`, height: "100%",
              background: pct > 90 ? "linear-gradient(90deg, #ef4444, #f97316)" : "linear-gradient(90deg, #1a4d3a, #4caf80)",
              borderRadius: 99, transition: "width 0.5s ease"
            }} />
          </div>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, marginTop: 6, textAlign: "right" }}>Goal: {goal} kcal</div>
        </div>

        {/* Macros */}
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          {[
            { label: "Protein", value: `${Math.round(totalCalories * 0.3 / 4)}g`, color: "#4caf80" },
            { label: "Carbs", value: `${Math.round(totalCalories * 0.5 / 4)}g`, color: "#38bdf8" },
            { label: "Fats", value: `${Math.round(totalCalories * 0.2 / 9)}g`, color: "#fb923c" },
          ].map((m) => (
            <div key={m.label} style={{
              flex: 1, background: "rgba(255,255,255,0.06)",
              borderRadius: 12, padding: "10px 8px", textAlign: "center"
            }}>
              <div style={{ color: m.color, fontSize: 16, fontWeight: 800 }}>{m.value}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, marginTop: 2 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "20px 16px" }}>

        {/* Quick Add Foods */}
        <div style={{
          background: "#111814", borderRadius: 20, padding: 16,
          border: "1px solid rgba(255,255,255,0.06)", marginBottom: 16
        }}>
          <div style={{ color: "white", fontSize: 14, fontWeight: 800, marginBottom: 12 }}> Quick Add Indian Foods</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {QUICK_FOODS.map((food) => (
              <button key={food.name} onClick={() => {
                setMealName(food.name);
                setCalories(String(food.cal));
                setShowForm(true);
              }} style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12, padding: "10px 12px",
                display: "flex", alignItems: "center", gap: 8,
                cursor: "pointer", textAlign: "left"
              }}>
                <span style={{ fontSize: 20 }}>{food.emoji}</span>
                <div>
                  <div style={{ color: "white", fontSize: 11, fontWeight: 600 }}>{food.name}</div>
                  <div style={{ color: "#4caf80", fontSize: 10, marginTop: 1 }}>{food.cal} kcal</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Meal Type Selector */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {MEAL_TYPES.map((type) => (
            <button key={type} onClick={() => setMealType(type)} style={{
              flex: 1, padding: "10px 6px",
              background: mealType === type ? "linear-gradient(135deg, #1a4d3a, #2d7a5f)" : "#111814",
              border: mealType === type ? "1px solid #4caf80" : "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12, color: mealType === type ? "#4caf80" : "rgba(255,255,255,0.4)",
              fontSize: 10, fontWeight: 700, cursor: "pointer"
            }}>{type}</button>
          ))}
        </div>

        {/* Add Form */}
        {showForm && (
          <div style={{
            background: "#111814", borderRadius: 20, padding: 18,
            border: "1px solid rgba(76,175,128,0.3)",
            boxShadow: "0 0 20px rgba(76,175,128,0.08)", marginBottom: 16
          }}>
            <div style={{ color: "white", fontSize: 15, fontWeight: 800, marginBottom: 14 }}> Log {mealType}</div>
            <input type="text" placeholder="Food name..."
              value={mealName} onChange={(e) => setMealName(e.target.value)}
              style={{ width: "100%", padding: "13px 16px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white", fontSize: 14, marginBottom: 10, outline: "none", boxSizing: "border-box" }}
            />
            <input type="number" placeholder="Calories..."
              value={calories} onChange={(e) => setCalories(e.target.value)}
              style={{ width: "100%", padding: "13px 16px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white", fontSize: 14, marginBottom: 14, outline: "none", boxSizing: "border-box" }}
            />
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowForm(false)} style={{
                flex: 1, padding: "13px", background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12,
                color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 600, cursor: "pointer"
              }}>Cancel</button>
              <button onClick={addMeal} style={{
                flex: 2, padding: "13px",
                background: "linear-gradient(135deg, #1a4d3a, #2d7a5f)",
                border: "none", borderRadius: 12, color: "white",
                fontSize: 14, fontWeight: 700, cursor: "pointer",
                boxShadow: "0 4px 15px rgba(76,175,128,0.3)"
              }}>Log Meal ✓</button>
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
            marginBottom: 20, display: "flex",
            alignItems: "center", justifyContent: "center", gap: 8
          }}>
            <span style={{ fontSize: 20 }}>+</span> Log Meal
          </button>
        )}

        {/* Today's Meals by Type */}
        {MEAL_TYPES.map((type) => (
          mealsByType[type]?.length > 0 && (
            <div key={type} style={{
              background: "#111814", borderRadius: 20, padding: 16,
              border: "1px solid rgba(255,255,255,0.06)", marginBottom: 12
            }}>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>{type.toUpperCase()}</div>
              {mealsByType[type].map((m) => (
                <div key={m.id} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)"
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: "rgba(76,175,128,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18
                  }}>🍽️</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "white", fontSize: 13, fontWeight: 600 }}>{m.mealName}</div>
                    <div style={{ color: "#4caf80", fontSize: 12, marginTop: 2, fontWeight: 700 }}>{m.calories} kcal</div>
                  </div>
                  <button onClick={() => deleteMeal(m.id)} style={{
                    background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
                    borderRadius: 8, padding: "6px 8px", color: "#ef4444", fontSize: 12, cursor: "pointer"
                  }}>🗑️</button>
                </div>
              ))}
            </div>
          )
        ))}

        {todayMeals.length === 0 && (
          <div style={{
            background: "#111814", borderRadius: 20, padding: 32,
            border: "1px solid rgba(255,255,255,0.06)", textAlign: "center"
          }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}></div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>No meals logged today.</div>
            <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, marginTop: 4 }}>Start by adding your breakfast!</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nutrition;