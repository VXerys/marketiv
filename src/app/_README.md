# /app - Routes and layouts

This folder is the App Router entrypoint for Marketiv.

Target route architecture:

- /(home): public landing and product narrative
- /(auth): login, register, account recovery
- /(marketplace): public browse and discovery
- /dashboard/(umkm): UMKM workspace
- /dashboard/(creator): Creator workspace
- /dashboard/(shared): shared authenticated pages (account, inbox, notifications)

Boundary rule:

- UMKM-specific UI and state must not be reused inside Creator pages.
- Creator-specific UI and state must not be reused inside UMKM pages.

Legacy portfolio routes such as /about, /contact, and /projects are kept temporarily for migration and should be treated as deprecated.
