# /providers - App-level providers

Global providers that wrap the app and expose cross-route behavior.

Current and planned providers:

- theme provider
- smooth scroll provider
- auth provider
- marketplace provider
- cart provider

Guideline:

- Keep provider responsibilities narrow.
- Put business data in server boundaries when possible, and reserve provider state for client-side UX state.
