'use client';

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { SessionProvider } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { AuthContextProvider, useAuth } from '@/lib/auth/authContext';
import { OnlyMobileView, StatusView } from '@umichkisa-ds/web';
import LoginButton from '@/components/layout/header/LoginButton';

// Dev-only toggle. Build-time gate: when NEXT_PUBLIC_MOCK_API !== "1",
// the ternary collapses to null and the entire MockAuthToggle module
// (plus its `/_mock/spawn-order/` strings) is tree-shaken from the prod
// pocha layout chunk.
const IS_MOCK_MODE = process.env.NEXT_PUBLIC_MOCK_API === '1';
const MockAuthToggle = IS_MOCK_MODE
  ? dynamic(
      () => import('@/mocks/MockAuthToggle').then((m) => m.MockAuthToggle),
      { ssr: false }
    )
  : null;

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
            <OnlyMobileView className='h-full overflow-visible'>
              {children}
            </OnlyMobileView>
          )}
        </PochaAuthGate>
        {MockAuthToggle && <MockAuthToggle />}
      </AuthContextProvider>
    </SessionProvider>
  );
}
