import Title from "@/components/Title";

export default function Home() {
  return (
    <main className="">
      <pre>
        {JSON.stringify(
          process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
          null,
          2
        )}
      </pre>

      <pre>{JSON.stringify(process.env.VERCEL_ENV, null, 2)}</pre>

      <Title>
        Welcome to AI Help Bot! Build and deploy AI chatbots for your website in
        minutes.
      </Title>
    </main>
  );
}
