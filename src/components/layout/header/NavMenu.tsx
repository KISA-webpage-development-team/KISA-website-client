"use client";
import React from "react";
import { motion, Transition } from "framer-motion";
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
  const isOpen = active === item;

  return (
    <div
      onClick={() => setActive(isOpen ? null : item)}
      className="relative mt-4 md:mt-0"
    >
      {children ? (
        <p className="cursor-pointer hover:opacity-90 text-white hover:text-brand-accent type-body">
          {item}
        </p>
      ) : (
        <HoveredLink href={href}>{item}</HoveredLink>
      )}

      {children && (
        <div
          className={`
            overflow-hidden
            transition-all duration-300 ease-out
            ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="w-max h-full py-4 pl-5">{children}</div>
        </div>
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
  return (
    <nav
      className={`
        flex
        items-start
        flex-col md:flex-row
        relative border border-transparent
        space-x-0 md:space-x-10
        space-y-4 md:space-y-0
        overflow-hidden
        transition-all duration-300 ease-out
        ${isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}
      `}
    >
      {children}
    </nav>
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
    <nav
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
    </nav>
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
  const isOpen = active === item;

  return (
    <div
      onMouseEnter={() => setActive(item)}
      className="relative mt-2 md:mt-0"
    >
      {children ? (
        <p className="cursor-pointer hover:opacity-90 text-white hover:text-brand-accent type-body">
          {item}
        </p>
      ) : (
        <HoveredLink href={href}>{item}</HoveredLink>
      )}

      {active !== null && children && (
        <motion.div
          className="hidden md:flex"
          animate={{ opacity: 1, scale: 1, y: 0 }}
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          transition={submenuTransition}
        >
          {isOpen && (
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
