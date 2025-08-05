import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProgressPage() {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const token = localStorage.getItem('token'); // assuming you're storing JWT
        const res = await axios.get('http://localhost:8000/api/progress/my-progress', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProgress(res.data);
      } catch (err) {
        console.error('Error fetching progress:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  if (loading) return <p>Loading...</p>;

  // 💡 Process Data
  const subjectsData = {};
  const recentTests = [...progress].reverse().slice(0, 5); // last 5 tests

  progress.forEach(entry => {
    const { test, score, total } = entry;
    const subject = test.subject;
    if (!subjectsData[subject]) {
      subjectsData[subject] = { testsTaken: 0, totalScore: 0, bestScore: 0 };
    }
    subjectsData[subject].testsTaken += 1;
    subjectsData[subject].totalScore += score;
    if (score > subjectsData[subject].bestScore) {
      subjectsData[subject].bestScore = score;
    }
  });

  Object.keys(subjectsData).forEach(subject => {
    const data = subjectsData[subject];
    data.avgScore = Math.round(data.totalScore / data.testsTaken);
  });

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">📈 Your Progress</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {Object.entries(subjectsData).map(([subject, data]) => (
          <div key={subject} className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold capitalize">{subject}</h2>
            <p>Tests Taken: {data.testsTaken}</p>
            <p>Average Score: {data.avgScore}%</p>
            <p>Best Score: {data.bestScore}%</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">🕓 Recent Activity</h2>
      <ul className="bg-white rounded-lg shadow divide-y">
        {recentTests.map((entry, index) => (
          <li key={index} className="p-4 flex justify-between">
            <div>
              <p className="font-medium">{entry.test.subject} - {entry.test.chapter}</p>
              <p className="text-sm text-gray-500">{new Date(entry.createdAt).toLocaleDateString()}</p>
            </div>
            <span className="text-blue-600 font-semibold">{entry.score}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
