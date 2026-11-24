
# Aura Ecosystem

Experimental Flutter, web, Python, Swift, MCP, and documentation resources for the Aura ecosystem.

**Website:** https://gh-io.github.io/auraecosystem/

## Overview

Aura Ecosystem is a public collection of prototypes and reference material rather than a single finalized application. It includes:

- A Flutter album-fetching example
- Flutter multi-view support
- HTTP tests using Mockito
- TypeScript declaration parsing and transformation experiments
- PDF optimization utilities
- Static GitHub Pages content
- MCP configuration and SwiftUI examples
- Research, quantum-computing, and library-evolution documentation

Some documents describe proposed features or external projects. They should not be treated as implemented functionality unless corresponding source code is present.

## Technology

- Dart and Flutter
- Python
- HTML and JavaScript
- Swift and SwiftUI
- C++ and C# source references
- Jekyll and GitHub Pages
- PyPDF
- Jupyter and nbconvert
- GitHub Actions
- Model Context Protocol (MCP)

## Repository Structure

```gmi
lib/
  main.dart                  Flutter HTTP album example

test/
  fetch_album_test.dart      Mockito-based album tests
  docs/                      Testing documentation

src/
  index.rst                  Documentation source
  page.web4.py               PDF optimization utility

pub.dev/packages/web/
                             Dart TypeScript parsing and transformation code

Docs/                        Project documentation
docs/                        Additional documentation
static/                      Static web assets
web.dev/                     Web-development references
webllms/                     LM Studio and local-model documentation
llms/                        LLM documentation
lmstudio.ai/                 LM Studio browser/module artifacts
dev/                         Development experiments
tools/                       Development utilities

main.dart                    Standalone Dart HTTP example
multi_view_app.dart          Flutter multi-view widget
MCPToolsListView.swift       SwiftUI MCP tools interface
mcp_config.default.json      Empty MCP server configuration
flutter_bootstrap.js         Flutter web bootstrap
requirements.txt             Python dependencies
bash.sh                      Setup and CI shell instructions
```

## Flutter Example

`lib/main.dart` demonstrates retrieving an album from JSONPlaceholder:

```dart
Future<Album> fetchAlbum(http.Client client) async
```

The app:

1. Sends an HTTP request to `https://jsonplaceholder.typicode.com/albums/1`
2. Decodes the JSON response into an `Album`
3. Displays the album title
4. Displays a loading indicator while waiting
5. Throws an exception for unsuccessful responses

Run it inside a complete Flutter project with a suitable `pubspec.yaml`:

```bash
flutter pub get
flutter run
```

Run the Flutter tests:

```bash
flutter test
```

The repository currently does not include a root `pubspec.yaml`, so the Flutter sources need to be placed in or added to a complete Flutter package before they can be built directly.

## Multi-View Flutter Example

`multi_view_app.dart` defines `MultiViewApp`, a widget that observes the Flutter platform view collection and creates a `View` widget for every active `FlutterView`.

It also:

- Observes platform metric changes
- Removes or adds views as they change
- Stores existing view widgets by view ID
- Renders views through `ViewCollection`

## Tests

`test/fetch_album_test.dart` verifies:

- A `200` response produces an `Album`
- A `404` response throws an exception

The test uses generated Mockito mock types:

```dart
@GenerateMocks([], customMocks: [MockSpec<http.Client>(as: #MockHttpClient)])
```

A generated `fetch_album_test.mocks.dart` file is not included. It must be generated with Mockito/build_runner after configuring a complete Flutter project.

## PDF Utility

The utility in `src/page.web4.py` reads `input.pdf`, normalizes each page to 1280×720, removes metadata, compresses content streams, deduplicates objects, and writes `web_asset.pdf`.

Install the dependencies:

```bash
python -m pip install -r requirements.txt
python -m pip install pypdf
```

Place `input.pdf` in the repository root and run:

```bash
python src/page.web4.py
```

Output:

```text
web_asset.pdf
```

`pypdf` is used by the script but is not currently declared in `requirements.txt`.

The static page `static/index.html` embeds:

```html
<iframe src="web_asset.pdf#toolbar=0&navpanes=0"></iframe>
```

Copy or generate `web_asset.pdf` beside that HTML file before deployment.

## MCP Configuration

`mcp_config.default.json` provides an empty MCP server configuration:

```json
{
  "mcpServers": {}
}
```

`MCPToolsListView.swift` provides a SwiftUI interface for:

- Listing available MCP servers and tools
- Searching tools by name or description
- Persisting server enable/disable state
- Showing an empty state when no tools are available

The Swift UI is tied to GitHub Copilot MCP types and may require the corresponding host application framework.

## TypeScript-to-Dart Work

`pub.dev/packages/web/` contains Dart source that:

- Parses TypeScript declaration files
- Reads TypeScript configuration
- Creates a `TSProgram`
- Checks semantic, syntactic, and declaration diagnostics
- Transforms declarations into Dart namespace, class, interface, enum, method, property, and function representations
- Handles TypeScript exports and nested namespaces

This is an experimental source snapshot and is not a complete standalone package checkout.

## GitHub Pages

The repository is published at:

https://gh-io.github.io/auraecosystem/

Three GitHub Actions workflows are included:

### Static deployment

`.github/workflows/static.yml` uploads the entire repository and deploys it as a GitHub Pages artifact.

### Jekyll deployment

`.github/workflows/jekyll.yml` builds a Jekyll site with Ruby and deploys the generated site.

### Notebook CI

`.github/workflows/notebook-ci.yml` installs Python dependencies and executes:

```text
notebook/Notebook.ipynb
```

That notebook is not present in the current repository, so the workflow currently needs a valid notebook path or a checked-in notebook before it can pass.

## Documentation Status

Several Markdown and RST files describe projects and concepts including:

- Aura XLSL spreadsheet formats
- Quantum circuit simulation
- Local AI model tooling
- LM Studio APIs and CLI commands
- Dart generics
- Library evolution
- Research, healthcare, economics, and environment data sheets

Many of these documents contain proposed designs or imported reference material. Confirm behavior against the associated source code before relying on the documentation as implementation guidance.

## Python Dependencies

The declared requirements are:

```text
pandas>=2.0
numpy>=1.24
matplotlib>=3.6
seaborn>=0.12
ipython
notebook
nbconvert
pytest
nbval
```

Install them with:

```bash
python -m pip install -r requirements.txt
python -m pip install pypdf
```

## Repository Caveats

The checkout has some incomplete boundaries:

- No root `pubspec.yaml`
- No generated Mockito mock file
- No complete notebook CI target
- No consolidated `pyproject.toml`
- No declared software license
- No formal contribution guide
- A mix of implemented examples, documentation drafts, and external source/reference material
- No implemented full Aura quantum application or workbook pipeline in the current tree

## Contributing

Before changing a component:

1. Identify whether it is an executable example or reference material.
2. Keep experimental code isolated from complete examples.
3. Add package/build manifests for newly runnable applications.
4. Document required environment variables and external services.
5. Add tests for HTTP, Dart, and Flutter behavior.
6. Update workflows when notebook or source paths change.

## License

No license file or license metadata is currently declared. Obtain permission from the maintainers before redistributing or commercially using the repository contents.
```
