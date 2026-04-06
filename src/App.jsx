import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import InterviewPrep from "./pages/InterviewPrep";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;
  return children;
};

const App = () => {
  const location = useLocation();
  const hideNavbar = ["/", "/login", "/signup"].includes(location.pathname);
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/interview/:id" element={
          <ProtectedRoute>
            <InterviewPrep />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  );
};

export default App;