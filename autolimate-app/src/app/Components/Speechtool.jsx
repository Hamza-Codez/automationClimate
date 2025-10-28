"use client";
import React, { useState, useEffect, useRef } from "react";
import { Mic, Volume2,CircleStop, OctagonX} from 'lucide-react';


const SpeechTool = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const recognitionRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Cleanup function
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (audioRef.current) {
        audioRef.current.pause();
        if (audioRef.current.src) {
          URL.revokeObjectURL(audioRef.current.src);
        }
      }
    };
  }, []);

  const initializeSpeechRecognition = () => {
    if (!("webkitSpeechRecognition" in window)) {
      setError("Speech Recognition not supported in this browser.");
      return false;
    }

    try {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsRecording(true);
        setError(null);
      };

      recognition.onresult = (event) => {
        const latestResult = event.results[event.results.length - 1];
        if (latestResult.isFinal) {
          // ✅ CORRECTED: Append to existing transcript instead of replacing
          setTranscript(
            (prev) => prev + (prev ? " " : "") + latestResult[0].transcript
          );
        }
      };

      recognition.onerror = (event) => {
        setError(`Speech recognition error: ${event.error}`);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      return true;
    } catch (err) {
      setError("Failed to initialize speech recognition");
      return false;
    }
  };

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      const initialized = initializeSpeechRecognition();
      if (!initialized) return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      setError(null);
      // ✅ Don't clear transcript - let users build upon existing text
      recognitionRef.current.start();
    }
  };

  const textToSpeech = async () => {
    if (!transcript.trim()) {
      setError("Please enter some text first.");
      return;
    }

    if (isPlaying) {
      // Stop if already playing
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }

    setError(null);
    setIsProcessing(true);

    try {
      // Clean up previous audio if it exists
      if (audioRef.current && audioRef.current.src) {
        URL.revokeObjectURL(audioRef.current.src);
      }

      console.log("Sending text to speech:", transcript);

      const response = await fetch("/api/speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: transcript }),
      });

      console.log("API Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        throw new Error(errorText || `Server error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      console.log("Audio blob size:", audioBlob.size);

      if (audioBlob.size === 0) {
        throw new Error("Empty audio response received");
      }

      const audioUrl = URL.createObjectURL(audioBlob);

      audioRef.current = new Audio(audioUrl);

      audioRef.current.onended = () => {
        console.log("Audio playback finished");
        setIsPlaying(false);
        setIsProcessing(false);
        URL.revokeObjectURL(audioUrl);
      };

      audioRef.current.onerror = (e) => {
        console.error("Audio playback error:", e);
        setError("Failed to play audio");
        setIsPlaying(false);
        setIsProcessing(false);
        URL.revokeObjectURL(audioUrl);
      };

      // Wait for audio to load
      audioRef.current.oncanplaythrough = () => {
        console.log("Audio ready to play");
      };

      await audioRef.current.play();
      setIsPlaying(true);
      setIsProcessing(false);
      console.log("Audio playback started");
    } catch (err) {
      console.error("Text-to-speech error:", err);
      setError(err.message);
      setIsPlaying(false);
      setIsProcessing(false);
    }
  };

  const clearText = () => {
    setTranscript("");
    setError(null);
  };

  return (
    <div className="w-[1120px] mx-auto my-10 bg-linear-to-tr from-black to-gray-300 rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Plan Your Tasks with Data Driven Tools
          </h2>
          <p className="text-gray-800 text-lg">
            Speak to convert speech to text, then convert that text back
            to speech!
          </p>
        </div>

        {/* Text Area Section */}
        <div className="mb-8">
          <label className="block text-white font-semibold mb-3 text-left">
            Shared Text Area:
          </label>
          <textarea
            rows="6"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Speak to add text here, or type manually... Then click 'Convert to Speech' to hear it!"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none bg-gray-50"
            disabled={isProcessing}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          {/* Speech to Text Button */}
          <button
            onClick={toggleRecording}
            disabled={isProcessing}
            className={`
          px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center
          ${
            isRecording
              ? "bg-gray-900 hover:bg-zinc-900 text-white"
              : "bg-black hover:bg-zinc-900 text-white"
          }
          ${isProcessing ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
        `}
          >
            {isRecording ? (
              <>
                <span className="mr-2"></span><CircleStop className="pr-2"/> Stop Recording
              </>
            ) : (
              <>
                <span className=""></span><Mic className="pr-2"/> Speak
              </>
            )}
          </button>

          {/* Text to Speech Button */}
          <button
            onClick={textToSpeech}
            disabled={isProcessing || !transcript.trim()}
            className={`
          px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center
          ${
            isPlaying
              ? "bg-gray-900 hover:bg-zinc-900 text-white"
              : "bg-black hover:bg-zinc-900 text-white"
          }
          ${
            isProcessing || !transcript.trim()
              ? "opacity-70 cursor-not-allowed"
              : "cursor-pointer"
          }
        `}
          >
            {isProcessing ? (
              <>
                <span className="mr-2"></span> Processing...
              </>
            ) : isPlaying ? (
              <>
                <span className="mr-2"></span><Volume2 className="pr-2"/> Playing...
              </>
            ) : (
              <>
                <span></span><Volume2/>
              </>
            )}
          </button>

          {/* Clear Button */}
          <button
            onClick={clearText}
            disabled={isProcessing}
            className={`
          px-6 py-3 bg-black hover:bg-zinc-900 text-white rounded-lg font-semibold 
          transition-all duration-200 flex items-center
          ${isProcessing ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
        `}
          >
            <span className="mr-2"></span><OctagonX className="pr-2"/> Clear all
          </button>
        </div>

        {/* Status Indicators */}
        <div className="space-y-2 w-[560px] mx-auto">
          {isRecording && (
            <div className="bg-linear-to-br from-gray-300 to-gray-400 border border-gray-300 rounded-2xl p-3">
              <p className="text-zinc-900 font-medium flex items-center justify-center">
                <span className="mr-2">🎤</span> Listening... Speak now!
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 font-medium flex items-center justify-center">
                <span className="mr-2">❌</span> Error: {error}
              </p>
            </div>
          )}
        </div>

        {/* Debug Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between text-sm text-white">
            <p>Text length: {transcript.length} characters</p>
            <p>
              Status:{" "}
              {isRecording
                ? "Recording"
                : isPlaying
                ? "Playing"
                : isProcessing
                ? "Processing"
                : "Ready"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeechTool;
