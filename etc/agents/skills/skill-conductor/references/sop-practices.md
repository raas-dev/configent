# Authoring Principles — the canon of 10 principles

> For eighty years humanity has been learning to effectively "prompt" people into following procedures. The SOP tradition (US military, aviation, energy, McDonald's 600+ page operations manual) gives us a ready-made set of practices. Here they are distilled into **10 canonical principles for authoring skills**.

## When to use this reference

**Golden rule: open this SOP before writing or reviewing ANY skill.** The canon below is universal — it applies to every class of skill (tool, capability, procedure).

Apply principles 1-10 always. The sections at the end (**Deep procedural methodology**: SOP Format Selection, the 7-step process, the procedural-skill checklist) are for **procedural** skills: processing a support ticket, producing a price quote, onboarding, incident escalation, a weekly report. For skills built around a tool (PDF, Google Ads API, Figma export) also see `patterns.md`.

---

## Principle #1: Pre-flight check

**SOP:** steps that can't be performed with the available equipment will be worked around. "Do X with tool Y" — if Y is broken, the operator invents a substitute themselves. Hopefully the right one.

The skill's first command is a runtime check: required tools are installed, env variables are present, required files exist. **If something is missing → do NOT continue; tell the user immediately** what's missing and where to get it.

| SOP | Skill |
|---|---|
| "check pressure with the gauge" | "check status via `gh pr status`" — but what if `gh` isn't installed? |
| "log it in the register in room 3" | "save to the vault" — but what if the vault isn't available in this session? |
| "pump it through line Y" | "install the package via `npm install`" — but what if it's a cloud agent with no internet? |

The pre-flight block itself (tools/env/files checks) **goes into `references/`, not inline in SKILL.md** — see principle #9. SKILL.md keeps only a pointer line: "before working, run pre-flight → references/runtime-setup.md".

```markdown
## Runtime requirements (pre-flight)

**Required:**
- `uv` is installed and available
- the required key is present in env (check: `echo "${SOME_KEY:-MISSING}" | head -c 5`)
- the required workspace file exists

**If anything is missing — do NOT continue.** Tell the user what's missing and where to get it.
```

Without pre-flight, everything below "gets worked around in its own way".

---

## Principle #2: Don't describe the top-level process in the description

A skill is a **lens/capability**, not a multi-step workflow. The description states WHAT it is and WHEN to trigger it, but not HOW (the steps live in the body). If the process is baked into the description, the model will "execute the description" and never read the body.

### The canonical description formula

```
[What it does] + Use when [4-5 natural phrasing variations users actually say]
+ "even if they don't explicitly say '<canonical term>'" + Do NOT use for [negatives]
```

This is the one place the formula lives — everything else points here.

Slot 3 is the **pushy clause**, and it's the slot authors skip. Models systematically *undertrigger* skills: they don't reach for one that would have helped. Anthropic's own skill-creator guidance is to make descriptions "a little bit pushy" for exactly this reason — an explicit "even if they don't explicitly say X" forces the agent to consider the skill on phrasings that miss the canonical term. Users say "make this deck less ugly", not "apply the presentation-design skill".

Slot 2 needs 4-5 variations, not one: formal, casual, symptom-first ("my table looks broken"), file-type ("I have a .fig"), and the domain jargon. One phrasing covers one way of asking.

```markdown
# GOOD: purpose + phrasing variations + pushy clause + negatives
description: Analyze Figma design files for developer handoff. Use when the user
uploads a .fig file, asks for design specs, asks how to build a screen from a
mockup, wants tokens/spacing/colors pulled out of a design, or asks what a
component should look like in code — even if they don't explicitly say
"handoff". Do NOT use for Sketch or Adobe XD.

# BAD: process in the description (the agent skips the body)
description: Exports Figma assets, then generates specs, then creates Linear
tasks, then posts to Slack...
```

Process markers in the description (auto-flagged in `eval_skill.py`): `then`, `first…then`, `step N`, `phase N`, `followed by`, `after …ing`.

---

## Principle #3: MOC it! — SKILL.md = a map, not a process

**SKILL.md is a table of contents (Map-of-Content), not the place for all the text.** The body shows *where to look* — short anchor sections with links to the SOP/references where the detailed procedure lives. The golden rule: "open the SOP first".

| Bad | Good |
|---|---|
| 400 lines of prose, the whole process inline | Overview + a map of sections + links to `references/*.md` |
| every step's detail right in SKILL.md | one anchor paragraph + `→ references/step-details.md` |
| pre-flight bash block inline | pointer line `→ references/runtime-setup.md` |

Sign of a violation: the SKILL.md body swells toward the limit (500 lines), few headers relative to the volume of text. The fix is to move detail into `references/` and replace it with a link. Progressive disclosure only works if SKILL.md is a navigator, not a dumping ground.

---

## Principle #4: The author = a fresh practitioner

**Toyota:** the instruction is written by whoever **just did the work** — their memory of the dead ends, the confusion, the non-obvious arguments is still fresh. A manager from the office will miss the key points.

A skill written "from memory" or "from the head" about how it was done six months ago **systematically misses 30-40% of the real edge cases**. Symptoms:

- the author can't name a concrete last-week case where the skill would have helped
- the skill has no real-life example at all (only synthetic "Acme Corp" ones)
- the "Common mistakes" sections are empty or abstract

### Workflow

1. **Before writing** — do the task by hand from start to finish. Once. With a fresh run.
2. **Take notes as you go** — where you paused, where you doubted, where you went to Google, where you made a mistake and rolled it back.
3. **After 24 hours** — reread the notes. What seemed "obvious" in the moment of doing the work is most often the hidden knowledge that needs to be surfaced into the skill.
4. **Only then write SKILL.md.** Turn the notes into steps + key points + why.

---

## Principle #5: TWI — "step → key point → why"

**Toyota Industries Training Within Industry** teaches: without an explanation of "why", a step gets skipped at the first inconvenience.

- With a person: resistance to the instruction, "this is bureaucracy, I know better".
- With a model: quiet improvisation. The instruction is followed nominally, the edge case is handled "in its own way".

### Structure of a step

| Layer | What | Example |
|---|---|---|
| **Step** | What to do | "Copy the prices from prices-list.md, don't round them" |
| **Key point** | What to watch for | "Every price must keep its cents. $1,234.56 ≠ $1,235." |
| **Why** | Why it matters | "Rounding breaks customer trust: they'll reconcile the total in Excel and see a discrepancy. One such case once cost a $12K deal lost to a rounding error." |

Long? Yes. But it's exactly the "why" that blocks the model's quiet improvisation on edge cases.

### Sub-practice: 5 Whys — down to the root

**Toyota Five Whys:** when formulating the "why", **ask "why" 5 times** — you'll reach the root.

"Why must the quote keep its cents without rounding?"
1. So the customer can reconcile the total
2. Why reconcile? They copy it into their own Excel
3. Why into Excel? To sign off with their CFO
4. Why doesn't the CFO trust it? They once found a discrepancy
5. Why was there a discrepancy? Someone rounded it "to look nice"

**Conclusion:** the "don't round" rule protects not "table aesthetics" but **trust in the vendor across the next 10 projects**. Don't stop at the first answer — dig down to the business effect, then the model understands the **class of situations** where the rule is critical.

---

## Principle #6: The blind-agent test (optional, for major changes)

**SOP:** an expert automatically fills in the gaps from experience **and doesn't notice it**. That's why SOPs are tested on a novice — someone unfamiliar with the process.

### Pattern Agent A / Agent B

Split writing and execution into two sessions:

| Session | Context | Task |
|---|---|---|
| **Agent A (writer)** | knows the domain, writes the skill | create SKILL.md + references |
| **Agent B (executor)** | fresh session, no domain, skill is active | execute a test case |

**You observe the gap** between "what Agent A meant" and "what Agent B actually did". Each gap is a found omission in the instruction.

### Where the gap most often appears

1. **Implicit knowledge.** "Take the latest price list" — which "latest"? By date? By name? By git history?
2. **Unnamed sources.** "Contacts from about.md" — but what if about.md doesn't exist? Agent A would reach into memory, Agent B will make it up.
3. **Fuzzy exit conditions.** "When the quote is ready — send it" — what does "ready" mean?

In `skill-conductor` this is built in: Mode 1 Step 6 (Eval Loop) spawns an executor subagent **in a clean session**. Reinforcement: periodically run the skill yourself, in a clean session without your own vault — if it breaks, you baked in assumptions you didn't surface into the text.

---

## Principle #7: Checklists at the point of use

**SOP axiom:** in complex processes, errors come not from ignorance but from **skipping known critical steps**. The fix is a short checklist **at the moment of risk** — not in a general section at the end of the document.

Progressive disclosure makes it worse: the model may not read down to the "Checklists" section at the end of SKILL.md. Solutions:

1. **Inline checklists right inside the step.** Not "see the Quality section" — a list of 3-5 items next to the risk step.
2. **Programmatic validation = tool-based check.** If a step can be checked deterministically (regex, JSON schema, exit code) — move it into `scripts/`. The analog of "checking with the gauge" — don't leave it to the eye.
3. **Pre-flight check at the start** (see principle #1) — the analog of mise en place.

```markdown
## Step 3: Build the quote

**Before drafting, verify (inline checklist):**
- [ ] customer contacts come from about.md, not invented
- [ ] prices come from prices-{region}.md, none rounded
- [ ] tax applied per region

[steps follow]
```

Anti-pattern: steps at the top, "Quality control" as a separate section at the end. The model will run the steps and **never reach QA**.

---

## Principle #8: One term = one word

You picked "template" — then it's "template" everywhere, not a mix of "template / boilerplate / scaffold / shell". Synonyms for one concept force the model to guess whether it's the same object or a different one.

| Bad | Good |
|---|---|
| template / boilerplate / scaffold mixed together | picked `template` — use it everywhere |
| "price / price list / price sheet / rate card" | one term across the whole skill |

Introduce a 1-line-per-term glossary if there are many. Don't breed extra synonyms.

---

## Principle #9: Get rid of the excess

Two parts: remove useless text and move out secrets.

### 9a. All env / keys / passwords — out of SKILL.md

SKILL.md **must not contain** keys, passwords, tokens, env values, or hardcoded user paths (`/home/<user>`, `/Users/<user>`). It's both a leak risk (the skill is public) and a violation of the map (principle #3).

| Bad (in SKILL.md) | Good |
|---|---|
| `export API_KEY=sk-abc123` | a reference to env: "needs `API_KEY` in the environment, see references/runtime-setup.md" |
| `UV_BIN=/home/alice/.local/bin/uv` | `command -v uv` or `~/.local/bin/uv` in a reference |
| inline pre-flight bash block | `→ references/runtime-setup.md` |

`eval_skill.py` scans SKILL.md for these patterns and flags them.

### 9b. Useless text and weasel words

"Write clearly and understandably" is a useless instruction — it changes nothing in the model's behavior. Remove it. The words **"periodically", "regularly", "typically", "usually", "as needed", "when possible"** make an instruction unmeasurable — replace them with a concrete condition.

| Rubbery | Concrete |
|---|---|
| "check regularly" | "check once an hour / on every new ticket" |
| "usually 3 iterations are enough" | "at most 3 iterations, escalate after the third" |
| "load as needed" | "if prices.md isn't loaded — load it" |

Token budget: often <200 words, the standard is <500 lines of body, heavy material goes into `references/`. No README/CHANGELOG inside the skill.

### Sub-practice: one step — one action, no negations

Write steps as an **imperative with a single verb**. Long sentences with conditions ("do X, unless Y, except when Z") get interpreted by the model however it likes.

| Bad | Good |
|---|---|
| "avoid long prompts" | "prompt length no more than 200 words" |
| "don't forget to check the contacts" | "Check: contacts match about.md" |
| "don't use stale data" | "Use data no older than 7 days" |

**Rule:** imperative + measurable criterion. No "don't" if it can be phrased as "what to do".

### Sub-practice: two tests before you keep a section

Run both over every section of the draft. Whatever fails goes to `references/` or gets deleted.

| Test | How to apply |
|---|---|
| **Actionability** | "Does this paragraph change at least one agent action?" If no — move it to references or delete it. Measured across public skills, more than 60% of skill-body text changes no model behavior at all (SkillReducer, arXiv 2603.29919). |
| **E:A:R scan** | Mark each section **Expert** (the model doesn't know this — the skill's value), **Activation** (it knows, but a short reminder helps) or **Redundant** (it definitely knows this — delete). Target ratio: >70% Expert, <20% Activation, <10% Redundant (softaworks skill-judge). |

---

## Principle #10: Match the form to the failure

**Before writing a rule, classify the baseline failure.** The form that bulletproofs one failure type measurably backfires on another — the form follows from the failure type, not from taste.

| Baseline failure | Right form | Wrong form |
|---|---|---|
| Skips/violates a rule under pressure (knows better, does it anyway) | Prohibition + a rationalization table + red flags | Soft guidance ("prefer…", "consider…") |
| Complies, but the output has the wrong shape (bloated prompt, buried verdict, restated spec) | Positive recipe or contract: state what the output IS — its parts, in order | Prohibition list ("don't restate", "never narrate") |
| Omits a required element from something it already produces | Structural: a REQUIRED field or slot in the template it fills in | Prose reminders near the template |
| Behavior should depend on a condition | Conditional keyed to an observable predicate ("if the brief exists, reference it") | Unconditional rule + exemption clauses |

### Why prohibitions backfire on shaping problems

Under a competing incentive ("make the prompt self-contained"), agents **negotiate** with "don't X". In head-to-head wording tests on dispatch-prompt guidance the prohibition arm produced clearly more of the unwanted content than the recipe arm (fully separated distributions), and trended worse than even the no-guidance control. A recipe leaves nothing to negotiate: the output either matches the stated shape or it doesn't.

That is not a verdict against negative rules as such. In **Guardrails Beat Guidance** (arXiv 2604.11088, 5000+ Claude Code runs on SWE-bench) the rules that individually helped were almost all negative constraints, and the rules that individually hurt were almost all positive directives. Both results hold at once: **polarity is picked by failure type, not by dogma.** Discipline failure → prohibition. Wrong-shape failure → recipe. Micro-test your own case instead of assuming.

### Two rules on top of whichever form you pick

**No nuance clauses.** "Don't X unless it matters" reopens the negotiation — appending a single nuance clause to a winning recipe degraded it from consistent to noisy in the same wording tests. Express a real exception as its own conditional on an observable predicate.

**Exemption clauses don't scope.** "This limit doesn't apply to code blocks" still suppresses code blocks. If part of the output must be exempt, restructure so the rule can't reach it.

---

## Deep procedural methodology (for procedural skills)

### SOP Format Selection (from the Penn State guide)

Choose the format along two axes: number of decisions and number of steps.

| Decisions | Steps | Format | Analog in skills |
|---|---|---|---|
| few | fewer than 10 | Simple Steps | Linear numbered list in SKILL.md |
| few | more than 10 | Hierarchical Steps | Top-level steps + sub-steps |
| many | fewer than 10 | Flowchart | Decision tree (mermaid or a table) |
| many | more than 10 | Flowchart + sub-SOP | SKILL.md with a decision tree + references/*.md |

**Hierarchical** is the default for business procedures. **Flowchart** — when there's branching; in skills it's a "situation → action" table:

| Situation | Action |
|---|---|
| budget under 5K, region A | standard quote per prices-region-a.md |
| budget 5K+, region A | quote + sign-off with the account lead |
| region not among the 4 base ones | escalate to the director |
| tender | analyst research BEFORE the quote |

### SOP Development Process — 7 steps (adaptation)

| Penn State step | Skill-conductor mapping |
|---|---|
| 1. Plan for Results | Mode 1 Step 1: Capture Intent |
| 2. First Draft | Mode 1 Step 4-5: Scaffold + Write |
| 3. Internal Review | Mode 1 Step 7: edits from the user |
| 4. External Review | Mode 4 REVIEW — third-party reviewer checklist |
| 5. Testing | Mode 1 Step 6: Eval Loop with an executor (a novice) |
| 6. Post | Mode 6 PACKAGE — .skill bundle |
| 7. Train | inside SKILL.md itself — the "why" in every step |

The most often skipped is **Step 7 (Train)**: Penn State explicitly says *share why, not just what*. Training isn't a separate stage after writing — it's part of the document; every step carries a mini-explanation of "why exactly this way".

### Procedural-skill checklist before packaging

In addition to the standard REVIEW checklist (Mode 4):

- [ ] Pre-flight check (#1) — which env/files/tools must be ready
- [ ] SKILL.md = a map (#3) — detail in references, not inline
- [ ] Every critical step = TWI structure (#5: what / key point / why)
- [ ] Inline checklists at the risk points (#7), not in a general section at the end
- [ ] Programmatic validation for everything that can be checked deterministically (in scripts/)
- [ ] One term per concept (#8)
- [ ] No env/keys/paths in SKILL.md (#9a)
- [ ] Imperatives without negations, no rubbery modal words (#9b)
- [ ] Decision tree for processes with branching (more than 2 decisions)
- [ ] Novice test (#6) — executor in a clean session without its own context, skill worked
- [ ] 5 Whys done for the main rules — the explanation reaches the business effect

---

## Sources

- Penn State Extension — "Standard Operating Procedures: A Writing Guide" (Richard Stup) — https://extension.psu.edu/standard-operating-procedures-a-writing-guide
- Wieringa, Moore, Barnes — "Procedure Writing: Principles and Practices" (Battelle Press, 1998)
- Toyota TWI (Training Within Industry) — the "Job Instruction" methodology
- McDonald's Operations Manual — the canonical example of a 600+ page SOP system for a franchise
- anthropics/skills — `skill-creator` skill, the "pushy" description recommendation against undertriggering — https://github.com/anthropics/skills
- obra/superpowers — `writing-skills` skill, "Match the Form to the Failure" and the wording tests behind it — https://github.com/obra/superpowers
- softaworks/agent-toolkit — `skill-judge` skill, the Expert / Activation / Redundant taxonomy and the E:A:R ratio — https://github.com/softaworks/agent-toolkit
- "Guardrails Beat Guidance" — arXiv 2604.11088 — 5000+ Claude Code runs on SWE-bench; negative constraints vs positive directives
- "SkillReducer" — arXiv 2603.29919 — >60% of public skill-body text changes no model behavior
