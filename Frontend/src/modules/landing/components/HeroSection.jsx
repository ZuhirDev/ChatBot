import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "react-router-dom";
import AUTH_ROUTES from "@/modules/auth/routes/paths";
import { config } from "@/config/config";
import { BotMessageSquare } from "lucide-react";

export function HeroSection() {
  return (
    <>
      <header className="sticky border-b border-border bg-background/80 backdrop-blur-md shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link to={AUTH_ROUTES.HOME} className="flex items-center gap-3 font-bold text-xl tracking-tight">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
              <BotMessageSquare className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-foreground">{config.APP_NAME}</span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
            <ModeToggle />
          </nav>
        </div>
      </header>

      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden rounded-b-xl">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,hsl(var(--primary)/15%)_0,transparent_100%)]" />
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />

        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-10 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-up [--animation-delay:200ms]">
              <span className="block">AI Chatbot Assistant</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Smart answers powered by your documentation
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground animate-fade-up [--animation-delay:400ms]">
              Upload docs, train the assistant, and get accurate, instant responses. Perfect for internal tools,
              support teams, or product docs.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
