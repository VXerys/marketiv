# /lib/supabase - Supabase clients and data modules

Supabase integration layer for Marketiv.

Current files:

- client.ts for browser-side usage
- server.ts for server-side usage

Planned structure:

- /queries for read operations
- /mutations for write operations

Guideline:

- Keep sensitive data access on server boundaries.
- Use typed contracts from src/types/supabase.ts.
