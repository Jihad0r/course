import { useState, useEffect } from "react";
import { X, Clock } from "lucide-react";
import {questionsData} from "./data.js"
export default function QuestionPopups({ openQPopup,openPopup,userId }) {
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(9 * 60 + 32);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(`quizProgress_${userId}`);
    if (saved) {
      const data = JSON.parse(saved);
      
      
      if (!data.showResults && Object.keys(data.selectedAnswers).length < questionsData.length) {
        setCurrentQuestion(data.currentQuestion);
        setSelectedAnswers(data.selectedAnswers);
        setScore(data.score);
        setTimeLeft(data.timeLeft);
        setShowResults(false);
      } else {
        localStorage.removeItem(`quizProgress_${userId}`);
        resetQuiz();
      }
    }
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    if (loading) return;
    const progress = { currentQuestion, selectedAnswers, score, timeLeft, showResults };
    localStorage.setItem(`quizProgress_${userId}`, JSON.stringify(progress));
  }, [currentQuestion, selectedAnswers, score, timeLeft, showResults, loading,userId]);

  useEffect(() => {
    if (showResults || loading) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [showResults, loading]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (answerId) => {
    if (selectedAnswers[currentQuestion]) return;
    const updatedAnswers = { ...selectedAnswers, [currentQuestion]: answerId };
    setSelectedAnswers(updatedAnswers);

    setTimeout(() => {
      if (currentQuestion < questionsData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        const finalScore = questionsData.reduce((acc, q, index) => {
          const selected = updatedAnswers[index];
          const correct = q.answers.find((a) => a.id === selected)?.isCorrect;
          return acc + (correct ? 1 : 0);
        }, 0);
        setScore(finalScore);
        setShowResults(true);
        localStorage.removeItem(`quizProgress_${userId}`); 
      }
    }, 500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setScore(0);
    setTimeLeft(10 * 60);
    setShowResults(false);
  };

  const goToQuestion = (index) => setCurrentQuestion(index);

  const currentQuestionData = questionsData[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#000000b8] text-white text-lg font-medium">
        Loading your progress...
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#000000b8] flex items-center justify-center p-4 z-50 overflow-auto">
      <div className="w-full max-w-lg sm:max-w-xl md:max-w-2xl bg-[#5563d1] rounded-3xl p-4 shadow-2xl relative">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <button
            className="text-white hover:scale-110 transition-transform"
             onClick={()=>{openQPopup(false);
               openPopup(false);}}
          >
            <X size={24} className="sm:w-7 sm:h-7" />
          </button>

          <div className="bg-yellow-400 text-gray-800 px-3 py-1.5 sm:px-5 sm:py-2 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2">
            <Clock size={14} className="sm:w-4 sm:h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          <div className="w-6 sm:w-8"></div>
        </div>

        {showResults ? (
          <div className="bg-white rounded-3xl p-6 sm:p-8 text-center shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-[#5563d1] mb-4">
              Quiz Completed!
            </h2>
            <p className="text-gray-700 text-base sm:text-lg mb-6">
              Your Score:{" "}
              <span className="font-bold text-[#5563d1]">{score}</span> /{" "}
              {questionsData.length}
            </p>
            
              <button
                onClick={()=>{openQPopup(false);
               openPopup(false);}}
                className="bg-[#5563d1] text-white px-5 py-2 sm:px-6 sm:py-2.5 rounded-full font-medium hover:scale-105 transition-transform"
              >
                Close
              </button>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-5 sm:mb-6">
              {questionsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToQuestion(index)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center font-medium transition-all hover:scale-110 ${
                    currentQuestion === index
                      ? "bg-white text-[#5563d1] border-2 border-white"
                      : selectedAnswers[index]
                      ? "bg-green-400 text-white border-2 border-green-400"
                      : "bg-white/20 text-white border-2 border-white/40"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl transition-all duration-300">
              <div className="text-gray-800 text-base sm:text-lg font-bold mb-3 sm:mb-4">
                Question {currentQuestionData.id}
              </div>
              <div className="text-gray-800 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6">
                {currentQuestionData.question}
              </div>

              <div className="flex flex-col gap-3 sm:gap-4">
                {currentQuestionData.answers.map((answer) => (
                  <div
                    key={answer.id}
                    onClick={() => handleAnswerSelect(answer.id)}
                    className={`flex items-center p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedAnswer === answer.id
                        ? "bg-[#5563d1] border-[#5563d1] text-white"
                        : "bg-gray-50 border-gray-300 text-gray-800 hover:border-[#5563d1] hover:bg-blue-50"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={selectedAnswer === answer.id}
                      readOnly
                      className="w-4 h-4 sm:w-5 sm:h-5 mr-3 sm:mr-4 cursor-pointer"
                      style={{
                        accentColor:
                          selectedAnswer === answer.id ? "white" : "#5563d1",
                      }}
                    />
                    <span className="text-xs sm:text-sm flex-1">
                      {answer.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
