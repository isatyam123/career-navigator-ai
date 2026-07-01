import { createFileRoute } from "@tanstack/react-router";
import {
  Briefcase,
  Plus,
  Filter,
  Loader2,
  MoreHorizontal,
  Pencil,
  Trash2,
  Search,
} from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "@/lib/applications.functions";

export const Route = createFileRoute("/_authenticated/applications")({
  component: ApplicationsPage,
});

const DEFAULT_STATUSES = ["Applied", "OA", "Interview", "HR", "Offer", "Rejected", "Withdrawn"];

const statusColor: Record<string, string> = {
  Applied: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  OA: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  Interview: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
  HR: "bg-pink-500/10 text-pink-600 border-pink-500/20",
  Offer: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  Rejected: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  Withdrawn: "bg-gray-500/10 text-gray-600 border-gray-500/20",
};

function ApplicationsPage() {
  const queryClient = useQueryClient();
  const getFn = useServerFn(getApplications);
  const createFn = useServerFn(createApplication);
  const updateFn = useServerFn(updateApplication);
  const deleteFn = useServerFn(deleteApplication);

  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editingApp, setEditingApp] = useState<any | null>(null);

  // Form states
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [stage, setStage] = useState("");
  const [deadline, setDeadline] = useState("");

  const { data: apps, isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: () => getFn(),
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["applications"] });
    queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
  };

  const createMut = useMutation({
    mutationFn: () => createFn({ data: { company, role, status, stage, deadline } }),
    onSuccess: () => {
      toast.success("Application created");
      setIsCreateOpen(false);
      resetForm();
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const updateMut = useMutation({
    mutationFn: () =>
      updateFn({ data: { id: editingApp.id, company, role, status, stage, deadline } }),
    onSuccess: () => {
      toast.success("Application updated");
      setEditingApp(null);
      resetForm();
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMut = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { id } }),
    onSuccess: () => {
      toast.success("Application deleted");
      invalidate();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const resetForm = () => {
    setCompany("");
    setRole("");
    setStatus("Applied");
    setStage("");
    setDeadline("");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openEdit = (app: any) => {
    setEditingApp(app);
    setCompany(app.company);
    setRole(app.role);
    setStatus(app.status);
    setStage(app.stage || "");
    setDeadline(app.deadline || "");
  };

  const filteredApps = apps?.filter(
    (a) =>
      a.company.toLowerCase().includes(search.toLowerCase()) ||
      a.role.toLowerCase().includes(search.toLowerCase()),
  );

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
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  resetForm();
                  setEditingApp(null);
                }}
                className="rounded-xl bg-gradient-brand text-white shadow-glow hover:opacity-95 gap-2"
              >
                <Plus className="h-4 w-4" /> New Application
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>New Application</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Company</Label>
                  <Input value={company} onChange={(e) => setCompany(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label>Role</Label>
                  <Input value={role} onChange={(e) => setRole(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label>Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DEFAULT_STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Stage (e.g. Round 1, Technical)</Label>
                  <Input value={stage} onChange={(e) => setStage(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label>Deadline (Optional)</Label>
                  <Input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </div>
              </div>
              <Button
                disabled={createMut.isPending || !company || !role}
                onClick={() => createMut.mutate()}
                className="w-full bg-gradient-brand text-white"
              >
                {createMut.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
              </Button>
            </DialogContent>
          </Dialog>

          {/* Edit Dialog */}
          <Dialog open={!!editingApp} onOpenChange={(v) => !v && setEditingApp(null)}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Application</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Company</Label>
                  <Input value={company} onChange={(e) => setCompany(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label>Role</Label>
                  <Input value={role} onChange={(e) => setRole(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label>Status</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DEFAULT_STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Stage</Label>
                  <Input value={stage} onChange={(e) => setStage(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label>Deadline</Label>
                  <Input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </div>
              </div>
              <Button
                disabled={updateMut.isPending || !company || !role}
                onClick={() => updateMut.mutate()}
                className="w-full bg-gradient-brand text-white"
              >
                {updateMut.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update"}
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="rounded-2xl border-border/60 shadow-card">
        <CardContent className="p-4">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search company or role…"
              className="h-10 rounded-xl bg-muted/40 pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-border/60 hover:bg-transparent">
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead className="text-right">Deadline</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
                  </TableCell>
                </TableRow>
              )}
              {!isLoading && filteredApps?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    <Briefcase className="mx-auto mb-2 h-8 w-8 text-primary/40" />
                    No applications found.
                  </TableCell>
                </TableRow>
              )}
              {filteredApps?.map((r) => (
                <TableRow key={r.id} className="border-border/60 hover:bg-muted/40">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand text-sm font-semibold text-white">
                        {r.company[0]?.toUpperCase()}
                      </div>
                      <span className="font-medium">{r.company}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{r.role}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`rounded-full border ${statusColor[r.status] || "bg-secondary text-secondary-foreground"}`}
                    >
                      {r.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{r.stage}</TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">
                    {r.deadline}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem onClick={() => openEdit(r)}>
                          <Pencil className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                          onClick={() => {
                            if (confirm("Delete this application?")) {
                              deleteMut.mutate(r.id);
                            }
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
