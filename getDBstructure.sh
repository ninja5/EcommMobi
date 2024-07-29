export SUPABASE_API_URL="https://uzimwvwgzdxndthrijfd.supabase.co/rest/v1/"
export SUPABASE_API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV6aW13dndnemR4bmR0aHJpamZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExMDE5NjYsImV4cCI6MjAzNjY3Nzk2Nn0.iwwj8G1h9pYcfC3nTw8pNTiKugTyL2rDJQTpWaw1NJY"

curl "${SUPABASE_API_URL}?apikey=${SUPABASE_API_KEY}" -o swagger.json && \
swagger2openapi swagger.json -o openapi.json && \
npx openapi-typescript openapi.json --output src/types/supabase.ts
