"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("gordatech_theme") as "dark" | "light";
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("gordatech_theme", nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 left-6 z-[95] w-11 h-11 rounded-full flex items-center justify-center cursor-pointer select-none transition-all duration-300 hover:scale-110 shadow-lg border"
      style={{
        background: theme === "dark" ? "rgba(5, 10, 24, 0.85)" : "#ffffff",
        borderColor: theme === "dark" ? "rgba(66, 178, 191, 0.35)" : "rgba(15, 23, 42, 0.15)",
        boxShadow: theme === "dark" ? "0 6px 20px rgba(66, 178, 191, 0.12)" : "0 6px 20px rgba(15, 23, 42, 0.08)",
        color: theme === "dark" ? "#42b2bf" : "#0f172a",
        backdropFilter: "blur(8px)",
      }}
      title={theme === "dark" ? "Aktifkan Mode Terang" : "Aktifkan Mode Gelap"}
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-5 h-5 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
}
