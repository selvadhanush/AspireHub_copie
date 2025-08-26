// src/pages/SubjectChapters.jsx
import { useParams, Link } from 'react-router-dom';

const chaptersData = {
  physics: [
    'kinematics',
    'laws-of-motion',
    'work-energy-and-power',
    'gravitation',
    'oscillations',
    'waves',
    'thermodynamics',
    'electrostatics',
    'current-electricity',
    'magnetism-and-electromagnetic-induction'
  ],
  chemistry: [
    'Atomic Structure',
    'Periodic Table',
    'Chemical Bonding',
    'States of Matter',
    'Thermochemistry',
    'Electrochemistry',
    'Chemical Kinetics',
    'Surface Chemistry',
    'Coordination Compounds',
    'Organic Chemistry Basics'
  ],
  biology: [
    'Cell Biology',
    'Genetics',
    'humanPhysiology',
    'Plant Physiology',
    'Ecology',
    'Evolution',
    'Reproduction',
    'Biotechnology',
    'Microbiology',
    'Immunology'
  ]
};

// Function to make URL-friendly slugs
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&/g, 'and')       // replace & with 'and'
    .replace(/[^\w\s-]/g, '')   // remove special chars
    .replace(/\s+/g, '-')       // spaces to dashes
    .trim();
}

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
            to={`/mock-tests/${subject}/${slugify(chapter)}`}
            className="block bg-white p-4 rounded-lg shadow hover:bg-blue-50"
          >
            {chapter}
          </Link>
        ))}
      </div>
    </div>
  );
}
