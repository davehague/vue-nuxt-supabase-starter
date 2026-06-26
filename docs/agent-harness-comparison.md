# Agent Harness Comparison — Autonomous Goal-Achievement

> **Living reference.** Ranks AI agent harnesses/SDKs by how well they *decompose a
> goal into chunks, call tools (incl. MCP), kick off sub-agents, use skills, and iterate
> with self-verification until success.* Last researched: **June 2026**.
> Figures are drawn from secondary aggregators/leaderboards (primary index pages block
> automated fetch); treat exact numbers as directional and re-check the live sources in
> the "Where to track" section.

---

## 0. The headline

1. **"Artificial Analysis but for harnesses" already exists.** Artificial Analysis
   launched a **Coding Agent Index** in May 2026 that benchmarks *full stacks*
   (model **+** harness pairs), not models in isolation. That is the single best
   ongoing source for your question.
2. **The harness drives the outcome as much as the model.** Recurring finding across
   every source:
   - Same model, two harnesses → **~26-point** quality swing (GPT-5.5 reported
     ~61.5% functionality in native Codex vs ~87.2% in Cursor's harness the *same week*).
   - Same near-identical code quality → **up to 32× cost difference** per task
     (~$0.07 vs ~$2.26).
   - Token use: Claude Code runs roughly **3–4× the tokens** of Codex on the same work.
3. **Capability ≠ one number.** Claude-family leads **SWE-bench Verified**
   (Opus 4.8 ~88.6%; Claude Code harness ~87.6%); GPT-5.5/Codex and Claude Fable 5
   trade the lead on **Terminal-Bench 2.x** (~83–88%). "Best" depends on task shape.

---

## 1. How this ranks harnesses (the capability lens)

Scored on the five things you care about, not raw model IQ:

| Axis | What it means |
|---|---|
| **Decompose** | Planning / plan-mode; turning a goal into ordered subtasks with deps |
| **Tools + MCP** | Built-in file/shell/browser tools; depth + breadth of MCP integration |
| **Sub-agents** | Spawn specialized workers w/ own context/tools; parallel fan-out |
| **Skills** | `SKILL.md` packaged, auto-invoked capabilities |
| **Verify→iterate** | Built-in checking that loops the agent back until success is *verified* |

---

## 2. Ranking for autonomous goal-achievement

### Tier 1 — Strongest end-to-end orchestration

**Claude Code / Claude Agent SDK** (renamed from "Claude Code SDK", Sept 2025)
- **Decompose:** Lead-planner pattern; orchestrator emits a structured plan (subtasks,
  inputs, allowed tools, dependencies).
- **Sub-agents:** First-class — each has own context window, prompt, tool permissions.
  **June 2026 "Dynamic Workflows"** lets a lead fan out *tens–hundreds* of parallel
  subagents in one session.
- **Verify→iterate:** **"Performance Outcomes"** (June 2026) adds a separate **grader**
  that sends each subagent back to revise until it meets a rubric — i.e. iterate-to-success
  is now a built-in primitive, not just a prompt trick.
- **Tools + MCP:** Widely described as the **strongest MCP ecosystem**, deepest OS access,
  built-in file/shell tools.
- **Skills:** Native `SKILL.md`, autonomously invoked.
- **Note:** Anthropic's own research claims multi-agent setups beat single-agent by up to
  ~90% on their benchmarks. SDKs in Python + TS. (As of June 15 2026, Agent SDK / `claude -p`
  usage draws from a separate monthly Agent SDK credit on subscription plans.)
- **Cost caveat:** Highest token burn of the major harnesses.

**OpenAI Codex (SDK / CLI)**
- **Decompose:** `/plan` command for task planning/decomposition.
- **Sub-agents:** GA subagent model — a **manager decomposes work and dispatches to parallel
  workers**, each with its own context.
- **Composability:** Codex CLI can run **as an MCP server**, so an outer orchestrator
  (e.g. the OpenAI Agents SDK) can delegate coding subtasks to it → deterministic,
  reviewable pipelines.
- **Autonomy:** **Delegated mode** runs tasks in isolated cloud sandboxes preloaded with the
  repo; launch many in parallel; approval gates for network/risky/out-of-workspace actions.
- **Skills:** Skills + plugins on the open agent-skills standard.
- **Efficiency edge:** Consistently **leaner on tokens/cost** than Claude Code — often the
  better $/task at similar quality. Leads Terminal-Bench among many runs.

### Tier 2 — Capable, with a clear angle or a caveat

**xAI Grok Build** (incl. `/goal`)
- **Verify→iterate:** `/goal` is a purpose-built **long-running autonomous mode**: plans,
  executes, and **verifies until complete** (verification = reviewing code, inspecting
  webpages, running scripts), with pause/resume/status/clear controls. This is the most
  explicit "iterate until success is *verified*" loop of any harness here.
- **Sub-agents:** Up to **8 parallel agents**, each doing plan → search → build.
  **Arena Mode** auto-scores competing outputs before you review them.
- **Decompose/manage:** Agent Dashboard to run many sessions; Composer 2.5 + Grok Build 0.1
  two-model pipeline; plugin marketplace.
- **Caveat:** **MCP support is unconfirmed** in sources as of June 2026 — verify before
  betting on MCP-heavy workflows. Local execution; $30–$300/mo tiers.

**Cursor (agent + SDK)**
- Ships **Rules, MCP, Hooks, Skills, Plugins, Subagents**, and is notably
  **cross-compatible** — reads `.cursor`, `.claude/agents`, and `.codex/agents` configs.
- Demonstrated some of the **largest harness-driven quality gains** in the AA data
  (the GPT-5.5 swing above was Cursor's harness).

**Amp (AmpCode)**
- **Orchestration-first** philosophy: subagents, long context, multi-model routing.
  Default usage is explicitly orchestrated ("Use 3 subagents to convert these CSS files…").

**Factory (Droids)**
- Optimized for **multi-step workflows spanning issue trackers, CI, and deploy** —
  "automate coding, testing, and deployment." Custom Droids = subagents with **scoped
  per-droid MCP servers**.

### Tier 3 — Solid, but narrower or in transition

**Google Gemini CLI**
- Open-source (Apache 2.0); **subagents** (orchestrator → isolated subagents → summarized
  returns), **plan mode** (read-only), **MCP** servers, skills.
- ⚠️ **Transition risk:** being **absorbed into Antigravity CLI on June 18, 2026**, with
  free/consumer access stopping — factor migration in before adopting.

**OpenCode**
- Open-source; agent model. Community **"Oh My Opencode"** turns it into a multi-agent
  system (Sisyphus parallel orchestration + ~11 specialized agents). Strong if you want
  open, hackable, model-agnostic.

**Aider**
- Lightweight pair-programmer; polyglot edits. **Minimal native orchestration** — best as a
  baseline / single-loop editor, not autonomous fan-out.

---

## 3. Capability matrix (quick scan)

| Harness | Decompose | Sub-agents | Tools+MCP | Skills | Verify→iterate | Token/$ |
|---|---|---|---|---|---|---|
| Claude Agent SDK | ★★★ | ★★★ (100s parallel) | ★★★ strongest MCP | ★★★ | ★★★ grader rubric | high burn |
| Codex SDK/CLI | ★★★ `/plan` | ★★★ manager+workers | ★★★ + *is* MCP server | ★★ | ★★ sandbox/approval | **lean** |
| Grok Build | ★★ | ★★ (8 parallel) | ? MCP unconfirmed | ★★ | ★★★ `/goal` verify-loop | mid |
| Cursor | ★★ plan | ★★ | ★★★ | ★★ | ★★ | varies |
| Amp | ★★ | ★★★ | ★★ | ★ | ★★ | mid |
| Factory Droids | ★★★ (CI/deploy) | ★★ | ★★ scoped MCP | ★ | ★★ | mid |
| Gemini CLI | ★★ plan mode | ★★ | ★★ | ★★ | ★ | low (⚠ sunsetting) |
| OpenCode | ★★ (w/ omo) | ★★ (w/ omo) | ★★ | ★ | ★ | low/OSS |
| Aider | ★ | ✗ | ★ | ✗ | ★ | low |

`★` = relative strength for *this* lens, not absolute quality. `?` = unverified.

---

## 4. Cross-cutting facts

- **`SKILL.md` is now a universal standard** — the same skill files work across Claude Code,
  Cursor, Gemini CLI, Codex CLI, and Antigravity. Skills portability is largely a solved,
  shared layer; the differentiation is in *orchestration + verification*.
- **The field's own bet:** the harness builders (Amp, Factory, Cursor, etc.) are explicitly
  wagering that **orchestration, not raw model weight**, is where value accrues next.

---

## 5. Where to track this on an ongoing basis

| Source | What it tracks | Cadence |
|---|---|---|
| **Artificial Analysis — Coding Agent Index** (`artificialanalysis.ai/agents/coding-agents`) | Model **+ harness** stacks; composite of DeepSWE, Terminal-Bench v2, SWE-Atlas-QnA; tokens, cache hits, $/task | The key one for your question |
| **Terminal-Bench 2.x leaderboard** (`llm-stats.com/benchmarks/terminal-bench-2`, codingfleet) | Agentic terminal autonomy (multi-step, explore→run→validate) | Updated regularly |
| **SWE-bench Verified / Pro leaderboards** (marc0.dev, morphllm) | Code-fix task success | Monthly |
| **SlopCodeBench** (arXiv) | **Long-horizon degradation** over iterative tasks — closest to your "iterate until success" concern | Research, periodic |
| **Kilo live leaderboard** (`kilo.ai/leaderboard`) | Live coding-model ranking | Live |

**Recommendation:** anchor on the **Artificial Analysis Coding Agent Index** as the primary
dial, cross-check **Terminal-Bench** for autonomy/iteration and **SlopCodeBench** for
long-horizon stability, and re-confirm any single number against the live page before relying
on it — this space moves monthly.

---

## 6. Confidence & caveats

- Per-harness orchestration features (subagents, plan mode, MCP, verify-loops): **high
  confidence** — corroborated across vendor docs + multiple write-ups.
- Specific benchmark **numbers** and the 26-pt / 32× swing figures: **medium confidence** —
  came via search-result summaries of aggregator blogs; primary index pages blocked automated
  fetch during research. Directionally consistent across sources, but verify exact values.
- Grok Build **MCP** support: **unverified** — not found in sources.
- Gemini CLI → Antigravity **migration (June 18 2026)**: reported; confirm current status.
