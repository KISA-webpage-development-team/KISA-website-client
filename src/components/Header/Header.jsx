"use client";

import React, { useEffect, useState } from "react";
// import Logo from "./Logo";
// import Menu from "./Menu";
import LoginButton from "./LoginButton";
import { useSession } from "next-auth/react";
// import VerticalDivider from "../shared/VerticalDivider";
import InstagramLinkIcon from "../shared/InstagramLinkIcon";
import FacebookLinkIcon from "../shared/FacebookLinkIcon";
import UserInfo from "./UserInfo";
// import MobileMenuButton from "./MobileMenuButton";
// import MobileMenu from "./MobileMenu";

// import styles from "./header.module.css";
// import { CSSTransition } from "react-transition-group";
// import {
//   sejongHospitalBold,
//   sejongHospitalLight,
// } from "../../utils/fonts/textFonts";
import Kisa_Logo from "../../../public/kisa_logo.png";
import Image from "next/image";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "../../components/ui/aceternity/navbar-menu";
import { cn } from "../../utils/cn";

export default function Header({}) {
  return (
    <div className="w-full flex items-center justify-center">
      <Navbar />
    </div>
  );
}

function Navbar({ className }) {
  const { data: session } = useSession();
  const [active, setActive] = useState(null);
  return (
    <div
      className={cn(
        "inset-x-0 w-full max-w-screen-xl mx-auto z-50 flex flex-row justify-between items-center",
        className
      )}
    >
      <div className="flex items-center">
        <h1 className="text-white text-2xl font-bold">UM KISA</h1>

        <Menu setActive={setActive}>
          <MenuItem setActive={setActive} active={active} item="KISA">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/web-dev">About KISA</HoveredLink>
              <HoveredLink href="/interface-design">학생회 조직도</HoveredLink>
              <HoveredLink href="/seo">활동 소개</HoveredLink>
              <HoveredLink href="/branding">회칙</HoveredLink>
              <HoveredLink href="/branding">스폰서</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="정보">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/hobby">처음 와서 할 일</HoveredLink>
              <HoveredLink href="/individual">캠퍼스 정보</HoveredLink>
              <HoveredLink href="/team">하우징</HoveredLink>
              <HoveredLink href="/enterprise">여행</HoveredLink>
              <HoveredLink href="/enterprise">스포츠</HoveredLink>
              <HoveredLink href="/enterprise">맛집</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="게시판">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/hobby">공지사항</HoveredLink>
              <HoveredLink href="/individual">자유게시판</HoveredLink>
              <HoveredLink href="/team">학업 정보</HoveredLink>
              <HoveredLink href="/enterprise">사고팔기</HoveredLink>
              <HoveredLink href="/enterprise">하우징/룸메이트</HoveredLink>
            </div>
          </MenuItem>
        </Menu>
      </div>
      <div className="hidden md:flex justify-center gap-4">
        <InstagramLinkIcon />
        <FacebookLinkIcon />

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
      </div>
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
