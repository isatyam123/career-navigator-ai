import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth/callback")({
  ssr: false,
  component: AuthCallback,
});

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    // Supabase JS parses the OAuth code / hash tokens automatically on load.
    // We just wait for the resulting session, then redirect.
    const go = async () => {
      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      if (data.session) {
        navigate({ to: "/dashboard", replace: true });
        return;
      }
      const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
        if (session || event === "SIGNED_IN") {
          sub.subscription.unsubscribe();
          navigate({ to: "/dashboard", replace: true });
        }
      });
      // Safety net: if nothing arrives, bounce back to /auth after 5s.
      setTimeout(() => {
        if (cancelled) return;
        sub.subscription.unsubscribe();
        supabase.auth.getSession().then(({ data: d }) => {
          navigate({ to: d.session ? "/dashboard" : "/auth", replace: true });
        });
      }, 5000);
    };

    void go();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
        <p className="text-sm">Signing you in…</p>
      </div>
    </div>
  );
}
