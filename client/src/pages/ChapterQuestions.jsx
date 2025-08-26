import { useParams } from "react-router-dom";
import { useState } from "react";
import { questions } from "../data/questions";

export default function ChapterQuestions() {
  const { subject, chapter } = useParams();

  const questionsList = questions[subject]?.[chapter] || [];
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleOptionChange = (index, option) => {
    setSelectedAnswers((prev) => ({ ...prev, [index]: option }));
  };

  const handleSubmit = () => setSubmitted(true);

  const totalQuestions = questionsList.length;
  const correctAnswers = questionsList.filter(
    (q, index) => selectedAnswers[index] === q.correctAnswer
  ).length;
  const wrongAnswers = totalQuestions - correctAnswers;
  const scorePercent = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4 capitalize">
        {subject} - {chapter.replace(/-/g, " ")} - Mock Test
      </h1>

      <div className="space-y-6">
        {questionsList.map((q, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-semibold mb-2">
              {index + 1}. {q.question}
            </h2>
            <div className="space-y-1">
              {q.options.map((opt, i) => (
                <label key={i} className="block">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={opt}
                    checked={selectedAnswers[index] === opt}
                    onChange={() => handleOptionChange(index, opt)}
                    disabled={submitted}
                    className="mr-2"
                  />
                  {opt}
                </label>
              ))}
            </div>

            {submitted && (
              <p
                className={`mt-2 text-sm ${
                  selectedAnswers[index] === q.correctAnswer
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {selectedAnswers[index] === q.correctAnswer
                  ? "✅ Correct"
                  : `❌ Wrong. Correct answer: ${q.correctAnswer}`}
              </p>
            )}
          </div>
        ))}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      ) : (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-blue-600 mb-2">
            📊 Result Summary
          </h2>
          <p>Total Questions: {totalQuestions}</p>
          <p>Correct Answers: ✅ {correctAnswers}</p>
          <p>Wrong Answers: ❌ {wrongAnswers}</p>
          <p>Score: 🧮 {scorePercent}%</p>
        </div>
      )}
    </div>
  );
}
