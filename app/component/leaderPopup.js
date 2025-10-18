import { X } from "lucide-react";
import { students, questionsData, messages } from "./data.js";

export default function LeaderboardPopup({ openLeadPopup, openPopup, userId }) {
  const storedData = localStorage.getItem(`quizProgress_${userId}`);
  const score = storedData ? JSON.parse(storedData).score : 0;
  const percentage = Math.round((score / questionsData.length) * 100);

  let messageText = "";
  if (percentage >= 80) {
    messageText = messages.high;
  } else if (percentage >= 40) {
    messageText = messages.medium;
  } else {
    messageText = messages.low;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 sm:p-4 z-50">
      <div
        dir="rtl"
        className="w-full max-w-lg sm:max-w-xl bg-white rounded-2xl shadow-2xl relative animate-fadeIn"
      >
        <div className="flex justify-between items-center px-2 sm:px-4 py-2">
          <div className="text-center flex-1">
            <h2 className="text-lg sm:text-2xl font-bold text-[#10136b]">
              Starting SEO
            </h2>
            <h3 className="text-base sm:text-xl font-semibold text-[#10136b]">
              Leaderboard
            </h3>
          </div>
          <button
            onClick={() => {
              openLeadPopup(false);
              openPopup(false);
            }}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-3 sm:p-4">
          <p className="text-[#10136b] text-sm sm:text-base bg-[#f7fafc] p-4 rounded-lg leading-relaxed mb-1 whitespace-pre-line">
            {messageText}
          </p>

          <div className="space-y-2">
            {students.map((student, index) => (
              <div
                key={index}
                className="bg-[#f7fafc] border border-gray-200 rounded-lg p-2 flex items-center justify-between hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#10136b] object-cover flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-semibold text-[#10136b] truncate">
                      {student.name}
                    </h4>
                    <p className="hidden sm:block text-xs text-gray-500 mt-0.5 line-clamp-1">
                      {student.text}
                    </p>
                  </div>
                </div>

                <div className="text-left flex-shrink-0 ml-2">
                  <div className="text-sm sm:text-base font-bold text-gray-600">
                    {student.progress}%
                  </div>
                </div>
              </div>
            ))}

            {students.length === 0 && (
              <div className="text-center text-gray-500 py-6 text-sm">
                لا يوجد طلاب بعد
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
