# Secure KeyVault Demo (Post-VIBEshift)

This repository contains the **secured** version of the KeyVault application. It demonstrates the "After" state of a codebase that has been audited by **Opsera** and remediated using **VIBEshift**.

## The "Vibe Coded" Vulnerable Branch

If you are looking for the original, intentionally vulnerable "sloppy-by-design" version of this application, please check out the `vulnerable-version` branch:
[View the Vulnerable Branch](https://github.com/CloudCorpRecords/vibe-shift-keyvault-demo/tree/vulnerable-version)

### Live Vulnerable Demo

You can test the live version of the original vulnerable application here:
[https://vibe-shift-keyvault-b2dc.agent.opsera.dev/](https://vibe-shift-keyvault-b2dc.agent.opsera.dev/)

In the original "vibe-coded" website, the backend contained a classic **SQL Injection** vulnerability, allowing users to enter `' OR '1'='1` to bypass the search filter and expose all secrets in the database.

## The Solution: Opsera & VIBEshift

This `main` branch represents the application after the following workflow:

1. **Validate & Detect**: Opsera automatically scanned and validated the architecture, immediately catching security problems like SQL injections, dependency vulnerabilities, and missing security middleware.
2. **Fix & Deploy**: VIBEshift automatically fixed these problems and took the project from the IDE directly to a secure state—ready to go!

### Security Fixes Applied in this Version
- ✅ Added CSRF protection (`csurf` middleware)
- ✅ Dependency vulnerabilities patched (updated `tar`, etc.)
- ✅ Dockerfile hardened with `HEALTHCHECK`
- ✅ Source map leakage prevented via `.dockerignore`
- ✅ `package.json` scoped to only publish necessary files
