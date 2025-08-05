import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 overflow-hidden">
      <h1 className="text-5xl font-bold text-blue-600 mb-6">AspireHub</h1>
      <p className="text-lg text-gray-600 mb-10 text-center max-w-md px-4">
        A hub for NEET aspirants — study materials, mock tests, progress tracking, and more.
      </p>
      <div className="flex space-x-4">
        <Link to="/login">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-6 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
            Sign Up
          </button>
        </Link>
      </div>
    </main>
  );
}
