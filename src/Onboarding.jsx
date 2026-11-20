import { useState } from "react";

const GOALS = [
  { id: "weight_loss", label: "Weight Loss", emoji: "" },
  { id: "muscle", label: "Muscle Gain", emoji: "" },
  { id: "diet", label: "Diet Plan", emoji: "" },
  { id: "fasting", label: "Intermittent Fasting", emoji: "" },
  { id: "calories", label: "Count Calories", emoji: "" },
  { id: "workout", label: "Workout & Yoga", emoji: "" },
];

const ACTIVITY = [
  { id: "sit", label: "Mostly Sitting", desc: "Office/desk job, low movement", emoji: "" },
  { id: "stand", label: "Often Standing", desc: "Standing work, some walking", emoji: "" },
  { id: "walk", label: "Regularly Walking", desc: "Frequent walking, active day", emoji: "" },
  { id: "intense", label: "Physically Intense", desc: "Heavy work, gym daily", emoji: "" },
];

const STEPS = ["Welcome", "Name", "Body", "Goal", "Activity", "Done"];

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name: "", sex: "", age: 0, height: 0, weight: 0,
    goals: [], activity: "",
  });

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const set = (key, val) => setData((d) => ({ ...d, [key]: val }));
  const toggle = (key, id) =>
    setData((d) => ({
      ...d,
      [key]: d[key].includes(id) ? d[key].filter((x) => x !== id) : [...d[key], id],
    }));

  const progress = (step / (STEPS.length - 1)) * 100;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #360b39 0%, #2d0429 50%, #430a3b 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: 20, fontFamily: "'Segoe UI', system-ui, fontfamily"
    }}>

      {/* Glowing orb background effect */}
      <div style={{
        position: "fixed", top: "20%", left: "50%", transform: "translateX(-50%)",
        width: 300, height: 300, borderRadius: "50%",
        background: "radial-gradient(circle, rgb(50, 4, 41) 0%, transparent 70%)",
        pointerEvents: "none"
      }} />

      {/* Card */}
      <div style={{
        width: "100%", maxWidth: 400,
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
        borderRadius: 28,
        border: "1px solid rgb(43, 4, 53)",
        padding: 28,
        boxShadow: "0 0 40px rgba(76,175,128,0.1)",
        position: "relative", zIndex: 1
      }}>

        {/* Progress bar */}
        {step > 0 && step < STEPS.length - 1 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ color: "#ffffff", fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>
                STEP {step} OF {STEPS.length - 2}
              </span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>{Math.round(progress)}%</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 99, height: 4 }}>
              <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #000000, #37073a)", borderRadius: 99, transition: "width 0.4s ease" }} />
            </div>
          </div>
        )}

        {/* Step Content */}
        {step === 0 && <WelcomeScreen next={next} />}
        {step === 1 && <NameScreen data={data} set={set} />}
        {step === 2 && <BodyScreen data={data} set={set} />}
        {step === 3 && <GoalScreen data={data} toggle={toggle} />}
        {step === 4 && <ActivityScreen data={data} set={set} />}
        {step === 5 && <DoneScreen data={data} onComplete={onComplete} />}

        {/* Navigation */}
        {step > 0 && step < STEPS.length - 1 && (
          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            <button onClick={back} style={{
              flex: 1, padding: "13px", background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)", borderRadius: 14,
              color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 600, cursor: "pointer"
            }}>← Back</button>
            <button onClick={next} style={{
              flex: 2, padding: "13px",
              background: "linear-gradient(135deg, #1a4d3a, #2d7a5f)",
              border: "none", borderRadius: 14,
              color: "white", fontSize: 14, fontWeight: 700, cursor: "pointer",
              boxShadow: "0 4px 15px rgba(76,175,128,0.3)"
            }}>
              {step === STEPS.length - 2 ? "Complete Setup" : "Continue →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function WelcomeScreen({ next }) {
  return (
    <div style={{ textAlign: "center", padding: "10px 0" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}></div>
      <div style={{ color: "#ffffff", fontSize: 12, fontWeight: 700, letterSpacing: 3, marginBottom: 8 }}>
        WELCOME TO
      </div>
      <div style={{ color: "white", fontSize: 32, fontWeight: 900, marginBottom: 8 }}>
        FitForge
      </div>
      <div style={{ color: "rgb(255, 255, 255)", fontSize: 14, lineHeight: 1.6, marginBottom: 32 }}>
        Your AI-powered fitness partner.<br />Let's build your personalized plan in 60 seconds.
      </div>

      {/* Feature pills */}
      {[" Coach ", " Smart Tracking", " Nutrition Guide"].map((f) => (
        <div key={f} style={{
          background: "rgb(230, 220, 230)", border: "1px solid rgba(255, 255, 255, 0.97)",
          borderRadius: 20, padding: "8px 16px", marginBottom: 10,
          color: "rgba(0, 0, 0, 0.97)", fontSize: 13, fontWeight: 500
        }}>{f}</div>
      ))}

      <button onClick={next} style={{
        width: "100%", padding: "15px",
        background: "linear-gradient(135deg, #30032d, #40063a)",
        border: "none", borderRadius: 16, color: "white",
        fontSize: 16, fontWeight: 800, cursor: "pointer", marginTop: 16,
        boxShadow: "0 6px 20px rgba(118, 112, 117, 0.59)"
      }}>
        Get Started 
      </button>
    </div>
  );
}

function NameScreen({ data, set }) {
  return (
    <div>
      <div style={{ color: "#ffffff", fontSize: 12, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>STEP 1</div>
      <div style={{ color: "white", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>What's your name?</div>
      <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 24 }}>Coach Arya will use this to personalize your experience.</div>

      <input
        type="text"
        placeholder="Enter your name..."
        value={data.name}
        onChange={(e) => set("name", e.target.value)}
        style={{
          width: "100%", padding: "15px 18px",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(101, 110, 107, 0.46)",
          borderRadius: 14, color: "white", fontSize: 16,
          outline: "none", boxSizing: "border-box",
        }}
      />

      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        {["Male", "Female"].map((g) => (
          <button key={g} onClick={() => set("sex", g)} style={{
            flex: 1, padding: "12px",
            background: data.sex === g ? "linear-gradient(135deg, #270530, #310735)" : "rgba(255,255,255,0.06)",
            border: data.sex === g ? "1px solid #320935" : "1px solid rgba(255,255,255,0.1)",
            borderRadius: 14, color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer"
          }}>{g === "Male" ? " Male" : " Female"}</button>
        ))}
      </div>
    </div>
  );
}

function BodyScreen({ data, set }) {
  return (
    <div>
      <div style={{ color: "#ffffff", fontSize: 12, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>STEP 2</div>
      <div style={{ color: "white", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Your body stats</div>
      <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 24 }}>Used to calculate your daily calorie needs.</div>

      {[
        { label: "Age", unit: "yrs", key: "age", min: 13, max: 80 },
        { label: "Height", unit: "cm", key: "height", min: 120, max: 220 },
        { label: "Weight", unit: "kg", key: "weight", min: 30, max: 200 },
      ].map((field) => (
        <div key={field.key} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "rgba(255,255,255,0.05)", borderRadius: 14,
          padding: "14px 16px", marginBottom: 10,
          border: "1px solid rgba(255,255,255,0.08)"
        }}>
          <span style={{ color: "rgb(255, 255, 255)", fontSize: 14, fontWeight: 600 }}>{field.label}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button onClick={() => set(field.key, Math.max(field.min, data[field.key] - 1))} style={{
              width: 30, height: 30, borderRadius: "50%",
              background: "rgb(243, 248, 246)", border: "1px solid rgba(76,175,128,0.4)",
              color: "#010302", fontSize: 18, cursor: "pointer"
            }}>−</button>
            <span style={{ color: "white", fontWeight: 800, fontSize: 18, minWidth: 60, textAlign: "center" }}>
              {data[field.key]} <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{field.unit}</span>
            </span>
            <button onClick={() => set(field.key, Math.min(field.max, data[field.key] + 1))} style={{
              width: 30, height: 30, borderRadius: "50%",
              background: "rgb(255, 255, 255)", border: "1px solid rgba(76,175,128,0.4)",
              color: "#000000", fontSize: 18, cursor: "pointer"
            }}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function GoalScreen({ data, toggle }) {
  return (
    <div>
      <div style={{ color: "#ffffff", fontSize: 12, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>STEP 3</div>
      <div style={{ color: "white", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Your fitness goals</div>
      <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 24 }}>Select all that apply — Coach Arya will craft your plan.</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {GOALS.map((g) => {
          const active = data.goals.includes(g.id);
          return (
            <button key={g.id} onClick={() => toggle("goals", g.id)} style={{
              padding: "14px 10px",
              background: active ? "linear-gradient(135deg, #1a4d3a, #2d7a5f)" : "rgba(255,255,255,0.05)",
              border: active ? "1px solid #4caf80" : "1px solid rgba(255,255,255,0.1)",
              borderRadius: 14, color: "white", cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
              boxShadow: active ? "0 4px 15px rgba(76,175,128,0.2)" : "none"
            }}>
              <div style={{ fontSize: 24 }}>{g.emoji}</div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{g.label}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ActivityScreen({ data, set }) {
  return (
    <div>
      <div style={{ color: "#ffffff", fontSize: 12, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>STEP 4</div>
      <div style={{ color: "white", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Activity level</div>
      <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 24 }}>Helps calculate your daily calorie burn.</div>

      {ACTIVITY.map((a) => {
        const active = data.activity === a.id;
        return (
          <button key={a.id} onClick={() => set("activity", a.id)} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 14,
            padding: "14px 16px", marginBottom: 10,
            background: active ? "linear-gradient(135deg, #000000, #000000)" : "rgba(255,255,255,0.05)",
            border: active ? "1px solid #020000" : "1px solid rgba(255,255,255,0.1)",
            borderRadius: 14, color: "white", cursor: "pointer",
            boxShadow: active ? "0 4px 15px rgba(76,175,128,0.2)" : "none"
          }}>
            <div style={{ fontSize: 28 }}>{a.emoji}</div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{a.label}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{a.desc}</div>
            </div>
            {active && <div style={{ marginLeft: "auto", color: "#4caf80", fontSize: 18 }}>✓</div>}
          </button>
        );
      })}
    </div>
  );
}

function DoneScreen({ data, onComplete }) {
  return (
    <div style={{ textAlign: "center", padding: "10px 0" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}></div>
      <div style={{ color: "#ffffff", fontSize: 12, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>ALL SET!</div>
      <div style={{ color: "white", fontSize: 24, fontWeight: 900, marginBottom: 12 }}>
        Ready, {data.name || "Champion"}! 
      </div>
      <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.7, marginBottom: 28 }}>
        Coach Arya has built your personalized plan.<br />
        Your transformation starts now.
      </div>

      {/* Summary cards */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
        {[
          { label: "Weight", value: `${data.weight}kg` },
          { label: "Height", value: `${data.height}cm` },
          { label: "Age", value: `${data.age}yrs` },
        ].map((item) => (
          <div key={item.label} style={{
            flex: 1, background: "rgba(76,175,128,0.1)",
            border: "1px solid rgba(76,175,128,0.2)",
            borderRadius: 12, padding: "10px 6px"
          }}>
            <div style={{ color: "white", fontWeight: 800, fontSize: 16 }}>{item.value}</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>{item.label}</div>
          </div>
        ))}
      </div>

      <button onClick={onComplete} style={{
        width: "100%", padding: "16px",
        background: "linear-gradient(135deg, #fafffd, #f2f8f5)",
        border: "none", borderRadius: 16, color: "white",
        fontSize: 16, fontWeight: 800, cursor: "pointer",
        boxShadow: "0 6px 20px rgb(189, 210, 200)"
      }}>
        Launch FitForge 
      </button>
    </div>
  );
}