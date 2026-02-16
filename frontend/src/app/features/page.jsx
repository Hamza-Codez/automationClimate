import React from 'react';
import Image from 'next/image';

const FeaturesPage = () => {
  const features = [
    {
      id: 1,
      title: "Best Suggestions for Indoor & Outdoor Activities",
      description: "Get personalized recommendations for both indoor and outdoor activities based on your preferences and current conditions.",
      image: "/feature1.webp",
      imagePosition: "right"
    },
    {
      id: 2,
      title: "Track Your Work-Life Balance Daily Routine",
      description: "Monitor your daily tasks and maintain a healthy balance between work and personal life with our intuitive tracking system.",
      image: "/feature2.webp",
      imagePosition: "left"
    },
    {
      id: 3,
      title: "Location-Based Data Driven Insights",
      description: "Receive intelligent insights for a healthier lifestyle based on your location data and personal habits.",
      image: "/feature3.webp",
      imagePosition: "right"
    },
    {
      id: 4,
      title: "Real-time Weather & AQI for Outdoor Activities",
      description: "Get live updates on weather conditions and air quality index to plan your outdoor activities perfectly.",
      image: "/feature4.webp",
      imagePosition: "left"
    }
  ];

  return (
    <div className="min-h-screen w-[1120px] mx-auto bg-white text-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Features</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how our platform helps you maintain a healthy and balanced lifestyle
          </p>
        </div>

        {/* Features List with Zig-Zag Layout */}
        <div className="space-y-20">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`flex flex-col ${
                feature.imagePosition === 'right' ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center justify-between gap-8 lg:gap-12`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/3">
                <div className="relative h-64 lg:h-80 w-full rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    // className="object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-linear-to-br from-zinc-900 to-gray-300 rounded-full mb-4">
                    <span className="text-lg font-semibold text-white">
                      {feature.id}
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;