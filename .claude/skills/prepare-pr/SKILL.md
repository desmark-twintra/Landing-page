---
name: prepare-pr
description: Prepare the current feature branch for a pull request in this repo. Use when the user asks to "prepare a PR", "raise a PR", "open a PR", or similar. Runs build + lint as pre-flight gates, confirms the branch is ready (not on main, no uncommitted changes, has commits ahead of main), reviews the branch's commits and diff since main, drafts a plain-text PR title and a 100+ word description, then hands back a pre-filled GitHub compare link to open manually — it never calls `gh` or creates the PR itself.
---

# prepare-pr

Gets the current branch into a state where a pull request can be raised, then
drafts the PR title/description and hands back a ready-to-open link. This
skill never calls `gh` and never pushes without asking first.

## 1. Pre-flight gates

Run these in order. **Stop immediately on the first failure**, explain why to
the user, and do not continue to later steps.

- `git branch --show-current` — if this is `main`, stop: tell the user a PR
  needs a feature branch, not `main` itself.
- `git status --short` — if this prints anything (uncommitted or untracked
  changes), stop: a PR can only reflect committed work. Point the user at the
  `commit` skill (if available in this session) to split/commit their changes
  first.
- `bun run build` — if it fails, stop and show the failing output verbatim.
  If `bun` isn't on PATH, fall back to `npm run build`.
- `bun run lint` — same stop-on-failure behavior, same npm fallback
  (`npm run lint`).
- `git fetch origin main --quiet` — best-effort; if it fails (e.g. offline),
  continue against the local `main` branch instead.
- `git log origin/main..HEAD --oneline` (fallback `git log main..HEAD
  --oneline` if `origin/main` isn't available) — if this is empty, stop:
  there's nothing on this branch to PR yet.

Only once every gate above passes should you tell the user the branch is
ready and move on to step 2.

## 2. Gather the branch's changes

- Diff base: `git merge-base origin/main HEAD` (fallback `git merge-base main
  HEAD`).
- Commit list: `git log <merge-base>..HEAD --format='%h %s'`.
- File-level summary: `git diff <merge-base>..HEAD --stat`.
- Full diff: `git diff <merge-base>..HEAD` — actually read enough of it to
  understand what each changed file does and why. Do not just restate commit
  subject lines; the diff is the source of truth, commit messages are a
  hint.

## 3. Draft the PR title and description

- **Title** — plain text, no markdown, no trailing period. One sentence-style
  summary of what the branch does *as a whole* (not a list of every commit).
  Aim for under ~70 characters where the change allows it.
- **Description** — prose, optionally with a short bullet list of concrete
  changes, **at least 100 words**. Synthesize it from the real diff and
  commit history: what changed, and why (the motivation, if it's evident from
  the commits/code, not invented). Do not pad with filler just to clear the
  word count — if the change is small, still explain it precisely and let it
  run a little over 100 words with real content rather than restating the
  same point.

Show the drafted title and description to the user before moving on.

## 4. Hand back a ready-to-open link — never call `gh`

- Parse `owner/repo` from `git remote get-url origin`.
- Present the user with: the branch name, the commit list from step 2, and
  the drafted title/description, then **ask before pushing** — this mirrors
  the `commit` skill's rule of pushing only with explicit permission. Do not
  push on your own initiative.
- If the user confirms: push with `git push -u origin <branch>` (or a plain
  `git push` if the branch already has an upstream).
- Percent-encode the title and description reliably rather than hand-escaping
  — e.g. pipe each through:
  `node -e "process.stdout.write(encodeURIComponent(require('fs').readFileSync(0,'utf8')))"`
  reading from stdin — then build and print:

  ```
  https://github.com/{owner}/{repo}/compare/main...{branch}?quick_pull=1&title={encoded title}&body={encoded description}
  ```

  GitHub pre-fills the "Open a pull request" form from these query params
  when the user opens the link.
- The skill's job ends at printing this link. Never run `gh pr create` or any
  other command that actually submits the PR — that step is always the
  user's, by design.
