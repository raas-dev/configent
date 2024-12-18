# Assistant Prompt Library

Provides prompts as roles for creating generic AI assistants or agents.

## Usage

List available `aichat` roles:

    AICHAT_ROLES_DIR="$HOME/.config/configent/prompts/assistant" \
      aichat --list-roles

Passing user input to role (`ROLE_NAME`):

    echo 'user input' | \
      AICHAT_ROLES_DIR="$HOME/.config/configent/prompts/assistant" \
        aichat --role=<ROLE_NAME>

Or passing file to role (`ROLE_NAME`):

    cat '/path/to/file' | \
      AICHAT_ROLES_DIR="$HOME/.config/configent/prompts/assistant" \
        aichat --role=<ROLE_NAME>

## Available roles

Originally forked from [fabric's pattern library](https://github.com/danielmiessler/fabric/tree/1ce5bd4/patterns) assembled by [Daniel Miessler](https://github.com/danielmiessler) and [fabric contributors](https://github.com/danielmiessler/fabric/graphs/contributors).
