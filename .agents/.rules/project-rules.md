# Project Rules (always follow)

## 1. Work style: autonomous
- Do NOT ask for permission, confirmation, or approval. Do not present a plan and wait. Just do the work.
- If something is unclear, choose the most reasonable interpretation, proceed, and note the assumption in the final report.
- Finish the whole task in one run. Do not stop halfway to ask "should I continue?".

## 2. Scope: exactly what I ask, nothing more
- Implement only what the task says. No extra features, no bonus improvements, no "while I'm here" fixes.
- No unrequested refactors, renames, formatting changes, new files, or dependency upgrades.
- No unrequested docs, comments, or tests beyond what is needed to verify the change.
- Do not suggest or start follow-up work. When the task is done and verified, stop.

## 3. Before editing
- Run `git status --short`, `git branch --show-current`, `git log --oneline -5`.
- Read the relevant code, tests, and config so your change matches existing patterns.
- Current source code and tests beat old docs when they conflict.

## 4. How to code
- Reuse existing code and patterns. Do not create a second implementation of something that exists.
- Use the simplest solution that fits the current stack.
- No new dependencies unless the task cannot be done without one.
- Make small, surgical edits. No whole-file rewrites.

## 5. Verification
- Run typecheck/build and the relevant existing tests after your changes.
- Only say a test passed if you actually ran it. If you could not run it, say so.
- No fake fixes: never hardcode expected results, skip or weaken tests, or disable validation.

## 6. The ONLY reasons to stop and ask
- The action is destructive or irreversible: deleting data, production database writes, `git reset --hard`, `git clean -fd`, force push, history rewrite.
- A required secret, credential, or file is missing and cannot be inferred.
- The task is impossible without changing a protected file listed in the prompt.
Everything else: decide and proceed.

## 7. Safety (always)
- Never push, merge, tag, or release unless I say so.
- Never expose secrets or private env values.
- No external API calls, scraping, or uploads unless the task requires it.

## 8. Final report (keep it short)
- Result: PASS / PARTIAL / FAILED
- What you changed (1-5 lines)
- Files changed
- Tests run and results
- Assumptions made (if any)

## 9. Project-specific rules (EDIT THIS PART)
- Stack / runtime: [e.g. Node 24]
- Dev command / port: [e.g. npm run dev, port 3000]
- Test command: [e.g. npm test]
- Protected files: [e.g. .env*, migrations/]