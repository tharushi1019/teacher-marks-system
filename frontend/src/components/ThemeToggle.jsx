import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "system");

  useEffect(() => {
    const applyTheme = (themeName) => {
      let isDark = themeName === "dark";
      if (themeName === "system") {
        isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
      
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    applyTheme(theme);
    localStorage.setItem("theme", theme);

    if (theme === "system") {
      const matcher = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e) => {
        if (e.matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      };
      
      matcher.addEventListener("change", handleChange);
      return () => matcher.removeEventListener("change", handleChange);
    }
  }, [theme]);

  const modes = [
    { id: "light", icon: "☀️", label: "Light" },
    { id: "dark", icon: "🌙", label: "Dark" },
    { id: "system", icon: "💻", label: "System" }
  ];

  const cycleTheme = () => {
    const currentIndex = modes.findIndex(m => m.id === theme);
    const nextIndex = (currentIndex + 1) % modes.length;
    setTheme(modes[nextIndex].id);
  };

  const currentMode = modes.find(m => m.id === theme) || modes[2];

  return (
    <button
      onClick={cycleTheme}
      title={`Theme: ${currentMode.label}`}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 shadow-sm hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-200 select-none cursor-pointer"
    >
      <span className="text-base leading-none">{currentMode.icon}</span>
      <span className="text-xs font-semibold tracking-wide">{currentMode.label}</span>
    </button>
  );
};

export default ThemeToggle;