import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  LinkButton,
} from "@umichkisa-ds/web";

import SignInButton from "./SignInButton";

type SignUpSuccessPageProps = {
  params: { name: string };
};

export default function SignUpSuccessPage({ params }: SignUpSuccessPageProps) {
  const decodedName = decodeURIComponent(params.name);

  return (
    <section className="flex h-full items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle as="h1" className="type-h2 text-foreground">
            {decodedName}님, 환영합니다.
          </CardTitle>
          <CardDescription className="type-body text-muted-foreground">
            가입이 완료되었습니다. 로그인하여 KISA 커뮤니티에 참여해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="type-body text-foreground">
            다음 단계: @umich.edu Google 계정으로 로그인해주세요.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <SignInButton />
          <LinkButton
            href="/"
            variant="tertiary"
            size="sm"
            className="w-full"
          >
            Back to home
          </LinkButton>
        </CardFooter>
      </Card>
    </section>
  );
}
