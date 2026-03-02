# SAP CAP MCP Server

A [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) server that helps you build simple functions in Node.js with SAP CAP.

## Tools

| Tool | Description |
|------|-------------|
| `generate-cds-entity` | Generate a CDS entity definition with typed fields |
| `generate-cap-service` | Generate a CDS service exposing one or more entities |
| `generate-cap-handler` | Generate a Node.js event handler for a CAP service |
| `generate-cap-action` | Generate a CDS action/function with its JS implementation |
| `scaffold-cap-project` | Scaffold a complete CAP project folder structure |

## Setup

```bash
cd 3-sap-red-team-exercise/student/sap-cap-mcp-server
npm install
```

## Usage

### With VS Code / GitHub Copilot

Add to your `.vscode/mcp.json` (or user `settings.json`):

```json
{
  "servers": {
    "sap-cap-helper": {
      "type": "stdio",
      "command": "node",
      "args": ["3-sap-red-team-exercise/student/sap-cap-mcp-server/src/index.js"]
    }
  }
}
```

### Run standalone (for testing)

```bash
npm start
```

The server communicates over **stdio** using the MCP protocol.
