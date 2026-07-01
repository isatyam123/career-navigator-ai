import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Sparkles,
  Loader2,
  Wand2,
  CheckCircle2,
  AlertTriangle,
  Target,
  Upload,
  FileText,
  KeyRound,
  Lightbulb,
  X,
  Mail,
  Copy,
  Check,
  Send,
  Clock,
} from "lucide-react";
import { useRef, useState } from "react";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { analyzeResume, type ResumeAnalysis } from "@/lib/resume-analyzer.functions";
import { generateRecruiterEmail, type RecruiterEmails } from "@/lib/email-generator.functions";

export const Route = createFileRoute("/_authenticated/ai-analysis")({
  component: AiAnalysisPage,
});

function AiAnalysisPage() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<ResumeAnalysis | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fn = useServerFn(analyzeResume);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!file) throw new Error("Please choose a PDF resume first.");
      if (file.type !== "application/pdf") throw new Error("Only PDF files are supported.");
      if (file.size > 10 * 1024 * 1024) throw new Error("PDF must be under 10 MB.");

      const { data: userData, error: userErr } = await supabase.auth.getUser();
      if (userErr || !userData.user) throw new Error("You need to be signed in.");

      const filePath = `${userData.user.id}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      const { error: upErr } = await supabase.storage
        .from("resumes")
        .upload(filePath, file, { contentType: "application/pdf", upsert: false });
      if (upErr) throw new Error(`Upload failed: ${upErr.message}`);

      return fn({ data: { filePath, fileName: file.name, jobDescription } });
    },
    onSuccess: (data) => {
      setResult(data);
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      queryClient.invalidateQueries({ queryKey: ["analysis-history"] });
      toast.success("Analysis complete");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return (
    <PagePlaceholder
      title="AI Resume Analyzer"
      description="Upload your resume PDF and optionally paste a job description. AI will analyze your resume, calculate ATS compatibility, and provide personalized recommendations."
      icon={Sparkles}
    >
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Input column */}
        <Card className="rounded-2xl border-border/60 shadow-card lg:col-span-2">
          <CardContent className="flex flex-col gap-4 p-6">
            <label className="text-sm font-medium">Resume (PDF)</label>
            <div
              onClick={() => inputRef.current?.click()}
              className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border/60 bg-muted/20 p-6 text-center transition hover:border-primary/60 hover:bg-muted/40"
            >
              {file ? (
                <div className="flex w-full items-center justify-between gap-3 text-sm">
                  <div className="flex min-w-0 items-center gap-2">
                    <FileText className="h-5 w-5 shrink-0 text-primary" />
                    <span className="truncate">{file.name}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    className="rounded-md p-1 hover:bg-muted"
                    aria-label="Remove file"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                  <div className="text-sm">
                    <span className="font-medium text-foreground">Click to upload</span>
                    <span className="text-muted-foreground"> — PDF, up to 10 MB</span>
                  </div>
                </>
              )}
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </div>

            <label className="text-sm font-medium">Job description (optional)</label>
            <Textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description to tailor the analysis…"
              className="min-h-[180px] rounded-xl bg-muted/30"
            />

            <Button
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending || !file}
              className="rounded-xl bg-gradient-brand text-white shadow-glow gap-2"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Analyzing…
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" /> Analyze Resume
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results column */}
        <div className="lg:col-span-3">
          {!result && !mutation.isPending && <EmptyState />}
          {mutation.isPending && <LoadingState />}
          {result && <Results result={result} jobDescription={jobDescription} />}
        </div>
      </div>
    </PagePlaceholder>
  );
}

function EmptyState() {
  return (
    <Card className="rounded-2xl border-border/60 shadow-card">
      <CardContent className="flex min-h-[400px] flex-col items-center justify-center text-center text-muted-foreground">
        <Sparkles className="mb-3 h-10 w-10 text-primary/60" />
        <p className="text-sm">Upload a resume to see your AI analysis here.</p>
      </CardContent>
    </Card>
  );
}

function LoadingState() {
  return (
    <Card className="rounded-2xl border-border/60 shadow-card">
      <CardContent className="flex min-h-[400px] flex-col items-center justify-center gap-3 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm">Extracting text and generating insights...</p>
      </CardContent>
    </Card>
  );
}

function Results({ result, jobDescription }: { result: ResumeAnalysis; jobDescription: string }) {
  const [emails, setEmails] = useState<RecruiterEmails | null>(null);
  const genFn = useServerFn(generateRecruiterEmail);
  const emailMutation = useMutation({
    mutationFn: () =>
      genFn({
        data: {
          jobDescription,
          summary: result.summary,
          strengths: result.strengths,
          importantKeywords: result.important_keywords,
        },
      }),
    onSuccess: (data) => {
      setEmails(data);
      toast.success("Recruiter emails generated");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <ScoreCard label="Match Score" value={result.match_score} />
        <ScoreCard label="ATS Score" value={result.ats_score} />
      </div>

      <SummaryCard summary={result.summary} />

      <div className="grid gap-4 md:grid-cols-2">
        <ListCard
          icon={CheckCircle2}
          tone="text-emerald-500"
          title="Strengths"
          items={result.strengths}
        />
        <ListCard
          icon={AlertTriangle}
          tone="text-amber-500"
          title="Weaknesses"
          items={result.weaknesses}
        />
      </div>

      <ListCard
        icon={Lightbulb}
        tone="text-primary"
        title="Resume Improvements"
        items={result.resume_improvements}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <BadgeCard icon={Target} title="Missing Skills" items={result.missing_skills} />
        <BadgeCard icon={KeyRound} title="Important Keywords" items={result.important_keywords} />
      </div>

      <Card className="rounded-2xl border-border/60 shadow-card">
        <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-gradient-brand/10 p-2">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold">Recruiter Email Generator</div>
              <p className="text-xs text-muted-foreground">
                Draft a tailored application email + 7-day follow-up using this analysis.
              </p>
            </div>
          </div>
          <Button
            onClick={() => emailMutation.mutate()}
            disabled={emailMutation.isPending}
            className="rounded-xl bg-gradient-brand text-white shadow-glow gap-2"
          >
            {emailMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Generating…
              </>
            ) : (
              <>
                <Mail className="h-4 w-4" /> Generate Recruiter Email
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {emails && (
        <div className="flex flex-col gap-4">
          <EmailCard icon={FileText} title="Subject Line" content={emails.subject} mono />
          <EmailCard icon={Send} title="Application Email" content={emails.application_email} />
          <EmailCard
            icon={Clock}
            title="Follow-up Email (Day 7)"
            content={emails.follow_up_email}
          />
        </div>
      )}
    </div>
  );
}

function EmailCard({
  icon: Icon,
  title,
  content,
  mono,
}: {
  icon: typeof CheckCircle2;
  title: string;
  content: string;
  mono?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast.success(`${title} copied`);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Copy failed");
    }
  };
  return (
    <Card className="rounded-2xl border-border/60 shadow-card">
      <CardContent className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Icon className="h-4 w-4 text-primary" /> {title}
          </div>
          <Button size="sm" variant="outline" onClick={copy} className="rounded-lg gap-1.5">
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" /> Copy
              </>
            )}
          </Button>
        </div>
        <pre
          className={`whitespace-pre-wrap break-words rounded-xl bg-muted/40 p-4 text-sm text-foreground/90 ${
            mono ? "font-mono" : "font-sans leading-relaxed"
          }`}
        >
          {content}
        </pre>
      </CardContent>
    </Card>
  );
}

function ScoreCard({ label, value }: { label: string; value: number }) {
  return (
    <Card className="rounded-2xl border-border/60 shadow-card">
      <CardContent className="p-5">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="mt-1 text-4xl font-semibold text-gradient-brand">{value}</div>
        <Progress value={value} className="mt-3 h-2" />
      </CardContent>
    </Card>
  );
}

function SummaryCard({ summary }: { summary: string }) {
  return (
    <Card className="rounded-2xl border-border/60 shadow-card">
      <CardContent className="p-5">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
          <Sparkles className="h-4 w-4 text-primary" /> AI Summary
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{summary}</p>
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
