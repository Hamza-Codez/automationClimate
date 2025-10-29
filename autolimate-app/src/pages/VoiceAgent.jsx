"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Mic, CircleStop, OctagonX, Send } from "lucide-react";

const VoiceAgent = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [responseText, setResponseText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);

  const recognitionRef = useRef(null);

  // 🧹 Cleanup when unmounting
  useEffect(() => {
    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
      window.speechSynthesis.cancel();
    };
  }, []);

  // 🎤 Initialize Speech Recognition
  const initializeSpeechRecognition = () => {
    if (!("webkitSpeechRecognition" in window)) {
      setError("Speech Recognition not supported in this browser.");
      return false;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsRecording(true);

    recognition.onresult = (event) => {
      const latest = event.results[event.results.length - 1];
      if (latest.isFinal) {
        const spokenText = latest[0].transcript.trim();
        // ✅ Append new spoken text instead of replacing
        setTranscript(spokenText);
        // ✅ Send to backend including city
        sendToBackend(spokenText);
      }
    };

    recognition.onerror = (e) => {
      setError(`Speech recognition error: ${e.error}`);
      setIsRecording(false);
    };

    recognition.onend = () => setIsRecording(false);

    recognitionRef.current = recognition;
    return true;
  };

  // 🎙️ Start / Stop Recording
  const toggleRecording = () => {
    if (!recognitionRef.current) {
      const initialized = initializeSpeechRecognition();
      if (!initialized) return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      setError(null);
      recognitionRef.current.start();
    }
  };

  // 📡 Send text (either typed or voice) to backend
  const sendToBackend = async (text) => {
    try {
      setIsProcessing(true);
      setError(null);

      const token = localStorage.getItem("token");
      const city = localStorage.getItem("city") || "Unknown City";

      if (!token) {
        setError("No token found in localStorage");
        setIsProcessing(false);
        return;
      }

      // ✅ Append city name to text
      const textWithCity = `${text} in city ${city}`;
      console.log("📤 Sending text to backend:", textWithCity);

      const response = await axios.post(
        "http://127.0.0.1:8000/chat",
        { text },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const reply = response.data.reply || "No reply from backend.";
      console.log("✅ Backend Response:", reply);
      setResponseText(reply);

      // 🔊 Speak the backend response
      textToSpeech(reply);
    } catch (err) {
      console.error("Backend request error:", err);
      setError(err.response?.data?.detail || err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // 💬 Handle manual “Send” button
  const handleSend = () => {
    if (transcript.trim()) {
      sendToBackend(transcript.trim());
    }
  };

  // 🔊 Convert backend response text to speech
  const textToSpeech = (text) => {
    try {
      if (!text) return;

      if ("speechSynthesis" in window) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;

        setIsPlaying(true);
        synth.speak(utterance);

        utterance.onend = () => {
          setIsPlaying(false);
        };
      } else {
        setError("Text-to-speech not supported in this browser.");
      }
    } catch (err) {
      console.error("Speech synthesis error:", err);
      setError("Failed to convert text to speech.");
    }
  };

  // 🧽 Clear transcript and response
  const clearText = () => {
    setTranscript("");
    setResponseText("");
    setError(null);
  };

  return (
    <div className="w-[1120px] mx-auto my-10 bg-gradient-to-tr from-black to-gray-300 rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-8">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          🎙️ Smart Voice AI Agent
        </h2>

        {/* Text Area */}
        <div className="mb-6">
          <textarea
            rows="5"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Speak or type your message..."
            className="w-full p-4 rounded-md bg-white text-black"
          />
        </div>

        {/* Backend Response */}
        {responseText && (
          <div className="mb-6 bg-white p-4 rounded-md">
            <h3 className="font-semibold text-gray-700">AI Response:</h3>
            <p className="text-gray-900 whitespace-pre-wrap">{responseText}</p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={toggleRecording}
            disabled={isProcessing}
            className={`px-6 py-3 rounded-lg font-semibold flex items-center transition-all ${
              isRecording ? "bg-gray-900" : "bg-black"
            } text-white`}
          >
            {isRecording ? <CircleStop className="mr-2" /> : <Mic className="mr-2" />}
            {isRecording ? "Stop Recording" : "Speak"}
          </button>

          {/* ✅ Added “Send” button for typed messages */}
          <button
            onClick={handleSend}
            disabled={isProcessing || !transcript.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center"
          >
            <Send className="mr-2" /> Send
          </button>

          <button
            onClick={clearText}
            disabled={isProcessing}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg flex items-center"
          >
            <OctagonX className="mr-2" /> Clear
          </button>
        </div>

        {/* Status Messages */}
        <div className="mt-6 text-center text-white">
          {isProcessing && <p>Processing your request...</p>}
          {isPlaying && <p>🔊 Speaking response...</p>}
          {error && <p className="text-red-400">Error: {error}</p>}
        </div>
      </div>
    </div>
  );
};

export default VoiceAgent;
