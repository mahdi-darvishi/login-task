import AuthLogin from "@/components/auth/AuthLogin";
import LangToggle from "@/components/LangToggle";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

export default async function LoginPage() {
  return (
    <div className="md:py-6 md:px-7">
      <nav className="flex  items-center justify-between ">
        <Button>AI</Button>
        <div className="flex gap-6 items-center">
          <ThemeToggle />
          <LangToggle />
        </div>
      </nav>

      <main className="flex items-center justify-center min-h-screen md:-mt-24">
        <AuthLogin />
      </main>
    </div>
  );
}
