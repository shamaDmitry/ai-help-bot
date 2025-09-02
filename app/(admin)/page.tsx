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
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
        quis dolore natus placeat consequuntur, perferendis hic aliquid
        architecto quasi, numquam rem quos corporis deserunt consectetur illum
        recusandae ipsa dolorum itaque.
      </p>
    </main>
  );
}
