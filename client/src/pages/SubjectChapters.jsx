// src/pages/SubjectChapters.jsx
import { useParams, Link } from 'react-router-dom';

const chaptersData = {
  physics: ['Kinematics', 'Laws of Motion', 'Work, Power & Energy'],
  chemistry: ['Atomic Structure', 'Periodic Table', 'Chemical Bonding'],
  biology: ['Cell', 'Genetics', 'Human Physiology'],
};

export default function SubjectChapters() {
  const { subject } = useParams();
  const chapters = chaptersData[subject.toLowerCase()] || [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">
        📚 {subject.charAt(0).toUpperCase() + subject.slice(1)} Chapters
      </h1>

      <div className="grid gap-4">
        {chapters.map((chapter) => (
          <Link
            key={chapter}
            to={`/mock-tests/${subject}/${chapter.toLowerCase().replace(/\s+/g, '-')}`}
            className="block bg-white p-4 rounded-lg shadow hover:bg-blue-50"
          >
            {chapter}
          </Link>
        ))}
      </div>
    </div>
  );
}
