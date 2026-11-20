import { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

function Profile() {
  const user = auth.currentUser;
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "nickname", age: 0, height: 0, weight: 0, sex: "gender", goal: ""
    
  });

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setProfile(snap.data());
        setForm(snap.data());
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  const saveProfile = async () => {
    const ref = doc(db, "users", user.uid);
    await setDoc(ref, { ...form, email: user.email });
    setProfile({ ...form, email: user.email });
    setEditing(false);
  };

  const bmi = form.weight / ((form.height / 100) ** 2);
  const bmiStatus = bmi < 18.5 ? { label: "Underweight", color: "#38bdf8" }
    : bmi < 25 ? { label: "Normal", color: "#4caf80" }
    : bmi < 30 ? { label: "Overweight", color: "#fb923c" }
    : { label: "Obese", color: "#ef4444" };

  if (loading) return (
    <div style={{ background: "#0a0f0d", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: "#4caf80", fontSize: 16 }}>Loading profile...</div>
    </div>
  );

  return (
    <div style={{ background: "#0a0f0d", minHeight: "100vh", paddingBottom: 80 }}>

      {/* Header */}
      <div style={{
        background: "linear-gradient(160deg, #0d2b1f, #1a4d3a)",
        padding: "24px 20px 30px"
      }}>
        <div style={{ color: "#4caf80", fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 4 }}>MY ACCOUNT</div>
        <div style={{ color: "white", fontSize: 24, fontWeight: 900 }}>Profile 👤</div>

        {/* Avatar */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 20 }}>
          <div style={{
            width: 70, height: 70, borderRadius: "50%",
            background: "linear-gradient(135deg, #1a4d3a, #4caf80)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 30, border: "3px solid rgba(76,175,128,0.4)"
          }}>
            {form.sex === "Male" ? "" : ""}
          </div>
          <div>
            <div style={{ color: "white", fontSize: 20, fontWeight: 800 }}>{form.name || "Champion"}</div>
            <div style={{ color: "#4caf80", fontSize: 13, marginTop: 2 }}>{user?.email}</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 2 }}> {form.goal}</div>
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 16px" }}>

        {/* BMI Card */}
        <div style={{
          background: "linear-gradient(135deg, #111814, #0d2b1f)",
          borderRadius: 20, padding: 18, marginBottom: 16,
          border: `1px solid ${bmiStatus.color}44`
        }}>
          <div style={{ color: "white", fontSize: 15, fontWeight: 800, marginBottom: 16 }}> BMI Analysis</div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: bmiStatus.color, fontSize: 36, fontWeight: 900 }}>{bmi.toFixed(1)}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>BMI Score</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                background: `${bmiStatus.color}22`, border: `1px solid ${bmiStatus.color}44`,
                borderRadius: 20, padding: "6px 14px", display: "inline-block",
                color: bmiStatus.color, fontSize: 13, fontWeight: 700, marginBottom: 10
              }}>{bmiStatus.label}</div>
              <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 99, height: 8, overflow: "hidden" }}>
                <div style={{
                  width: `${Math.min((bmi / 40) * 100, 100)}%`, height: "100%",
                  background: `linear-gradient(90deg, #38bdf8, #4caf80, #fb923c, #ef4444)`,
                  borderRadius: 99
                }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                {["18.5", "25", "30", "40"].map(v => (
                  <span key={v} style={{ color: "rgba(255,255,255,0.3)", fontSize: 9 }}>{v}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[
            { label: "Age", value: `${form.age}`, unit: "years", emoji: "" },
            { label: "Height", value: `${form.height}`, unit: "cm", emoji: "" },
            { label: "Weight", value: `${form.weight}`, unit: "kg", emoji: "" },
            { label: "Gender", value: form.sex, unit: "", emoji: "" },
          ].map((s) => (
            <div key={s.label} style={{
              background: "#111814", borderRadius: 16, padding: "14px 16px",
              border: "1px solid rgba(255,255,255,0.06)"
            }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{s.emoji}</div>
              <div style={{ color: "white", fontSize: 20, fontWeight: 900 }}>
                {s.value} <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 400 }}>{s.unit}</span>
              </div>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Edit Form */}
        {editing ? (
          <div style={{
            background: "#111814", borderRadius: 20, padding: 18,
            border: "1px solid rgba(76,175,128,0.3)", marginBottom: 16
          }}>
            <div style={{ color: "white", fontSize: 15, fontWeight: 800, marginBottom: 16 }}> Edit Profile</div>

            {[
              { label: "Name", key: "name", type: "text" },
              { label: "Age", key: "age", type: "number" },
              { label: "Height (cm)", key: "height", type: "number" },
              { label: "Weight (kg)", key: "weight", type: "number" },
            ].map((field) => (
              <div key={field.key} style={{ marginBottom: 12 }}>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 600, marginBottom: 6 }}>{field.label.toUpperCase()}</div>
                <input
                  type={field.type}
                  value={form[field.key]}
                  onChange={(e) => setForm({ ...form, [field.key]: field.type === "number" ? Number(e.target.value) : e.target.value })}
                  style={{ width: "100%", padding: "12px 14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "white", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                />
              </div>
            ))}

            <div style={{ marginBottom: 12 }}>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 600, marginBottom: 6 }}>GENDER</div>
              <div style={{ display: "flex", gap: 8 }}>
                {["Male", "Female"].map((g) => (
                  <button key={g} onClick={() => setForm({ ...form, sex: g })} style={{
                    flex: 1, padding: "11px",
                    background: form.sex === g ? "linear-gradient(135deg, #1a4d3a, #2d7a5f)" : "rgba(255,255,255,0.05)",
                    border: form.sex === g ? "1px solid #4caf80" : "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer"
                  }}>{g}</button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setEditing(false)} style={{
                flex: 1, padding: "13px", background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12,
                color: "rgba(255,255,255,0.6)", fontSize: 14, fontWeight: 600, cursor: "pointer"
              }}>Cancel</button>
              <button onClick={saveProfile} style={{
                flex: 2, padding: "13px",
                background: "linear-gradient(135deg, #1a4d3a, #2d7a5f)",
                border: "none", borderRadius: 12, color: "white",
                fontSize: 14, fontWeight: 700, cursor: "pointer",
                boxShadow: "0 4px 15px rgba(76,175,128,0.3)"
              }}>Save Profile ✓</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setEditing(true)} style={{
            width: "100%", padding: "15px",
            background: "linear-gradient(135deg, #1a4d3a, #2d7a5f)",
            border: "none", borderRadius: 16, color: "white",
            fontSize: 15, fontWeight: 700, cursor: "pointer",
            boxShadow: "0 4px 20px rgba(76,175,128,0.3)", marginBottom: 16
          }}> Edit Profile</button>
        )}

        {/* Calories Needed */}
        <div style={{
          background: "linear-gradient(135deg, #0d2b1f, #1a4d3a)",
          borderRadius: 20, padding: 18,
          border: "1px solid rgba(76,175,128,0.2)"
        }}>
          <div style={{ color: "white", fontSize: 15, fontWeight: 800, marginBottom: 12 }}> Your Daily Needs</div>
          {[
            { label: "Calories (BMR)", value: `${Math.round(10 * form.weight + 6.25 * form.height - 5 * form.age + (form.sex === "Male" ? 5 : -161))} kcal` },
            { label: "Protein Goal", value: `${Math.round(form.weight * 1.8)}g` },
            { label: "Water Intake", value: `${(form.weight * 0.033).toFixed(1)}L` },
            { label: "Ideal Weight", value: `${Math.round(22 * ((form.height / 100) ** 2))} kg` },
          ].map((item) => (
            <div key={item.label} style={{
              display: "flex", justifyContent: "space-between",
              padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)"
            }}>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>{item.label}</span>
              <span style={{ color: "#4caf80", fontSize: 13, fontWeight: 700 }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;