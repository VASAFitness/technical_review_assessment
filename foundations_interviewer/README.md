# Foundations assignment

This is a 45-minute live Go exercise. Share your screen with the project open in your editor and explain your thinking as you work. Your interviewer will introduce requirements during the session.

## Scenario

A club uses a key-fob scanner to control its entrance turnstile. Active members can enter. Inactive members and unrecognized fobs are denied.

The code runs without hardware, a database, or external services. Device operations print to the terminal.

## Run locally

You need Go 1.22 or newer. From the repository root:

```bash
cd foundations_interviewer
go run .
go test ./...
go vet ./...
```

No third-party dependencies are required.

The demo scans these seeded fobs in order:

| Fob | Membership | Result |
| --- | --- | --- |
| active-001 | Active | Unlock |
| inactive-001 | Inactive | Lock |
| active-002 | Active | Unlock |
| unknown-001 | Not found | Lock |

Each scan makes one device call. The scanner returns whether entry was allowed. The existing test checks the complete demo's output.

## Where to start

- `main.go` creates the scanner and turnstile, then runs the demo.
- `access/key_fob_scanner.go` decides whether to allow entry.
- `turnstile/turnstile.go` controls the simulated turnstile.

Read the code before changing it. Start by walking your interviewer through the current behavior. Keep that behavior working as requirements change.
