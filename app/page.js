"use client"

import { useState, useRef, useEffect } from 'react';
import { Play, LayoutDashboard,MessagesSquare,CircleQuestionMark,MessageCircle,FileUser, Clock, Users,MoveRight, Globe,LibraryBig, Pause, Maximize, Minimize, Maximize2 } from 'lucide-react';
import {comments} from "./component/data"
import Topics from './component/topics';
import Link from 'next/link';
import QuestionPopups from './component/questionPopup';
import AskPopups from './component/askPopup';
import LeadPopups from './component/leaderPopup';


export default function CourseDetailsPage() {
  const [isSticky, setIsSticky] = useState(false);
  const [comment, setComment] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [Popup, openPopup] = useState(false)
  const [QPopup, openQPopup] = useState(false)
  const [AskPopup, openAskPopup] = useState(false)
  const [LeadPopup, openLeadPopup] = useState(false)
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const userId = "user_1"
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
        setIsFullScreen(true)
      } else {
        document.exitFullscreen();
        setIsFullScreen(false)
      }
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 1024) {
        if (containerRef.current) {
          const videoOriginalPosition = containerRef.current.offsetTop || 0;
          
          setIsSticky(window.scrollY > videoOriginalPosition);
        }
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="">
      {!Popup?(<>
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <span>Home</span>
            <span className="mx-2">›</span>
            <span>Courses</span>
            <span className="mx-2">›</span>
            <span className="text-gray-900">Course Details</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          Starting SEO as your Home
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-2 lg:px-4 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className={`col-1 row-1 ${isFullWidth ? "col-end-4" : "col-end-3"}`}>
            {isSticky && <div style={{ paddingTop: '56.25%' }} />}
            <div 
              ref={containerRef}
              className={` ${isSticky ? `fixed right-1/2 top-0   ${isFullScreen ?"translate-x-[0%]":"translate-x-[50%]"} translate-y-[0%]` : 'relative'}  ${isFullScreen &&"translate-x-[0%]"} ${isFullWidth ? 'w-full bg-black' : ''} translate-x-[0%] w-full lg:right-0 z-50`}
              style={{ paddingTop: '56.25%' }}
            >
              <div className="absolute top-4 right-4 flex gap-2 z-50">
                <button
                  onClick={() => setIsFullWidth(!isFullWidth)}
                  className="w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center transition"
                  aria-label={isFullWidth ? "Exit full width" : "Full width"}
                >
                  {isFullWidth ? (
                    <Minimize className="w-5 h-5 text-white" />
                  ) : (
                    <Maximize className="w-5 h-5 text-white" />
                  )}
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center transition"
                  aria-label="Fullscreen"
                >
                  <Maximize2 className="w-5 h-5 text-white" />
                </button>
              </div>
              <video
                ref={videoRef}
                src="/videos/mov_bbb.mp4"
                className={`absolute inset-0 w-full object-cover  ${isFullWidth ?" h-full":" h-auto m-auto" } bg-black`}
                onClick={togglePlay}
              >
                Your browser does not support the video tag.
              </video>
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center group"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                <div className={`w-20 h-20 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-red-500" fill="currentColor" />
                  ) : (
                    <Play className="w-8 h-8 text-red-500 ml-1" fill="currentColor" />
                  )}
                </div>
              </button>
            </div>
          <div className="flex items-center mt-5 gap-4">
            <button className="text-gray-600 hover:text-blue-600 transition">
              <LayoutDashboard className="w-5 h-5" onClick={()=>{openLeadPopup(true);
               openPopup(true);}}/>
            </button>
            <button className="text-gray-600 hover:text-blue-400 transition">
              <MessageCircle className="w-5 h-5" onClick={()=>{openQPopup(true);
               openPopup(true);}} />
            </button>
            <button className="text-gray-600 hover:text-blue-700 transition">
              <CircleQuestionMark className="w-5 h-5" onClick={()=>{openAskPopup(true);
               openPopup(true);}} /></button>
            <button className="text-gray-600 hover:text-blue-700 transition">
              <Link href="#comments"><MessagesSquare  className="w-5 h-5" /></Link>
            </button>
            <button className="text-gray-600 hover:text-red-600 transition">
              <Link href="#topics"><FileUser  className="w-5 h-5" /></Link>
              
            </button>
          </div>
        </div>
          <div className="col-1 col-end-3 row-2 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Materials</h2>
            <div className="shadow-xl p-10">
              <div className="space-y-4 ditails specialBorder">
                  <div className="flex items-center gap-3 relative">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div className="w-full flex justify-between">
                      <div className="text-sm text-gray-600">Duration:</div>
                    <div className="text-gray-900">3 weeks</div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                  <LibraryBig className="w-5 h-5 text-gray-400" />
                  <div className="w-full flex justify-between">
                    <div className="text-sm text-gray-600">Lessons:</div>
                    <div className=" text-gray-900">8</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <div className="w-full flex justify-between">
                    <div className="text-sm text-gray-600">Enrolled:</div>
                    <div className="  text-gray-900">65 students</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <div className="w-full flex justify-between">
                    <div className="text-sm text-gray-600">Language:</div>
                    <div className=" text-gray-900">English</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <Topics isFullWidth={isFullWidth} userId={userId}/>
          <div className="col-1 col-end-3 row-4 lg:row-3 " id="comments">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Comments</h2>
            
            <div className="space-y-6 mb-6 specialBorder p-6">
              {comments.map((c, i) => (
                <div key={i} className="flex gap-4">
                  <img
                    src={c.avatar} 
                    alt={c.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className=" text-gray-900">{c.name}</div>
                    <div className="text-sm text-gray-500 mb-2">{c.date}</div>
                    <p className="text-gray-700">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment"
              className="w-full shadow-xl resize-none rounded-lg p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows="4"
            />
            
            <button className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition flex items-center gap-2">
              Submit Review
              <MoveRight/>
            </button>
          </div>
        </div>
        </div>
        </>):(<>
        {QPopup && <QuestionPopups userId={userId} openQPopup={openQPopup} openPopup={openPopup}/>}
{AskPopup && <AskPopups openAskPopup={openAskPopup} openPopup={openPopup}/>}
{LeadPopup && <LeadPopups userId={userId} openLeadPopup={openLeadPopup} openPopup={openPopup}/>}</>)}


            </div>
  );
}
