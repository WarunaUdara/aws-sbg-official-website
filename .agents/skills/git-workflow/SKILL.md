---
name: git-workflow
description: Professional git workflow, branch isolation, and Conventional Commits for AI coding agents. Enforces feature branch naming conventions (<contributor>/<type>-<description>), blocks direct commits/pushes to main, provides intelligent diff analysis and atomic staging, guarantees secret and credential protection, enforces Conventional Commits standard (<type>[scope]: <description>), and executes pre-PR verification gates (lint, knip, typecheck, tests, build) for conflict-free multi-developer collaboration.
---

# Collaborative Git Workflow & Commit Protocol for AI Agents

This skill defines the complete git workflow, branch isolation rules, safety protocols, and Conventional Commits standards for AI coding agents collaborating across teams. It ensures clean git history, prevents conflicts between concurrent agents/developers, protects secrets, and standardizes pull requests.

---

## 1. Prime Directive: Protected Branch Isolation

> [!CAUTION]
> **NEVER commit or push directly to `main`, `master`, or any default production branch.**
> All changes must be developed on an isolated feature branch and merged via Pull Request.

### Mandatory Pre-Flight Check:
Before staging or committing any code, agents MUST check the active branch:
```bash
git branch --show-current
```
If output is `main` or `master`:
1. Check worktree status: `git status --short`
2. Immediately branch off:
   ```bash
   git checkout -b <contributor-name>/<type>-<short-description>
   ```

---

## 2. Standardized Branch Naming Convention

All feature branches must follow this structure:

```text
<contributor-name>/<type>-<short-description>
```

### Components:
- **`<contributor-name>`**: Developer username or team identifier in lowercase (e.g. `waruna`, `pruthivi`, `sahan`, `team`).
- **`<type>`**: Category of change:
  - `feat`: New feature or user-facing capability.
  - `fix`: Bug fix or error resolution.
  - `refactor`: Code restructuring without behavioral change.
  - `docs`: Documentation, README, or guide updates.
  - `test`: Adding or updating test suites, mocks, or fixtures.
  - `chore`: Tooling, maintenance, dependency updates.
  - `security`: Security patches, vulnerability remediations, secret audits.
- **`<short-description>`**: Kebab-case, lowercase, concise description of the single outcome (2–4 words).

### Examples:
- `waruna/feat-bulk-cv-download`
- `pruthivi/feat-student-profile`
- `sahan/fix-company-approval`
- `team/docs-contributing`
- `waruna/test-playwright-e2e`

---

## 3. Local AI Tool Output & Artifact Isolation Protocol

> [!IMPORTANT]
> **Standard Codebase Outputs Only**:
> - **Instruction Input**: `AGENTS.md` (shared repository instructions for all agents).
> - **Skills**: `.agents/` folder (shared agent skills).
> - **Codebase**: Standard application code, tests, configs, and documentation.
> - **Everything else**: Local AI tool outputs, assistant caches, and token-saving analysis artifacts MUST remain local and gitignored.

### The Rule for Local Tool Caches & Artifacts:
Different developers and their AI agents may run local assistants or optimization tools:
- **Codex** (`.codex/`, `codex/`, `codex-out/`, `*.codex`)
- **Claude** (`.claude/`, `CLAUDE.md`, `claude-out/`)
- **Graphify** (`graphify-out/`, `.graphify/`, `*.graphify`)
- **Codegraph** (`.codegraph/`, `codegraph/`, `codegraph-out/`)
- **Cursor** (`.cursor/`, `.cursorrules`)
- **Agent Scratchpads & Transcripts** (`.chat/`, `agent-output/`, `.system_generated/`)

These artifacts belong exclusively to the local environment and must **NEVER** be committed or pushed to the repository.

### Mandatory Pre-Staging Audit:
Before staging any changes, agents MUST run:
```bash
git status --porcelain
```
1. **Check for local tool artifacts**: If any untracked (`??`) or modified files match local AI assistant outputs or caches:
   - Verify `.gitignore`. If not already ignored, **immediately append the pattern to `.gitignore`**.
   - If a local tool output was already staged in git (`git add`), **immediately unstage it**:
     ```bash
     git reset HEAD <path-to-tool-output>
     ```
2. **Commit only standard codebase deliverables**: Never pollute the repository with local agent working state, token-optimization caches, or machine-specific tool outputs.

---

## 4. Intelligent Diff Analysis & Staging

### Step 1: Analyze Status & Diff
```bash
# Check working tree status
git status --porcelain

# If files are already staged, inspect staged diff
git diff --staged

# If nothing staged, inspect working tree diff
git diff
```

### Step 2: Stage Files Intelligently (Atomic Staging)
- **Stage by specific paths**: Group related changes logically.
  ```bash
  git add path/to/file1 path/to/file2
  ```
- **Stage by pattern**:
  ```bash
  git add tests/unit/*.test.ts
  git add components/company/*
  ```
- **Never sweep blindly**: Do NOT run `git add .` or `git add -A` when unrelated uncommitted changes exist in the worktree. Preserve other contributors' or agents' work.
- **Never commit secrets**: Verify that `.env`, `.env*.local`, `.env.test`, credentials, private keys, database dumps, and student CVs are never staged.
- **Never commit local assistant outputs**: Verify that tools like Graphify, Codex, Claude, Codegraph, or Cursor outputs are not staged.

---

## 5. Conventional Commits Standard

Every commit message must strictly adhere to the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Format:
```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Commit Types:
| Type | Purpose |
| --- | --- |
| `feat` | New feature or capability |
| `fix` | Bug fix or issue resolution |
| `docs` | Documentation only |
| `style` | Code formatting or whitespace (no logic change) |
| `refactor` | Refactoring code without fixing bugs or adding features |
| `perf` | Performance improvement |
| `test` | Adding, updating, or fixing tests |
| `build` | Build system, bundler, or dependency updates |
| `ci` | CI workflows, automated pipelines, or tooling configs |
| `chore` | Maintenance, cleanup, operational scripts |
| `revert` | Reverting a previous commit |

### Writing Guidelines:
- **Imperative mood & present tense**: Use `"add"` not `"added"`, `"fix"` not `"fixes"`.
- **Length**: Keep `<description>` concise (under 72 characters).
- **Lowercase**: Start `<description>` with a lowercase letter, with no trailing period.
- **Breaking Changes**:
  - Add `!` after type/scope: `feat(api)!: drop legacy v1 endpoints`
  - Or include `BREAKING CHANGE:` in the footer:
    ```text
    feat(auth): require passkey or email otp

    BREAKING CHANGE: password-only logins are no longer permitted.
    ```
- **Issue References**: Reference issues in the footer: `Fixes #28`, `Refs #42`.

### Single-line Commit:
```bash
git commit -m "feat(company): add admin-controlled bulk cv download"
```

### Multi-line Commit with Body:
```bash
git commit -m "$(cat <<'EOF'
feat(company): add admin-controlled bulk cv download

Enable companies with admin approval to download applicant resumes as a streaming ZIP archive.
Includes candidate manifest and error-tolerant fallback for missing storage objects.

Fixes #45
EOF
)"
```

---

## 6. Strict Git Safety Protocol

AI agents must abide by the following safety constraints at all times:

1. **NEVER update git config** (`git config --global`, `git config user.*`) unless explicitly instructed by the user.
2. **NEVER run destructive commands** (`git reset --hard`, `git checkout .`, `git clean -fd`) without explicit user instruction.
3. **NEVER skip hooks** (`--no-verify`, `-n`) unless explicitly asked.
4. **NEVER force push** (`--force`, `-f`) to `main`, `master`, or any shared branch.
5. **NEVER amend published commits**: If a commit or hook fails, fix the underlying issue and create a **NEW** clean commit.
6. **NEVER commit sensitive data**:
   - Verify `.env.example` and `.env.test.example` contain only placeholder values.
   - Always confirm sensitive patterns are in `.gitignore`.

---

## 7. Multi-Agent & Team Collaboration

When multiple agents or developers collaborate on the same repository:

1. **Inspect before modifying**:
   ```bash
   git status --short
   ```
   Acknowledge any pre-existing uncommitted changes and leave them untouched.
2. **Synchronize upstream regularly**:
   ```bash
   git fetch origin main
   git rebase origin/main
   ```
   Keep the feature branch aligned with `main` to eliminate late merge conflicts.
3. **Resolve conflicts cleanly**:
   If rebase conflicts arise, inspect both sides, integrate the intended changes, re-run tests, and continue rebase (`git rebase --continue`).

---

## 8. Pre-PR Quality Verification Protocol

Before pushing or opening a PR, agents must execute the project's quality verification suite:

```bash
# 1. Format and Linting
bun run lint

# 2. Dead code & unused export check
bun run knip

# 3. Strict TypeScript type check
bun run typecheck

# 4. Unit & Integration tests
bun run test

# 5. End-to-End tests
bun run test:e2e

# 6. Production build verification
bun run build

# 7. Database schema drift & migration verification (mandatory if database/schema.ts modified)
bun run db:drift-check
```

> [!IMPORTANT]
> Never claim a check passed without running it and verifying an exit code of 0.

---

## 9. Pull Request Creation & Title Standards

> [!CAUTION]
> **Mandatory PR Title Format**:
> GitHub Actions automatically runs `.github/workflows/semantic-pull-request.yml` on all PR opens and edits.
> If the PR title does not follow the Conventional Commits specification, the CI build will fail immediately.

### Format:
```text
<type>(<scope>): <lowercase imperative subject>
```

### Permitted Types:
`build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `test`

### Permitted Scopes:
`admin`, `api`, `applications`, `auth`, `company`, `database`, `deploy`, `email`, `jobs`, `repo`, `student`, `ui`

### Subject Rules:
- Must begin with a lowercase character (`^(?![A-Z]).+$`).
- Must use imperative mood (e.g. `add`, `fix`, `update`, not `added`, `fixes`, `updating`).
- Must not end with a period.

### Creating a PR via CLI:
Always pass `--title` with a valid Conventional Commit title:
```bash
gh pr create \
  --title "feat(student): add registered event whatsapp links" \
  --body "Detailed description of changes..."
```
Never let GitHub or the CLI default to the raw branch name (e.g. `User/feat-branch`).

### Fixing an Existing PR Title:
If a PR title was created improperly and failed the `semantic-pull-request` CI check, fix it immediately:
```bash
gh pr edit <PR-number> --title "feat(<scope>): <lowercase subject>"
```

---

## 10. Handoff Checklist

1. Push feature branch:
   ```bash
   git push -u origin <branch-name>
   ```
2. Open Pull Request with compliant title:
   ```bash
   gh pr create --title "<type>(<scope>): <subject>" --body "..."
   ```
3. Verify all GitHub Actions checks pass green:
   ```bash
   gh pr checks <PR-number> --watch
   ```
4. Prepare PR summary:
   - **What changed**: Bulleted list of implemented files and architectural choices.
   - **Verification**: Exact test commands and outputs proving functionality.
   - **Database & Env**: Note any migrations, new env variables, or operational steps.
