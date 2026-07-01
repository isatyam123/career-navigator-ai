import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import {
  History as HistoryIcon,
  Loader2,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Target,
  KeyRound,
  Sparkles,
  Mail,
  MessageSquare,
} from "lucide-react";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { getAnalysisById } from "@/lib/dashboard.functions";

export const Route = createFileRoute("/_authenticated/history/$id")({
  component: AnalysisDetailPage,
});

function AnalysisDetailPage() {
  const { id } = Route.useParams();
  const fn = useServerFn(getAnalysisById);
  const { data, isLoading, error } = useQuery({
    queryKey: ["analysis", id],
    queryFn: () => fn({ data: { id } }),
  });

  return (
    <PagePlaceholder
      title="Analysis Detail"
      description={
        data ? `Saved ${new Date(data.created_at).toLocaleString()}` : "Loading saved analysis…"
      }
      icon={HistoryIcon}
    >
      <Button asChild variant="ghost" size="sm" className="mb-4 gap-1">
        <Link to="/history">
          <ArrowLeft className="h-4 w-4" /> Back to history
        </Link>
      </Button>

      {isLoading && (
        <div className="flex items-center justify-center py-16 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}
      {error && (
        <Card className="rounded-2xl border-destructive/40 bg-destructive/5">
          <CardContent className="p-4 text-sm text-destructive">
            {(error as Error).message}
          </CardContent>
        </Card>
      )}
      {!isLoading && !data && (
        <Card className="rounded-2xl border-border/60 shadow-card">
          <CardContent className="p-6 text-sm text-muted-foreground">
            Analysis not found.
          </CardContent>
        </Card>
      )}

      {data && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <ScoreCard label="Match Score" value={data.match_score} />
            <ScoreCard label="ATS Score" value={data.ats_score} />
          </div>

          {data.summary && (
            <Card className="rounded-2xl border-border/60 shadow-card">
              <CardContent className="p-5">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <Sparkles className="h-4 w-4 text-primary" /> AI Summary
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{data.summary}</p>
              </CardContent>
            </Card>
          )}

          {data.job_description && (
            <Card className="rounded-2xl border-border/60 shadow-card">
              <CardContent className="p-5">
                <div className="mb-2 text-sm font-semibold">Job Description</div>
                <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-xl bg-muted/40 p-4 font-sans text-xs text-muted-foreground">
                  {data.job_description}
                </pre>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <ListCard
              icon={CheckCircle2}
              tone="text-emerald-500"
              title="Strengths"
              items={data.strengths}
            />
            <ListCard
              icon={AlertTriangle}
              tone="text-amber-500"
              title="Weaknesses"
              items={data.weaknesses}
            />
          </div>

          <ListCard
            icon={Lightbulb}
            tone="text-primary"
            title="Resume Improvements"
            items={data.resume_improvements}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <BadgeCard icon={Target} title="Missing Skills" items={data.missing_skills} />
            <BadgeCard icon={KeyRound} title="Important Keywords" items={data.important_keywords} />
          </div>

          {data.generated_email && <SavedEmails raw={data.generated_email} />}
          {data.interview_questions ? <SavedQuestions raw={data.interview_questions} /> : null}
        </div>
      )}
    </PagePlaceholder>
  );
}

function ScoreCard({ label, value }: { label: string; value: number | null }) {
  return (
    <Card className="rounded-2xl border-border/60 shadow-card">
      <CardContent className="p-5">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="mt-1 text-4xl font-semibold text-gradient-brand">{value ?? "—"}</div>
        <Progress value={value ?? 0} className="mt-3 h-2" />
      </CardContent>
    </Card>
  );
}

function ListCard({
  icon: Icon,
  tone,
  title,
  items,
}: {
  icon: typeof CheckCircle2;
  tone: string;
  title: string;
  items: string[];
}) {
  return (
    <Card className="rounded-2xl border-border/60 shadow-card">
      <CardContent className="p-5">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <Icon className={`h-4 w-4 ${tone}`} /> {title}
        </div>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nothing to report.</p>
        ) : (
          <ul className="space-y-2 text-sm text-muted-foreground">
            {items.map((it, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-primary">•</span>
                <span>{it}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function BadgeCard({
  icon: Icon,
  title,
  items,
}: {
  icon: typeof CheckCircle2;
  title: string;
  items: string[];
}) {
  return (
    <Card className="rounded-2xl border-border/60 shadow-card">
      <CardContent className="p-5">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
          <Icon className="h-4 w-4 text-primary" /> {title}
        </div>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">None detected.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {items.map((s) => (
              <Badge key={s} variant="secondary" className="rounded-lg">
                {s}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SavedEmails({ raw }: { raw: string }) {
  let parsed: { subject?: string; application_email?: string; follow_up_email?: string } | null =
    null;
  try {
    parsed = JSON.parse(raw);
  } catch {
    parsed = null;
  }
  if (!parsed) return null;
  return (
    <Card className="rounded-2xl border-border/60 shadow-card">
      <CardContent className="flex flex-col gap-4 p-5">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Mail className="h-4 w-4 text-primary" /> Recruiter Emails
        </div>
        {parsed.subject && <EmailBlock label="Subject" content={parsed.subject} mono />}
        {parsed.application_email && (
          <EmailBlock label="Application Email" content={parsed.application_email} />
        )}
        {parsed.follow_up_email && (
          <EmailBlock label="Follow-up Email" content={parsed.follow_up_email} />
        )}
      </CardContent>
    </Card>
  );
}

function EmailBlock({ label, content, mono }: { label: string; content: string; mono?: boolean }) {
  return (
    <div>
      <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <pre
        className={`whitespace-pre-wrap break-words rounded-xl bg-muted/40 p-4 text-sm text-foreground/90 ${mono ? "font-mono" : "font-sans leading-relaxed"}`}
      >
        {content}
      </pre>
    </div>
  );
}

type QuestionItem = { question: string; answer_tip?: string };
type Questions = { technical?: QuestionItem[]; hr?: QuestionItem[]; behavioral?: QuestionItem[] };

function SavedQuestions({ raw }: { raw: unknown }) {
  const q = (raw as Questions) ?? {};
  const sections: [string, QuestionItem[] | undefined][] = [
    ["Technical", q.technical],
    ["HR", q.hr],
    ["Behavioral", q.behavioral],
  ];
  const hasAny = sections.some(([, arr]) => Array.isArray(arr) && arr.length > 0);
  if (!hasAny) return null;
  return (
    <Card className="rounded-2xl border-border/60 shadow-card">
      <CardContent className="flex flex-col gap-4 p-5">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <MessageSquare className="h-4 w-4 text-primary" /> Interview Questions
        </div>
        {sections.map(([label, arr]) =>
          arr && arr.length > 0 ? (
            <div key={label}>
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {label}
              </div>
              <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
                {arr.map((it, i) => (
                  <li key={i}>{it.question}</li>
                ))}
              </ol>
            </div>
          ) : null,
        )}
      </CardContent>
    </Card>
  );
}
