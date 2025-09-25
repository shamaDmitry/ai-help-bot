import { Avatar } from "@/components/Avatar";
import SignInForm from "@/components/SignIn";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background w-full">
      <div className="w-full max-w-md bg-card/60 backdrop-blur-md rounded-xl p-6 shadow-md">
        <div className="flex flex-col items-center gap-4">
          <div className="p-2 rounded-full bg-card">
            <Avatar seed="avatar" className="rounded-full" />
          </div>

          <h1 className="text-xl font-semibold">Welcome back</h1>
          <p className="text-sm text-muted-foreground text-center">
            Sign in to continue to your AI Help Bot dashboard
          </p>
        </div>

        <div className="mt-6">
          <SignInForm fallbackRedirectUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
