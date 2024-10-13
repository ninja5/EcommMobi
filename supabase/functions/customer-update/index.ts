// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts";
import Payarc from "npm:payarc-sdk@0.0.7";
import axios from "npm:axios";
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  const { object_id, data: customData } = await req.json();
  const payarc = new Payarc(
    Deno.env.get("PAYARC_SECRET_KEY")!,
    "sandbox",
    undefined,
    undefined,
    undefined,
  );
  const data = await payarc.customers.update(object_id, customData);
  return new Response(
    JSON.stringify({ ...data, input: { ...customData, object_id } }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/customer-update' \
    --header 'Authorization: Bearer ' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
