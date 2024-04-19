"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { heebo } from "../../../utils/fonts/textFonts";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MobileMenuItem = ({
  isMobileMenuOpen,
  setActive,
  active,
  item,
  children,
  isFirstChild,
  isLastChild,
}) => {
  const menuVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeOut" }, // Adjust ease for smooth opening
    },
    closed: {
      opacity: 0,
      height: 0, // Adjust height for upward shift
      transition: { duration: 0.3, ease: "easeIn" }, // Adjust ease for faster closing
    },
  };

  return (
    <div
      onClick={() => setActive(active === item ? null : item)}
      className={`relative
      px-0 md:px-4 
      ${isFirstChild ? "mt-5 md:mt-0" : ""}
      ${isLastChild ? "mb-5 md:mb-0" : ""}
  `}
    >
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer hover:opacity-[0.9] 
        hover:text-michigan-maize "
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
        >
          {active === item && (
            <div className="">
              <motion.div
                layoutId="active" // layoutId ensures smooth animation
                className="
                "
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const MobileMenu = ({ setActive, isMobileMenuOpen, children }) => {
  const menuVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeOut" }, // Adjust ease for smooth opening
    },
    closed: {
      opacity: 0,
      height: 0, // Adjust height for upward shift
      transition: { duration: 0.3, ease: "easeIn" }, // Adjust ease for faster closing
    },
  };

  return (
    <motion.nav
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)} // resets the state
      // onClick={() => setActive(true)}
      className={`


        flex flex-col md:flex-row
        gap-6 md:gap-0
        w-full md:w-max
        relative border border-transparent
        shadow-input justify-start md:px-8
      `}
      animate={isMobileMenuOpen ? "closed" : "open"}
      variants={menuVariants}
    >
      {children}
    </motion.nav>
  );
};

// DESKTOP MENU --------------------------------------------

export const Menu = ({ setActive, isMobileMenuOpen, children }) => {
  const menuVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeOut" }, // Adjust ease for smooth opening
    },
    closed: {
      opacity: 0,
      height: 0, // Adjust height for upward shift
      transition: { duration: 0.3, ease: "easeIn" }, // Adjust ease for faster closing
    },
  };

  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className={`
        flex flex-row
        relative border border-transparent
        shadow-input justify-start space-x-10
      `}
    >
      {children}
    </nav>
  );
};

export const MenuItem = ({ setActive, active, item, children }) => {
  return (
    <div onMouseEnter={() => setActive(item)} className={`relative`}>
      {/* motion.p: base menu item text */}
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer hover:opacity-[0.9] 
        hover:text-michigan-maize "
      >
        {item}
      </motion.p>

      {/* motion.div: dropdown menu items list */}
      {/* `active` handles whether user hovers in the base menu to open the dropdown */}
      {active !== null && (
        <motion.div
          animate={{ opacity: 1, scale: 1, y: 0 }}
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          transition={transition}
        >
          {/* if current base menu is selected,
          show dropdown with transition */}
          {active === item && (
            <div className="absolute pt-[calc(2.8rem)] left-1/2 transform -translate-x-1/2">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="
                bg-michigan-blue/90 backdrop-blur-sm rounded-2xl overflow-hidden 
                border border-michigan-maize shadow-inner"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

// --------------------------------------------

export const HoveredLink = ({ children, ...rest }) => {
  return (
    <Link {...rest} className="hover:text-michigan-maize ">
      {children}
    </Link>
  );
};
