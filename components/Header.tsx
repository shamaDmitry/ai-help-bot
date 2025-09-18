import Link from "next/link";
import Avatar from "./Avatar";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import ThemeSwitcher from "./ThemeSwitcher";
import { shadcn } from "@clerk/themes";

const Header = () => {
  return (
    <header className="shadow-sm text-primary flex justify-between items-center p-3 flex-col gap-3 md:flex-row">
      <Link href="/" className="flex items-center text-4xl font-thin gap-2">
        <div className="p-2 bg-accent rounded-full border shadow-md">
          <Avatar seed="AI support bot" />
        </div>

        <div className="space-y-1">
          <h1>AiBot</h1>

          <h2 className="text-sm">AI chat agent</h2>
        </div>
      </Link>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />

        <div className="">
          <SignedIn>
            <UserButton
              showName
              appearance={{
                theme: shadcn,
              }}
            />
          </SignedIn>

          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
