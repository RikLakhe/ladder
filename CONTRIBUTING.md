# Contributing to Ladder

Standing rules for all contributors. These apply permanently — to every feature, fix, and release.

---

## Branching Model

```
main                  ← integration branch + production. Protected. PRs only.
T-<slug>              ← LANE task branches, auto-named. Cut from main by lane start.
release/v{semver}     ← cut from main at a milestone. Merges back to main + tagged.
hotfix/v{semver}      ← cut from main for urgent production fixes only.
```

**Rules:**
- `main` is the LANE integration branch — all task PRs merge here.
- `main` is protected — PRs only, at least 1 approval required, CI must pass.
- Never force-push to `main`.
- Task branches are created by `lane start` and pruned by `lane land` or `lane abandon`.
- Release branches are deleted after the GitHub release is created.

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

## Feature Branch Workflow

Every unit of work (one plan task, one bug fix, one content update) gets its own branch:

```bash
# 1. Start from develop
git checkout develop && git pull
git checkout -b feature/T{n}-{short-slug}

# 2. Work in small commits
git commit -m "feat: ..." or "fix: ..." or "chore: ..."

# 3. Open PR to develop when done
gh pr create --base develop --title "T{n}: {description}" \
  --body "What changed and why. Closes task {n}."

# 4. Squash-merge after approval, delete branch
```

---

## Release Procedure

Run at every milestone defined in the implementation plan. No milestone is skipped.

```bash
# 1. Cut release branch from develop
git checkout develop && git pull
git checkout -b release/v{version}

# 2. Bump version
npm version {minor|major|patch} --no-git-tag-version
git add package.json package-lock.json
git commit -m "chore: bump version to v{version}"

# 3. PR release/v{version} → main
gh pr create --base main --title "Release v{version}" \
  --body "## What's in this release
- {bullet list}

## Test plan
- [ ] npm test passes
- [ ] npm run build succeeds
- [ ] Vercel preview verified"

# 4. After PR approved + merged → tag + GitHub release
git checkout main && git pull
git tag -a v{version} -m "Release v{version}"
git push origin v{version}
gh release create v{version} --title "Ladder v{version}" --notes "{release notes}"

# 5. Sync develop
git checkout develop
git merge main
git push origin develop
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
gh pr create --base main --title "Hotfix v{patch-version}" --body "{what broke and why}"
# After merge:
git tag -a v{patch-version} -m "Hotfix v{patch-version}"
git push origin v{patch-version}
gh release create v{patch-version} --title "Ladder v{patch-version} (hotfix)" --notes "{what was fixed}"
git checkout develop && git merge main && git push origin develop
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

---

## CI Requirements

Every PR to `main` and `develop` must pass:
- `npm test` — unit + integration tests (Vitest + RTL)
- `npm run build` — Next.js static build

E2E tests (`npm run test:e2e`) run manually before each release PR; they are not in CI due to Playwright install overhead.

---

## Content Updates

When adding new competency content (new track technical skills, updated criteria):

1. Update the relevant file in `src/content/`
2. Run `npx tsc --noEmit` — must pass with no errors
3. Run `npm test` — all tests must pass
4. PR to develop as a `feat:` commit
5. If the content change alters an existing criterion's `id`, it is a **MAJOR** change (invalidates localStorage) — bump MAJOR version

---

## What Never Happens

- Direct commits to `main` or `develop`
- Skipping a milestone release
- Merging without CI passing
- Force-pushing protected branches
- Bumping version manually in `package.json`
- Releasing without a GitHub release entry
