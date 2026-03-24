import { useNavigate } from "react-router-dom";

export default function LoginPage({ setRole }) {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    setRole(role);

    if (role === "admin") navigate("/admin");
    if (role === "teacher") navigate("/teacher");
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2
      bg-gradient-to-br from-blue-50 via-white to-blue-100 
      dark:from-slate-950 dark:to-slate-900">

      {/* LEFT SIDE (IMAGE) */}
      <div className="hidden md:flex items-center justify-center p-10">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
          alt="education"
          className="rounded-3xl shadow-2xl object-cover h-[80%]"
        />
      </div>

      {/* RIGHT SIDE (LOGIN CARD) */}
      <div className="flex flex-col justify-center items-center p-6">

        {/* 🏠 TOP BACK BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 text-blue-500 hover:underline"
        >
          ← Home
        </button>

        <div className="glass p-10 w-full max-w-md space-y-6 fade-in">

          <h1 className="text-3xl font-bold text-blue-500 text-center">
            🎓 Teacher Marks System
          </h1>

          <p className="text-center text-gray-500 dark:text-gray-300 text-sm">
            Select your role to continue
          </p>

          {/* BUTTONS */}
          <div className="space-y-4">

            <button
              onClick={() => handleLogin("teacher")}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              👨‍🏫 Teacher Login
            </button>

            <button
              onClick={() => handleLogin("admin")}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              👨‍💼 Admin Login
            </button>

          </div>

          {/* BOTTOM HOME LINK */}
          <div className="text-center mt-4">
            <button
              onClick={() => navigate("/")}
              className="text-blue-500 hover:underline text-sm"
            >
              ← Back to Home
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}