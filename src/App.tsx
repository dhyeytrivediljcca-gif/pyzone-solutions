import { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Solution from "./pages/Solution";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem("pyzone-solutions-theme");
    if (stored === "light" || stored === "dark") return stored;
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  } catch { /* ignore */ }
  return "light";
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Apply theme class to <html>
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    try { localStorage.setItem("pyzone-solutions-theme", theme); } catch { /* ignore */ }
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme((p) => (p === "dark" ? "light" : "dark")), []);
  const finishLoading = useCallback(() => setLoading(false), []);

  return (
    <>
      {loading && <LoadingScreen onComplete={finishLoading} />}

      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.45s ease",
          minHeight: "100vh",
          background: "var(--bg-primary)",
          /* Prevent any child from causing horizontal overflow on the page */
          overflowX: "hidden",
          maxWidth: "100vw",
        }}
        aria-hidden={loading}
      >
        <BrowserRouter>
          <Navbar theme={theme} onToggleTheme={toggleTheme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/question/:id" element={<Solution />} />
            <Route path="*" element={<Solution />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
