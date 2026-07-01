import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/_authenticated/resume")({
  component: () => (
    <PagePlaceholder
      title="Resume"
      description="Manage and tailor your resume with AI."
      icon={FileText}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="rounded-2xl border-border/60 shadow-card lg:col-span-2">
          <CardContent className="p-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Alex Morgan — Resume.pdf</h3>
                <p className="text-sm text-muted-foreground">Last edited 2 days ago</p>
              </div>
              <Button className="rounded-xl bg-gradient-brand text-white shadow-glow">Edit</Button>
            </div>
            <div className="rounded-xl border border-dashed border-border/70 bg-gradient-subtle p-10 text-center text-sm text-muted-foreground">
              Resume preview area
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border/60 shadow-card">
          <CardContent className="flex flex-col gap-4 p-6">
            <h3 className="font-semibold">Resume Strength</h3>
            {[
              { label: "Impact statements", value: 82 },
              { label: "Keywords match", value: 67 },
              { label: "Readability", value: 91 },
              { label: "ATS friendly", value: 88 },
            ].map((m) => (
              <div key={m.label}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-muted-foreground">{m.label}</span>
                  <span className="font-medium">{m.value}%</span>
                </div>
                <Progress value={m.value} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PagePlaceholder>
  ),
});
