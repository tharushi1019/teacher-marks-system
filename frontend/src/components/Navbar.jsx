import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = ({ role, setRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setRole("");
    navigate("/");
  };

  return (
    <div className="glass flex justify-between items-center px-6 py-3 mb-6">

      <h1 className="text-lg font-semibold text-blue-500">
        🎓 School System
      </h1>

      <div className="flex items-center gap-4">

        <span className="text-sm text-gray-500 capitalize">
          {role}
        </span>

        <ThemeToggle />

        <button
          onClick={handleLogout}
          className="text-red-500 hover:underline"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Navbar;