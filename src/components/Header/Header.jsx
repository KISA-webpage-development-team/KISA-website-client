"use client";

import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import Menu from "./Menu";
import LoginButton from "./LoginButton";
import { useSession } from "next-auth/react";
import VerticalDivider from "../shared/VerticalDivider";
import InstagramLinkIcon from "../shared/InstagramLinkIcon";
import FacebookLinkIcon from "../shared/FacebookLinkIcon";
import UserInfo from "./UserInfo";
import MobileMenuButton from "./MobileMenuButton";
import MobileMenu from "./MobileMenu";

import styles from "./header.module.css";
import { CSSTransition } from "react-transition-group";

export default function Header({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  // get logged in user session
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between py-8">
      {/* Left portion: Logo, Website Name, Menu */}
      <div className="flex items-center">
        <div>
          <Logo />
        </div>

        <div className="ml-10 mr-4 hidden md:block">
          <VerticalDivider />
        </div>

        <div className="ml-6 hidden md:block">
          <Menu />
        </div>
      </div>

      {/* Right portion: instagram link, login button (user info) */}
      <div className="flex items-center">
        <div className="hidden md:flex items-center justify-center gap-4">
          <InstagramLinkIcon />
          <FacebookLinkIcon />
        </div>

        <div className="hidden md:block ml-8 mr-6">
          <VerticalDivider />
        </div>

        {session && (
          <div className="ml-3 hidden md:flex items-center">
            <UserInfo
              email={session.user.email}
              image={session.user.image}
              name={session.user.name}
            />
          </div>
        )}
        <div className="hidden md:block ml-3">
          <LoginButton session={session} />
        </div>

        {/* mobile header menu button */}
        <div className="flex items-center md:hidden ml-4 mr-2">
          <MobileMenuButton
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </div>
      </div>

      <CSSTransition
        in={isMobileMenuOpen}
        timeout={500}
        classNames={{
          enter: styles.menuContainerEnter,
          enterActive: styles.menuContainerEnterActive,
          exit: styles.menuContainerExit,
          exitActive: styles.menuContainerExitActive,
        }}
        unmountOnExit
      >
        <div className={styles.menuContainer}>
          <MobileMenu session={session} />
        </div>
      </CSSTransition>
    </div>
  );
}
