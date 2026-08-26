# Codex Cloud Environment

Use this repository configuration when creating a Codex Cloud environment.

## Runtime

- Node.js 20 or newer
- npm 10 or newer

## Setup command

```bash
npm install
```

## Validation command

```bash
npm run check && npm test && npm run build
```

## Notes

- The project is dependency-light and currently uses Node.js built-in test tooling.
- Do not store secrets in the repository; configure credentials through the Codex or GitHub environment secret store.
- The production static artifact is generated in `dist/`.
