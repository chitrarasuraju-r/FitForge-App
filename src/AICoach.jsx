import { useState } from "react";

function AICoach() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I'm your AI fitness coach  Ask me about workouts, nutrition, or your fitness goals!" },
  ]);
  const [input, setInput] = useState("");

  const getResponse = (question) => {
    const q = question.toLowerCase();
    if (q.includes("weight loss") || q.includes("lose weight"))
      return "For weight loss, focus on a calorie deficit of 300-500 calories per day. Combine cardio (3x/week) with strength training and drink plenty of water. Consistency is key! 🔥";
    if (q.includes("muscle") || q.includes("bulk") || q.includes("gain"))
      return "To build muscle, eat in a slight calorie surplus with high protein (1.6-2.2g per kg bodyweight). Focus on compound lifts like squats, deadlifts, and bench press. Sleep 7-9 hours for recovery! 💪";
    if (q.includes("protein"))
      return "Great sources of protein include eggs, chicken breast, paneer, dal, Greek yogurt, and fish. Aim for 25-30g of protein per meal for optimal muscle synthesis! 🥚";
    if (q.includes("cardio") || q.includes("running"))
      return "For cardio, start with 20-30 minutes, 3 times per week. Mix steady-state cardio with HIIT for best results. Morning cardio on an empty stomach can boost fat burning! 🏃";
    if (q.includes("diet") || q.includes("eat") || q.includes("food") || q.includes("nutrition"))
      return "A balanced diet for fitness includes complex carbs (rice, oats), lean protein (chicken, eggs, dal), healthy fats (nuts, olive oil), and plenty of vegetables. Meal prep on Sundays to stay consistent! 🥗";
    if (q.includes("workout") || q.includes("exercise") || q.includes("gym"))
      return "A great beginner workout: Monday (chest/triceps), Wednesday (back/biceps), Friday (legs/shoulders). Always warm up for 5-10 minutes and cool down after. Progressive overload is the key to growth! 🏋️";
    if (q.includes("rest") || q.includes("recovery") || q.includes("sleep"))
      return "Rest days are just as important as workout days! Aim for 7-9 hours of sleep. Your muscles grow during recovery, not during the workout itself. Active recovery (walking, stretching) is great on rest days! 😴";
    if (q.includes("beginner") || q.includes("start") || q.includes("new"))
      return "Welcome to your fitness journey! Start with 3 days per week of full-body workouts. Focus on form over weight. Track your progress with FitForge and stay consistent for at least 90 days to see real results! 🌟";
    if (q.includes("water") || q.includes("hydration"))
      return "Drink at least 3-4 litres of water daily, more if you're exercising intensely. Proper hydration improves performance, reduces fatigue, and aids in fat loss. Keep a water bottle with you always! 💧";
    if (q.includes("supplement") || q.includes("creatine") || q.includes("whey"))
      return "Supplements are not necessary but can help. Whey protein helps hit protein goals, creatine improves strength and power, and multivitamins fill nutritional gaps. Focus on whole foods first! 💊";
    if (q.includes("hello") || q.includes("hi") || q.includes("hey"))
      return "Hello! Great to see you here 💪 I'm your personal AI fitness coach. Ask me anything about workouts, nutrition, weight loss, muscle gain, or recovery!";
    if (q.includes("motivat") || q.includes("tired") || q.includes("give up"))
      return "Remember why you started! Every champion was once a beginner. Missing one workout won't ruin your progress, but quitting will. You've got this — one rep at a time! 🔥💪";
    return "That's a great fitness question! For best results: stay consistent with your workouts, eat balanced nutritious meals, sleep 7-9 hours, and track your progress. Small daily improvements lead to massive results over time! 💪";
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", text: input };
    const aiResponse = { role: "ai", text: getResponse(input) };
    setMessages((prev) => [...prev, userMessage, aiResponse]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto", padding: "0 20px" }}>
      <h2 style={{ textAlign: "center" }}> AI Fitness Coach</h2>
      <div style={{
        border: "1px solid #ccc", borderRadius: "10px", height: "400px",
        overflowY: "auto", padding: "15px", marginTop: "20px",
        display: "flex", flexDirection: "column", gap: "10px",
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.role === "user" ? "flex-end" : "flex-start",
            background: m.role === "user" ? "#4f46e5" : "#f1f1f1",
            color: m.role === "user" ? "white" : "black",
            padding: "8px 12px", borderRadius: "12px",
            maxWidth: "80%", fontSize: "14px",
          }}>
            {m.text}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "8px", marginTop: "15px" }}>
        <input
          type="text" value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask your coach anything..."
          style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
        />
        <button onClick={sendMessage} style={{ padding: "10px 16px", borderRadius: "8px" }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default AICoach;