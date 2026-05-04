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

// Mock-only auth gate. In prod, next-auth middleware (`src/middleware.ts`)
// gates `/pocha/:path*` server-side — any request that reaches a /pocha
// page is already authenticated, so a client-side gate would just flicker
// the "not logged in" StatusView during the next-auth session-loading
// window. In mock mode the middleware is a no-op, so /pocha/* routes need
// this client-side fallback. Admin pages keep their own role gate on top.
function MockAuthGate({ children }: { children: ReactNode }) {
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

  const body =
    isDashboard || isManage || isHistory ? (
      <div className='w-full'>{children}</div>
    ) : (
      <OnlyMobileView className='h-full overflow-visible'>
        {children}
      </OnlyMobileView>
    );

  return (
    <SessionProvider>
      <AuthContextProvider initialSession={null}>
        {IS_MOCK_MODE ? <MockAuthGate>{body}</MockAuthGate> : body}
        {MockAuthToggle && <MockAuthToggle />}
      </AuthContextProvider>
    </SessionProvider>
  );
}
