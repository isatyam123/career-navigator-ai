import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Plus, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/_authenticated/applications")({
  component: ApplicationsPage,
});

const rows = [
  {
    company: "Stripe",
    role: "SWE Intern",
    status: "Interview",
    stage: "Round 2",
    deadline: "Jul 12",
  },
  {
    company: "Notion",
    role: "Product Design Intern",
    status: "Applied",
    stage: "Submitted",
    deadline: "Jul 15",
  },
  {
    company: "Vercel",
    role: "Frontend Engineer",
    status: "Offer",
    stage: "Verbal",
    deadline: "Jul 08",
  },
  {
    company: "Linear",
    role: "Software Engineer",
    status: "Screening",
    stage: "Recruiter",
    deadline: "Jul 20",
  },
  {
    company: "Figma",
    role: "Design Engineer Intern",
    status: "Rejected",
    stage: "Final",
    deadline: "Jun 30",
  },
  {
    company: "OpenAI",
    role: "Research Intern",
    status: "Applied",
    stage: "Submitted",
    deadline: "Jul 22",
  },
  {
    company: "Airbnb",
    role: "iOS Intern",
    status: "Interview",
    stage: "Round 1",
    deadline: "Jul 18",
  },
  {
    company: "Shopify",
    role: "Backend Intern",
    status: "Screening",
    stage: "OA",
    deadline: "Jul 25",
  },
];

const statusColor: Record<string, string> = {
  Applied: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Screening: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Interview: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
  Offer: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Rejected: "bg-rose-500/10 text-rose-600 border-rose-500/20",
};

function ApplicationsPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow">
            <Briefcase className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Applications</h1>
            <p className="text-sm text-muted-foreground">All your job applications in one place.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-xl gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="rounded-xl bg-gradient-brand text-white shadow-glow hover:opacity-95 gap-2">
            <Plus className="h-4 w-4" /> New Application
          </Button>
        </div>
      </div>

      <Card className="rounded-2xl border-border/60 shadow-card">
        <CardContent className="p-4">
          <Input
            placeholder="Search company or role…"
            className="mb-3 h-10 rounded-xl bg-muted/40"
          />
          <Table>
            <TableHeader>
              <TableRow className="border-border/60 hover:bg-transparent">
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead className="text-right">Deadline</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.company + r.role} className="border-border/60 hover:bg-muted/40">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-sm font-semibold text-white">
                        {r.company[0]}
                      </div>
                      <span className="font-medium">{r.company}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{r.role}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`rounded-full border ${statusColor[r.status]}`}
                    >
                      {r.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{r.stage}</TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">
                    {r.deadline}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
