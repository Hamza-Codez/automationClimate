import React from 'react';
import { Heart, Github, MoveUp } from 'lucide-react';

const MiniFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white mt-18 mb-8 md:rounded-xl rounded-none shadow-lg py-12 px-6 w-full max-w-[1120px] mx-auto">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Left Section - Brand */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm md:text-base">Build with</span>
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="h-3 w-3 text-black" fill="currentColor" />
            </div>
            <span className="font-semibold text-sm md:text-base">by team Hamza Ahmad</span>
          </div>

          {/* Right Section - Social Links */}
          <div className="flex items-center gap-6">
            <a 
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/malko4444/automationClimate" 
              className="hover:text-gray-300 transition duration-200 flex items-center gap-2"
              aria-label="GitHub"
            >
              <span className="font-semibold text-white text-sm md:text-base">Project Repo</span>
              <Github className="h-5 w-5" />
            </a>
            
            <a href='#' aria-label="Scroll to top">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <MoveUp className="h-3 w-3 text-black" fill="currentColor" />
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="mt-8 pt-4 border-t border-gray-800 text-center">
          <p className="text-xs text-gray-400">
            © {currentYear} Hackathon submission. CS batch 2022.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MiniFooter;