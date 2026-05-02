# Workflow: Partial Documentation Project

**Use this workflow when**: The project has a README with basic info, but no constitution files or comprehensive documentation.

**Estimated Time**: 10-20 minutes

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

## Pre-Phase: Existing Documentation Review

### Review README
- Read existing README completely
- Extract documented information:
  - Project purpose and description
  - Installation instructions
  - Usage examples
  - Known features
  - Dependencies
- Note gaps and undocumented areas

### Check for Other Docs
- Look for docs/ or documentation/ directory
- Check for inline code comments
- Look for API documentation (Swagger, JSDoc, etc.)

---

## Phase 1: Project Discovery (Build Upon Existing)

### 1.1 Leverage README Content
- Use documented project purpose (don't re-discover)
- Reference documented features
- Build on documented entry points

### 1.2 Fill Documentation Gaps
Focus analysis on what's NOT documented:
- Undocumented directories and their purposes
- Features not mentioned in README
- Internal architecture not explained
- Hidden entry points or tools

### 1.3 Enhance Feature Understanding
- Expand on briefly mentioned features
- Discover features not in README
- Map feature locations in codebase

**Generate**: `.onboard/overview.md` with:
- Reference to existing README
- Enhanced feature descriptions
- Newly discovered features
- Complete folder structure (not just README's view)
- Note: "Built upon README.md documentation"

---

## Phase 2: Architecture Analysis (Complement Existing Docs)

### 2.1 Extract Stack Info from README
- Use documented technology stack
- Note documented infrastructure
- Build on dependency lists

### 2.2 Deep Dive on Undocumented Aspects
Focus on what README doesn't cover:
- Architectural patterns and principles
- Internal module organization
- Data flow and request handling
- Design pattern usage
- Configuration management details

### 2.3 Validate README Information
- Cross-check README claims with actual code
- Note discrepancies
- Update outdated information

**Generate**: `.onboard/architecture.md` with:
- Technology stack (from README + code verification)
- Architecture patterns (discovered)
- Design patterns in use
- Data flow (not typically in README)
- Note areas where code differs from README

---

## Phase 3: Design Assessment (Focused Analysis)

### 3.1 Pattern Identification
Since some structure is documented:
- Verify documented patterns are followed
- Identify undocumented patterns
- Check for consistency

### 3.2 Gap Analysis
- What's documented but not implemented well?
- What's implemented well but not documented?

### 3.3 Technical Debt
Look for:
- Code smells
- Outdated practices
- Areas flagged in TODOs/FIXMEs

**Generate**: `.onboard/design_suggestions.md` with:
- Pattern consistency assessment
- Documentation vs. reality gaps
- Improvement suggestions
- Update recommendations for README

---

## Phase 4: Quality & Automation Review

### 4.1 Testing Status
- Check if README mentions testing
- Find and analyze existing tests
- Identify test coverage gaps
- Assess test quality

### 4.2 CI/CD Status
- Check if README documents CI/CD
- Analyze existing pipelines
- Identify automation gaps

**Generate**: `.onboard/guardrail_suggestions.md` with:
- Current testing state (likely incomplete)
- Testing gaps to fill
- CI/CD improvements
- Link to any existing testing docs

---

## Phase 5: Agent Constitution Creation (New, but Context-Aware)

### 5.1 Check for Informal Guidelines
Even without formal constitutions, look for:
- Code comment conventions
- PR templates
- Issue templates
- CONTRIBUTING.md (even if brief)
- Code review guidelines in issues/PRs

### 5.2 Extract Coding Patterns
- README might mention code style
- Look for linter configurations
- Analyze actual code consistency

### 5.3 Generate Root AGENTS.md
Use template: [../../templates/root-agents-template.md](../../templates/root-agents-template.md)

Populate with:
- Project context from README
- Discovered coding patterns
- Linter configurations found
- README's documented workflows
- Mark: "Generated based on README and code analysis"

### 5.4 Generate Subdirectory AGENTS.md
If frontend/backend split exists:
- Use template: [../../templates/frontend-agents-template.md](../../templates/frontend-agents-template.md)
- Use template: [../../templates/backend-agents-template.md](../../templates/backend-agents-template.md)
- Extract UI/API patterns from code

### 5.5 Reference README
In each AGENTS.md, add:
```markdown
## Additional Resources
- See [README.md](../README.md) for installation and usage
- Architecture details: see .onboard/architecture.md
```

**Generate**:
- `./AGENTS.md`
- `./[frontend]/AGENTS.md` (if applicable)
- `./[backend]/AGENTS.md` (if applicable)
- `.onboard/agent_constitution.md`

---

## Completion Summary

```
✅ Brownfield onboarding complete for partially-documented project!

📊 Project Analysis:
- Project: [name from README]
- Type: [from README]
- Documentation: Partial → Enhanced
- README Status: Good (enhanced with detailed analysis)

📝 Generated Documentation:
✓ .onboard/overview.md (Enhanced from README with detailed structure)
✓ .onboard/architecture.md (Detailed architecture analysis)
✓ .onboard/design_suggestions.md (Improvement opportunities)
✓ .onboard/guardrail_suggestions.md (Testing and CI/CD gaps)
✓ .onboard/agent_constitution.md (Constitution summary)

🤖 Generated AI Agent Constitutions:
✓ ./AGENTS.md (Project constitution with README context)
[✓ ./[frontend]/AGENTS.md (Frontend guidelines)]
[✓ ./[backend]/AGENTS.md (Backend guidelines)]

📋 README Enhancement Suggestions:
[List specific sections that could be added to README based on findings]

📋 Recommended Next Steps:
1. Review generated constitutions
2. Consider enhancing README with:
   - Architecture overview (link to .onboard/architecture.md)
   - Contributing guidelines (reference AGENTS.md)
   - Testing instructions (from guardrail_suggestions.md)
3. Implement testing improvements
4. Add constitution files to version control
```

---

## Special Considerations for Partial Documentation

### Leverage Existing Documentation
- Don't duplicate what's in README
- Reference and build upon it
- Create complementary documentation

### Identify Staleness
- Check if README describes current state
- Note areas where code has evolved beyond docs
- Flag outdated instructions

### Suggest README Improvements
In `.onboard/overview.md`, include section:
```markdown
## Suggested README Enhancements
Based on code analysis, consider adding:
- [ ] Architecture overview section
- [ ] Contributing guidelines
- [ ] Testing instructions
- [ ] API documentation reference
```

### Respect Existing Conventions
If README shows conventions (even informal):
- Follow same terminology
- Match existing structure
- Maintain consistency

---

## Validation Checklist

- [ ] README reviewed and referenced
- [ ] Undocumented areas identified and analyzed
- [ ] Documentation gaps filled (not duplicated)
- [ ] README claims validated against code
- [ ] AGENTS.md complements (doesn't duplicate) README
- [ ] README enhancement suggestions provided
- [ ] All phases completed
- [ ] Generated docs reference existing docs appropriately
