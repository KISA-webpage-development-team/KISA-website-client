'use client';

import { ReactNode } from 'react';
import OnlyMobileView from '@/components/ui/feedback/OnlyMobileView';
import { sejongHospitalLight } from '@/utils/fonts/textFonts';
import { SessionProvider } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { AuthContextProvider, useAuth } from '@/lib/auth/authContext';
import { MockAuthToggle } from '@/mocks/MockAuthToggle';
import { StatusView } from '@umichkisa-ds/web';
import LoginButton from '@/components/layout/header/LoginButton';

// In mock mode the next-auth middleware is a no-op (see middleware.ts), so
// /pocha/* routes only get gated client-side. This wraps every /pocha page
// with a single auth check; admin pages keep their own role gate on top.
function PochaAuthGate({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  if (!isAuthenticated) {
    return (
      <StatusView
        fullScreen
        variant='not-logged-in'
        action={
          <LoginButton isAuthenticated={false} callbackUrl={pathname} />
        }
      />
    );
  }

  return <>{children}</>;
}

export default function PochaLayout({ children }) {
  // except for /pocha/dashboard && /pocha/manage, only mobile view is allowed
  const pathname = usePathname();
  const isDashboard = pathname.includes('/dashboard');
  const isManage = pathname.includes('/manage');
  const isHistory = pathname.includes('/history');
  return (
    <SessionProvider>
      <AuthContextProvider initialSession={null}>
        <PochaAuthGate>
          {isDashboard || isManage || isHistory ? (
            <div className='w-full'>{children}</div>
          ) : (
            <>
              {/* This message only shows on larger screens */}
              <div className='hidden md:block'>
                <OnlyMobileView />
              </div>
              {/* Main content for mobile screens */}
              <div
                className={`md:hidden h-full
                 ${sejongHospitalLight.className} overflow-visible`}
              >
                {children}
              </div>
            </>
          )}
        </PochaAuthGate>
        <MockAuthToggle />
      </AuthContextProvider>
    </SessionProvider>
  );
}
