"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/store/slices/authSlice";

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/users/logout", {
        method: "POST",
      });

      if (!response.ok) throw new Error("Logout failed");

      document.cookie = "authToken=; path=/; max-age=0;";
      dispatch(logout());
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl">BM Business</h1>
        {user ? (
          <div className="flex items-center gap-4">
            <span>Welcome, {user.email}</span>
            <button onClick={handleLogout} className="text-red-500">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <a href="/login" className="text-blue-500">
              Login
            </a>
            <a href="/register" className="text-blue-500">
              Register
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
