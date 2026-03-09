# Phase 5: Complete Implementation

> **Note**: This file is maintained for backwards compatibility. The complete, updated Phase 5 instructions are now in `references/pipeline-phases.md` (Section: Phase 5).

See **`references/pipeline-phases.md`** for the authoritative Phase 5 implementation guide, which includes:

1. Create directory structure (no -cskill suffix)
2. Write **SKILL.md first** (spec-compliant frontmatter with name, description, license, metadata)
3. Implement Python scripts (functional, no placeholders)
4. Write references (detailed documentation)
5. Write assets (templates, configs)
6. Generate `install.sh` (cross-platform installer)
7. Write `README.md` (multi-platform install instructions)
8. Run **spec validation** (`scripts/validate.py`)
9. Run **security scan** (`scripts/security_scan.py`)
10. Report results to user

## Key Changes from v3.x

- **SKILL.md is created first** (not marketplace.json)
- **No mandatory marketplace.json** for simple skills
- **install.sh** is generated for cross-platform support
- **Validation and security scan** run automatically after generation
- **No -cskill suffix** in generated skill names
- **Description must be <=1024 characters**
- **Generated SKILL.md must be <500 lines**

## Quality Standards

See `references/quality-standards.md` and `references/pipeline-phases.md` for complete quality requirements.
