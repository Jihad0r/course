import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function AskPopups({ openAskPopup, openPopup}) {
  const [askQuestion, setAskQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const savedDraft = localStorage.getItem("unsentQuestion");
    const savedPrevious = JSON.parse(localStorage.getItem("questions")) || [];

    if (savedDraft) setAskQuestion(savedDraft);
    setQuestions(savedPrevious);
  }, []);

  useEffect(() => {
    if (askQuestion.trim()) {
      localStorage.setItem("unsentQuestion", askQuestion);
    } else {
      localStorage.removeItem("unsentQuestion");
    }
  }, [askQuestion]);

  const handleSubmitQuestion = () => {
    if (!askQuestion.trim()) return alert("Please type your question first!");
    setSubmitted(true);
    setQuestions();

    const newQuestion = {
      id: Date.now(),
      text: askQuestion,
      date: new Date().toLocaleDateString(),
    };

    const updatedQuestions = [newQuestion, ...questions];
    
    setQuestions(updatedQuestions);
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));

    localStorage.removeItem("unsentQuestion");
    setTimeout(() => {
      openAskPopup(false);
      openPopup(false);
      setAskQuestion("");
    }, 1000);
  };

  const closePopup = () => {
    openAskPopup(false);
    openPopup(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 sm:p-6 z-50">
      <div className="w-full max-w-lg sm:max-w-xl bg-white rounded-2xl shadow-2xl relative animate-fadeIn">
        <div className="flex justify-between items-center px-5 sm:px-6 py-4">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Ask a Question</h2>
          <button onClick={closePopup} className="text-gray-500 hover:text-gray-700 transition">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-5 space-y-5">
          {questions.length > 0 && (
            <div className="">
              <ul className="space-y-2 text-gray-700 text-sm">
                {questions.map((q,i) => (
                  <div key={i} className="flex items-center p-3 gap-4  bg-gray-50 rounded-lg border border-gray-200">
                  <img 
                    src="https://randomuser.me/api/portraits/men/1.jpg" 
                    alt="men"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className=" text-gray-900">You</div>
                    <div className="text-sm text-gray-500 mb-2">{q.date}</div>
                    <p className="text-gray-700">{q.text}</p>
                  </div>
                </div>
                ))}
              </ul>
            </div>
          )}
              <label className="block text-sm sm:text-base font-medium text-gray-700">
                What would you like to know?
              </label>
              <textarea
                value={askQuestion}
                onChange={(e) => setAskQuestion(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-[#5563d1] focus:outline-none text-sm sm:text-base resize-none"
                rows="2"
                placeholder="Type your question here..."
              />
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  onClick={handleSubmitQuestion}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Submit Question
                </button>
                <button
                  onClick={closePopup}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
        </div>
      </div>
    </div>
  );
}
