import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import {
  GraduationCap,
  Sparkles,
  Briefcase,
  MessageSquare,
  FileText,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import heroOrb from "@/assets/hero-orb.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard" });
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand shadow-glow">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Career Navigator AI</span>
          </Link>
          <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">
              Features
            </a>
            <a href="#how" className="hover:text-foreground">
              How it works
            </a>
            <a href="#pricing" className="hover:text-foreground">
              Pricing
            </a>
          </nav>
          <Link to="/auth">
            <Button className="rounded-xl bg-gradient-brand text-white shadow-glow hover:opacity-95">
              Sign in
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, oklch(0.55 0.22 285 / 0.35) 0%, transparent 70%)",
          }}
        />
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-2 md:py-28">
          <div className="flex flex-col justify-center gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              AI-powered career OS for students
            </div>
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              Land your dream role with a{" "}
              <span className="text-gradient-brand">personal AI recruiter</span>.
            </h1>
            <p className="max-w-lg text-base text-muted-foreground md:text-lg">
              Track every application, tailor your resume with AI, prep for interviews, and never
              miss a deadline — all in one beautiful workspace.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link to="/auth">
                <Button
                  size="lg"
                  className="gap-2 rounded-xl bg-gradient-brand text-white shadow-glow hover:opacity-95"
                >
                  Get started free <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href="#features">
                <Button size="lg" variant="outline" className="rounded-xl">
                  See features
                </Button>
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> No credit card
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Free for students
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Sign in with Google
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-brand opacity-20 blur-3xl" />
            <img
              src={heroOrb}
              alt="Glowing purple orb representing Career Navigator AI"
              width={1280}
              height={1280}
              className="relative aspect-square w-full rounded-3xl border border-border/60 object-cover shadow-glow"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-12 max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">
            Features
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            Everything you need to run your job search
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Briefcase,
              title: "Application tracker",
              desc: "Kanban-style pipeline with status, deadlines and notes.",
            },
            {
              icon: FileText,
              title: "Smart resume",
              desc: "AI tailors each resume to the job in seconds.",
            },
            {
              icon: Sparkles,
              title: "AI analysis",
              desc: "Match score, ATS score, and skill gap insights.",
            },
            {
              icon: MessageSquare,
              title: "Interview prep",
              desc: "Practice decks generated for every role.",
            },
          ].map((f) => (
            <Card
              key={f.title}
              className="rounded-2xl border-border/60 shadow-card transition hover:-translate-y-0.5 hover:shadow-glow"
            >
              <CardContent className="flex flex-col gap-3 p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-glow">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-4 pb-20 scroll-mt-20">
        <div className="mb-12 max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">
            How it works
          </div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            Go from resume to offer in three steps
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              n: "01",
              title: "Upload your resume",
              desc: "Drop your PDF — we extract and store it securely.",
            },
            {
              n: "02",
              title: "Analyze against a role",
              desc: "AI analyzes fit, ATS, and gaps in seconds.",
            },
            {
              n: "03",
              title: "Track & follow up",
              desc: "Save applications, generate emails, prep interviews.",
            },
          ].map((s) => (
            <Card key={s.n} className="rounded-2xl border-border/60 shadow-card">
              <CardContent className="flex flex-col gap-3 p-6">
                <div className="text-xs font-semibold tracking-widest text-primary">{s.n}</div>
                <h3 className="text-base font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="mx-auto max-w-6xl px-4 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-brand p-10 text-center shadow-glow md:p-16">
          <div
            className="absolute inset-0 -z-10 opacity-30"
            style={{ background: "radial-gradient(50% 60% at 50% 50%, white 0%, transparent 70%)" }}
          />
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Ready to land your next offer?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/80 md:text-base">
            Join thousands of students turning applications into offers with Career Navigator AI.
          </p>
          <div className="mt-6">
            <Link to="/auth">
              <Button size="lg" className="rounded-xl bg-white text-primary hover:bg-white/90">
                Start free with Google
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/40 py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 text-xs text-muted-foreground">
          <span>© 2026 Career Navigator AI</span>
          <span>Made for students, by students.</span>
        </div>
      </footer>
    </div>
  );
}
