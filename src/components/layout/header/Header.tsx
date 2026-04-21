"use client";

// md:768px — desktop/mobile breakpoint

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container, Divider, Icon, cn } from "@umichkisa-ds/web";

import LoginButton from "./LoginButton";
import UserInfo from "./UserInfo";
import MobileMenuButton from "./MobileMenuButton";
import HeaderTitle from "./HeaderTitle";
import {
  HoveredLink,
  Menu,
  MenuItem,
  MobileMenu,
  MobileMenuItem,
} from "./NavMenu";
import menu from "@/components/layout/header/navigationMenu";
import { useMockAuth } from "@/mocks/authContext";

const INSTAGRAM_URL = "https://www.instagram.com/kisa_michigan/";

export default function Header() {
  const { session, isAuthenticated } = useMockAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [active, setActive] = useState<string | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const userEmail = session?.user?.email ?? "";
  const userImage = session?.user?.image ?? "/default_profile.png";
  const userName = session?.user?.name ?? "User";

  return (
    <Container size="xl" className="relative inset-x-0 z-50 flex justify-between items-center py-3 md:py-4">
      {/* LEFT SIDE */}
      <div
        className="flex flex-col md:flex-row
          items-start md:items-center
          md:gap-6"
      >
        <HeaderTitle />

        <div className="hidden md:flex">
          <Menu setActive={setActive}>
            {menu?.map((item) => (
              <MenuItem
                key={item.href}
                setActive={setActive}
                active={active}
                item={item.name}
                href={item.href}
              >
                {item.dropdowns && (
                  <div className="flex flex-col space-y-4 type-body-sm text-white">
                    {item.dropdowns.map((dropdown) => (
                      <HoveredLink key={dropdown.href} href={dropdown.href}>
                        {dropdown.name}
                      </HoveredLink>
                    ))}
                  </div>
                )}
              </MenuItem>
            ))}
          </Menu>
        </div>

        <div className="flex md:hidden">
          <MobileMenu
            active={active}
            setActive={setActive}
            isMobileMenuOpen={isMobileMenuOpen}
          >
            {menu?.map((item) => (
              <MobileMenuItem
                key={item.href}
                setActive={setActive}
                active={active}
                item={item.name}
                href={item.href}
              >
                {item.dropdowns && (
                  <div className="flex flex-col space-y-4 type-body-sm text-white">
                    {item.dropdowns.map((dropdown) => (
                      <HoveredLink key={dropdown.href} href={dropdown.href}>
                        {dropdown.name}
                      </HoveredLink>
                    ))}
                  </div>
                )}
              </MobileMenuItem>
            ))}
          </MobileMenu>
        </div>
      </div>

      {/* RIGHT SIDE (desktop) */}
      <div className="hidden md:flex justify-center items-center gap-4">
        <Link
          href={INSTAGRAM_URL}
          rel="nofollow noreferrer noopener"
          target="_blank"
          aria-label="KISA Instagram"
          className="inline-flex items-center justify-center text-white"
        >
          <Icon name="instagram" size="md" />
        </Link>
        <Divider
          orientation="vertical"
          className="hidden lg:block h-8 border-white/40"
        />
        {isAuthenticated && (
          <UserInfo email={userEmail} image={userImage} name={userName} />
        )}
        <LoginButton isAuthenticated={isAuthenticated} />
      </div>

      {/* RIGHT SIDE (mobile) — menu button */}
      <div className="absolute right-0 top-0 mt-6 mr-4 flex items-center md:hidden">
        <MobileMenuButton
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      </div>

      {/* RIGHT SIDE (mobile) — auth chip; CSS-only opacity transition.
          Always-mounted so opacity change triggers a real transition.
          Exit animation intentionally dropped per locked decision #5. */}
      <div
        className={cn(
          "absolute top-0 mt-16 right-0 mr-4",
          "flex items-center gap-2 md:hidden",
          "transition-opacity duration-300",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!isMobileMenuOpen}
      >
        {isAuthenticated && (
          <UserInfo email={userEmail} image={userImage} name={userName} />
        )}
        <LoginButton isAuthenticated={isAuthenticated} size="sm" />
      </div>
    </Container>
  );
}
