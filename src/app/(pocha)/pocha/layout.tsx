'use client';

import OnlyMobileView from '@/components/ui/feedback/OnlyMobileView';
import { sejongHospitalLight } from '@/utils/fonts/textFonts';
import { SessionProvider } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { AuthContextProvider } from '@/lib/auth/authContext';
import { MockAuthToggle } from '@/mocks/MockAuthToggle';

export default function PochaLayout({ children }) {
  // except for /pocha/dashboard && /pocha/manage, only mobile view is allowed
  const pathname = usePathname();
  const isDashboard = pathname.includes('/dashboard');
  const isManage = pathname.includes('/manage');
  const isHistory = pathname.includes('/history');
  return (
    <SessionProvider>
      <AuthContextProvider initialSession={null}>
        {isDashboard || isManage || isHistory? (
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
        <MockAuthToggle />
      </AuthContextProvider>
    </SessionProvider>
  );
}
  