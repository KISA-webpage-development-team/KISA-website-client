"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Button, Container, Grid, LoadingSpinner } from "@umichkisa-ds/web";

import { useAuth } from "@/lib/auth/authContext";
import { KISA_EMAIL } from "@/constants/email";

type SigninPageProps = {
  searchParams?: { callbackUrl?: string };
};

export default function SigninPage({ searchParams }: SigninPageProps) {
  const callbackUrl = searchParams?.callbackUrl ?? "/";
  const router = useRouter();
  const { status } = useSession();
  const { isMockMode, toggle } = useAuth();

  // Already-authed users shouldn't see the signin page.
  useEffect(() => {
    if (status === "authenticated") {
      router.replace(callbackUrl);
    }
  }, [status, callbackUrl, router]);

  if (status === "loading" || status === "authenticated") {
    return <LoadingSpinner fullScreen label="Loading" />;
  }

  const handleSignIn = () => {
    if (isMockMode) {
      toggle();
      return;
    }
    signIn("google", { callbackUrl });
  };

  return (
    <Container>
      <Grid columns={{ base: 1, md: 2 }} gap="section" className="items-center">
        <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
          <Image
            src="/kisa_logo.png"
            alt="KISA logo"
            width={96}
            height={96}
            priority
            className="h-24 w-24 object-contain"
          />
          <h1 className="type-h1 text-foreground">환영합니다.</h1>
          <p className="type-body text-muted-foreground">
            Sign in with your @umich.edu Google account to access KISA.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 md:items-start">
          <Button
            variant="primary"
            size="lg"
            className="w-full md:w-auto"
            onClick={handleSignIn}
          >
            Sign in with Google
          </Button>
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Link href="/signup" className="type-caption text-link">
              First time? Sign up
            </Link>
            <a
              href={`mailto:${KISA_EMAIL}`}
              className="type-caption text-link"
            >
              Not from UMich? Get help
            </a>
          </div>
        </div>
      </Grid>
    </Container>
  );
}
