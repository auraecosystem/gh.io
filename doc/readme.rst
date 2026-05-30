UNPKG
UNPKG is a fast, global content delivery network for everything on npm. Use it to quickly and easily load any file on npm using a URL like:
unpkg.com/:pkg@:ver/:file
Segment	Use
:pkg	The package name on npm.
:ver	The package version, npm dist-tag, or semver range.
:file	The path to a file in the package.
For example:
unpkg.com/preact@10.26.4/dist/preact.min.js
unpkg.com/react@18.3.1/umd/react.production.min.js
unpkg.com/three@0.174.0/build/three.module.min.js
You can also use any valid semver range or npm tag:
unpkg.com/preact@latest/dist/preact.min.js
unpkg.com/react@^18/umd/react.production.min.js
If you don't specify a version, the latest tag is used by default.
unpkg.com/preact/dist/preact.min.js
unpkg.com/vue/dist/vue.esm-browser.prod.js
Add a trailing / to a directory URL to view a listing of all the files in that directory.
unpkg.com/react/
unpkg.com/preact/src/
unpkg.com/react-router/
If you'd like to browse an older version of a package, include a version number in the URL.
unpkg.com/react@18/
unpkg.com/react-router@5/
If you don't specify a file path, UNPKG will resolve the file based on the package's default entry point. In many packages that are meant solely for frontend development, like jQuery and GSAP, this will be the value of the main field in the package.json file.
unpkg.com/jquery
unpkg.com/gsap
In modern packages that use the exports field, UNPKG will resolve the file using the default export condition.
So, for example if you publish a package with the following package.json:
{
  "name": "my-package",
  "exports": {
    "default": "./dist/index.js"
  }
}
You would be able to load your package from UNPKG using a <script> tag like:
<script src="https://unpkg.com/my-package"></script>
The full exports spec is supported, including subpaths. So if your package.json looks like:
{
  "name": "my-package",
  "exports": {
    "./exp": {
      "default": "./dist/exp.js"
    }
  }
}
You can load the exp subpath with:
<script src="https://unpkg.com/my-package/exp"></script>
Custom export conditions are supported via the ?conditions query parameter. This allows you to load a different file based on the environment or other conditions. For example, to fetch React using the react-server condition, you could do:
fetch("https://unpkg.com/react?conditions=react-server")
If you'd like to specify a custom build of your package that should be used as the default entry point on UNPKG, you can use either the unpkg field in your package.json or the unpkg export condition in your exports field.
{
  "name": "my-package",
  "unpkg": "./dist/index.unpkg.js", // This works
  "exports": {
    "unpkg": "./dist/index.unpkg.js" // This works, too
    "default": "./dist/index.js"
  }
}
Nobuild Apps 

UNPKG is ideal for loading dependencies in apps that run entirely in the browser without a build step. You can load JavaScript modules from UNPKG directly in your HTML using an import map.
Below is a fully functional Preact app that does not require a build in order to run.
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <script type="importmap">
      {
        "imports": {
          "preact": "https://unpkg.com/preact@10.25.4/dist/preact.module.js",
          "preact/hooks": "https://unpkg.com/preact@10.25.4/hooks/dist/hooks.module.js",
          "htm": "https://unpkg.com/htm@3.1.1/dist/htm.module.js"
        }
      }
    </script>
  </head>
  <body>
    <script type="module">
      import { h, render } from "preact";
      import { useState } from "preact/hooks";
      import htm from "htm";

      const html = htm.bind(h);

      function App() {
        let [count, setCount] = useState(0);

        return html`
          <div>
            <p>Count: ${count}</p>
            <button onClick=${() => setCount(count + 1)}>Increment</button>
          </div>
        `;
      }

      render(html`<${App} />`, document.body);
    </script>
  </body>
</html>
No bundler required! This is ideal for small projects, prototypes, or any situation where you'd like to get something up and running quickly without setting up a build pipeline.
Inline Scripts 

UNPKG provides /run, a small browser helper that scans the page for inline scripts such as text/ts, text/jsx, and text/tsx, transforms them through esm.unpkg.com, and inserts executable module scripts.
<script type="module" src="https://unpkg.com/run"></script>
<script type="text/ts">
  import confetti from "canvas-confetti";

  confetti({ particleCount: 80, spread: 70 });
</script>
<script type="module" src="https://unpkg.com/run"></script>
<script type="text/tsx" data-jsx="automatic">
  import { createRoot } from "react-dom/client";

  createRoot(document.getElementById("root")).render(<h1>Hello!</h1>);
</script>
You can add the following attributes to inline script tags handled by /run:
Attribute	Use
data-filename	Names the inline file for extension inference and clearer diagnostics.
data-target	Sets the JavaScript output target, such as es2022.
data-jsx	Chooses JSX mode, such as automatic.
data-jsx-import-source	Sets the JSX import source, such as preact.
data-dev	Enables development-mode JSX output.
Browser Modules 

For packages that are not already published as browser-ready ESM files, use esm.unpkg.com. This subdomain resolves npm packages, transforms TypeScript and JSX when needed, bundles package internals, rewrites dependency imports to permanent UNPKG URLs, and returns modules that can be loaded directly in modern browsers.
<script type="module">
  import React from "https://esm.unpkg.com/react@18.3.1";
  import { createRoot } from "https://esm.unpkg.com/react-dom@18.3.1/client";

  createRoot(document.getElementById("root")).render(
    React.createElement("h1", null, "Hello from esm.unpkg.com")
  );
</script>
The URL format is the same package URL style you use on UNPKG, but on the esm.unpkg.com subdomain:
https://esm.unpkg.com/:package@:version/:subpath
Versions may be exact versions, npm dist-tags, or semver ranges. If you omit the version, the latest tag is used. Requests redirect to a normalized, version-pinned URL so generated module imports are stable and cacheable.
esm.unpkg.com/preact
esm.unpkg.com/react-dom@18/client
esm.unpkg.com/@floating-ui/dom@1
By default, esm.unpkg.com targets modern browsers with target=es2022, uses production mode, bundles internal package files, leaves dependency packages as rewritten imports, and attaches TypeScript declaration metadata when it can find it.
The following query parameters are available:
Parameter	Use
?target=...	Chooses the output/runtime target. Supported values are es2015 through es2024, esnext, node, deno, and denonext.
?dev, ?env=development	Builds with development conditions and replaces process.env.NODE_ENV with "development". The default is env=production.
?conditions=...	Adds custom package export conditions. You may pass a comma-separated list or repeat the parameter.
?deps=react@18.3.1,react-dom@18.3.1	Overrides dependency versions used when rewriting imports.
?alias=react:preact/compat	Rewrites package specifiers to alternate packages or subpaths.
?external=react,react-dom	Leaves matching dependencies as bare imports. Use ?external=* to externalize all dependencies, or use the shorthand /*pkg form, such as https://esm.unpkg.com/*swr@2.
?bundle, ?standalone, ?no-bundle	Controls dependency bundling. ?bundle=false also disables bundling.
?jsx=automatic, ?jsxImportSource=...	Selects JSX transform mode. Use ?jsx=react or ?jsx=preact for classic presets.
?min, ?sourcemap, ?keep-names, ?ignore-annotations	Controls output minification, inline source maps, function/class names, and tree-shaking annotations.
?no-dts	Suppresses the X-TypeScript-Types response header when declaration files are available.
?meta	Returns JSON metadata for the resolved module, including dependencies, export subpaths, target, bundle mode, types URL, and integrity.
?raw	Serves the raw package file without transforming it. Raw mode cannot be combined with build options like ?target, ?bundle, or ?min.
?css, ?module	Requests package stylesheet entries or returns constructable stylesheet modules for .css files.
?worker	Returns a small module that creates a new Worker(url, { type: "module" }) for the resolved module URL.
Stylesheet packages and stylesheet files can be loaded from the same npm URLs. Direct .css files are served as CSS, package roots with stylesheet metadata redirect to their stylesheet entry, and ?module turns a CSS file into a constructable CSSStyleSheet module.
<link rel="stylesheet" href="https://esm.unpkg.com/bootstrap@5.3.8/dist/css/bootstrap.min.css">

<script type="module">
  import toastStyles from "https://esm.unpkg.com/react-toastify@11.0.5/dist/ReactToastify.css?module";

  document.adoptedStyleSheets = [...document.adoptedStyleSheets, toastStyles];
</script>
Metadata API 

UNPKG serves metadata about the files in a package when you append ?meta to any package root or subdirectory URL.
For example:
unpkg.com/react-router@7.3.0/?meta
unpkg.com/react-router@7.3.0/dist/?meta
This will return a JSON object with information about the files in that directory, including path, size, type, and subresource integrity value.
{
  package: "react-router",
  version: "7.3.0",
  prefix: "/dist/",
  files: [
    {
      path: "/dist/development/dom-export.js",
      size: 195045,
      type: "text/javascript",
      integrity: "sha256-z5j8OHOsGkvfGAjBtW8sbj+M68LLmgLTSjDHk4A5uYA="
    },
    {
      path: "/dist/production/dom-export.js",
      size: 195047,
      type: "text/javascript",
      integrity: "sha256-Gh8wMHW9MO5IMaBq7fOc7szDMRemnO/7Qr8kTK4ebgY="
    },
    // ...
  ]
}
Cache Performance 

UNPKG is a mirror of everything on npm. Every file on npm is automatically available on unpkg.com within minutes of being published.
Additionally, UNPKG runs on Cloudflare's global edge network using Cloudflare Workers, which allow UNPKG to serve billions of requests every day with low latency from hundreds of locations worldwide. The "serverless" nature of Cloudflare Workers also allows UNPKG to scale immediately to satisfy sudden spikes in traffic.
Files are cached on Cloudflare's global content-delivery network based on their permanent URL, which includes the npm package version. This works because npm does not allow package authors to overwrite a package that has already been published with a different one at the same version number.
URLs that do not specify a fully resolved package version number redirect to one that does. This is the latest version when none is specified, or the maximum satisfying version when a semver range is given. For the best chance of getting a cache hit, use the full package version number and file path in your UNPKG URLs instead of an npm tag or semver range.
For example, a URL like unpkg.com/preact@10 will not be a direct cache hit because UNPKG needs to resolve the version 10 to the latest matching version of Preact published with that major, plus it needs to figure out which file to serve. So a short URL like this will always cause a redirect to the permanent URL for that resource. If you need to make sure you hit the cache, use a fixed version number and the full file path, like unpkg.com/preact@10.5.0/dist/preact.min.js.
About
