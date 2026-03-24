import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ role, setRole }) {
  const navigate = useNavigate();

  const logout = () => {
    setRole("");
    navigate("/");
  };

  return (
    <div className="glass p-4 flex justify-between items-center fade-in">

      <h1 className="text-xl font-bold text-blue-500">
        🎓 School System
      </h1>

      <div className="flex items-center gap-4">

        <span className="text-sm opacity-70 capitalize">
          {role}
        </span>

        {/* 🌗 Toggle */}
        <ThemeToggle />

        <button onClick={logout} className="text-red-500">
          Logout
        </button>

      </div>

    </div>
  );
}