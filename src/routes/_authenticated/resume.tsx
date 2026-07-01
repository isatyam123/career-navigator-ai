import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Loader2, Sparkles } from "lucide-react";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getLatestResumeFile } from "@/lib/resume-analyzer.functions";
import { listAnalyses } from "@/lib/dashboard.functions";

export const Route = createFileRoute("/_authenticated/resume")({
  component: ResumePage,
});

function ResumePage() {
  const getResumeFn = useServerFn(getLatestResumeFile);
  const getAnalysisFn = useServerFn(listAnalyses);

  const { data: resumeFile, isLoading: isResumeLoading } = useQuery({
    queryKey: ["latest-resume"],
    queryFn: () => getResumeFn(),
  });

  const { data: analyses, isLoading: isAnalysisLoading } = useQuery({
    queryKey: ["analysis-history"],
    queryFn: () => getAnalysisFn(),
  });

  const latestAnalysis = analyses?.[0];

  return (
    <PagePlaceholder
      title="Resume"
      description="Manage and tailor your resume with AI."
      icon={FileText}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="rounded-2xl border-border/60 shadow-card lg:col-span-2">
          <CardContent className="p-8">
            {isResumeLoading ? (
              <div className="flex h-32 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : resumeFile ? (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{resumeFile.file_name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Uploaded on {new Date(resumeFile.uploaded_at).toLocaleString()}
                    </p>
                  </div>
                  <Button asChild className="rounded-xl bg-gradient-brand text-white shadow-glow">
                    <Link to="/ai-analysis">Upload New</Link>
                  </Button>
                </div>
                <div className="rounded-xl border border-dashed border-border/70 bg-gradient-subtle p-10 text-center text-sm text-muted-foreground flex flex-col items-center gap-3">
                  <FileText className="h-10 w-10 text-primary/40" />
                  Your resume is securely stored. Run a new analysis anytime.
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3 py-10 text-center text-muted-foreground">
                <Sparkles className="h-8 w-8 text-primary/60" />
                <p className="text-sm">No resume found. Upload and analyze one to get started.</p>
                <Button asChild className="rounded-xl bg-gradient-brand text-white shadow-glow">
                  <Link to="/ai-analysis">Upload Resume</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {resumeFile && (
          <Card className="rounded-2xl border-border/60 shadow-card">
            <CardContent className="flex flex-col gap-4 p-6">
              <h3 className="font-semibold">Latest Analysis Scores</h3>
              {isAnalysisLoading ? (
                <div className="flex h-20 items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : latestAnalysis ? (
                <div className="flex flex-col gap-4">
                  {latestAnalysis.ats_score !== null && (
                    <div>
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="text-muted-foreground">ATS Score</span>
                        <span className="font-medium">{latestAnalysis.ats_score}%</span>
                      </div>
                      <Progress
                        value={latestAnalysis.ats_score}
                        className="h-1.5 text-indigo-600 bg-indigo-500/10"
                      />
                    </div>
                  )}
                  {latestAnalysis.match_score !== null && (
                    <div>
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="text-muted-foreground">Match Score</span>
                        <span className="font-medium">{latestAnalysis.match_score}%</span>
                      </div>
                      <Progress value={latestAnalysis.match_score} className="h-1.5" />
                    </div>
                  )}
                  {!latestAnalysis.ats_score && !latestAnalysis.match_score && (
                    <p className="text-sm text-muted-foreground">
                      No scores available for the latest analysis.
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No analysis history found.</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </PagePlaceholder>
  );
}
