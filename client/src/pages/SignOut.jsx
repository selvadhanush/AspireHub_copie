// src/pages/SignOut.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignOut() {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Clear token and any other stored user info
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // optional, if you stored it

    // 🔐 You can also clear context/global state here if used

    // ⏳ Show a short delay before redirecting (optional)
    const timer = setTimeout(() => {
      navigate('/login');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold text-gray-700">Signing you out...</h2>
        <p className="text-sm text-gray-500 mt-2">Redirecting to login page</p>
      </div>
    </div>
  );
}
