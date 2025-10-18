"use client";

import { courseTopics, questionsData } from "./data";
import { Lock, Plus, FileText, Minus } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

export default function Topics({ isFullWidth, userId }) {
  const [progress, setProgress] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [expandedTopics, setExpandedTopics] = useState({ 0: true });
  const progressRef = useRef(null);

  const storedData = localStorage.getItem(`quizProgress_${userId}`);
  const score = storedData ? JSON.parse(storedData).score : 0;
  const percentage = Math.round((score / questionsData.length) * 100);

  const toggleTopic = (topicIdx) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicIdx]: !prev[topicIdx],
    }));
  };

  const animateProgress = useCallback(() => {
    let current = 0;
    const increment = percentage / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= percentage) {
        setProgress(percentage);
        clearInterval(timer);
      } else {
        setProgress(Math.floor(current));
      }
    }, 20);
  }, [percentage]);

  useEffect(() => {
    const node = progressRef.current; 
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateProgress();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, [hasAnimated, percentage, animateProgress]);

  return (
    <div
      className={`col-1 lg:col-3 row-3 lg:row-1 lg:row-end-4 ${
        isFullWidth ? "lg:row-2" : "lg:row-1"
      }`}
    >
      <h3 className="text-xl font-bold text-gray-900">Topics for This Course</h3>

      <div className="w-full space-y-8 py-8">
        <div ref={progressRef} className="relative pt-12">
          <div
            className="absolute top-0 transform -translate-x-1/2 transition-all duration-500 ease-out"
            style={{ left: `${progress}%` }}
          >
            <div className="bg-white border-2 border-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow-md">
              <span className="text-gray-700 text-sm font-medium">You</span>
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-gray-300"></div>
          </div>

          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-green-500 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div
            className="absolute top-full mt-2 transform -translate-x-1/2 transition-all duration-500 ease-out"
            style={{ left: `${progress}%` }}
          >
            <span className="text-gray-600 text-sm font-medium">
              {progress || 0}%
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-6" id="topics">
        {courseTopics.map((topic, topicIdx) => (
          <div key={topicIdx} className="border border-gray-200 p-5 rounded-lg">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleTopic(topicIdx)}
            >
              <h4 className="font-bold text-gray-900">{topic.week}</h4>
              {expandedTopics[topicIdx] ? (
                <Minus className="w-5 h-5 text-gray-600" />
              ) : (
                <Plus className="w-5 h-5 text-gray-600" />
              )}
            </div>

            {expandedTopics[topicIdx] && (
              <>
                <p className="text-sm text-gray-600 mb-4 mt-2">
                  {topic.description}
                </p>

                <div className="space-y-2">
                  {topic.lessons.map((lesson, lessonIdx) => (
                    <div
                      key={lessonIdx}
                      className="flex items-start justify-between border-t border-gray-200 p-3 hover:bg-gray-50 transition rounded-md"
                    >
                      <div className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-gray-700">
                          {lesson.title}
                        </div>
                      </div>

                      {lesson.questions && (
                        <div className="flex flex-col gap-2 mt-1 text-xs">
                          <span className="text-blue-500 w-fit bg-blue-200 px-2 py-1 rounded-xl">
                            {lesson.questions}
                          </span>
                          <span className="text-red-500 w-fit bg-red-200 px-2 py-1 rounded-xl">
                            {lesson.duration}
                          </span>
                        </div>
                      )}

                      {lesson.locked && (
                        <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
