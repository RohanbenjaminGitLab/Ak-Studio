import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";

/* ===================== TrueFocus Component ===================== */
const TrueFocus = ({
  sentence = "Your Future Dream",
  blurAmount = 6,
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
}) => {
  const words = sentence.split(" ");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, (animationDuration + pauseBetweenAnimations) * 1000);
    return () => clearInterval(interval);
  }, [words.length, animationDuration, pauseBetweenAnimations]);

  return (
    <div className="relative flex flex-wrap gap-2">
      {words.map((word, idx) => (
        <span
          key={idx}
          className="relative font-extrabold text-white text-3xl sm:text-4xl md:text-5xl"
          style={{
            filter: idx === currentIndex ? "blur(0px)" : `blur(${blurAmount}px)`,
            transition: `filter ${animationDuration}s ease`,
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

/* ===================== HeroSlider Component ===================== */
export default function HeroSlider() {
  const [showContact, setShowContact] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    "/Pic1.jpeg",
    "/pic2.jpeg",
    "/pic3.jpeg",
    "/pic4.jpeg",
    "/pic5.jpeg",
  ];

  // Change image every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 1000); // 1 second per image
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {/* ===== Sliding Image Carousel ===== */}
      <div className="absolute inset-0 w-full h-full flex">
        {images.map((img, index) => (
          <AnimatePresence key={index}>
            {index === activeIndex && (
              <motion.img
                key={index}
                src={img}
                alt={`hero-${index}`}
                className="absolute w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </AnimatePresence>
        ))}
      </div>

      {/* ===== Dark Overlay ===== */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* ===== Phone Button & Contact Popup ===== */}
      <div className="relative">
        <motion.button
          onClick={() => setShowContact(!showContact)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-black shadow-xl flex items-center justify-center"
        >
          <FaPhoneAlt className="text-white text-xl sm:text-2xl" />
        </motion.button>

        <AnimatePresence>
          {showContact && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-6 right-20 z-50 w-48 h-32 rounded-l-full bg-white/90 backdrop-blur-lg shadow-xl p-4 flex flex-col justify-center items-start"
            >
              <h4 className="font-bold text-gray-800 mb-1">Contact</h4>
              <p className="text-sm text-gray-700 mb-1">📅 Sat – Thu</p>
              <p className="text-sm text-gray-700 mb-1">⏰ 9:00 AM – 5:00 PM</p>
              <p className="text-sm text-gray-700">
                📞{" "}
                <a href="tel:761613232" className="text-black font-semibold">
                 0772397220
                </a>
              </p>

              <button
                onClick={() => setShowContact(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}