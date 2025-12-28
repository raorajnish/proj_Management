import React, { useEffect, useState } from "react";

const App = () => {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved;
      return window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } catch (e) {
      return "light";
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <div className="bg-bg-dark flex min-h-screen items-center justify-center">
      <div className="card bg-black hover:bg-red-700 border-border max-w-sm rounded-xl border p-6 min-h-fit transition ">
        <h1 className="font-bbh text-maintext text-3xl">Project 1</h1>
        <h3 className="font-lora text-subtext my-4 text-lg">
          Project description regarding what it is about and its importance
        </h3>
        <button
          onClick={toggleTheme}
          aria-pressed={theme === "dark"}
          className="btn font-gothic text-maintext bg-bg-light cursor-pointer rounded-xl border border-border px-4 py-2 transition"
        >
         {theme === "dark" ? "light" : "dark"} mode
        </button>
        
      </div>
    </div>
  );
};

export default App;
