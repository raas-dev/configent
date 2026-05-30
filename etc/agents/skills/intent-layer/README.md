# intent-layer

Set up hierarchical AGENTS.md infrastructure so agents navigate codebases like senior engineers.

## What It Does

Creates an Intent Layer for your codebase:
- Root context file (AGENTS.md or CLAUDE.md)
- Child AGENTS.md in complex subdirectories
- Scripts to measure, analyze, and maintain the hierarchy

## Installation

```bash
npx skills add crafter-station/skills --skill intent-layer -g
```

## Usage

Ask Claude to set up the Intent Layer:

```
"Set up AGENTS.md for this project"
```

```
"Add intent layer infrastructure"
```

Claude will:
1. Detect current state (none/partial/complete)
2. Analyze directory structure and token counts
3. Ask whether to use CLAUDE.md or AGENTS.md at root
4. Generate hierarchical context files
5. Add child nodes for complex subsystems (>20k tokens)

## When to Use

Use intent-layer when:
- Starting a new project that needs agent-friendly context
- Existing codebase where agents struggle to understand structure
- Onboarding engineers faster with hierarchical docs
- Building multi-agent systems that need to navigate code

## Core Principle

**Only ONE root context file.** CLAUDE.md and AGENTS.md should NOT coexist at project root.

Child AGENTS.md files in subdirectories are encouraged for:
- Directories with >20k tokens
- Responsibility boundaries
- Complex subsystems with hidden contracts

## Workflow

1. **Detect** - Check if Intent Layer exists
2. **Measure** - Analyze structure and estimate tokens
3. **Decide** - Choose root file type and child node locations
4. **Execute** - Generate templates with proper structure
5. **Maintain** - Audit nodes and find new candidates

## Included Scripts

- `detect_state.sh` - Check Intent Layer state
- `analyze_structure.sh` - Find semantic boundaries
- `estimate_tokens.sh` - Measure directory complexity

## Included References

- `templates.md` - Root and child node templates
- `node-examples.md` - Real-world examples
- `capture-protocol.md` - SME interview questions

## Examples

Projects using Intent Layer:
- [crafter-code](https://github.com/crafter-station/crafter-code) - Multi-agent IDE
- [elements](https://github.com/crafter-station/elements) - Full-stack components

## Credits

Built by [Railly Hugo](https://railly.dev) for [Crafter Station](https://crafterstation.com).

Built on [The Intent Layer](https://www.intent-systems.com/learn/intent-layer) by Tyler Brandt. His [AI Adoption Roadmap](https://www.intent-systems.com/learn/ai-adoption-roadmap) maps the stages most teams are stuck at.

Context engineering framework from [DAIR.AI](https://www.promptingguide.ai) and [LangChain](https://blog.langchain.com/the-rise-of-context-engineering/).
