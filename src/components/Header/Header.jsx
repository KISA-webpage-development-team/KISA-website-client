"use client";

import React, { useEffect, useState } from "react";
// import Logo from "./Logo";
// import Menu from "./Menu";
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
import {
  he,
  heebo,
  heeboebo,
  sejongHospitalBold,
} from "../../utils/fonts/textFonts";
import { Divider, NavbarContent, NavbarMenuToggle } from "@nextui-org/react";
import HorizontalDivider from "../shared/HorizontalDivider";
import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full flex items-center justify-center">
      <Navbar />
    </div>
  );
}

function Navbar({ className }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: session } = useSession();
  const [active, setActive] = useState(null);

  return (
    <div
      className={cn(
        "relative inset-x-0 w-full max-w-screen-xl mx-auto z-50 flex flex-row justify-between items-center px-6",
        className
      )}
    >
      <div
        className={`flex flex-col md:flex-row
       items-center py-4 lg:py-6
       `}
      >
        <Link href="/" className="flex flex-col items-start gap-0">
          <h1
            className={`text-xs lg:text-sm 
            font-bold ${sejongHospitalBold.className}`}
          >
            University of Michigan
          </h1>
          <h1
            className={`flex items-center 
            text-xl lg:text-2xl font-bold ${sejongHospitalBold.className}`}
          >
            한인 학생회
          </h1>
        </Link>

        <MobileMenu setActive={setActive} isMobileMenuOpen={isMobileMenuOpen}>
          {menu?.map((item, index) => (
            <MobileMenuItem
              key={item.href}
              setActive={setActive}
              active={active}
              item={item.name}
              isFirstChild={index === 0}
              isLastChild={index === menu?.length - 1}
            >
              <div className="flex flex-col space-y-4 text-sm">
                {item.dropdowns.map((dropdown) => (
                  <HoveredLink key={dropdown.href} href={dropdown.href}>
                    {dropdown.name}
                  </HoveredLink>
                ))}
              </div>
            </MobileMenuItem>
          ))}
        </MobileMenu>
      </div>
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
