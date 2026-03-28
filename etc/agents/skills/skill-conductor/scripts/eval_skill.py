#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = ["pyyaml>=6.0"]
# ///
"""
Skill Evaluator - Automated discovery and structure checks for skills.

Runs Stage 1 (discovery) checks that can be automated:
- Frontmatter validation
- Description quality analysis
- Structure compliance
- Token budget estimation

Stages 2 (logic) and 3 (edge cases) require LLM interaction - see SKILL.md.

Usage:
    eval_skill.py <skill-folder>
"""

import re
import sys
from pathlib import Path

import yaml


def count_words(text):
    return len(text.split())


def count_lines(text):
    return len(text.strip().splitlines())


def eval_skill(skill_path):
    skill_path = Path(skill_path).resolve()

    # Local counters instead of globals — safe for repeated calls
    counts = {"passed": 0, "failed": 0, "warned": 0}

    def ok(msg):
        counts["passed"] += 1
        print(f"  ✅ {msg}")

    def fail(msg):
        counts["failed"] += 1
        print(f"  ❌ {msg}")

    def warn(msg):
        counts["warned"] += 1
        print(f"  ⚠️  {msg}")

    print(f"\n🔍 Evaluating: {skill_path.name}\n")

    # --- Structure checks ---
    print("📁 Structure:")

    skill_md = skill_path / "SKILL.md"
    if not skill_md.exists():
        fail("SKILL.md not found")
        return False
    ok("SKILL.md exists")

    # Check for forbidden files
    readme = skill_path / "README.md"
    if readme.exists():
        fail("README.md found inside skill (should not exist)")
    else:
        ok("No README.md inside skill")

    changelog = skill_path / "CHANGELOG.md"
    if changelog.exists():
        fail("CHANGELOG.md found inside skill")

    # Check reference depth
    refs_dir = skill_path / "references"
    if refs_dir.exists():
        deep_files = []
        for f in refs_dir.rglob("*"):
            if f.is_file():
                rel = f.relative_to(refs_dir)
                if len(rel.parts) > 2:
                    deep_files.append(str(rel))
        if deep_files:
            fail(f"References nested too deep (max 1 level): {deep_files[:3]}")
        else:
            ok("References depth OK (≤1 level)")

    # --- Frontmatter checks ---
    print("\n📋 Frontmatter:")

    content = skill_md.read_text()
    if not content.startswith("---"):
        fail("No YAML frontmatter")
        return False

    match = re.match(r"^---\n(.*?)\n---", content, re.DOTALL)
    if not match:
        fail("Invalid frontmatter delimiters")
        return False
    ok("Valid frontmatter format")

    try:
        fm = yaml.safe_load(match.group(1))
    except yaml.YAMLError as e:
        fail(f"YAML parse error: {e}")
        return False

    if not isinstance(fm, dict):
        fail("Frontmatter is not a dict")
        return False

    # Name
    name = fm.get("name", "")
    if not name:
        fail("Missing 'name'")
    elif not re.match(r"^[a-z0-9]+(-[a-z0-9]+)*$", name):
        fail(f"Name '{name}' not valid kebab-case")
    elif len(name) > 64:
        fail(f"Name too long ({len(name)} chars, max 64)")
    elif name != skill_path.name:
        warn(f"Name '{name}' doesn't match folder '{skill_path.name}'")
    else:
        ok(f"Name: {name}")

    # Description
    desc = fm.get("description", "")
    if not desc:
        fail("Missing 'description'")
    else:
        if len(desc) > 1024:
            fail(f"Description too long ({len(desc)} chars, max 1024)")
        else:
            ok(f"Description length: {len(desc)} chars")

        if "<" in desc or ">" in desc:
            fail("Description contains angle brackets")

        # Trigger analysis
        desc_lower = desc.lower()
        has_trigger = any(phrase in desc_lower for phrase in [
            "use when", "use for", "trigger", "use if"
        ])
        if has_trigger:
            ok("Description has trigger phrases")
        else:
            warn("Description missing trigger phrases (add 'Use when...')")

        has_negative = any(phrase in desc_lower for phrase in [
            "not for", "don't use", "do not use", "not when", "not suitable"
        ])
        if has_negative:
            ok("Description has negative triggers")
        else:
            warn("Consider adding negative triggers ('Do NOT use for...')")

        # Process leak detection
        process_signals = [
            r"then\s+\w+",
            r"first\s+\w+.*then",
            r"step\s+\d",
            r"phase\s+\d",
            r"followed\s+by",
            r"after\s+\w+ing.*\w+",
        ]
        for pattern in process_signals:
            if re.search(pattern, desc_lower):
                warn(f"Description may contain process/workflow (pattern: '{pattern}'). Agent may skip body!")
                break

    # Unexpected keys
    allowed = {"name", "description", "license", "allowed-tools", "metadata", "compatibility"}
    unexpected = set(fm.keys()) - allowed
    if unexpected:
        warn(f"Unexpected frontmatter keys: {unexpected}")

    # --- Body checks ---
    print("\n📝 Body:")

    body = content[match.end():]
    body_lines = count_lines(body)
    body_words = count_words(body)

    if body_lines > 500:
        fail(f"Body too long: {body_lines} lines (max 500). Move detail to references/")
    elif body_lines > 400:
        warn(f"Body approaching limit: {body_lines} lines (max 500)")
    else:
        ok(f"Body size: {body_lines} lines, {body_words} words")

    # Check for TODO remnants
    if "[TODO" in body:
        warn("Body contains [TODO] placeholders")

    # Check for headers
    headers = re.findall(r"^#+\s+.+$", body, re.MULTILINE)
    if len(headers) < 2:
        warn("Body has very few headers - consider adding structure")
    else:
        ok(f"Body structure: {len(headers)} sections")

    # --- Scripts check ---
    scripts_dir = skill_path / "scripts"
    if scripts_dir.exists():
        print("\n🔧 Scripts:")
        scripts = list(scripts_dir.glob("*.py")) + list(scripts_dir.glob("*.sh"))
        for script in scripts:
            if not script.stat().st_size:
                fail(f"Empty script: {script.name}")
            else:
                ok(f"Script: {script.name} ({script.stat().st_size} bytes)")

    # --- Summary ---
    print(f"\n{'='*50}")
    total = counts["passed"] + counts["failed"] + counts["warned"]
    score = round((counts["passed"] / total) * 10) if total else 0
    print(f"✅ {counts['passed']} passed | ❌ {counts['failed']} failed | ⚠️  {counts['warned']} warnings")
    print(f"Score: {score}/10")

    if counts["failed"] == 0 and counts["warned"] == 0:
        print("🏆 Skill is clean!")
    elif counts["failed"] == 0:
        print("👍 Skill is valid with minor suggestions")
    else:
        print("🔧 Fix failed checks before packaging")

    return counts["failed"] == 0


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: eval_skill.py <skill-folder>")
        sys.exit(1)
    result = eval_skill(sys.argv[1])
    sys.exit(0 if result else 1)
