// src/pages/MockTests.jsx
import { Link } from 'react-router-dom';

export default function MockTests() {
  const subjects = ['Physics', 'Chemistry', 'Biology'];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">📝 Mock Tests</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <Link
            to={`/mock-tests/${subject.toLowerCase()}`}
            key={subject}
            className="bg-white p-6 rounded-xl shadow hover:bg-blue-50 transition"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{subject}</h2>
            <p className="text-gray-600">Start mock tests chapter-wise</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
