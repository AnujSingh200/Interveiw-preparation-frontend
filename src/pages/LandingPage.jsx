import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gradient-to-r from-yellow-100 to-yellow-50 flex flex-col justify-center items-center text-center px-4">

      <h1 className="text-5xl font-bold mb-6">
        Ace Interviews with{" "}
        <span className="text-orange-500">AI-Powered</span> Learning
      </h1>

      <p className="text-gray-600 max-w-xl mb-6">
        Practice with AI-generated interview questions tailored to your role
        and experience. Get instant answers and explanations to boost your
        confidence.
      </p>

      <button
        onClick={() => navigate("/login")}
        className="bg-black text-white px-6 py-3 rounded-lg hover:scale-105 transition"
      >
        Get Started 🚀
      </button>
    </div>
  );
};

export default LandingPage;