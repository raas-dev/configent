# Workflow Decision Guide

This guide helps determine which brownfield-onboarding workflow to use based on the project's current documentation state.

## Quick Decision Tree

```
START: Analyze Project
    │
    ├─> No README or minimal docs?
    │   └─> Use: vanilla-project.md
    │
    ├─> Has README but no constitution files?
    │   └─> Use: partial-documentation.md
    │
    ├─> Has constitution files (.cursorrules, CONTRIBUTING.md, etc.) but no AGENTS.md?
    │   └─> Use: established-project.md
    │
    └─> Already has AGENTS.md files?
        └─> Use: mature-project.md
```

## Workflow Descriptions

### 1. Vanilla Project (vanilla-project.md)

**When to Use**:
- No README or very minimal README (< 50 lines)
- No documentation directory
- No constitution files
- Typically inherited legacy code or proof-of-concept projects

**Characteristics**:
- Undocumented codebase
- Unknown architecture
- No established coding standards
- No testing infrastructure

**Workflow Focus**:
- Discovery and documentation from scratch
- Extract patterns from code analysis
- Create comprehensive initial documentation
- Generate complete AGENTS.md suite

**Estimated Time**: 15-25 minutes for thorough analysis

---

### 2. Partial Documentation (partial-documentation.md)

**When to Use**:
- Has README with basic project info
- May have some inline code comments
- No constitution or guideline files
- Minimal or no architecture documentation

**Characteristics**:
- Basic project description exists
- Some dependency documentation
- Entry points documented
- No coding standards documented

**Workflow Focus**:
- Build upon existing documentation
- Fill documentation gaps
- Discover undocumented patterns
- Create AGENTS.md from analyzed patterns

**Estimated Time**: 10-20 minutes

---

### 3. Established Project (established-project.md)

**When to Use**:
- Comprehensive README
- Has constitution files: .cursorrules, CONTRIBUTING.md, CODE_OF_CONDUCT.md
- Architecture docs in /docs or /wiki
- No AGENTS.md files yet

**Characteristics**:
- Well-documented project
- Established coding standards
- Testing and CI/CD in place
- Clear contribution guidelines

**Workflow Focus**:
- Respect existing documentation structure
- Non-destructive enhancement of constitutions
- Synthesize AGENTS.md from existing guidelines
- Complement rather than duplicate

**Estimated Time**: 10-15 minutes

---

### 4. Mature Project (mature-project.md)

**When to Use**:
- Already has AGENTS.md or similar AI constitution files
- Comprehensive documentation suite
- Well-established processes
- May need updates or validation

**Characteristics**:
- AGENTS.md exists at root or subdirectories
- Comprehensive documentation
- Mature processes
- May have outdated information

**Workflow Focus**:
- Validate existing AGENTS.md accuracy
- Identify outdated information
- Suggest updates based on current codebase
- Fill gaps in existing constitutions

**Estimated Time**: 5-10 minutes for validation and updates

---

## Detection Logic

As an AI agent, analyze the project to determine its documentation maturity level.

### Detection Steps

**Step 1: Search for AGENTS.md**
```
Use file_search with pattern: **/AGENTS.md
```
- If found → State is **MATURE**
- If not found → Continue to Step 2

**Step 2: Search for Constitution Files**

Look for established project guidelines:
```
Use file_search for:
- **/.cursorrules
- **/CONTRIBUTING.md
- **/.github/CONSTITUTION.md
- Linter configs: .eslintrc*, .prettierrc*, etc.
- Style guides: STYLE_GUIDE.md, CODE_STANDARDS.md
```

**Step 3: Analyze README**

Read and evaluate README.md (or README.* variants):
```
Use read_file to examine:
- Line count (substantial content >100 lines, basic >50 lines)
- Content depth: Does it explain architecture, setup instructions, contribution guidelines?
- Quality: Just basic info or comprehensive documentation?
```

**Step 4: Classify the Project**

Apply rules in priority order:
1. Has AGENTS.md → **MATURE**
2. Has constitution files + substantial README (>100 lines with depth) → **ESTABLISHED**
3. Has basic README (>50 lines) but no constitution → **PARTIAL**
4. Minimal/no README (<50 lines) or very basic → **VANILLA** (default)

### Judgment Guidelines

Use your intelligence to assess quality, not just quantity:
- A 60-line README with architecture diagrams and clear setup > 150-line README with only changelog
- Evidence of standards (consistent naming, clear patterns) matters more than config files
- Consider project complexity: a microservice needs less docs than a monorepo
- When in doubt between categories, choose the lower maturity level

## Workflow Selection in Practice

### Step 1: Analyze the Project

Execute your analysis:

1. Search for AGENTS.md files using `file_search`
2. Search for constitution/guideline files
3. Read and analyze README for depth and quality
4. Count meaningful lines (exclude fluff)

### Step 2: Determine Project State

Based on your findings, classify the project:
- **MATURE** → AGENTS.md exists
- **ESTABLISHED** → Constitution files + substantial README
- **PARTIAL** → Basic README only
- **VANILLA** → Minimal/no documentation

### Step 3: Select and Load Workflow

Map your classification to the appropriate workflow:
- **MATURE** → [mature-project.md](./mature-project.md)
- **ESTABLISHED** → [established-project.md](./established-project.md)
- **PARTIAL** → [partial-documentation.md](./partial-documentation.md)
- **VANILLA** → [vanilla-project.md](./vanilla-project.md)

Use `read_file` to load the selected workflow and follow its instructions.

### Step 4: Execute Workflow

Use `read_file` to load and follow the appropriate workflow:
- Read the selected workflow markdown file
- Follow all phase instructions systematically
- Generate all required outputs
- Validate completeness

## Hybrid Scenarios

### Scenario: Large README but No Constitution

**Classification**: Partial → Established boundary

**Solution**: Start with `partial-documentation.md` but use constitution creation steps from `vanilla-project.md`

### Scenario: AGENTS.md Exists but Outdated

**Classification**: Mature, but needs refresh

**Solution**: Use `mature-project.md` with validation focus, then apply updates from `established-project.md` if major gaps found

### Scenario: Multiple Constitution Files but Inconsistent

**Classification**: Established with quality issues

**Solution**: Use `established-project.md` with extra synthesis step to resolve conflicts

## Workflow Customization

Each workflow can be customized based on:

1. **Project Size**
   - Small (< 10 files): Accelerated workflow
   - Medium (10-100 files): Standard workflow
   - Large (> 100 files): Deep analysis workflow

2. **Tech Stack Complexity**
   - Simple (single language/framework): Basic analysis
   - Moderate (frontend + backend): Standard analysis
   - Complex (microservices, polyglot): Extended analysis

3. **Domain Complexity**
   - General purpose: Standard patterns
   - Domain-specific (fintech, healthcare): Industry-specific considerations

## Verification

After selecting and executing a workflow, verify:

- [ ] All phases completed successfully
- [ ] Documentation generated at expected locations
- [ ] AGENTS.md files are comprehensive and accurate
- [ ] No existing documentation was overwritten
- [ ] Generated content aligns with existing standards

## Fallback Strategy

If automatic detection is ambiguous:

1. **Ask User**: Present detected state and ask for confirmation
2. **Conservative Approach**: Default to `established-project.md` (most respectful of existing work)
3. **Modular Execution**: Run phases individually and skip completed sections

## Next Steps

Once workflow is selected, proceed to:
1. Read the selected workflow file
2. Execute phases in sequence
3. Generate/update documentation
4. Validate outputs
5. Provide summary to user
