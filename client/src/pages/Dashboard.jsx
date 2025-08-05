// src/pages/Dashboard.jsx
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Welcome to AspireHub!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Study Materials */}
        <Link
          to="/materials"
          className="bg-white shadow-md rounded-xl p-6 hover:bg-blue-50 transition"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">📚 Study Materials</h2>
          <p className="text-gray-600">Explore curated NEET preparation content and PDFs.</p>
        </Link>

        {/* Mock Tests */}
        <Link
          to="/mock-tests"
          className="bg-white shadow-md rounded-xl p-6 hover:bg-blue-50 transition"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">📝 Mock Tests</h2>
          <p className="text-gray-600">Take practice exams and improve your test-taking skills.</p>
        </Link>

        {/* Progress Tracker */}
        <Link
          to="/progress"
          className="bg-white shadow-md rounded-xl p-6 hover:bg-blue-50 transition"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">📈 Progress</h2>
          <p className="text-gray-600">Check your performance and track improvements.</p>
        </Link>

        {/* Community Forum */}
        <Link
          to="/communityForum"
          className="bg-white shadow-md rounded-xl p-6 hover:bg-blue-50 transition"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">💬 Community Forum</h2>
          <p className="text-gray-600">Ask doubts, share strategies, and connect with peers.</p>
        </Link>

        {/* Account Settings */}
        <Link
          to="/account"
          className="bg-white shadow-md rounded-xl p-6 hover:bg-blue-50 transition"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-2">⚙️ Account Settings</h2>
          <p className="text-gray-600">Manage your profile and change password.</p>
        </Link>

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
          className="bg-red-500 text-white rounded-xl p-6 hover:bg-red-600 transition"
        >
          <h2 className="text-xl font-semibold mb-2">🚪 Logout</h2>
          <p>Sign out from your AspireHub account.</p>
        </button>
      </div>
    </div>
  );
}
