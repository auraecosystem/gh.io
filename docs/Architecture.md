[Visit the published site](https://gh-io.github.io/auraecosystem/) · [Repository](https://github.com/gh-io/auraecosystem)

A multi-platform experimentation repository combining Flutter/Dart examples, web assets, Python utilities, MCP configuration, and evolving ecosystem documentation.

> This repository is under active development and contains several experimental components rather than a single finalized application.

## Features

- Flutter web application example using `FutureBuilder`
- HTTP data-fetching example with JSONPlaceholder
- Mocked HTTP tests with Mockito
- Multi-view Flutter application support
- PDF resizing and optimization utility
- MCP server configuration scaffold
- Technical documents covering Dart generics and library evolution
- GitHub Pages–compatible web assets

## Technology

- **Flutter / Dart** — interactive application and UI experiments
- **Python** — PDF processing and supporting utilities
- **HTML / JavaScript** — generated web assets and GitHub Pages hosting
- **Swift** — MCP tools list view example
- **Shell** — development and setup utilities
- **PyPDF** — PDF scaling, metadata removal, and object compression
- **HTTP / JSON** — remote album fetching example
- **Mockito** — Dart HTTP testing

## Project Structure

```text
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
```

Root-level examples include:

- `main.dart` — standalone Dart HTTP request example
- `multi_view_app.dart` — Flutter multi-platform view management
- `mcp_config.default.json` — default MCP server configuration
- `MCPToolsListView.swift` — Swift MCP tools interface
- `flutter_bootstrap.js` — Flutter web bootstrap script
- `requirements.txt` — Python development dependencies
- `bash.sh` — shell utilities
- `GenericsManifesto.md` — Dart generics documentation
- `LibraryEvolution*.md` and `.rst` — library evolution proposals

## Running the Flutter Example

Install the [Flutter SDK](https://docs.flutter.dev/get-started/install), then run:

```bash
flutter pub get
flutter run
```

For web:

```bash
flutter run -d chrome
```

The application in `lib/main.dart` requests album data from JSONPlaceholder and displays the returned album title.

## Running the Tests

```bash
flutter test
```

The tests cover successful and unsuccessful HTTP responses:

- HTTP `200` returns an `Album`
- HTTP `404` throws an exception

## Python Utilities

Install the Python dependencies:

```bash
python -m pip install -r requirements.txt
```

The PDF utility requires `pypdf`. From the repository root, place an `input.pdf` alongside `src/page.web4.py`, then run:

```bash
python src/page.web4.py
```

The script:

1. Reads `input.pdf`
2. Scales every page to `1280×720`
3. Compresses content streams
4. Removes metadata
5. Deduplicates images and fonts
6. Writes `web_asset.pdf`

## MCP Configuration

The default MCP configuration is:

```json
{
  "mcpServers": {}
}
```

Server entries can be added beneath `mcpServers` as the MCP integration is expanded.

## GitHub Pages

The repository is published through GitHub Pages:

https://gh-io.github.io/auraecosystem/

## Contributing

This repository currently has no formal contribution guide or license. Before contributing:

1. Confirm the intended purpose of the area you are changing.
2. Keep experimental examples isolated from established code.
3. Add tests for Dart or Flutter functionality.
4. Document setup requirements for new runtimes or services.

## License

No license is currently declared in the repository.
