import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">

      {/* Logo */}
      <h1
        onClick={() => navigate("/dashboard")}
        className="text-xl font-bold cursor-pointer"
      >
        Interview <span className="text-orange-500">AI</span>
      </h1>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm text-gray-600 hover:text-black transition"
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="text-sm text-gray-600 hover:text-black transition"
        >
          Profile
        </button>

        <button
          onClick={handleLogout}
          className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;