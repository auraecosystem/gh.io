
# Aura Ecosystem

A public collection of experiments and reference material around the Aura project, including Flutter/Dart examples, web assets, Python utilities, MCP integration examples, and proposals for AI, quantum computing, and research-oriented spreadsheet formats.

The repository is a workbench rather than one integrated application. Components have different maturity levels, and some documents describe proposed features rather than implemented code.

**Published site:** https://gh-io.github.io/auraecosystem/

## Contents

| Path | Purpose |
| --- | --- |
| `lib/main.dart` | Flutter example that fetches album JSON from JSONPlaceholder and displays the title with `FutureBuilder`. |
| `multi_view_app.dart` | Flutter `MultiViewApp` widget that creates a view for each active `FlutterView`. |
| `test/fetch_album_test.dart` | Mockito-based tests for successful and failed album requests. |
| `pub.dev/packages/web/` | Dart source for parsing TypeScript declarations and transforming them into Dart representations. |
| `src/page.web4.py` | PDF utility that scales pages to 1280×720, removes metadata, compresses content, and writes `web_asset.pdf`. |
| `static/index.html` | Static HTML page embedding `web_asset.pdf` in a responsive iframe. |
| `MCPToolsListView.swift` | SwiftUI view for listing, filtering, and enabling MCP tools. |
| `mcp_config.default.json` | Default MCP configuration with an empty server list. |
| `GenericsManifesto.md` | Notes and proposals concerning Dart generics. |
| `LibraryEvolutionManifesto.md` | Material on library evolution and compatibility. |
| `Docs/`, `docs/`, `indtall.md/` | Project notes and web/documentation content. |
| `.github/workflows/` | GitHub Pages and notebook CI workflows. |

Additional directories contain imported documentation, web assets, LLM references, development material, and source snapshots.

## PDF Utility

Install Python dependencies plus `pypdf`:

```bash
python -m pip install -r requirements.txt
python -m pip install pypdf
```

Place `input.pdf` in the repository root, then run:

```bash
python src/page.web4.py
```

This creates `web_asset.pdf` in the current working directory. The script:

- Scales every page to 1280×720
- Compresses PDF content streams
- Removes existing metadata
- Compresses or deduplicates compatible objects
- Writes the processed PDF

The checked-in `static/index.html` references `web_asset.pdf`; copy the generated file into `static/` before publishing that page.

## Flutter Examples

The repository includes:

- `lib/main.dart` — HTTP album fetching and a `FutureBuilder`
- `main.dart` — standalone Dart HTTP request example
- `multi_view_app.dart` — multi-view Flutter application support
- `test/fetch_album_test.dart` — success and failure tests for `fetchAlbum`

A complete Flutter project setup is not currently included. There is no root `pubspec.yaml`, so create or use a Flutter project that declares at minimum:

- `flutter`
- `http`
- `flutter_test`
- `mockito`
- `build_runner`

The test imports `fetch_album_test.mocks.dart`, but that generated Mockito file is not checked into the repository. Generate it with the appropriate build-runner command after setting up the project dependencies.

## GitHub Pages

The repository publishes static content through GitHub Pages:

https://gh-io.github.io/auraecosystem/

Two workflows are available:

- `static.yml` — uploads the repository contents as a Pages artifact
- `jekyll.yml` — builds and deploys a Jekyll site

The static workflow deploys the entire repository rather than a dedicated build directory.

## Notebook CI

`.github/workflows/notebook-ci.yml` installs Python requirements and Jupyter, then attempts to execute:

```text
notebook/Notebook.ipynb
```

That notebook is not currently present in the repository, so update the workflow with a valid notebook path or add the missing notebook before expecting this job to pass.

## Project Notes

Several documents describe:

- An Aura XLSL/Excel-compatible research ecosystem
- Quantum circuit simulation
- Drag-and-drop quantum gates
- Multi-qubit visualization
- AI and quantum pipelines
- Lifespan analysis
- Spreadsheet-based data, simulation, and reasoning formats

These documents are proposals and design notes unless corresponding implementation files are present. Verify setup instructions and feature claims against the code before using them as operational guides.

## Known Repository Characteristics

- No unified build manifest or application entry point
- No root `pubspec.yaml`
- No repository-level `LICENSE`
- No formal contribution guide
- Several large or experimental directories contain imported or reference material
- Python utilities may require dependencies not listed in `requirements.txt`
- The notebook CI workflow references a missing notebook

## Contributing

Keep changes focused on one example or documentation area. For new runnable components:

1. Add a complete package or build manifest.
2. Document required software and environment variables.
3. Include setup and test commands.
4. Avoid placing experiments in directories without identifying their status.
5. Add tests for executable Dart or Flutter behavior.

## License

No license is currently declared in this repository. Obtain permission from the maintainers before redistributing or commercially using the contents.
```
lib/
  main.dart              Flutter app with HTTP fetching and FutureBuilder

test/
  fetch_album_test.dart  Album fetch success and failure tests

src/
  index.rst              Sphinx-style source documentation
  page.web4.py           PDF web-optimization utility

docs/                    Additional documentation
Docs/                    Documentation material
dev/                     Development resources
tools/                   Development tools
llms/                    LLM-related resources
lmstudio.ai/             LM Studio-related assets
pub.dev/                 Pub-related resources
web.dev/                 Web-development resources
webllms/                 Web/LLM resources
static/                  Static assets
