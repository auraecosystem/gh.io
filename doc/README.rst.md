# UNPKG

UNPKG is a fast, global content delivery network (CDN) for everything published on npm. It allows you to load JavaScript, CSS, images, and other package files directly in the browser without installing them locally.

## URL Format

```
https://unpkg.com/:package@:version/:file
```

| Segment | Description |
|---------|-------------|
| `:package` | The npm package name. |
| `:version` | An exact version, dist-tag (`latest`), or semver range (`^18`). |
| `:file` | The path to a file inside the package. |

### Examples

```text
https://unpkg.com/preact@10.26.4/dist/preact.min.js
https://unpkg.com/react@18.3.1/umd/react.production.min.js
https://unpkg.com/three@0.174.0/build/three.module.min.js
```

You can also use:

```text
https://unpkg.com/preact@latest/dist/preact.min.js
https://unpkg.com/react@^18/umd/react.production.min.js
https://unpkg.com/vue/dist/vue.esm-browser.prod.js
```

If no version is specified, the latest published version is used.

---

# Directory Listings

Append a trailing slash (`/`) to browse package contents.

```text
https://unpkg.com/react/
https://unpkg.com/preact/src/
https://unpkg.com/react-router/
```

Browse older versions by including the version number.

```text
https://unpkg.com/react@18/
https://unpkg.com/react-router@5/
```

---

# Package Entry Resolution

When no file path is provided, UNPKG resolves the package entry using:

1. `exports`
2. `unpkg`
3. `main`

Example:

```json
{
  "name": "my-package",
  "exports": {
    "default": "./dist/index.js"
  }
}
```

```html
<script src="https://unpkg.com/my-package"></script>
```

---

# Import Maps

Modern browsers can import packages directly from UNPKG.

```html
<script type="importmap">
{
  "imports": {
    "preact": "https://unpkg.com/preact@10.25.4/dist/preact.module.js",
    "preact/hooks": "https://unpkg.com/preact@10.25.4/hooks/dist/hooks.module.js",
    "htm": "https://unpkg.com/htm@3.1.1/dist/htm.module.js"
  }
}
</script>
```

---

# No-Build Applications

UNPKG makes it possible to build browser applications without Webpack, Vite, Rollup, or Parcel.

Benefits include:

- No installation
- No bundler
- No compilation step
- Fast prototyping
- Native ES Modules

---

# Browser Modules

Use `esm.unpkg.com` for packages that require transformation into browser-ready ES modules.

```javascript
import React from "https://esm.unpkg.com/react@18";
import { createRoot } from "https://esm.unpkg.com/react-dom@18/client";
```

---

# Useful Query Parameters

| Parameter | Purpose |
|-----------|---------|
| `?target=` | Select JavaScript target |
| `?dev` | Development build |
| `?bundle` | Bundle dependencies |
| `?external=` | Keep dependencies external |
| `?min` | Minify output |
| `?meta` | Return package metadata |
| `?raw` | Serve the original file |
| `?worker` | Generate a Worker module |
| `?css` | Load stylesheet entry |

---

# Metadata API

Append `?meta` to retrieve package metadata.

```text
https://unpkg.com/react/?meta
https://unpkg.com/react-router/dist/?meta
```

Example response:

```json
{
  "package": "react",
  "version": "19.1.0",
  "files": [
    {
      "path": "/index.js",
      "size": 12345,
      "type": "text/javascript",
      "integrity": "sha256-..."
    }
  ]
}
```

---

# Caching

UNPKG is powered by Cloudflare's global CDN.

For optimal caching:

- Use exact package versions.
- Include the complete file path.
- Avoid `latest` or semver ranges in production.

Example:

```text
✅ https://unpkg.com/preact@10.26.4/dist/preact.module.js
❌ https://unpkg.com/preact@latest
```

---

# Summary

UNPKG enables direct browser access to npm packages with:

- Global CDN delivery
- Native ES Module support
- Import maps
- No-build applications
- Metadata API
- Automatic package resolution
- Cloudflare edge caching
- Browser-ready modules through `esm.unpkg.com`
