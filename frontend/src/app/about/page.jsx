"use client";
import React from "react";
import { Code2, Server, Bug, Target, Lightbulb, Wrench } from "lucide-react";
import Image from "next/image";

const PersonasPage = () => {
  const personas = [
    {
      id: 1,
      name: "Hamza Ahmad",
      role: "Frontend Developer and Team Lead",
      image: "/hamza.jpg",
      goals: "To lead the team in designing an intuitive and attractive user interface for the AI Agent Application within the 24-hour UAF CS Hackathon 2025.",
      skills: ["React", "Next.js", "Tailwind CSS", "UI/UX Design", "Responsive Design"],
      contributions: "Developed key components of the user interface, including the dashboard, navigation bar, and footer.",
      frustrations: "Faced time constraints during UI optimization. Managed these by prioritizing core features and using reusable design patterns.",
      color: "blue",
    },
    {
      id: 2,
      name: "Zubair Malik",
      role: "Backend Developer",
      image: "/zubii.jpg",
      goals: "To develop a secure and scalable backend for the AI Agent Application during the UAF CS Hackathon 2025.",
      skills: ["Node.js", "Express", "MongoDB", "RESTful APIs", "Python Fast API"],
      contributions: "Developed the backend architecture and API endpoints. Implemented user authentication mechanisms.",
      frustrations: "Encountered challenges in handling API response times. Resolved them through rapid debugging and logic simplification.",
      color: "green",
    },
    {
      id: 3,
      name: "Faaiz Ahmad",
      role: "Project Moderator & Debugging Strategist",
      image: "/faazi.webp",
      goals: "To coordinate the team effectively and ensure smooth debugging and project flow under intense time pressure.",
      skills: ["Python", "Debugging", "Database Management", "Usability Testing"],
      contributions: "Code base management and debugging. Conducted usability testing to improve overall user experience.",
      frustrations: "Faced data inconsistency challenges. Overcame this by organizing quick syncs and maintaining a clear issue-tracking workflow.",
      color: "purple",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-50 text-blue-700 border-blue-100",
      green: "bg-green-50 text-green-700 border-green-100",
      purple: "bg-purple-50 text-purple-700 border-purple-100",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-3">
            Development Team
          </h1>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            Meet the talented individuals behind the Smart AI Agent Tracker
          </p>
        </div>

        {/* Personas List */}
        <div className="space-y-24">
          {personas.map((persona, index) => (
            <div
              key={persona.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-8 md:gap-16`}
            >
              {/* Image Section - Fixed Circle logic */}
              <div className="relative flex-shrink-0">
                <div className="relative z-10 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white shadow-xl ring-1 ring-slate-200">
                  <Image
                    src={persona.image}
                    alt={persona.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Decorative background circle */}
                <div className={`absolute -inset-2 rounded-full opacity-20 blur-sm ${index % 2 === 0 ? 'bg-slate-300' : 'bg-slate-200'}`}></div>
              </div>

              {/* Content Section */}
              <div className="flex-1 text-center md:text-left">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-slate-900">{persona.name}</h2>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">{persona.role}</p>
                </div>

                <div className="grid grid-cols-1 gap-4 text-sm">
                  {/* Goals */}
                  <div>
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-1 text-slate-800 font-bold">
                      <Target className="h-4 w-4" /> <span>Goals</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{persona.goals}</p>
                  </div>

                  {/* Skills */}
                  <div>
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2 text-slate-800 font-bold">
                      <Lightbulb className="h-4 w-4" /> <span>Skills</span>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-start gap-1.5">
                      {persona.skills.map((skill, sIdx) => (
                        <span key={sIdx} className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${getColorClasses(persona.color)}`}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Challenges */}
                  <div>
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-1 text-slate-800 font-bold">
                      <Bug className="h-4 w-4" /> <span>Challenges</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed italic">"{persona.frustrations}"</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonasPage;