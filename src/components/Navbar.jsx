import { useEffect, useState } from "react";

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const Navbar = () => {
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("theme-mode") || "system",
  );

  useEffect(() => {
    const theme = themeMode === "system" ? getSystemTheme() : themeMode;

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme-mode", themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <nav className="border-border flex items-center justify-between border-b px-10 py-4">
      <h1 className="font-bbh text-maintext text-xl">Project Management</h1>

      <button
        onClick={toggleTheme}
        className=" btn border-border font-gothic bg-bg-light rounded-xl border px-4 py-2 transition"
      >
        {themeMode === "dark" ? "Light" : "Dark"} mode
      </button>
    </nav>
  );
};

export default Navbar;
