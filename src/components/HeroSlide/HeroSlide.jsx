import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    }, (animationDuration + pauseBetweenAnimations) * 3000);
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

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 1,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 1,
  }),
};

export default function HeroSlider() {
  const [showContact, setShowContact] = useState(false);
  const [[activeIndex, direction], setActiveIndex] = useState([0, 0]);

  const images = [
    "/Crousel.jpg",
    "/Crousel1.jpg",
    "/pic3.jpeg",
    "/pic4.jpeg",
    "/pic5.jpeg",
  ];

  /* ✅ Slow auto slide (5 seconds) */
  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const paginate = (newDirection) => {
    setActiveIndex(([prev]) => [
      (prev + newDirection + images.length) % images.length,
      newDirection,
    ]);
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">

      {/* ===== Slide Animation Carousel ===== */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={activeIndex}
          src={images[activeIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1 }} // slow smooth animation
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* ===== Left Arrow ===== */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-black/50 text-white px-4 py-2 rounded-full hover:bg-black"
      >
        ❮
      </button>

      {/* ===== Right Arrow ===== */}
      <button
        onClick={() => paginate(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-black/50 text-white px-4 py-2 rounded-full hover:bg-black"
      >
        ❯
      </button>

      {/* ===== Dot Indicators ===== */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-3">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() =>
              setActiveIndex([index, index > activeIndex ? 1 : -1])
            }
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              index === activeIndex ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
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
                <a href="tel:0772397220" className="text-black font-semibold">
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