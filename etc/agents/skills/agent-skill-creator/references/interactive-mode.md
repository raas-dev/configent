# Interactive Configuration Mode

## Overview

Interactive mode provides a step-by-step wizard for configuring skill creation when the user wants explicit control over each decision. While the standard pipeline runs autonomously (the system researches, decides, and implements), interactive mode pauses at each decision point and asks the user for input or confirmation.

## When to Use Interactive Mode

| Situation | Why Interactive Mode Helps |
|-----------|---------------------------|
| Complex projects with multiple APIs | User can weigh trade-offs with full context |
| User has strong preferences | Avoids rework from autonomous decisions that miss user intent |
| High-stakes or production-critical skills | Every decision is reviewed before proceeding |
| Learning how the pipeline works | Step-by-step walkthrough teaches the creation process |
| Domain expertise the system lacks | User provides insider knowledge at each phase |

Interactive mode is **not** recommended for straightforward requests where the user trusts the system to make good decisions. For simple skills, the autonomous pipeline is faster and produces equivalent results.

## Starting Interactive Mode

### Commands

```
"Create a skill for [objective] interactively"
"Create a skill for [objective] with interactive mode"
"Walk me through creating a skill for [objective]"
"I want to configure each step for a [domain] skill"
```

### Resuming a Paused Session

If a session is interrupted, the system can resume from the last completed step:

```
"Resume the skill creation we started"
"Continue where we left off on the [skill-name] skill"
```

### Learning Mode

A variant of interactive mode that explains each phase as it runs:

```
"Create a skill for [objective] and explain each step"
"Teach me how to create a [domain] skill"
```

## Wizard Steps

### Step 1: Requirements Gathering

The wizard begins by collecting structured requirements from the user.

**System prompt**:
```
I'll help you create a skill for [objective]. Let me ask a few
questions to understand your requirements.

1. What data sources or APIs should this skill use?
   (e.g., specific API, any free API, I'm not sure)

2. What are the main tasks this skill should perform?
   (e.g., fetch data, analyze trends, generate reports)

3. How often will this skill run?
   (e.g., on-demand, daily, weekly)

4. What output format do you need?
   (e.g., text summary, PDF report, CSV data, HTML dashboard)

5. Any constraints I should know about?
   (e.g., must be free, must support specific regions, rate limits)
```

**User response example**:
```
1. Use NOAA for historical data, Open-Meteo for forecasts
2. Compare current weather to 10-year averages, flag anomalies
3. Weekly automated runs plus on-demand
4. PDF report with charts
5. Must be free, focus on US agricultural regions
```

### Step 2: Workflow Analysis

The system analyzes the requirements and presents its understanding for confirmation.

**System prompt**:
```
Based on your requirements, here's what I understand:

Domain: Climate / Agriculture
Primary API: NOAA Climate Data Online
  - Historical data (10+ year coverage)
  - Free, 1,000 requests/day
  - API key required (NOAA_API_KEY)

Secondary API: Open-Meteo
  - Forecast data (16-day outlook)
  - Free, no API key, 10,000 requests/day

Planned analyses:
  1. Current vs. historical temperature comparison
  2. Precipitation anomaly detection
  3. Growing degree day calculations
  4. Weekly trend summary with charts

Output: PDF report with embedded charts

Does this look correct? Would you like to change anything?
```

### Step 3: Strategy Selection

The system presents architecture options and asks the user to choose.

**System prompt**:
```
For this skill, I recommend the following architecture:

Option A: Simple Skill (recommended)
  - Single SKILL.md + scripts + references
  - 4 Python scripts (~600 lines total)
  - Best for: single-developer maintenance

Option B: Complex Suite
  - Separate skills for data fetching and analysis
  - Shared reference library
  - Best for: team maintenance or future expansion

I recommend Option A because the scope is focused and the
total code size is under 1,000 lines.

Which option do you prefer? [A/B]
```

### Step 4: Preview and Refinement

Before creating files, the system shows a preview of what will be generated.

**System prompt**:
```
Here's the complete plan before I create any files:

Directory: climate-agriculture-analysis/
├── SKILL.md              (~120 lines)
├── scripts/
│   ├── fetch_noaa.py     (historical data retrieval)
│   ├── fetch_openmeto.py (forecast retrieval)
│   ├── analyze_climate.py (comparison + anomaly detection)
│   └── generate_report.py (PDF generation)
├── references/
│   ├── api-guide.md      (NOAA + Open-Meteo documentation)
│   └── methodology.md    (analysis methods explained)
├── assets/
│   └── report_template.html
├── install.sh            (cross-platform installer)
└── README.md             (installation for 7+ platforms)

SKILL.md frontmatter:
  name: climate-agriculture-analysis
  description: >-
    Analyze climate data for US agricultural regions using NOAA
    historical records and Open-Meteo forecasts. Compare current
    conditions to 10-year averages, detect anomalies...
  license: MIT
  metadata:
    author: [your name]
    version: 1.0.0

Shall I proceed with creation? Or would you like to modify
anything in this plan?
```

### Step 5: Creation

The system creates all files, reporting progress as it goes.

**System output**:
```
Creating skill: climate-agriculture-analysis

[1/10] Created directory structure
[2/10] Written SKILL.md (118 lines, spec-compliant)
[3/10] Written scripts/fetch_noaa.py (145 lines)
[4/10] Written scripts/fetch_openmeto.py (98 lines)
[5/10] Written scripts/analyze_climate.py (187 lines)
[6/10] Written scripts/generate_report.py (156 lines)
[7/10] Written references/api-guide.md
[8/10] Written references/methodology.md
[9/10] Generated install.sh (cross-platform)
[10/10] Written README.md (multi-platform instructions)
```

### Step 6: Validation

The system runs spec validation and security scanning, then reports results.

**System output**:
```
Running validation...

Spec Compliance:
  [PASS] Frontmatter: name format valid (lowercase + hyphens)
  [PASS] Frontmatter: description length (287 chars <= 1024)
  [PASS] Frontmatter: name matches directory
  [PASS] SKILL.md body: 118 lines (< 500 limit)
  [PASS] Required files: SKILL.md present
  [PASS] License field: MIT

Security Scan:
  [PASS] No hardcoded API keys detected
  [PASS] No .env files in skill directory
  [PASS] No eval() or exec() calls
  [PASS] No shell injection patterns

Result: 10/10 checks passed. Skill is ready for installation.

Would you like to install it now? Run: ./install.sh
```

## Advanced Configuration Options

### Skipping Phases

In interactive mode, users can skip phases they want to handle themselves:

```
"Create a skill interactively but skip API research -- I'll provide the API details"
"Skip the design phase, I already know what analyses I want"
```

### Partial Interactivity

Users can make only specific phases interactive:

```
"Create a skill autonomously but let me review the architecture before you build"
"Auto-create but pause before generating the SKILL.md frontmatter"
```

### Exporting the Configuration

After completing the wizard, users can export the configuration for reuse:

```
"Save this configuration as a template for future skills"
```

This creates a custom template file (see `references/templates-guide.md`) that can be reused for similar skills without re-answering all the wizard questions.

## Interactive Mode vs. Autonomous Mode

| Aspect | Autonomous | Interactive |
|--------|-----------|-------------|
| Speed | Faster (no pauses) | Slower (waits for input) |
| Control | System decides | User decides |
| Suitable for | Well-defined domains | Ambiguous or complex requirements |
| Discovery | System researches and selects | System researches, user confirms |
| Architecture | System chooses optimal | User picks from options |
| Output | Same quality | Same quality, user-validated |

Both modes produce the same output structure. The difference is whether the user participates in decisions or trusts the system to make them autonomously.
