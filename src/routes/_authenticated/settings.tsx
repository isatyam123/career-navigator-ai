import { createFileRoute } from "@tanstack/react-router";
import { Settings as SettingsIcon } from "lucide-react";
import { PagePlaceholder } from "@/components/PagePlaceholder";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/_authenticated/settings")({
  component: () => (
    <PagePlaceholder
      title="Settings"
      description="Manage your profile and preferences."
      icon={SettingsIcon}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl border-border/60 shadow-card">
          <CardContent className="flex flex-col gap-4 p-6">
            <h3 className="font-semibold">Profile</h3>
            <div className="grid gap-3">
              <div className="grid gap-1.5">
                <Label>Full name</Label>
                <Input defaultValue="Alex Morgan" className="rounded-xl bg-muted/40" />
              </div>
              <div className="grid gap-1.5">
                <Label>Email</Label>
                <Input defaultValue="alex@uni.edu" className="rounded-xl bg-muted/40" />
              </div>
              <div className="grid gap-1.5">
                <Label>University</Label>
                <Input defaultValue="Stanford University" className="rounded-xl bg-muted/40" />
              </div>
            </div>
            <Button className="mt-2 w-fit rounded-xl bg-gradient-brand text-white shadow-glow">
              Save changes
            </Button>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border/60 shadow-card">
          <CardContent className="flex flex-col gap-4 p-6">
            <h3 className="font-semibold">Preferences</h3>
            {[
              { label: "Email deadline reminders", desc: "Get pinged 48h before a deadline" },
              { label: "Weekly AI digest", desc: "Sunday overview of your pipeline" },
              { label: "Interview practice nudges", desc: "Daily quick-prep reminders" },
              { label: "Public profile", desc: "Share progress with mentors" },
            ].map((p) => (
              <div
                key={p.label}
                className="flex items-center justify-between rounded-xl border border-border/60 p-3"
              >
                <div>
                  <div className="text-sm font-medium">{p.label}</div>
                  <div className="text-xs text-muted-foreground">{p.desc}</div>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PagePlaceholder>
  ),
});
