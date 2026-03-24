# /lib - Core utilities and clients

This layer contains shared non-UI logic for Marketiv.

Main areas:

- /supabase: server and browser clients, query and mutation modules
- /graphql: external GraphQL integrations
- /gsap.ts: centralized animation import and plugin setup
- /validation: schemas for payload and form validation
- /utils: formatters, constants, and common helpers
- /fonts.ts: global font configuration for the whole app

Rules:

- Keep data access server-first.
- Keep integration code centralized and typed.
