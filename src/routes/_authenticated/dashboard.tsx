import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Sparkles,
  Gauge,
  History as HistoryIcon,
  ArrowRight,
  Loader2,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getDashboardStats } from "@/lib/dashboard.functions";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

function useDisplayName() {
  const [name, setName] = useState("there");
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const u = data.user;
      if (!u) return;
      const meta = (u.user_metadata ?? {}) as Record<string, string | undefined>;
      setName((meta.full_name || meta.name || u.email?.split("@")[0] || "there").split(" ")[0]);
    });
  }, []);
  return name;
}

function Dashboard() {
  const fn = useServerFn(getDashboardStats);
  const name = useDisplayName();
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => fn(),
  });

  const stats = [
    {
      label: "Total Applications",
      value: data?.totalApplications ?? 0,
      icon: Briefcase,
      tone: "from-violet-500 to-indigo-500",
    },
    {
      label: "Total Analyses",
      value: data?.totalAnalyses ?? 0,
      icon: Sparkles,
      tone: "from-indigo-500 to-blue-500",
    },
    {
      label: "Latest Resume Score",
      value: data?.latestResumeScore != null ? `${data.latestResumeScore}` : "—",
      icon: Gauge,
      tone: "from-fuchsia-500 to-purple-500",
      suffix: data?.latestResumeScore != null ? "/100" : "",
    },
    {
      label: "Recent Analyses",
      value: data?.recentAnalyses.length ?? 0,
      icon: HistoryIcon,
      tone: "from-rose-500 to-pink-500",
    },
  ];

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground">Welcome back, {name}</span>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Your <span className="text-gradient-brand">career pipeline</span> at a glance
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Track every application, prep smarter with AI, and never miss a deadline.
        </p>
      </div>

      {error && (
        <Card className="rounded-2xl border-destructive/40 bg-destructive/5">
          <CardContent className="p-4 text-sm text-destructive">
            Failed to load dashboard: {(error as Error).message}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Card
            key={s.label}
            className="group relative overflow-hidden rounded-2xl border-border/60 shadow-card transition hover:-translate-y-0.5 hover:shadow-glow"
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${s.tone}`} />
            <CardContent className="flex flex-col gap-4 p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">{s.label}</span>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.tone} text-white shadow-glow`}
                >
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-4xl font-semibold tracking-tight">
                  {isLoading ? (
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  ) : (
                    s.value
                  )}
                  {"suffix" in s && s.suffix ? (
                    <span className="ml-1 text-base font-normal text-muted-foreground">
                      {s.suffix}
                    </span>
                  ) : null}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-2xl border-border/60 shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Recent Analyses</CardTitle>
            <p className="text-sm text-muted-foreground">
              Your latest resume analyses, newest first
            </p>
          </div>
          <Button asChild variant="ghost" size="sm" className="gap-1 text-primary">
            <Link to="/history">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {isLoading && (
            <div className="flex items-center justify-center py-10 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}
          {!isLoading && (!data || data.recentAnalyses.length === 0) && (
            <div className="flex flex-col items-center gap-3 py-10 text-center text-muted-foreground">
              <Sparkles className="h-8 w-8 text-primary/60" />
              <p className="text-sm">
                No analyses yet. Run your first resume analysis to see it here.
              </p>
              <Button asChild className="rounded-xl bg-gradient-brand text-white shadow-glow">
                <Link to="/ai-analysis">Analyze a resume</Link>
              </Button>
            </div>
          )}
          {data?.recentAnalyses.map((a) => (
            <Link
              key={a.id}
              to="/history/$id"
              params={{ id: a.id }}
              className="group flex flex-col gap-3 rounded-xl border border-border/60 bg-muted/20 p-4 transition hover:border-primary/40 hover:bg-muted/40"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="truncate">
                      {a.summary?.slice(0, 90) || "Resume analysis"}
                      {a.summary && a.summary.length > 90 ? "…" : ""}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {new Date(a.created_at).toLocaleString()}
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  {a.match_score != null && (
                    <Badge
                      variant="outline"
                      className="rounded-full border-primary/20 bg-primary/5 text-primary"
                    >
                      Match {a.match_score}
                    </Badge>
                  )}
                  {a.ats_score != null && (
                    <Badge
                      variant="outline"
                      className="rounded-full border-indigo-500/20 bg-indigo-500/5 text-indigo-600"
                    >
                      ATS {a.ats_score}
                    </Badge>
                  )}
                </div>
              </div>
              {a.match_score != null && <Progress value={a.match_score} className="h-1.5" />}
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
