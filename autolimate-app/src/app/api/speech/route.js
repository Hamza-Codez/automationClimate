// app/api/speech/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  console.log("=== SPEECH API CALLED ===");
  
  const API_KEY = process.env.ELEVENLABS_API_KEY;
  
  // Debug logging
  console.log("API Key exists:", !!API_KEY);
  console.log("API Key starts with:", API_KEY ? API_KEY.substring(0, 10) + '...' : 'None');
  console.log("All environment variables:", Object.keys(process.env).filter(key => key.includes('ELEVEN')));

  if (!API_KEY) {
    console.error("❌ ELEVENLABS_API_KEY is missing!");
    return NextResponse.json(
      { error: "Service configuration error - API key missing" },
      { status: 500 }
    );
  }

  try {
    const { text } = await request.json();
    console.log("Received text:", text ? `"${text.substring(0, 50)}..."` : 'None');

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Text is required" }, 
        { status: 400 }
      );
    }

    const VOICE_ID = "21m00Tcm4TlvDq8ikWAM";
    const cleanedText = text.trim();

    console.log("Calling ElevenLabs API...");
    
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "Accept": "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": API_KEY,
        },
        body: JSON.stringify({
          text: cleanedText,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.8,
          },
        }),
      }
    );

    console.log("ElevenLabs response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ElevenLabs API error:", errorText);
      
      return NextResponse.json(
        { error: `Text-to-speech service error: ${response.status}` },
        { status: response.status }
      );
    }

    const audioBuffer = await response.arrayBuffer();
    console.log("Audio data received, size:", audioBuffer.byteLength);

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });

  } catch (err) {
    console.error("Internal Server Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Test endpoint to check environment variables
export async function GET() {
  return NextResponse.json({
    apiKeyExists: !!process.env.ELEVENLABS_API_KEY,
    apiKeyLength: process.env.ELEVENLABS_API_KEY ? process.env.ELEVENLABS_API_KEY.length : 0,
    nodeEnv: process.env.NODE_ENV,
    allEnvKeys: Object.keys(process.env).filter(key => key.includes('ELEVEN') || key.includes('eleven'))
  });
}