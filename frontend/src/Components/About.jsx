import React, { useState, useEffect } from 'react';

const About = () => {
  const fullQuote = "Make every cake with care, using fresh ingredients, and bake it with love.";
  const [quote, setQuote] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let i = 0;
    const typingTimer = setInterval(() => {
      setQuote(fullQuote.slice(0, i));
      i++;
      if (i > fullQuote.length) {
        clearInterval(typingTimer);
        // Start cursor blink after typing
        const blinkTimer = setInterval(() => {
          setCursorVisible((prev) => !prev);
        }, 500);
        setTimeout(() => clearInterval(blinkTimer), 3000); // Stop blink after 3s
      }
    }, 80); // Typing speed

    return () => clearInterval(typingTimer);
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-white via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,#fbbf24_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,#ec4899_0%,transparent_50%)] rotate-45"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header Section with subtle entrance animation */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
            About Shabee Cake Hub
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 mx-auto mb-8 rounded-full shadow-md animate-pulse-slow"></div>
        </div>

        {/* Story Section with stagger animation */}
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-10">
          <div className="mb-10 animate-slide-in-left delay-100">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 group">
              Our Story
              <span className="block w-0 h-1 bg-gradient-to-r from-pink-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg leading-relaxed">
              Shabee Cake Hub began as a small passion project in 2020, when Shabee started baking simple homemade cakes for friends and family. What first started as a hobby soon turned into a small business, as the love and demand for her cakes grew rapidly. Every order, big or small, brought new encouragement — and that support paved the way for the birth of Shabee Cake Hub.
            </p>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg leading-relaxed">
              Growing up in a home filled with the aroma of freshly baked treats, Shabee was inspired by her mother's and grandmother's traditional baking skills. Their kitchen was always warm with love, laughter, and the sound of mixing bowls, and these memories shaped the foundation of what Shabee Cake Hub stands for today.
            </p>
          </div>

          {/* Philosophy Section with typing effect */}
          <div className="mb-10 animate-slide-in-right delay-200">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 group">
              Our Philosophy
              <span className="block w-0 h-1 bg-gradient-to-r from-pink-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </h2>
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 mb-6 border-l-4 border-gradient-to-r from-pink-600 to-purple-600 shadow-lg backdrop-blur-sm border-opacity-50">
              <p className="text-xl italic text-gray-800 dark:text-gray-200 relative">
                {quote}
                {cursorVisible && <span className="animate-pulse text-pink-600">|</span>}
              </p>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg leading-relaxed">
              We believe that a cake should not only look beautiful but must first taste truly delicious. That is why every item at Shabee Cake Hub is made from scratch, using trusted recipes, quality ingredients, and traditional methods of baking. We avoid preservatives and ensure each cake is freshly baked to order so that its flavour, texture, and quality are never compromised.
            </p>
          </div>

          {/* Commitment Section */}
          <div className="mb-10 animate-slide-in-left delay-300">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 group">
              Our Commitment
              <span className="block w-0 h-1 bg-gradient-to-r from-pink-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg leading-relaxed">
              Whether it's a simple butter cake, a customized birthday cake, or a beautifully crafted wedding design, each creation receives the same attention to detail and heartfelt dedication. Over the years, the Shabee Cake Hub family has grown, and although we are still a small business, our commitment to quality and love for baking remains stronger than ever.
            </p>
          </div>

          {/* Gratitude Section */}
          <div className="mb-12 animate-slide-in-right delay-400">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 group">
              Our Gratitude
              <span className="block w-0 h-1 bg-gradient-to-r from-pink-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg leading-relaxed">
              We are deeply grateful to every customer who has supported us — from sharing kind feedback to placing repeat orders. You have helped us grow, learn, and continue doing what we love most.
            </p>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
              Thank you for welcoming our homemade creations into your special moments and celebrations.
            </p>
          </div>

          {/* Signature Section */}
          <div className="border-t dark:border-gray-700 pt-8 mb-12 border-gradient-to-r from-transparent via-pink-600 to-transparent">
            <div className="text-center animate-fade-in-up delay-500">
              <p className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-2 drop-shadow-md">
                With love and gratitude,
              </p>
              <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                Shabee Cake Hub
              </p>
            </div>
          </div>
        </div>

        {/* Logo Display - Only the logo image, centered and without square container */}
        <div className="w-full flex justify-center animate-fade-in-up delay-600">
          <img 
            src="/images/logo.png" 
            alt="Shabee Cake Hub Logo" 
            className="max-w-96 max-h-96 object-contain drop-shadow-xl hover:drop-shadow-2xl transition-shadow duration-300"
          />
        </div>
      </div>

      {/* Custom Tailwind animations - Add to your globals.css */}
      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
        .animate-slide-in-left { animation: slide-in-left 0.8s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 0.8s ease-out; }
        .animate-scale-in { animation: scale-in 1s ease-out; }
        .animate-pulse-slow { animation: pulse-slow 3s infinite; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
      `}</style>
    </div>
  );
};

export default About;