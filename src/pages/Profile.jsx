import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: "", email: "" });
    const [stats, setStats] = useState({
        totalSessions: 0,
        totalQuestions: 0,
        pinnedQuestions: 0,
    });
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
    });
    const [loading, setLoading] = useState(true);

    // Profile + Stats fetch karo
    const fetchData = async () => {
        try {
            const [profileRes, statsRes] = await Promise.all([
                axiosInstance.get(API_PATHS.USER.GET_PROFILE),
                axiosInstance.get(API_PATHS.USER.GET_STATS),
            ]);
            setUser(profileRes.data.user);
            setStats(statsRes.data.stats);
        } catch (error) {
            console.log(error.response);
        } finally {
            setLoading(false);
        }
    };

    // Profile update karo
    const handleProfileUpdate = async () => {
        try {
            const res = await axiosInstance.put(API_PATHS.USER.UPDATE_PROFILE, user);
            setUser(res.data.user);
            toast.success("Profile updated!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed");
        }
    };

    // Password change karo
    const handlePasswordChange = async () => {
        if (!passwords.currentPassword || !passwords.newPassword) {
            return toast.error("Fill all password fields");
        }
        if (passwords.newPassword.length < 6) {
            return toast.error("New password must be at least 6 characters");
        }
        try {
            await axiosInstance.put(API_PATHS.USER.CHANGE_PASSWORD, passwords);
            toast.success("Password changed successfully!");
            setPasswords({ currentPassword: "", newPassword: "" });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to change password");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-8">
            <Toaster position="top-right" />

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold">My Profile</h1>
                <p className="text-gray-500 mt-1">Manage your account settings</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-2xl p-5 shadow-sm border text-center">
                    <p className="text-3xl font-bold text-indigo-600">
                        {stats.totalSessions}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Total Sessions</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border text-center">
                    <p className="text-3xl font-bold text-orange-500">
                        {stats.totalQuestions}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Total Questions</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border text-center">
                    <p className="text-3xl font-bold text-green-500">
                        {stats.pinnedQuestions}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Pinned Questions</p>
                </div>
            </div>

            {/* Profile Update */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border mb-6">
                <h2 className="text-lg font-semibold mb-4">Personal Information</h2>

                <div className="space-y-4">
                    {/* Avatar */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600">
                            {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="font-semibold text-lg">{user.name}</p>
                            <p className="text-gray-500 text-sm">{user.email}</p>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                            Name
                        </label>
                        <input
                            type="text"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                            Email
                        </label>
                        <input
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <button
                        onClick={handleProfileUpdate}
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
                    >
                        Update Profile
                    </button>
                </div>
            </div>

            {/* Change Password */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border mb-6">
                <h2 className="text-lg font-semibold mb-4">Change Password</h2>

                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                            Current Password
                        </label>
                        <input
                            type="password"
                            value={passwords.currentPassword}
                            onChange={(e) =>
                                setPasswords({ ...passwords, currentPassword: e.target.value })
                            }
                            placeholder="Enter current password"
                            className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={passwords.newPassword}
                            onChange={(e) =>
                                setPasswords({ ...passwords, newPassword: e.target.value })
                            }
                            placeholder="Enter new password"
                            className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <button
                        onClick={handlePasswordChange}
                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition font-medium"
                    >
                        Change Password
                    </button>
                </div>
            </div>

            {/* Logout */}
            <button
                onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                }}
                className="w-full border border-red-300 text-red-500 py-3 rounded-lg hover:bg-red-50 transition font-medium"
            >
                Logout
            </button>
        </div>
    );
};

export default Profile;