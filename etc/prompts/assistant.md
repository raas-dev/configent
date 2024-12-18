# Assistant Prompt Library

Provides prompts as roles for creating generic AI assistants or agents.

## Usage

List available `aichat` roles:

    AICHAT_ROLES_DIR="$HOME/.config/configent/prompts/assistant" \
      aichat --list-roles

Passing user input to role:

    echo 'user input' | \
      AICHAT_ROLES_DIR="$HOME/.config/configent/prompts/assistant" \
        aichat --role=role_name

Or passing input file to role:

    AICHAT_ROLES_DIR="$HOME/.config/configent/prompts/assistant" \
      aichat --role=role_name < /path/to/file

## Available roles

Originally forked from [fabric's pattern library](https://github.com/danielmiessler/fabric/tree/1ce5bd4/patterns) assembled by [Daniel Miessler](https://github.com/danielmiessler) and [fabric contributors](https://github.com/danielmiessler/fabric/graphs/contributors).
