"""
This is the Continue configuration file.

See https://continue.dev/docs/customization to learn more.
"""

import os
import subprocess
from textwrap import dedent

from continuedev.core.config import (
    ContinueConfig,
    CustomCommand,
    SlashCommand,
)
from continuedev.core.main import Step
from continuedev.core.models import Models
from continuedev.core.sdk import ContinueSDK
from continuedev.libs.llm.openai_free_trial import OpenAI
from continuedev.plugins.context_providers.diff import (
    DiffContextProvider,
)
from continuedev.plugins.context_providers.google import (
    GoogleContextProvider,
)
from continuedev.plugins.context_providers.search import (
    SearchContextProvider,
)
from continuedev.plugins.context_providers.url import URLContextProvider
from continuedev.plugins.policies.default import DefaultPolicy
from continuedev.plugins.steps.clear_history import ClearHistoryStep
from continuedev.plugins.steps.comment_code import CommentCodeStep
from continuedev.plugins.steps.main import EditHighlightedCodeStep
from continuedev.plugins.steps.open_config import OpenConfigStep
from continuedev.plugins.steps.share_session import ShareSessionStep


class CommitMessageStep(Step):
    """
    This is a Step, the building block of Continue.
    It can be used below as a slash command, so that
    run will be called when you type '/commit'.
    """

    async def run(self, sdk: ContinueSDK):
        # Get the root directory of the workspace
        dir = sdk.ide.workspace_directory

        # Run git diff in that directory
        diff = subprocess.check_output(["git", "diff"], cwd=dir).decode("utf-8")

        # Ask the LLM to write a commit message,
        # and set it as the description of this step
        self.description = await sdk.models.default.complete(
            f"{diff}\n\nWrite a short, specific (less than 50 chars) commit message about the above changes:"
        )


API_KEY = os.getenv("OPENAI_API_KEY")
SERPER_API_KEY = os.getenv("SERPER_API_KEY") or ""

config = ContinueConfig(
    # If set to False, we will not collect any usage data
    # See here to learn what anonymous data we collect: https://continue.dev/docs/telemetry
    allow_anonymous_telemetry=False,
    models=Models(
        # You can try Continue with limited free usage. Please eventually replace with your own API key.
        # Learn how to customize models here: https://continue.dev/docs/customization#change-the-default-llm
        default=OpenAI(api_key=API_KEY, model="gpt-4"),
        summarize=OpenAI(api_key=API_KEY, model="gpt-3.5-turbo-16k"),
    ),
    # Set a system message with information that the LLM should always keep in mind
    # E.g. "Please give concise answers. Always respond in Spanish."
    system_message="You are a helpful assistant. Please make all responses as concise as possible and never repeat something you have already explained.",
    # Set temperature to any value between 0 and 1. Higher values will make the LLM
    # more creative, while lower values will make it more predictable.
    temperature=0.0,
    # Custom commands let you map a prompt to a shortened slash command
    # They are like slash commands, but more easily defined - write just a prompt instead of a Step class
    # Their output will always be in chat form
    custom_commands=[
        CustomCommand(
            name="test",
            description="Write unit tests for the highlighted code",
            prompt="Write a comprehensive set of unit tests for the selected code. It should setup, run tests that check for correctness including important edge cases, and teardown. Ensure that the tests are complete and sophisticated. Give the tests just as chat output, don't edit any file.",
        ),
        CustomCommand(
            name="check",
            description="Check for mistakes in my code",
            prompt=dedent(
                """\
            Please read the highlighted code and check for any mistakes. You should look for the following, and be extremely vigilant:
            - Syntax errors
            - Logic errors
            - Security vulnerabilities
            - Performance issues
            - Anything else that looks wrong

            Once you find an error, please explain it as clearly as possible, but without using extra words. For example, instead of saying "I think there is a syntax error on line 5", you should say "Syntax error on line 5". Give your answer as one bullet point per mistake found."""
            ),
        ),
    ],
    # Slash commands let you run a Step from a slash command
    slash_commands=[
        SlashCommand(
            name="edit",
            description="Edit code in the current file or the highlighted code",
            step=EditHighlightedCodeStep,
        ),
        SlashCommand(
            name="config",
            description="Customize Continue - slash commands, LLMs, system message, etc.",
            step=OpenConfigStep,
        ),
        SlashCommand(
            name="comment",
            description="Write comments for the current file or highlighted code",
            step=CommentCodeStep,
        ),
        SlashCommand(
            name="commit",
            description="Generate a commit message for the current changes",
            step=CommitMessageStep,
        ),
        SlashCommand(
            name="clear",
            description="Clear step history",
            step=ClearHistoryStep,
        ),
        SlashCommand(
            name="share",
            description="Download and share the session transcript",
            step=ShareSessionStep,
        ),
    ],
    # Context providers let you quickly select context by typing '@'
    # Uncomment the following to
    # - quickly reference GitHub issues
    # - show Google search results to the LLM
    context_providers=[
        # GitHubIssuesContextProvider(
        #     repo_name="<your github username or organization>/<your repo name>",
        #     auth_token="<your github auth token>"
        # ),
        GoogleContextProvider(serper_api_key=SERPER_API_KEY),
        SearchContextProvider(),
        DiffContextProvider(),
        URLContextProvider(
            preset_urls=[
                # Add any common urls you reference here so they appear in autocomplete
            ]
        ),
    ],
    # Policies hold the main logic that decides which Step to take next
    # You can use them to design agents, or deeply customize Continue
    policy=DefaultPolicy(),
)
