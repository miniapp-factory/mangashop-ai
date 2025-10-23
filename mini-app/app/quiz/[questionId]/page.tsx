"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function QuestionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { questionId } = useParams();
  const questionIdNum = parseInt(
    Array.isArray(questionId) ? questionId[0] : questionId ?? "1"
  );
  const score = parseInt(searchParams.get("score") ?? "0");
  const [question, setQuestion] = useState<{ text: string; correct: boolean } | null>(null);
  const [timeLeft, setTimeLeft] = useState(10);

  const handleAnswer = (answer: boolean) => {
    fetch("/api/submit-answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questionId: questionIdNum, answer }),
    })
      .then((res) => res.json())
      .then((data) => {
        const newScore = data.correct ? score + 1 : score;
        const nextId = questionIdNum + 1;
        if (nextId > 10) {
          router.push(`/quiz/result?score=${newScore}`);
        } else {
          router.push(`/quiz/${nextId}?score=${newScore}`);
        }
      });
  };

  useEffect(() => {
    fetch(`/api/generate-quiz?questionId=${questionIdNum}`)
      .then((res) => res.json())
      .then(setQuestion);
  }, [questionIdNum]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleAnswer(false);
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, handleAnswer]);

  if (!question) return <p>Loading...</p>;

  return (
    <main className="p-4">
      <h2 className="text-xl mb-2">{question.text}</h2>
      <p className="mb-4">Time left: {timeLeft}s</p>
      <div className="flex gap-4">
        <button
          onClick={() => handleAnswer(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          True
        </button>
        <button
          onClick={() => handleAnswer(false)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          False
        </button>
      </div>
    </main>
  );
}
