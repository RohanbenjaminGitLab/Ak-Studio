import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ===== Hamburger/X Toggle ===== */
const AnimatedMenuToggle = ({ isOpen, toggle }) => (
  <button
    onClick={toggle}
    aria-label="Toggle menu"
    className="relative w-8 h-8 flex flex-col justify-center items-center gap-1 focus:outline-none z-50"
  >
    <motion.span
      animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
      className="block w-8 h-1 bg-white rounded"
    />
    <motion.span
      animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
      className="block w-8 h-1 bg-white rounded"
    />
    <motion.span
      animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
      className="block w-8 h-1 bg-white rounded"
    />
  </button>
);

/* ===== Chevron ===== */
const Chevron = ({ isOpen }) => (
  <motion.span
    animate={{ rotate: isOpen ? 180 : 0 }}
    transition={{ duration: 0.3 }}
    className="inline-block ml-1 text-white text-xs"
  >
    ▼
  </motion.span>
);

const Navbar = () => {
  const [serviceOpen, setServiceOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <nav className="sticky top-0 z-50 bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-16">

          {/* ===== Logo ===== */}
          <Link to="/" onClick={() => setMobileOpen(false)}>
            <motion.img
              src="/Logo.jpeg"
              alt="Logo"
              className="h-16 w-auto"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </Link>

          {/* ===== Desktop Menu ===== */}
          <div className="hidden md:flex items-center space-x-8 font-semibold text-lg">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/" className="hover:text-gray-300">About</Link>

            {/* Service Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServiceOpen(true)}
              onMouseLeave={() => setServiceOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-gray-300">
                Service <Chevron isOpen={serviceOpen} />
              </button>

              <AnimatePresence>
                {serviceOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className="absolute left-0 mt-2 w-56 bg-black text-white rounded-lg shadow-xl border border-white/10 overflow-hidden"
                  >
                    <Link
                      to="/web-design"
                      className="block px-4 py-2 hover:bg-gray-800 transition"
                    >
                      Web Design
                    </Link>
                    <Link
                      to="/digital-marketing"
                      className="block px-4 py-2 hover:bg-gray-800 transition"
                    >
                      Digital Marketing
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/gallery" className="hover:text-gray-300">Gallery</Link>
          </div>

          {/* ===== Mobile Toggle ===== */}
          <div className="md:hidden">
            <AnimatedMenuToggle
              isOpen={mobileOpen}
              toggle={() => setMobileOpen(!mobileOpen)}
            />
          </div>
        </div>
      </div>

      {/* ===== Mobile Menu ===== */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-black px-6 py-4 space-y-3 font-semibold text-lg"
          >
            <Link to="/" onClick={() => setMobileOpen(false)} className="block hover:text-gray-300">Home</Link>

            {/* Mobile Service Accordion */}
            <button
              onClick={() => setServiceOpen(!serviceOpen)}
              className="flex justify-between items-center w-full hover:text-gray-300"
            >
              Service <Chevron isOpen={serviceOpen} />
            </button>
            <AnimatePresence>
              {serviceOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="pl-4 flex flex-col space-y-1"
                >
                  <Link
                    to="/web-design"
                    onClick={() => setMobileOpen(false)}
                    className="hover:text-gray-300 transition"
                  >
                    Web Design
                  </Link>
                  <Link
                    to="/digital-marketing"
                    onClick={() => setMobileOpen(false)}
                    className="hover:text-gray-300 transition"
                  >
                    Digital Marketing
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            <Link to="/gallery" onClick={() => setMobileOpen(false)} className="block hover:text-gray-300">Gallery</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;