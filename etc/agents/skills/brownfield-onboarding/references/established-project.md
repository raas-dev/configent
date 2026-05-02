# Workflow: Established Project (Good Docs, Existing Constitutions)

**Use this workflow when**: The project has comprehensive documentation, constitution files (.cursorrules, CONTRIBUTING.md, etc.), but no AGENTS.md files.

**Estimated Time**: 10-15 minutes

**Output Files**:
- `.onboard/overview.md`
- `.onboard/architecture.md`
- `.onboard/design_suggestions.md`
- `.onboard/guardrail_suggestions.md`
- `.onboard/agent_constitution.md`
- `./AGENTS.md` (synthesized from existing constitutions)
- `./[frontend-dir]/AGENTS.md` (if applicable)
- `./[backend-dir]/AGENTS.md` (if applicable)

---

## Pre-Phase: Constitution & Documentation Discovery

### Identify All Constitution Files

Use `file_search` to find existing project guidelines:
- `**/.cursorrules`
- `**/CONTRIBUTING.md`
- `**/.github/CONSTITUTION.md`
- `**/CODE_OF_CONDUCT.md`
- `**/STYLE_GUIDE.md`
- `**/ARCHITECTURE.md`
- Linter configs: `.eslintrc*`, `.prettierrc*`, `.pylintrc`, etc.

### Read Existing Constitutions
For each found file:
- Read complete content
- Extract coding principles
- Note branching strategy
- Identify code review process
- Extract testing requirements
- Note security guidelines

### Inventory Existing Documentation
- README.md quality and completeness
- docs/ directory structure
- API documentation (Swagger, OpenAPI, etc.)
- Architecture decision records (ADRs)
- Wiki or Confluence links

---

## Phase 1: Project Discovery (Quick Validation)

### 1.1 Validate Existing Documentation
- Read existing docs
- Cross-reference with actual code
- Note areas where docs are accurate
- Flag outdated information

### 1.2 Minimal Gap Filling
Only focus on:
- Undocumented features (rare in this scenario)
- Recent changes not yet documented
- Internal details not in user-facing docs

**Generate**: `.onboard/overview.md` with:
- Reference existing comprehensive docs
- Validation notes (docs accuracy: high/medium)
- Minor gaps filled
- Note: "Project has comprehensive existing documentation"

---

## Phase 2: Architecture Analysis (Complement Existing)

### 2.1 Review Existing Architecture Docs
- Read ARCHITECTURE.md if exists
- Review ADRs if present
- Check diagrams in docs/

### 2.2 Validate and Enhance
- Confirm architecture claims with code
- Add runtime/operational details often missing from docs
- Note recent architectural changes

**Generate**: `.onboard/architecture.md` with:
- Reference to existing architecture docs
- Runtime behavior analysis
- Operational considerations
- Validation notes
- Updates to existing docs (if needed)

---

## Phase 3: Design Assessment (Limited Scope)

### 3.1 Quick Quality Check
Since project is established:
- Focus on incremental improvements
- Check for recent technical debt
- Validate patterns against documented standards

### 3.2 Consistency Check
- Are documented patterns actually followed?
- Any drift from established guidelines?

**Generate**: `.onboard/design_suggestions.md` with:
- Minimal findings (project likely healthy)
- Consistency validation
- Minor improvement opportunities
- Suggestions for documentation updates

---

## Phase 4: Quality & Automation Review (Validation Focus)

### 4.1 Validate Existing Testing
Established projects likely have tests:
- Assess coverage (likely good)
- Check test documentation
- Suggest minor improvements

### 4.2 Validate CI/CD
Likely has mature CI/CD:
- Assess pipeline completeness
- Suggest optimizations
- Check for best practices

**Generate**: `.onboard/guardrail_suggestions.md` with:
- Current state validation (likely mature)
- Minor enhancement suggestions
- Best practice recommendations
- Optimization opportunities

---

## Phase 5: Agent Constitution Synthesis (Non-Destructive)

**CRITICAL**: This is the main value for established projects - synthesizing existing guidelines into AI-agent-friendly format.

### 5.1 Comprehensive Constitution Inventory

Read and analyze ALL found constitution files:

```markdown
Found constitutions:
- CONTRIBUTING.md: [git workflow, PR process]
- .cursorrules: [VSCode/Cursor specific rules]
- CODE_OF_CONDUCT.md: [community guidelines]
- docs/STYLE_GUIDE.md: [coding style]
- .github/pull_request_template.md: [PR requirements]
```

### 5.2 Extract Rules and Principles

From CONTRIBUTING.md, extract:
- Branch naming conventions
- Commit message format
- PR requirements
- Code review process

From .cursorrules, extract:
- Editor-specific conventions
- Code formatting rules
- Linting requirements

From STYLE_GUIDE.md, extract:
- Language-specific conventions
- Naming conventions
- Code organization rules

From code analysis, extract:
- Actual patterns in use
- Testing patterns
- Error handling approaches

### 5.3 Synthesize Root AGENTS.md (Non-Destructive)

**Strategy**: Merge, don't replace

```markdown
# AI Agent Constitution - [Project Name]

> This file synthesizes project guidelines for AI agents.
> It respects and references existing constitution files.
> Last updated: [date]

## Existing Constitution Files

This project has the following guideline documents:
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution workflow and PR process
- [.cursorrules](./.cursorrules) - Editor-specific rules
- [docs/STYLE_GUIDE.md](./docs/STYLE_GUIDE.md) - Coding style guide

**Important**: Always review these files before making changes.

## Project Context

[Standard context from template]

## Coding Principles

### From STYLE_GUIDE.md
- [Extract and summarize key points]
- See full details: [STYLE_GUIDE.md](./docs/STYLE_GUIDE.md)

### From .cursorrules
- [Extract and summarize]

### Observed in Codebase
- [Additional patterns found in code]

## Git & Development Workflow

### From CONTRIBUTING.md
[Extract branch strategy, commit conventions, PR guidelines]

**For full contribution guidelines, see**: [CONTRIBUTING.md](./CONTRIBUTING.md)

## Testing Requirements

### From CONTRIBUTING.md and Code Analysis
- [Test requirements]
- [Coverage expectations]

## For AI Agents: Validation Checklist

When making changes, ensure:
- [ ] Follows CONTRIBUTING.md guidelines
- [ ] Adheres to STYLE_GUIDE.md conventions
- [ ] Respects .cursorrules specifications
- [ ] [Additional AI-specific checks]

---

## AI Agent Enhancements

### Additional Context for AI Agents
[Information not in existing docs but useful for AI agents:]
- Common patterns observed in codebase
- Error handling conventions
- Performance considerations
- Security patterns

### Quick Reference
[Synthesized cheat sheet from all constitution files]
```

### 5.4 Add Merge Comment

Add at the top of generated AGENTS.md:
```markdown
<!--
This AGENTS.md synthesizes existing project guidelines for AI agent consumption.
It does not replace existing documentation but complements it.
Existing constitution files remain the source of truth.
Generated by brownfield-onboarding on [date]
-->
```

### 5.5 Generate Frontend/Backend AGENTS.md (if applicable)

Same synthesis approach for subdirectories:
- Extract relevant guidelines from main constitutions
- Add directory-specific patterns
- Reference root AGENTS.md and main constitutions

### 5.6 No Modification of Existing Files

**CRITICAL RULE**: Do NOT modify existing constitution files:
- ❌ Don't edit CONTRIBUTING.md
- ❌ Don't edit .cursorrules
- ❌ Don't edit CODE_OF_CONDUCT.md
- ✅ Only create new AGENTS.md files
- ✅ Reference existing files extensively

**Generate**:
- `./AGENTS.md` (new, synthesized)
- `./[frontend]/AGENTS.md` (new, if applicable)
- `./[backend]/AGENTS.md` (new, if applicable)
- `.onboard/agent_constitution.md` (synthesis summary)

---

## Completion Summary

```
✅ Brownfield onboarding complete for established project!

📊 Project Status:
- Documentation: Comprehensive ✓
- Constitutions: Established ✓
- Testing: Mature ✓
- CI/CD: Mature ✓

📄 Existing Constitution Files Found:
✓ CONTRIBUTING.md
✓ .cursorrules
✓ docs/STYLE_GUIDE.md
[... list all found ...]

📝 Generated Documentation:
✓ .onboard/overview.md (Validation and minor gaps filled)
✓ .onboard/architecture.md (Validation and enhancements)
✓ .onboard/design_suggestions.md (Minor improvements)
✓ .onboard/guardrail_suggestions.md (Optimization suggestions)
✓ .onboard/agent_constitution.md (Synthesis summary)

🤖 Generated AI Agent Constitutions (NEW):
✓ ./AGENTS.md (Synthesized from existing guidelines)
[✓ ./[frontend]/AGENTS.md (Synthesized with frontend focus)]
[✓ ./[backend]/AGENTS.md (Synthesized with backend focus)]

✨ What Makes This Special:
The AGENTS.md files synthesize your existing comprehensive guidelines into
an AI-agent-friendly format WITHOUT modifying your established documentation.
All existing constitution files remain the authoritative source.

📋 Recommended Next Steps:
1. Review AGENTS.md for accuracy against existing constitutions
2. Share AGENTS.md with team for feedback
3. Consider minor updates to existing docs based on findings in:
   - .onboard/design_suggestions.md
   - .onboard/guardrail_suggestions.md
4. Add AGENTS.md to version control
5. Update onboarding docs to reference AGENTS.md for AI developers
```

---

## Special Considerations for Established Projects

### Respect Existing Authority
- Existing constitutions are authoritative
- AGENTS.md is derivative, not replacement
- Always reference source documents

### Resolve Conflicts
If existing documents conflict:
```markdown
### Conflicting Guidelines

Note: CONTRIBUTING.md specifies 2-space indentation, while .cursorrules
specifies 4-space. Code analysis shows 4-space is actually used.

**Recommendation**: Update CONTRIBUTING.md to match actual practice,
or enforce 2-space via automated formatting.

**For AI Agents**: Use 4-space (actual practice) until conflict resolved.
```

### Add Value, Don't Duplicate
AGENTS.md should add:
- Quick reference/cheat sheet format
- AI-specific validation checklists
- Synthesized view across multiple docs
- Observed patterns not formally documented

### Identify Documentation Drift
Note when docs don't match code:
```markdown
### Documentation vs. Reality

STYLE_GUIDE.md suggests feature-based organization, but codebase
uses layer-based organization. Consider updating guide or refactoring code.
```

---

## Validation Checklist

- [ ] All constitution files identified and read
- [ ] No existing constitution files modified
- [ ] AGENTS.md synthesizes (not replaces) existing docs
- [ ] All guidelines cross-referenced to source docs
- [ ] Conflicts identified and documented
- [ ] Documentation drift noted
- [ ] AI-specific enhancements added
- [ ] References back to authoritative sources included
- [ ] Team review recommended in summary
