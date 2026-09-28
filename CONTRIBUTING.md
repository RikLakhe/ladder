# Contributing to Ladder

Standing rules for all contributors. These apply permanently — to every feature, fix, and release.

---

## Branching Model

```
main                  ← integration branch + production. Protected. PRs only.
T-<slug>              ← LANE task branches, auto-named by lane start. Cut from main.
release/v{semver}     ← cut from main at a milestone. PR back to main + tagged.
hotfix/v{semver}      ← cut from main for urgent production fixes only.
```

**Rules:**
- `main` is protected — PRs only, at least 1 review approval required, CI must pass.
- `main` is the LANE integration branch — all task PRs merge here via `lane land` or a reviewed PR.
- Never force-push to `main`.
- Never commit directly to `main`.
- Task branches are created by `lane start` and pruned by `lane land` or `lane abandon`.
- Release branches are deleted after the GitHub release is created.

---

## Deployment Model (Vercel)

| Branch / PR | What Vercel does |
|---|---|
| `main` | **Production deploy** — automatically on every merge |
| Any open PR (task branch, release branch) | **Preview deploy** — unique URL per PR, updated on every push |
| `release/v{semver}` PR | Preview deploy used for final smoke-test before merging to production |

**Implications:**
- Every task branch PR gets a live preview URL for review before merge.
- Merging a task PR to `main` immediately promotes to production — only merge when the feature is shippable.
- The release branch PR is where you verify the version bump and run the final Lighthouse check against the Vercel preview before tagging.

---

## Semver Versioning

| Change | Version bump | Example trigger |
|---|---|---|
| MAJOR | v**2**.0.0 | Breaking change to content schema, store shape, or URL structure that invalidates existing localStorage data |
| MINOR | v0.**x**.0 | New feature — new track, new domain, new page, new user-visible interaction |
| PATCH | v0.x.**y** | Content correction, bug fix, dependency update, copy/typo fix |

**Bump command:** `npm version {major|minor|patch} --no-git-tag-version`
Never bump manually in `package.json` — always use the npm command.

---

## Task Branch Workflow (LANE-managed)

LANE handles branch creation and cleanup automatically:

```bash
# Start a task — creates branch + worktree off main
lane start T-<id>

# Work in the worktree, commit via lane red/green/refactor
lane red T-<id>      # failing test commit
lane green T-<id>    # implementation commit
lane review T-<id>   # generate verification report
lane approve T-<id>  # human stamps the report
lane done T-<id>     # gates pass → ready to merge

# Merge (two options):
lane land T-<id>     # solo: guarded local merge into main
# or: open PR from T-<id> → main for team review, squash-merge
```

Do not create task branches manually — `lane start` claims the branch atomically.

---

## Release Procedure

Run at every milestone defined in the implementation plan. No milestone is skipped.

```bash
# 1. Cut release branch from main
git checkout main && git pull
git checkout -b release/v{version}

# 2. Bump version
npm version {minor|major|patch} --no-git-tag-version
git add package.json package-lock.json
git commit -m "chore: bump version to v{version}"
git push -u origin release/v{version}

# 3. PR release/v{version} → main
gh pr create --base main --title "Release v{version}" \
  --body "## What's in this release
- {bullet list}

## Test plan
- [ ] npm test passes on CI
- [ ] npm run build succeeds on CI
- [ ] Vercel preview deploy verified (Lighthouse ≥ 90 all categories)
- [ ] E2E tests run manually against the preview URL"

# 4. After PR approved + merged → tag + GitHub release
git checkout main && git pull
git tag -a v{version} -m "Release v{version}"
git push origin v{version}
gh release create v{version} --title "Ladder v{version}" --notes "{release notes}"
# Vercel auto-deploys production from the merge commit on main
```

---

## Hotfix Procedure

For urgent production bugs only — do not use for features.

```bash
git checkout main && git pull
git checkout -b hotfix/v{patch-version}
# fix the bug
git commit -m "fix: {description}"
npm version patch --no-git-tag-version
git add package.json package-lock.json
git commit -m "chore: bump version to v{patch-version}"
git push -u origin hotfix/v{patch-version}
gh pr create --base main --title "Hotfix v{patch-version}" --body "{what broke and why}"
# After PR approved + merged:
git checkout main && git pull
git tag -a v{patch-version} -m "Hotfix v{patch-version}"
git push origin v{patch-version}
gh release create v{patch-version} --title "Ladder v{patch-version} (hotfix)" --notes "{what was fixed}"
```

---

## Commit Message Format

```
{type}: {short description}

Types: feat | fix | chore | docs | test | refactor
```

Examples:
- `feat: add domain page with competency list`
- `fix: handle P7 focused view edge case`
- `chore: bump version to v0.3.0`
- `test: add E2E test for coming-soon domain`

LANE commits (red/green/refactor) are written by `lane` — do not amend them.

---

## CI Requirements

Every PR to `main` must pass:
- `npm test` — unit + component tests (Vitest + RTL)
- `npm run build` — Next.js static build

E2E tests (`npm run test:e2e`) run manually against the Vercel preview before each release PR — not in CI due to Playwright install overhead.

---

## Content Updates

When adding new competency content (new track technical skills, updated criteria):

1. Update the relevant file in `src/content/`
2. Run `npx tsc --noEmit` — must pass with no errors
3. Run `npm test` — all tests must pass
4. Open a PR to `main` as a `feat:` commit
5. If the content change alters an existing criterion's `id`, it is a **MAJOR** change (invalidates localStorage) — bump MAJOR version

---

## What Never Happens

- Direct commits to `main`
- Skipping a milestone release
- Merging without CI passing
- Force-pushing any branch
- Bumping version manually in `package.json`
- Releasing without a GitHub release entry
- Creating task branches manually (use `lane start`)
