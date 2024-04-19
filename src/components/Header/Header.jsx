"use client";

// ** IMPORTANT NOTE **
// lg:1024px is a breakpoint
// for the header to switch from desktop to mobile view

import React, { useEffect, useState } from "react";
import LoginButton from "./LoginButton";
import { useSession } from "next-auth/react";
import VerticalDivider from "../shared/VerticalDivider";
import InstagramLinkIcon from "../shared/InstagramLinkIcon";
import FacebookLinkIcon from "../shared/FacebookLinkIcon";
import UserInfo from "./UserInfo";
import MobileMenuButton from "./MobileMenuButton";
// import MobileMenu from "./MobileMenu";

import styles from "./header.module.css";
import { CSSTransition } from "react-transition-group";
// import {
//   heebo,
//   sejongHospitalLight,
// } from "../../utils/fonts/textFonts";
import Kisa_Logo from "../../../public/kisa_logo.png";
import Image from "next/image";
import {
  HoveredLink,
  Menu,
  MenuItem,
  MobileMenu,
  MobileMenuItem,
  ProductItem,
} from "../../components/ui/aceternity/navbar-menu";
import { cn } from "../../utils/cn";
import menu from "../../config/NavigationMenu";
import { sejongHospitalBold } from "../../utils/fonts/textFonts";
import Link from "next/link";

// sub-ui components
import WebTitle from "./WebTitle";

export default function Header() {
  const headerContentWidth = "max-w-screen-2xl px-5 sm:px-16 md:px-24 lg:px-32";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: session } = useSession();
  const [active, setActive] = useState(null);

  return (
    <div
      className={`mx-auto ${headerContentWidth}
        relative inset-x-0 w-full z-50 
        flex justify-between items-center 
        py-4 lg:py-5
      `}
    >
      {/* LEFT SIDE */}
      <div
        className={`flex flex-row items-center
          gap-10
       `}
      >
        {/* Web Name home link */}
        <WebTitle />
        {/* // isFirstChild={index === 0}
              // isLastChild={index === menu?.length - 1} */}

        {/* Navigation Menu */}
        {/* !!! in mobile menu, this menu should go down and become hidden */}
        <Menu setActive={setActive}>
          {menu?.map((item, index) => (
            <MenuItem
              key={item.href}
              setActive={setActive}
              active={active}
              item={item.name}
            >
              <div className="flex flex-col space-y-4 text-sm">
                {item.dropdowns.map((dropdown) => (
                  <HoveredLink key={dropdown.href} href={dropdown.href}>
                    {dropdown.name}
                  </HoveredLink>
                ))}
              </div>
            </MenuItem>
          ))}
        </Menu>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:flex justify-center items-center gap-4">
        <InstagramLinkIcon />
        <VerticalDivider />

        {session && (
          <div className="ml-3 flex items-center">
            <UserInfo
              email={session.user.email}
              image={session.user.image}
              name={session.user.name}
            />
          </div>
        )}
        <div className="block ml-3">
          <LoginButton session={session} />
        </div>
      </div>

      <div
        className="absolute right-0 top-0 mr-6 mt-6
       flex items-center lg:hidden"
      >
        <MobileMenuButton
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        {/* <CSSTransition
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
            <MobileMenu
              session={session}
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          </div>
        </CSSTransition> */}
      </div>

      {/* mobile menu button */}
    </div>
  );
}

// export default function Header({ isMobileMenuOpen, setIsMobileMenuOpen }) {
//   // get logged in user session
//   const { data: session } = useSession();

//   // return (
//   //   <div
//   //     className="max-w-screen-2xl mx-auto px-[15px] md:px-[60px] lg:px-[75px]
//   //   flex items-center justify-between py-6 md:py-8 text-white"
//   //   >
//   //     {/* Left portion: Logo, Website Name, Menu */}
//   //     <div className={`${sejongHospitalLight.className} flex items-center`}>
//   //       <Logo />

//   //       <div className="ml-4 lg:ml-7 mr-0 lg:mr-1 hidden md:block">
//   //         <VerticalDivider />
//   //       </div>

//   //       <div className="ml-5 lg:ml-6 hidden md:block">
//   //         <Menu />
//   //       </div>
//   //     </div>

//   //     {/* Right portion: instagram link, login button (user info) */}
//   //     <div className="flex items-center">
//   //       <div className="hidden md:flex items-center justify-center gap-4">
//   //         <InstagramLinkIcon />
//   //         <FacebookLinkIcon />
//   //       </div>

//   //       <div className="hidden md:block ml-8 mr-6">
//   //         <VerticalDivider />
//   //       </div>

//   //       {session && (
//   //         <div className="ml-3 hidden md:flex items-center">
//   //           <UserInfo
//   //             email={session.user.email}
//   //             image={session.user.image}
//   //             name={session.user.name}
//   //           />
//   //         </div>
//   //       )}
//   //       <div className="hidden md:block ml-3">
//   //         <LoginButton session={session} />
//   //       </div>

//   //       {/* mobile header menu button */}
//   //       <div className="flex items-center md:hidden ml-4 mr-2">
//   //         <MobileMenuButton
//   //           isMobileMenuOpen={isMobileMenuOpen}
//   //           setIsMobileMenuOpen={setIsMobileMenuOpen}
//   //         />
//   //       </div>
//   //     </div>

//   //     <CSSTransition
//   //       in={isMobileMenuOpen}
//   //       timeout={500}
//   //       classNames={{
//   //         enter: styles.menuContainerEnter,
//   //         enterActive: styles.menuContainerEnterActive,
//   //         exit: styles.menuContainerExit,
//   //         exitActive: styles.menuContainerExitActive,
//   //       }}
//   //       unmountOnExit
//   //     >
//   //       <div className={styles.menuContainer}>
//   //         <MobileMenu
//   //           session={session}
//   //           isMobileMenuOpen={isMobileMenuOpen}
//   //           setIsMobileMenuOpen={setIsMobileMenuOpen}
//   //         />
//   //       </div>
//   //     </CSSTransition>
//   //   </div>
//   // );
// }
