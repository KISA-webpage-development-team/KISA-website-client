"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Button, Container, LoadingSpinner } from "@umichkisa-ds/web";

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
    <Container
      as="section"
      size="lg"
      className="flex h-full items-center justify-center"
    >
      <div className="flex w-full flex-col items-center gap-6 md:flex-row md:gap-12">
        {/* Photo rail (left) — 3:2 landscape */}
        <div className="relative aspect-3/2 w-full overflow-hidden rounded-lg bg-surface-subtle">
          <Image
            src="/signin/campus.jpg"
            alt="University of Michigan campus"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 55vw"
          />
        </div>

        {/* Form column (right) */}
        <div className="flex w-full flex-col gap-4 text-center">
          <div className="flex flex-col gap-2">
            <h1 className="type-h1 text-foreground">
              미시간 대학교 한인 학생회에
              <br />
              오신 걸 환영합니다.
            </h1>
            <p className="type-body text-foreground">
              @umich.edu Google 계정으로 로그인하여 커뮤니티에 참여하세요.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleSignIn}
          >
            Sign in with Google
          </Button>

          <p className="type-caption text-muted-foreground">
            <Link href="/signup" className="text-link hover:underline">
              회원가입
            </Link>
            <span aria-hidden="true" className="mx-2">
              ·
            </span>
            <a
              href={`mailto:${KISA_EMAIL}`}
              className="text-link hover:underline"
            >
              문의하기
            </a>
          </p>
        </div>
      </div>
    </Container>
  );
}
