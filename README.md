# TBC Frontx

Agent-mode UX design approach to the Frontx platform (POC).

This project is a React + TypeScript + Vite single-page application that uses Carbon reusable React components and Carbon design tokens. It is designed to be developed with VS Code Copilot in agent mode, plus Carbon MCP tools and Carbon skills.

## Stack

- React 19
- TypeScript 6
- Vite 8
- Carbon React: `@carbon/react`
- Carbon Icons: `@carbon/icons-react`
- SCSS with Carbon tokens (`sass-embedded`)
- ESLint 9

```

## Project Structure

```text
src/
  App.tsx
  main.tsx
  styles.scss
  assets/
  components/
    AppHeader.tsx
    ClientProfile.tsx
    IconRailSidebar.tsx
    MainContent.tsx
```

## UX and Design Approach

- Build UI with Carbon reusable React components, not custom widget libraries.
- Use Carbon tokens for spacing, typography, color, and layout rhythm.
- Keep accessibility first (semantic structure, labels, keyboard support).
- Prefer composable Carbon primitives for consistency and scalability.
- Treat this repository as a proof of concept for an agent-assisted UX workflow.

## Carbon MCP Configuration

This workspace includes MCP configuration in `.vscode/mcp.json`.

Configured server:

- Server name: `carbon-mcp`
- Type: `http`
- URL: `https://mcp.carbondesignsystem.com/mcp`

Required MCP inputs:

- `token` (Carbon MCP token, hidden input)
- `session` (MCP session id)

Headers used by the MCP server:

- `Authorization: Bearer ${input:token}`
- `X-MCP-Session: ${input:session}`

If prompts appear in VS Code when using MCP tools, provide your token and session values to authenticate.

## Copilot Agent and Carbon Skills

Project-specific Copilot guidance lives in `.github/copilot-instructions.md`.

The intended workflow is:

1. Use GitHub Copilot in agent mode for implementation and refactors.
2. Use Carbon MCP tools to verify components, docs, and examples before coding.
3. Follow Carbon and project conventions from the Copilot instruction file.

This keeps generated UI aligned with Carbon APIs and avoids stale or guessed component usage.

## Notes

- This is a POC  focused on Agent-mode UX direction and reusable foundation patterns.
- Carbon is the primary UI system for components, layout, and tokens.
