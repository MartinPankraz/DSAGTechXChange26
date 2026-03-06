# Quest 0 - Meet the AI and Setup your lab environment

**[🏠Home](README.md)** - [ Quest 1 >](quest1.md)

The popular full day SAP hackathon event DSAG TechXChange desperately needs a Lunch order processing app at veeery short notice! Just the right event for the red team to take action.

Every dev out there feels the pressure to deliver faster and faster, and AI is the way to go. All of us know what happens next... 

Things start to fall through the cracks, and security is the first victim. In this quest, we will set up a lab environment that will allow us to experience this first hand.

### GitHub Codespaces Setup

For this quest, a minimal GitHub Codespaces dev container is included at [`.devcontainer`](../\.devcontainer/devcontainer.json).

1. Open a free Codespace directly on [this repository](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=1113851593&skip_quickstart=true)
2. Wait for container bootstrap to finish (npm dependencies for SAP CAP + MCP server, plus CAP/CF/MBT tooling)
3. See the GitHub Copilot flyout to the right of your code editor. If you don't see it, open the command palette (Ctrl+Shift+P) and search for ">GitHub Copilot:" to open it manually.
    - Pick AI Model `GPT-5 mini`. This is very important! Otherwise, you won't get the same experience as described in the quests.
    - Meet your AI assistant and ask it: "show me in which javascript file the first quest starts." Keep your urge to play more at bay and continue for now. We will get there ;-)
4. Test the provided SAP CAP app using below commands in the terminal:

```bash
cd student/dsag-mealapp-security-cap
cds watch
```

So far, so good. Now, let's see what happens when we ask our AI assistant to "help us ship this Lunch Order app faster". Don't worry, we won't let AI loose in the kitchen poisoning everyone... or will we?

## Where to next?

**[🏠Home](README.md)** - [ Quest 1 >](quest1.md)

[🔝](#)
