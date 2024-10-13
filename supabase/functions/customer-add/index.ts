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
  const { customer } = await req.json();
  const payarc = new Payarc(
    Deno.env.get("PAYARC_SECRET_KEY")!,
    "sandbox",
    undefined,
    undefined,
    undefined,
  );
  const data = await payarc.customers.create(customer);
  return new Response(
    JSON.stringify({ ...data, input: { ...customer } }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/customer-add' \
    --header 'Authorization: Bearer ' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'


    curl -L -X POST 'https://uzimwvwgzdxndthrijfd.supabase.co/functions/v1/customer-add' \
    -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6aW13dndnemR4bmR0aHJpamZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExMDE5NjYsImV4cCI6MjAzNjY3Nzk2Nn0.iwwj8G1h9pYcfC3nTw8pNTiKugTyL2rDJQTpWaw1NJY' \
    --data '{"customer":{"email":"tet!@ddsf.com","name":"Kujkoro"}}'
*/
