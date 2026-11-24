## What this is
`auraecosystem/Auraecosystem.github.io` is an experimental GitHub Pages repository combining an **LMLM (Large Multimodal Learning Model) orchestration concept**, notebooks, documentation, static-site assets, and small Flutter/Dart and SwiftUI examples. Its most concrete runnable demonstration is a local Python notebook simulation of task routing, execution, and verification—not a production AI runtime.

### Stack
- **Languages:** Python, Dart, Swift, plus HTML, JavaScript, and assorted documentation formats
- **Frameworks / runtimes:** Jupyter notebooks; Flutter for a small example app; GitHub Pages workflows for publishing
- **Notable libraries:** pandas, NumPy, Matplotlib, Seaborn, Jupyter, and Flutter’s `http` package

## How it’s organized
```text
Notebook/         LMLM presentation and executable orchestration notebooks
Docs/             Short project overview and nested reference material
docs/             Architecture notes and a longer web-project document
lib/              Flutter album-fetching example
test/             Mocked HTTP tests for the Flutter example
src/              Project proposal in reStructuredText and a small PDF utility
static/           HTML page that embeds a PDF
webllms/docs/     Large LM Studio documentation snapshot
llms/             Unrelated YAML-library documentation
lmstudio.ai/      Nearly empty placeholder file
web.dev/          Miscellaneous web, C++, and UI artifacts
.github/workflows/ Pages deployment and notebook CI workflows
```

Other top-level files include Swift library-evolution notes, an MCP tools-list SwiftUI view, an empty MCP server config, a bundled GitHub MCP executable, and checksum data. The repository has no root `pubspec.yaml` or unified application manifest.

**How it fits together:** The interactive LMLM notebook defines `LMLMRuntime`, model capability registration, task routing, simulated execution, event logging, and verification checks. Its “tools” and deployments are explicitly simulated; the notebook does not connect to real model providers or perform those external actions. The Flutter example is separate: `lib/main.dart` fetches one JSONPlaceholder album and displays its title. The Pages and notebook workflows are separate too; the notebook CI references `notebook/Notebook.ipynb`, which doesn’t match the checked-in `Notebook/` directory and filenames.

## How to run it
There is no single command to build and run the whole repository. To open the main interactive notebook, install the declared Python dependencies and start Jupyter:

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
python -m pip install -r requirements.txt
jupyter notebook Notebook/LMLM_Interactive_Executable_Notebook.ipynb
```

`Notebook/LMLM_Presentation_Notebook.ipynb` is the presentation-only companion. The Flutter example needs a Flutter project setup and dependencies; this repository does not include the `pubspec.yaml` needed to run it directly. The checked-in notebook CI path should also be reconciled with the actual notebook location before relying on that workflow.

## Try asking
- “Can you check whether the notebook CI workflow runs the notebooks that are actually in `Notebook/`?”
- “Which parts of the LMLM notebook are real implementations versus simulations?”
- “How do the two Pages workflows interact, and which one is currently publishing this repo?”
