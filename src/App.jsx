import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Layout from "./layout/Layout";
import Overview from "./pages/Overview";
import Performance from "./pages/Performance";
import Errors from "./pages/Errors";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <>
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

      <Routes>
        <Route
          path="/"
          element={
            localStorage.getItem("isAuthenticated") === "true" ? (
              <Navigate to="/login" replace />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="performance" element={<Performance />} />
          <Route path="errors" element={<Errors />} />
        </Route>

        <Route
          path="*"
          element={
            localStorage.getItem("isAuthenticated") === "true" ? (
              <Navigate to="/login" replace />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;