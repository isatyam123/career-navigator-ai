import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getApplications = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  });

const CreateAppSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  status: z.string().min(1),
  stage: z.string().min(1),
  deadline: z.string().optional().nullable(),
});

export const createApplication = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => CreateAppSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase.from("applications").insert({
      user_id: userId,
      company: data.company,
      role: data.role,
      status: data.status,
      stage: data.stage,
      deadline: data.deadline || null,
    });
    if (error) throw new Error(error.message);
  });

const UpdateAppSchema = z.object({
  id: z.string(),
  company: z.string().min(1),
  role: z.string().min(1),
  status: z.string().min(1),
  stage: z.string().min(1),
  deadline: z.string().optional().nullable(),
});

export const updateApplication = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => UpdateAppSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase
      .from("applications")
      .update({
        company: data.company,
        role: data.role,
        status: data.status,
        stage: data.stage,
        deadline: data.deadline || null,
      })
      .eq("id", data.id)
      .eq("user_id", userId);
    if (error) throw new Error(error.message);
  });

const DeleteAppSchema = z.object({ id: z.string() });

export const deleteApplication = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => DeleteAppSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase
      .from("applications")
      .delete()
      .eq("id", data.id)
      .eq("user_id", userId);
    if (error) throw new Error(error.message);
  });
