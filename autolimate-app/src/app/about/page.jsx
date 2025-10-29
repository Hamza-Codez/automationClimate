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
      goals:
        "To lead the team in designing an intuitive and attractive user interface for the AI Agent Application within the 24-hour UAF CS Hackathon 2025. Focused on delivering a smooth, responsive, and user-friendly experience under time pressure.",
      skills: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "UI/UX Design",
        "Responsive Design",
      ],
      contributions:
        "Developed key components of the user interface, including the dashboard, navigation bar, and footer. Implemented responsive design techniques to ensure optimal viewing on various screen sizes.",
      frustrations:
        "Faced time constraints during UI optimization and struggled with integrating multiple components simultaneously. Managed these by prioritizing core features and using reusable design patterns to speed up development.",
      color: "blue",
    },
    {
      id: 2,
      name: "Zubair Malik",
      role: "Backend Developer",
      image: "/zubii.jpg",
      goals:
        "To develop a secure and scalable backend for the AI Agent Application during the UAF CS Hackathon 2025. Aimed to ensure reliable API performance and smooth communication between the frontend and backend within limited time.",
      skills: [
        "Node.js",
        "Express",
        "MongoDB",
        "RESTful APIs",
        "Python Fast API",
      ],
      contributions:
        "Developed the backend architecture, including API endpoints for data retrieval and manipulation. Implemented user authentication and authorization mechanisms.",
      frustrations:
        "Encountered challenges in handling API response times and database optimization due to limited testing time. Resolved them through rapid debugging and simplifying API logic for stability.",
      color: "green",
    },
    {
      id: 3,
      name: "Faaiz Ahmad",
      role: "Project Moderator & Debugging Strategist",
      image: "/faazi.webp",
      goals:
        "To coordinate the team effectively during the 24-hour hackathon and ensure smooth debugging and project flow. Focused on maintaining stability, fixing integration issues, and improving usability under intense time pressure.",
      skills: [
        "Python",
        "Debugging",
        "Database Management",
        "Usability Testing",
      ],
      contributions:
        "Code base management and debugging skills. Conducted usability testing to improve overall user experience.",
      frustrations:
        "Faced the challenge of managing multiple debugging issues like Data inconsistency while coordinating between team members under tight deadlines. Overcame this by organizing quick syncs and maintaining a clear issue-tracking workflow.",
      color: "purple",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600 border-blue-200",
      green: "bg-green-100 text-green-600 border-green-200",
      purple: "bg-purple-100 text-purple-600 border-purple-200",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen w-[1120px] max-w-7xl mx-auto bg-white text-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Development Team
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet the talented individuals behind the Smart AI Agent Tracker
            application
          </p>
        </div>

        {/* Personas List with Zig-Zag Layout */}
        <div className="space-y-20">
          {personas.map((persona, index) => (
            <div
              key={persona.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center justify-between gap-8 lg:gap-12`}
            >
              {/* Image/Icon Section */}
              <div className="w-full lg:w-2/5">
                <div className="relative">
                  <div className="w-32 h-32 mx-auto lg:mx-0 lg:w-90 lg:h-90 rounded-full bg-linear-to-bl from-zinc-400 to-white flex items-center justify-center border-4 border-gray-200">
                    <Image
                      src={persona.image}
                      alt={persona.name}
                      width={200} 
                      height={200} 
                      className="rounded-full object-cover shadow-lg"
                    />
                  </div>
                  {/* Decorative Element */}
                  <div
                    className={`absolute -inset-4 rounded-full ${
                      getColorClasses(persona.color).split(" ")[0]
                    } opacity-20 -z-10`}
                  ></div>
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full lg:w-3/5">
                <div className="text-center lg:text-left">
                  {/* Name and Role */}
                  <div className="mb-6">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                      {persona.name}
                    </h2>
                    <p className="text-lg text-gray-600 font-medium">
                      {persona.role}
                    </p>
                  </div>

                  {/* Goals */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="h-5 w-5 text-gray-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Goals
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {persona.goals}
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="h-5 w-5 text-gray-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Skills
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {persona.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className={`px-3 py-1 rounded-full text-sm font-medium border ${getColorClasses(
                            persona.color
                          )}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contributions */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Wrench className="h-5 w-5 text-gray-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Contributions
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {persona.contributions}
                    </p>
                  </div>

                  {/* Frustrations & Solutions */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Bug className="h-5 w-5 text-gray-600" />
                      <h3 className="text-lg font-semibold text-gray-900">
                        Challenges & Solutions
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {persona.frustrations}
                    </p>
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
