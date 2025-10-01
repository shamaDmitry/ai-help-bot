import Link from "next/link";
import Title from "@/components/Title";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="w-full">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center gap-4">
          <Title as="h2" className="text-center">
            Page not found
          </Title>

          <p className="text-center text-muted-foreground">
            Could not find the resource you are looking for.
          </p>

          <Link href="/" className="w-full">
            <Button className="w-full">Return home</Button>
          </Link>
        </CardContent>
      </Card>
    </section>
  );
}
