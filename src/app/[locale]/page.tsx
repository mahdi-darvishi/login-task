import AuthLogin from "@/components/auth/AuthLogin";
import LangToggle from "@/components/LangToggle";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

export default async function LoginPage() {
  return (
    <div className=" py-1 px-3  md:py-6 md:px-7">
      <nav className="flex  items-center justify-between mt-3 md:mt-0">
        <Button>AI</Button>
        <div className="flex gap-6 items-center">
          <ThemeToggle />
          <LangToggle />
        </div>
      </nav>

      <main className="flex items-center justify-center mt-5  md:min-h-screen md:-mt-24">
        <AuthLogin />
      </main>
    </div>
  );
}
