import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Discover from "./Discover";
import Insight from "./Insight";
import Profile from "./Profile";
import WorkoutActivity from "./WorkoutActivity";
import GetReady from "./GetReady";
import ExercisePlay from "./ExercisePlay";
import RestScreen from "./RestScreen";
import WorkoutComplete from "./WorkoutComplete";
import Notifications from "./Notifications";
import EditProfile from "./EditProfile";
import Onboarding from "./Onboarding";
import AICoach from "./AICoach";
import Nutrition from "./Nutrition";
import WorkoutLog from "./WorkoutLog";

// Simple in-memory screen router (swap for react-router if you prefer).
// Flow: login -> onboarding (first time only) -> tabs -> workout flow
export default function App() {
  const [user, setUser] = useState(undefined); // undefined = checking, null = logged out
  const [screen, setScreen] = useState("onboarding");
  const [tab, setTab] = useState("home");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return unsub;
  }, []);

  const exerciseSequence = [
    { title: "Warrior 1", seconds: 30, img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600" },
    { title: "Side Plank", seconds: 15, img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600" },
    { title: "One Leg Downward", seconds: 20, img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600" },
    { title: "Triangle Pose", seconds: 40, img: "https://images.unsplash.com/photo-1584863231364-2edc166de576?w=600" },
    { title: "Stork Pose", seconds: 8, img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600" },
  ];
  const [exerciseIndex, setExerciseIndex] = useState(0);

  const goToTab = (t) => {
    setTab(t);
    setScreen("tabs");
  };

  const nextExercise = () => {
    if (exerciseIndex + 1 >= exerciseSequence.length) {
      setScreen("complete");
    } else {
      setExerciseIndex((i) => i + 1);
      setScreen("rest");
    }
  };

  // Still checking Firebase auth state
  if (user === undefined) {
    return <div style={{ minHeight: "100vh", background: "#0E0E13" }} />;
  }

  // Not logged in
  if (!user) {
    return <Login onLoginSuccess={() => setScreen("onboarding")} />;
  }

  if (screen === "onboarding") {
    return <Onboarding onComplete={() => goToTab("home")} />;
  }

  if (screen === "aiCoach") return <AICoach />;
  if (screen === "nutrition") return <Nutrition />;
  if (screen === "workoutLog") return <WorkoutLog />;

  if (screen === "workoutActivity") {
    return (
      <WorkoutActivity
        onBack={() => goToTab("home")}
        onStart={() => {
          setExerciseIndex(0);
          setScreen("getReady");
        }}
      />
    );
  }

  if (screen === "getReady") {
    return <GetReady seconds={9} onDone={() => setScreen("exercise")} />;
  }

  if (screen === "exercise") {
    const ex = exerciseSequence[exerciseIndex];
    return (
      <ExercisePlay
        title={ex.title}
        seconds={ex.seconds}
        img={ex.img}
        onPrevious={() => setExerciseIndex((i) => Math.max(0, i - 1))}
        onSkip={nextExercise}
        onComplete={nextExercise}
      />
    );
  }

  if (screen === "rest") {
    const next = exerciseSequence[exerciseIndex];
    return (
      <RestScreen
        seconds={8}
        nextIndex={exerciseIndex + 1}
        totalCount={exerciseSequence.length}
        nextTitle={next.title}
        nextImg={next.img}
        onDone={() => setScreen("exercise")}
        onSkip={() => setScreen("exercise")}
      />
    );
  }

  if (screen === "complete") {
    return (
      <WorkoutComplete
        onNextWorkout={() => goToTab("home")}
        onHome={() => goToTab("home")}
      />
    );
  }

  if (screen === "notifications") {
    return <Notifications onBack={() => goToTab("profile")} />;
  }

  if (screen === "editProfile") {
    return <EditProfile onBack={() => goToTab("profile")} onSave={() => goToTab("profile")} />;
  }

  // Main tab screens
  if (tab === "home") return <Dashboard />;
  if (tab === "discover") return <Discover />;
  if (tab === "insight") return <Insight />;
  if (tab === "profile") return <Profile />;

  return <Dashboard />;
}