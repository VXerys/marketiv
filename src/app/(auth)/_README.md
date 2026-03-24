# /(auth) - Authentication route group

Authentication entry points for Marketiv users.

Typical pages:

- login
- register
- forgot-password
- reset-password

Guideline:

- Keep this flow public and lightweight.
- Redirect authenticated users away from auth routes when session is active.
