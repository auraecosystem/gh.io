---
name: Custom issue template
about: Describe this issue template's purpose here.
title: ''
labels: ''
assignees: ''

---

# Decentralized Web OS (`web4-os`)

A modern, agent-centric decentralized desktop operating system bridging Web3 identity, x402 payment rails, and autonomous agent workflows.

---

## 🛠️ Essential Git Workflow

| Command | Purpose | Common Usage |
| :--- | :--- | :--- |
| `git status` | Displays working directory and staging state | `git status` |
| `git add` | Stages modified files for the next commit | `git add .` |
| `git commit` | Saves staged snapshot to local repository history | `git commit -m "feat: upgrade OS proxy"` |

### Daily Commit Routine

```bash
# Check modified files
git status

# Stage updated components
git add .

# Commit changes using conventional commit formatting
git commit -m "feat(escrow): integrate solana escrow client callbacks"

# Push updates to target branch
git push origin dev-os
> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.
