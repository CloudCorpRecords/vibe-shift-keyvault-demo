# Vulnerable KeyVault Demo

This repository contains an intentionally vulnerable application designed to demonstrate the security risks of "vibe-coded" applications. 

## Live Demo

You can test the live version of this vulnerable application here:
[https://vibe-shift-keyvault-b2dc.agent.opsera.dev/](https://vibe-shift-keyvault-b2dc.agent.opsera.dev/)

## The Vulnerability ("Vibe Coded" Flaw)

In a regular "vibe-coded" website, developers might focus heavily on aesthetics and speed, accidentally overlooking critical security practices. This application contains a classic **SQL Injection** vulnerability.

The backend code (`server.js`) directly concatenates user input into the SQL query without sanitization:

```javascript
// VULNERABLE SQL QUERY: Directly concatenating user input
const query = req.query.q || '';
const sql = `SELECT * FROM secrets WHERE system_name = '${query}'`;
```

**How to exploit it:**
If you enter `' OR '1'='1` into the search box in the live demo, the resulting SQL query becomes:
`SELECT * FROM secrets WHERE system_name = '' OR '1'='1'`
This bypasses the search filter and exposes all secrets in the database!

## The Solution: Opsera & VIBEshift

While AI coding assistants can sometimes introduce these "sloppy-by-design" flaws, **Opsera** and **VIBEshift** provide the solution:

1. **Validate & Detect**: Use Opsera to automatically scan and validate the architecture, immediately catching security problems like SQL injections and hardcoded secrets.
2. **Fix & Deploy**: Once the issues are identified, you can use VIBEshift to automatically fix these problems and take the project from your IDE directly to a secure, deployed website—ready to go!
