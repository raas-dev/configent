# Workflow: Vanilla Project (Minimal/No Documentation)

**Use this workflow when**: The project has no README or minimal documentation, no constitution files, and appears undocumented.

**Estimated Time**: 15-25 minutes

**Output Files**:
- `.onboard/overview.md`
- `.onboard/architecture.md`
- `.onboard/design_suggestions.md`
- `.onboard/guardrail_suggestions.md`
- `.onboard/agent_constitution.md`
- `./AGENTS.md` (root)
- `./[frontend-dir]/AGENTS.md` (if applicable)
- `./[backend-dir]/AGENTS.md` (if applicable)

---

## Phase 1: Project Discovery (Deep Analysis Required)

Since documentation is minimal, perform exhaustive code analysis:

### 1.1 Root Structure Analysis
- List all directories at root level
- Identify project type from structure and files
- Check for config files (package.json, requirements.txt, pom.xml, go.mod, Cargo.toml)
- Infer project name from directory name or config files

### 1.2 Technology Detection
- Scan for programming languages (file extensions)
- Identify frameworks from imports and configs
- List all dependencies from package managers
- Detect build tools and task runners

### 1.3 Entry Points Discovery
Use aggressive search for main files:
- `file_search`: `**/main.*`, `**/index.*`, `**/app.*`, `**/server.*`, `**/__init__.py`
- `grep_search`: `if __name__ == "__main__"`, `def main(`, `app.listen`, `http.createServer`

### 1.4 Feature Extraction
Since no docs exist, must discover features from code:
- `semantic_search`: "main functionality", "core feature", "business logic", "user flow"
- `grep_search`: `route|@app|@router|@RestController|@Controller|endpoint`
- Analyze file/directory names for domain concepts

### 1.5 Project Purpose Inference
Deduce purpose from:
- Directory structure (e-commerce, blog, API, tool, library?)
- Domain models and entities
- API endpoints or CLI commands
- UI pages or components

**Generate**: `.onboard/overview.md` with:
- Inferred project purpose and type
- Complete folder structure analysis
- All discovered features with evidence
- Technology stack summary
- Entry points
- "⚠️ Note: Documentation was minimal - this analysis is based on code inspection"

---

## Phase 2: Architecture Analysis (Bottom-Up Discovery)

Must discover architecture from code patterns:

### 2.1 Technology Stack (Comprehensive)
- List all dependencies with versions and purposes
- Identify database from imports or configs
- Detect caching, queuing, external services
- Note frontend/backend split if applicable

### 2.2 Architecture Pattern Recognition
Look for evidence of patterns:
- Check directory structure (controllers/, services/, repositories/, models/)
- `grep_search` for pattern indicators: `class.*Controller`, `class.*Service`, `class.*Repository`
- `semantic_search`: "architecture pattern", "design pattern", "layered"

### 2.3 Data Flow Mapping
Trace request/data flow:
- Entry point → routing → business logic → data access
- Identify middleware/interceptors
- Map error handling approach

**Generate**: `.onboard/architecture.md` with:
- Complete technology stack
- Discovered architectural style
- Design patterns in use
- Data flow diagrams
- Configuration approach
- "⚠️ Note: Architecture inferred from code structure - may benefit from team validation"

---

## Phase 3: Design Assessment (Discovery + Analysis)

### 3.1 Pattern Discovery
Identify actual patterns used:
- Common code structures
- Repeated idioms
- Standard approaches

### 3.2 Anti-Pattern Detection
Look for code smells:
- `semantic_search`: "TODO", "FIXME", "HACK", "XXX", "deprecated"
- Large files (>500 lines)
- Deep nesting
- Circular dependencies

### 3.3 Dependency Analysis
- Check for outdated dependencies
- Security vulnerabilities
- Unused dependencies

**Generate**: `.onboard/design_suggestions.md` with:
- Discovered patterns (positives first)
- Code smells and technical debt
- Refactoring opportunities
- Dependency updates needed
- Prioritized action items

---

## Phase 4: Quality & Automation Review

### 4.1 Testing Analysis
Check for any tests:
- `file_search`: `**/test_*`, `**/*.test.*`, `**/*.spec.*`, `**/tests/**`
- If tests exist: analyze coverage and quality
- If no tests: Propose complete testing strategy

### 4.2 CI/CD Detection
- `file_search`: `.github/workflows/*`, `.gitlab-ci.yml`, `Jenkinsfile`, `.circleci/*`
- If CI exists: evaluate maturity
- If no CI: Propose complete CI/CD setup

**Generate**: `.onboard/guardrail_suggestions.md` with:
- Testing gaps (likely extensive)
- Complete testing setup recommendations
- CI/CD recommendations from scratch
- Quality gates to implement

---

## Phase 5: Agent Constitution Creation (From Scratch)

Since no existing guidelines, create comprehensive AGENTS.md from discovered patterns:

### 5.1 No Existing Constitution Check

Confirm no constitution files exist using `file_search`:
- `**/AGENTS.md`
- `**/.cursorrules`
- `**/CONTRIBUTING.md`
- `**/.github/CONSTITUTION.md`
- Linter configs

### 5.2 Extract Coding Patterns
From code analysis, identify:
- Naming conventions actually used
- Code organization approach
- Error handling patterns observed
- Common practices

### 5.3 Infer Coding Standards
- Check for linter configs (.eslintrc, .pylintrc, etc.)
- Analyze code formatting consistency
- Identify testing patterns if tests exist

### 5.4 Generate Root AGENTS.md
Use template: [../../templates/root-agents-template.md](../../templates/root-agents-template.md)

Populate with:
- Discovered project context
- Inferred coding standards
- Observed patterns ("Pattern seen in codebase")
- Recommended practices (filling gaps)
- Mark status as "Generated from code analysis"

### 5.5 Generate Frontend AGENTS.md (if applicable)
If frontend directory exists:
- Extract design tokens from theme files
- Analyze component patterns
- Document UI library usage
- Use template: [../../templates/frontend-agents-template.md](../../templates/frontend-agents-template.md)

### 5.6 Generate Backend AGENTS.md (if applicable)
If backend directory exists:
- Document API patterns found
- Extract data handling approaches
- Note security measures observed
- Use template: [../../templates/backend-agents-template.md](../../templates/backend-agents-template.md)

### 5.7 Add Disclaimer
Add to each generated AGENTS.md:
```markdown
> ⚠️ **Note**: This constitution was auto-generated from code analysis.
> Please review and update with team-specific conventions.
> Generated on: [date]
```

**Generate**:
- `./AGENTS.md`
- `./[frontend]/AGENTS.md` (if applicable)
- `./[backend]/AGENTS.md` (if applicable)
- `.onboard/agent_constitution.md` (summary)

---

## Completion Summary

Provide comprehensive summary:

```
✅ Brownfield onboarding complete for vanilla project!

📊 Project Analysis:
- Project Type: [inferred type]
- Languages: [list]
- Architecture: [discovered pattern]
- Documentation Status: Minimal (now documented)

📝 Generated Documentation:
✓ .onboard/overview.md (Project structure and features - CODE-INFERRED)
✓ .onboard/architecture.md (Technical stack and architecture - CODE-INFERRED)
✓ .onboard/design_suggestions.md (Design improvements)
✓ .onboard/guardrail_suggestions.md (Testing and CI/CD recommendations)
✓ .onboard/agent_constitution.md (Constitution generation summary)

🤖 Generated AI Agent Constitutions:
✓ ./AGENTS.md (Root project constitution - from code analysis)
[✓ ./[frontend]/AGENTS.md (Frontend guidelines - from code analysis)]
[✓ ./[backend]/AGENTS.md (Backend guidelines - from code analysis)]

⚠️  Important: This project had minimal documentation. The generated documents
are based on code analysis and may need validation by the development team.

📋 Recommended Next Steps:
1. Review generated documentation for accuracy
2. Add project purpose/domain context to overview.md
3. Validate architecture interpretation in architecture.md
4. Review and customize AGENTS.md with team-specific conventions
5. Begin implementing testing strategy from guardrail_suggestions.md
```

---

## Special Considerations for Vanilla Projects

### Challenge: Ambiguous Project Purpose
- Analyze domain models for clues
- Check for external API integrations
- Look at UI/endpoint names
- If still unclear: Document as "Purpose unclear - requires team input"

### Challenge: Unknown Architecture
- Don't force-fit into known patterns
- Describe as observed
- Note if architecture seems ad-hoc or inconsistent

### Challenge: No Coding Standards
- Document actual practices seen
- Suggest standards based on language/framework best practices
- Mark as recommendations, not rules

### Challenge: Legacy or Mixed Patterns
- Document multiple patterns if project is inconsistent
- Note technical debt and evolution path
- Don't criticize - be descriptive and constructive

---

## Validation Checklist

- [ ] Project purpose identified or marked as needing clarification
- [ ] All major directories analyzed and documented
- [ ] Entry points discovered and documented
- [ ] Technology stack completely identified
- [ ] Architectural style described (even if ad-hoc)
- [ ] All phases completed
- [ ] AGENTS.md files are comprehensive
- [ ] Disclaimers added about code-inferred content
- [ ] Next steps provided to user
