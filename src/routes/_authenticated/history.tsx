import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { History as HistoryIcon, Loader2, Sparkles, ArrowRight } from "lucide-react";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { listAnalyses } from "@/lib/dashboard.functions";

export const Route = createFileRoute("/_authenticated/history")({
  component: HistoryPage,
});

function HistoryPage() {
  const fn = useServerFn(listAnalyses);
  const { data, isLoading, error } = useQuery({
    queryKey: ["analysis-history"],
    queryFn: () => fn(),
  });

  return (
    <PagePlaceholder
      title="Analysis History"
      description="Every resume analysis you've run, newest first. Open one to review without spending AI credits."
      icon={HistoryIcon}
    >
      {isLoading && (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}
      {error && (
        <Card className="rounded-2xl border-destructive/40 bg-destructive/5">
          <CardContent className="p-4 text-sm text-destructive">
            Failed to load: {(error as Error).message}
          </CardContent>
        </Card>
      )}
      {!isLoading && data && data.length === 0 && (
        <Card className="rounded-2xl border-border/60 shadow-card">
          <CardContent className="flex flex-col items-center gap-3 py-16 text-center text-muted-foreground">
            <Sparkles className="h-10 w-10 text-primary/60" />
            <p className="text-sm">No analyses yet. Run your first one to build your history.</p>
            <Button asChild className="rounded-xl bg-gradient-brand text-white shadow-glow">
              <Link to="/ai-analysis">Analyze a resume</Link>
            </Button>
          </CardContent>
        </Card>
      )}
      <div className="flex flex-col gap-3">
        {data?.map((a) => (
          <Link
            key={a.id}
            to="/history/$id"
            params={{ id: a.id }}
            className="group rounded-2xl border border-border/60 bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-glow"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="text-xs text-muted-foreground">
                  {new Date(a.created_at).toLocaleString()}
                </div>
                <div className="mt-1 text-sm font-medium">
                  {a.summary?.slice(0, 140) || "Resume analysis"}
                  {a.summary && a.summary.length > 140 ? "…" : ""}
                </div>
                {a.match_score != null && <Progress value={a.match_score} className="mt-3 h-1.5" />}
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <div className="flex gap-2">
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
                <span className="flex items-center gap-1 text-xs text-primary opacity-0 transition group-hover:opacity-100">
                  Open <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </PagePlaceholder>
  );
}
