# Workflow: Mature Project (AGENTS.md Already Exists)

**Use this workflow when**: The project already has AGENTS.md files and comprehensive documentation. Focus is on validation, updates, and gap filling.

**Estimated Time**: 5-10 minutes

**Output Files**:
- `.onboard/overview.md`
- `.onboard/architecture.md`
- `.onboard/design_suggestions.md`
- `.onboard/guardrail_suggestions.md`
- `.onboard/agent_constitution.md`
- `./AGENTS.md` (ENHANCED, not replaced)
- Other AGENTS.md files (ENHANCED if found)

---

## Pre-Phase: Existing AGENTS.md Analysis

### Locate All AGENTS.md Files
Search comprehensively:
- `file_search`: `**/AGENTS.md`

Expected locations:
- `./AGENTS.md` (root)
- `./frontend/AGENTS.md`
- `./backend/AGENTS.md`
- Other subdirectories

### Read and Analyze Each AGENTS.md

For each file, assess:
1. **Completeness**: Does it cover all new features?
2. **Accuracy**: Does it match current codebase?
3. **Currency**: Is it up-to-date with recent changes?
4. **Gaps**: What's missing?

### Document Current State

```markdown
Found AGENTS.md files:
- ./AGENTS.md (last updated: [date], completeness: [high/medium/low])
- ./frontend/AGENTS.md (last updated: [date], completeness: [high/medium/low])
- ./backend/AGENTS.md (last updated: [date], completeness: [high/medium/low])

Initial Assessment:
- Outdated sections: [list]
- Missing information: [list]
- Excellent sections: [list]
```

---

## Phase 1: Project Discovery (Validation Mode)

### 1.1 Validate AGENTS.md Project Context

Check if current AGENTS.md accurately describes:
- Project purpose (has it evolved?)
- Current status (version, phase)
- Team size (if mentioned)
- Project health metrics

### 1.2 Identify New Features

Since last AGENTS.md update, identify:
- New features added
- Removed features
- Architectural changes
- New dependencies

**Generate**: `.onboard/overview.md` with:
- Validation results
- Identified changes since last update
- New features to document
- Accuracy assessment

---

## Phase 2: Architecture Analysis (Change Detection)

### 2.1 Compare AGENTS.md Architecture to Reality

Check for drift:
- Stack changes (dependency updates, new tools)
- Architecture evolution
- Pattern changes
- Technology upgrades

### 2.2 Identify Undocumented Changes

- New architectural decisions
- Refactored patterns
- Infrastructure changes

**Generate**: `.onboard/architecture.md` with:
- Current state validation
- Changes detected
- Drift analysis
- Update recommendations

---

## Phase 3: Design Assessment (Evolution Check)

### 3.1 Pattern Evolution

- Are documented patterns still followed?
- Have new patterns emerged?
- Any pattern deprecation?

### 3.2 Constitution Compliance

- Does code follow AGENTS.md guidelines?
- Where has practice diverged?

**Generate**: `.onboard/design_suggestions.md` with:
- Compliance assessment
- Pattern evolution notes
- Where to update AGENTS.md
- Where to update code

---

## Phase 4: Quality & Automation Review (Maturity Check)

### 4.1 Validate Against AGENTS.md Claims

If AGENTS.md mentions:
- Test coverage: Verify actual coverage
- CI/CD maturity: Validate pipeline status
- Quality gates: Confirm they exist

### 4.2 Identify Improvements

Even mature projects can improve:
- New testing approaches
- CI/CD optimizations
- Emerging best practices

**Generate**: `.onboard/guardrail_suggestions.md` with:
- Claim validation results
- Incremental improvements
- Best practice updates

---

## Phase 5: Agent Constitution Enhancement (Non-Destructive Updates)

**CRITICAL**: Do NOT replace existing AGENTS.md. Only enhance.

### 5.1 Enhancement Strategy

```markdown
Enhancement Approach:
1. Preserve ALL existing content
2. Mark outdated sections with updates
3. Add missing sections
4. Append new information
5. Use comments to mark enhancements
```

### 5.2 Section-by-Section Enhancement

For each AGENTS.md file:

#### Update Project Context Section
```markdown
<!-- BEGIN: brownfield-onboarding enhancement [date] -->

## Project Context (UPDATED)

### Purpose
[Original content preserved]
[Add updates if purpose evolved]

### Current Status
- **Phase**: Production (UPDATED from Beta)
- **Version**: 3.0.0 (UPDATED from 2.3.0)
- **Last Updated**: [new date]

<!-- END: brownfield-onboarding enhancement -->
```

#### Add Missing Sections

If sections missing from template but valuable:
```markdown
<!-- BEGIN: brownfield-onboarding addition [date] -->

## Performance Guidelines

[Content from established patterns in code]

<!-- END: brownfield-onboarding addition -->
```

#### Update Outdated Information

```markdown
## Dependencies & External Services

### API Integrations
- Payment API: Stripe ~~v2~~ → **v3** (UPDATED)
- Email Service: SendGrid v3 (unchanged)
- ~~Analytics: Google Analytics~~ (REMOVED)
- **Analytics: PostHog** (NEW - added [date])
```

#### Preserve Working Content

```markdown
## Coding Principles

✅ The following sections are current and accurate:
- Code Style
- ~~Code Organization~~ (see updates below)
- Error Handling
- Testing Requirements
```

### 5.3 Enhancement Documentation

At the top of each AGENTS.md, add:
```markdown
<!--
Last validated: [date] by brownfield-onboarding
Last enhanced: [date] by brownfield-onboarding
Changes made:
- Updated project version from 2.3.0 to 3.0.0
- Added Performance Guidelines section
- Updated dependency versions
- Removed deprecated Google Analytics reference
- Added new PostHog integration
-->
```

### 5.4 Create Change Summary

In `.onboard/agent_constitution.md`:

```markdown
# Agent Constitution Enhancement Summary

## Existing AGENTS.md Files

### ./AGENTS.md
- **Status**: Enhanced (not replaced)
- **Last Updated Originally**: [original date]
- **Enhanced On**: [today]
- **Changes Made**:
  - ✓ Updated project version (2.3.0 → 3.0.0)
  - ✓ Added Performance Guidelines section
  - ✓ Updated dependencies list
  - ✓ Refreshed project health metrics
- **Preserved**: 95% of original content
- **Added**: 3 new sections
- **Updated**: 5 sections

### ./frontend/AGENTS.md
[Similar breakdown]

### ./backend/AGENTS.md
[Similar breakdown]

## Accuracy Validation

### Accurate and Current Sections
- [List sections that needed no updates]

### Updated Sections
- [List what was updated and why]

### Newly Added Sections
- [List what was added and rationale]

## Recommended Manual Reviews

Some changes need team input:
1. **Project Status**: Confirm if phase is still "Production" or moving to "Maintenance"
2. **Team Size**: Update "5 developers" to current count
3. **New Feature Documentation**: Review newly discovered features for accuracy
```

### 5.5 Suggest Direct Edits (Don't Auto-Apply)

For subjective or team-decision items:
```markdown
## Suggested Manual Edits to AGENTS.md

The following changes are recommended but not auto-applied:

### ./AGENTS.md Line 45
Current: "Test coverage target: 80%"
Actual coverage: 65%
Suggestion: Either update target to 70% or plan to increase coverage

### ./backend/AGENTS.md Lines 112-118
Current: Documents MongoDB as database
Actual: Project migrated to PostgreSQL (found in code)
Suggestion: Update database section completely

[Create these as enhancement comments in the file but don't apply]
```

---

## Completion Summary

```
✅ Brownfield onboarding complete for mature project!

📊 Project Status:
- Documentation: Comprehensive ✓
- AGENTS.md: Exists ✓ → ENHANCED ✓
- Updated: [X] sections, Added: [Y] sections
- Validation: [Z]% accurate

📄 Existing AGENTS.md Files Analyzed:
✓ ./AGENTS.md (enhanced with [N] updates)
✓ ./frontend/AGENTS.md (enhanced with [N] updates)
✓ ./backend/AGENTS.md (enhanced with [N] updates)

📝 Generated Documentation:
✓ .onboard/overview.md (Validation and changes)
✓ .onboard/architecture.md (Current state vs. documented)
✓ .onboard/design_suggestions.md (Compliance and improvements)
✓ .onboard/guardrail_suggestions.md (Maturity validation)
✓ .onboard/agent_constitution.md (Enhancement summary with change log)

🔄 Constitution Enhancements:
✓ Updated outdated information
✓ Added missing sections
✓ Preserved all working content
✓ Marked all changes with dates
✓ Created change log

✨ Enhancement Highlights:
- [List key updates made]
- [List key additions]
- [List sections validated as current]

⚠️  Manual Review Needed:
[List items that need team decision]

📋 Recommended Next Steps:
1. Review enhanced AGENTS.md files for accuracy
2. Address manual review items (see .onboard/agent_constitution.md)
3. Update team on AGENTS.md changes
4. Set reminder to re-validate in 3-6 months
5. Consider adding AGENTS.md update process to contribution workflow
```

---

## Special Considerations for Mature Projects

### Trust but Verify
- Existing AGENTS.md was created with care
- Assume good faith but validate
- Don't assume outdated without evidence

### Minimize Disruption
- Mark changes clearly
- Preserve original structure
- Don't reorganize sections
- Keep same tone and style

### Identify Drift Patterns
```markdown
## Drift Analysis

Common drift patterns found:
1. **Version Lag**: Documented versions older than actual
2. **Feature Additions**: 3 new features undocumented
3. **Deprecated Practices**: 2 patterns no longer used but still documented
4. **Dependency Updates**: 5 dependencies upgraded

**Root Cause**: AGENTS.md not updated since [date] ([X] months ago)

**Recommendation**: Add AGENTS.md review to quarterly maintenance checklist
```

### Suggest Maintenance Process

In `.onboard/agent_constitution.md`, add:
```markdown
## Recommended AGENTS.md Maintenance Process

To keep AGENTS.md current:

1. **Quarterly Reviews** (every 3 months)
   - Validate project context
   - Check version numbers
   - Review dependencies
   - Update metrics

2. **Post-Release Updates** (after major releases)
   - Document new features
   - Update architecture if changed
   - Add new patterns

3. **Automated Reminders**
   - Add to release checklist
   - Include in quarterly retro
   - Assign constitution owner

4. **Version Control**
   - Track AGENTS.md changes in git
   - Require review for AGENTS.md updates
   - Document change rationale in commits
```

---

## Validation Checklist

- [ ] All existing AGENTS.md files located and read
- [ ] NO content removed or replaced (only enhanced)
- [ ] All changes marked with dates and comments
- [ ] Change log created
- [ ] Accuracy validation performed
- [ ] Drift patterns identified
- [ ] Manual review items documented
- [ ] Maintenance process suggested
- [ ] Enhancement summary clear and actionable
- [ ] Original tone and structure preserved
