"use client";
import React from "react";
import { motion, Transition, Variants } from "framer-motion";
import Link from "next/link";

const submenuTransition: Transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

type Setter<T> = (value: T) => void;

type MobileMenuItemProps = {
  setActive: Setter<string | null>;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  href?: string;
};

export const MobileMenuItem = ({
  setActive,
  active,
  item,
  children,
  href,
}: MobileMenuItemProps) => {
  return (
    <div
      onClick={() => setActive(active === item ? null : item)}
      className="relative mt-4 md:mt-0"
    >
      {children ? (
        <motion.p className="cursor-pointer hover:opacity-90 text-white hover:text-brand-accent type-body">
          {item}
        </motion.p>
      ) : (
        <HoveredLink href={href}>{item}</HoveredLink>
      )}

      {active !== null && children && active === item && (
        <motion.div
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: "auto" },
            collapsed: { opacity: 0, height: 0 },
          }}
          transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          <motion.div className="w-max h-full py-4 pl-5">{children}</motion.div>
        </motion.div>
      )}
    </div>
  );
};

type MobileMenuProps = {
  active?: string | null;
  setActive?: Setter<string | null>;
  isMobileMenuOpen: boolean;
  children: React.ReactNode;
};

export const MobileMenu = ({ isMobileMenuOpen, children }: MobileMenuProps) => {
  const menuVariants: Variants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeOut" },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <motion.nav
      className={`
        flex
        items-start
        flex-col md:flex-row
        relative border border-transparent
        space-x-0 md:space-x-4
        space-y-2 md:space-y-0
        ${isMobileMenuOpen ? "" : "h-0 overflow-y-hidden"}
      `}
      variants={menuVariants}
      animate={isMobileMenuOpen ? "open" : "closed"}
    >
      {children}
    </motion.nav>
  );
};

// DESKTOP MENU --------------------------------------------

type MenuProps = {
  setActive: Setter<string | null>;
  isMobileMenuOpen?: boolean;
  children: React.ReactNode;
};

export const Menu = ({ setActive, children }: MenuProps) => {
  return (
    <motion.nav
      onMouseLeave={() => setActive(null)}
      className="
        md:mt-0
        flex
        items-start
        flex-col md:flex-row
        relative border border-transparent
        space-x-0 md:space-x-8
        space-y-4 md:space-y-0
      "
    >
      {children}
    </motion.nav>
  );
};

type MenuItemProps = {
  setActive: Setter<string | null>;
  active: string | null;
  item: string;
  children?: React.ReactNode;
  href?: string;
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  href,
}: MenuItemProps) => {
  return (
    <div
      onMouseEnter={() => setActive(item)}
      className="relative mt-2 md:mt-0"
    >
      {children ? (
        <motion.p
          transition={{ duration: 0.3 }}
          className="cursor-pointer hover:opacity-90 text-white hover:text-brand-accent type-body"
        >
          {item}
        </motion.p>
      ) : (
        <HoveredLink href={href}>{item}</HoveredLink>
      )}

      {active !== null && children && (
        <motion.div
          className="hidden md:flex"
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={submenuTransition}
        >
          {active === item && (
            <div className="absolute pt-10 left-1/2 transform -translate-x-1/2">
              <motion.div
                transition={submenuTransition}
                layoutId="active"
                className="
                  bg-brand-primary/90 backdrop-blur-sm rounded-2xl overflow-hidden
                  border border-brand-accent
                "
              >
                <motion.div layout className="w-max h-full p-4">
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

type HoveredLinkProps = React.ComponentProps<typeof Link> & {
  children: React.ReactNode;
};

export const HoveredLink = ({ children, href, ...rest }: HoveredLinkProps) => {
  return (
    <Link
      href={href}
      {...rest}
      className="cursor-pointer hover:opacity-90 text-white hover:text-brand-accent type-body"
    >
      {children}
    </Link>
  );
};
