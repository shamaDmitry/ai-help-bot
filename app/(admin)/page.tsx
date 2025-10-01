import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center">
          <pre>
            {JSON.stringify(
              process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
              null,
              2
            )}
          </pre>

          <pre>{JSON.stringify(process.env.VERCEL_ENV, null, 2)}</pre>

          <Title>
            Welcome to AI Help Bot! Build and deploy AI chatbots for your
            website in minutes.
          </Title>

          <Link href="/create-chatbot">
            <Button>
              Create bot <CirclePlus />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
