import AuthLogin from "@/components/auth/AuthLogin";
import LangToggle from "@/components/LangToggle";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

export default async function LoginPage() {
  return (
    <div className="md:py-6 md:px-7">
      <nav className="flex  items-center justify-between ">
        <div className="flex gap-6 items-center">
          <LangToggle />
          <ThemeToggle />
        </div>
        <Button>AI</Button>
      </nav>

      <main className="flex items-center justify-center min-h-screen">
        <h1 className="text-xl font-bold"></h1>
        <AuthLogin />
      </main>
    </div>
  );
}
