import Link from "next/link";
import Avatar from "./Avatar";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
  return (
    <header className="bg-white shadow-sm text-gray-800 flex justify-between items-center p-5">
      <Link href="/" className="flex items-center text-4xl font-thin">
        <Avatar seed="AI support bot" />

        <div className="space-y-1">
          <h1>AiBot</h1>

          <h2 className="text-sm">AI chat agent</h2>
        </div>
      </Link>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />

        <SignedIn>
          <UserButton showName />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
