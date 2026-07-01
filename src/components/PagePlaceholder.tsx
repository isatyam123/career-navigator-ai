import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function PagePlaceholder({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children ?? (
        <Card className="rounded-2xl border-dashed border-border/70 bg-gradient-subtle shadow-card">
          <CardContent className="flex min-h-[360px] flex-col items-center justify-center gap-2 p-10 text-center">
            <div className="text-lg font-medium">Coming soon</div>
            <p className="max-w-md text-sm text-muted-foreground">
              This section is part of the Career Navigator AI preview. Content will populate once
              your workspace is connected.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
