import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  MessageSquare,
  Loader2,
  RefreshCw,
  Sparkles,
  Code2,
  Users,
  HeartHandshake,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "sonner";
import {
  generateInterviewQuestions,
  getLatestInterviewQuestions,
  type InterviewQuestions,
} from "@/lib/interview-questions.functions";

export const Route = createFileRoute("/_authenticated/interview-prep")({
  component: InterviewPrepPage,
});

function InterviewPrepPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [questions, setQuestions] = useState<InterviewQuestions | null>(null);

  const loadFn = useServerFn(getLatestInterviewQuestions);
  const genFn = useServerFn(generateInterviewQuestions);

  useQuery({
    queryKey: ["latest-interview-questions"],
    queryFn: async () => {
      const res = await loadFn();
      if (res.questions) setQuestions(res.questions);
      if (res.jobDescription) setJobDescription(res.jobDescription);
      return res;
    },
  });

  const mutation = useMutation({
    mutationFn: () => genFn({ data: { jobDescription } }),
    onSuccess: (data) => {
      setQuestions(data);
      toast.success("Interview questions ready");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return (
    <PagePlaceholder
      title="Interview Prep"
      description="AI-generated interview questions tailored to your resume and target role."
      icon={MessageSquare}
    >
      <Card className="mb-6 rounded-2xl border-border/60 shadow-card">
        <CardContent className="flex flex-col gap-4 p-6">
          <div>
            <label className="text-sm font-medium">Job description (optional)</label>
            <p className="text-xs text-muted-foreground">
              Paste the JD to sharpen the questions. Leave blank to reuse your last analysis.
            </p>
          </div>
          <Textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste job description here…"
            className="min-h-[120px] rounded-xl bg-muted/30"
          />
          <div className="flex justify-end">
            <Button
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
              className="rounded-xl bg-gradient-brand text-white shadow-glow gap-2"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Generating…
                </>
              ) : questions ? (
                <>
                  <RefreshCw className="h-4 w-4" /> Regenerate Questions
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Generate Questions
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {!questions && !mutation.isPending && (
        <Card className="rounded-2xl border-border/60 shadow-card">
          <CardContent className="flex min-h-[240px] flex-col items-center justify-center text-center text-muted-foreground">
            <Sparkles className="mb-3 h-10 w-10 text-primary/60" />
            <p className="text-sm">
              Generate a personalized question bank from your resume and JD.
            </p>
          </CardContent>
        </Card>
      )}

      {mutation.isPending && !questions && (
        <Card className="rounded-2xl border-border/60 shadow-card">
          <CardContent className="flex min-h-[240px] flex-col items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm">Preparing tailored interview questions...</p>
          </CardContent>
        </Card>
      )}

      {questions && (
        <div className="flex flex-col gap-6">
          <QuestionSection
            icon={Code2}
            title="Technical Questions"
            tone="text-primary"
            items={questions.technical}
          />
          <QuestionSection
            icon={Users}
            title="HR Questions"
            tone="text-indigo-500"
            items={questions.hr}
          />
          <QuestionSection
            icon={HeartHandshake}
            title="Behavioral Questions"
            tone="text-emerald-500"
            items={questions.behavioral}
          />
        </div>
      )}
    </PagePlaceholder>
  );
}

function QuestionSection({
  icon: Icon,
  title,
  tone,
  items,
}: {
  icon: typeof Code2;
  title: string;
  tone: string;
  items: { question: string; answer_tip: string }[];
}) {
  return (
    <Card className="rounded-2xl border-border/60 shadow-card">
      <CardContent className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <Icon className={`h-5 w-5 ${tone}`} />
          <h3 className="text-base font-semibold">{title}</h3>
          <Badge variant="secondary" className="ml-auto rounded-lg">
            {items.length}
          </Badge>
        </div>
        <div className="flex flex-col gap-2">
          {items.map((q, i) => (
            <QuestionItem key={i} index={i + 1} question={q.question} answerTip={q.answer_tip} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function QuestionItem({
  index,
  question,
  answerTip,
}: {
  index: number;
  question: string;
  answerTip: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="group flex w-full items-center gap-3 rounded-xl border border-border/60 bg-muted/20 p-4 text-left transition hover:border-primary/40 hover:bg-muted/40">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-brand text-xs font-semibold text-white">
          {index}
        </span>
        <span className="flex-1 text-sm font-medium">{question}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="mt-2 rounded-xl border border-border/40 bg-background/60 p-4">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Answer tip
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{answerTip}</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
