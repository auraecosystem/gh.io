#!/usr/bin/env python3
"""
update_readme.py
Automated utility to scan repository structure and refresh dynamic sections
inside README.md bounded by comment markers: <!-- START:KEY --> ... <!-- END:KEY -->
"""

import os
import re
from datetime import datetime, timezone
from pathlib import Path

README_FILE = Path("README.md")

# HTML comment markers for dynamic content injection
MARKERS = {
    "TIMESTAMP": ("<!-- START:TIMESTAMP -->", "<!-- END:TIMESTAMP -->"),
    "TREE": ("<!-- START:TREE -->", "<!-- END:TREE -->"),
    "STATS": ("<!-- START:STATS -->", "<!-- END:STATS -->"),
}


def get_formatted_timestamp() -> str:
    """Returns ISO UTC timestamp string."""
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    return f"*Last automated build: `{now}`*"


def generate_directory_tree(root_dir: Path = Path("."), max_depth: int = 2) -> str:
    """Generates a clean ASCII directory tree, excluding ignored folders."""
    ignore_set = {
        ".git",
        "node_modules",
        "dist",
        "build",
        "__pycache__",
        ".venv",
        ".github",
    }

    tree_lines = ["```"]
    
    def _build_tree(path: Path, prefix: str = "", depth: int = 0):
        if depth > max_depth:
            return
        entries = sorted(
            [e for e in path.iterdir() if e.name not in ignore_set and not e.name.startswith(".")],
            key=lambda x: (not x.is_dir(), x.name.lower())
        )
        for idx, entry in enumerate(entries):
            is_last = idx == len(entries) - 1
            connector = "└── " if is_last else "├── "
            tree_lines.append(f"{prefix}{connector}{entry.name}")
            if entry.is_dir() and depth < max_depth:
                next_prefix = prefix + ("    " if is_last else "│   ")
                _build_tree(entry, next_prefix, depth + 1)

    tree_lines.append(root_dir.name if root_dir.name else ".")
    _build_tree(root_dir)
    tree_lines.append("```")
    return "\n".join(tree_lines)


def get_repo_stats() -> str:
    """Calculates basic file metrics across project workspace."""
    total_files = 0
    nf_files = 0
    code_bytes = 0

    for path in Path(".").rglob("*"):
        if path.is_file() and not any(part.startswith(".") or part in {"node_modules", "dist"} for part in path.parts):
            total_files += 1
            code_bytes += path.stat().st_size
            if path.suffix == ".nf":
                nf_files += 1

    kb_size = round(code_bytes / 1024, 2)
    return f"| Total Files | `.nf` Schemas | Code Base Size |\n| :--- | :--- | :--- |\n| **{total_files}** | **{nf_files}** | **{kb_size} KB** |"


def replace_between_markers(content: str, start_tag: str, end_tag: str, replacement: str) -> str:
    """Replaces content strictly between start_tag and end_tag."""
    pattern = re.compile(
        rf"({re.escape(start_tag)}).*?({re.escape(end_tag)})",
        flags=re.DOTALL
    )
    if not pattern.search(content):
        return content
    return pattern.sub(rf"\1\n{replacement}\n\2", content)


def main():
    if not README_FILE.exists():
        print(f"Error: {README_FILE} not found.")
        return

    original_content = README_FILE.read_text(encoding="utf-8")
    updated_content = original_content

    # Inject dynamic content blocks
    updated_content = replace_between_markers(
        updated_content, *MARKERS["TIMESTAMP"], get_formatted_timestamp()
    )
    updated_content = replace_between_markers(
        updated_content, *MARKERS["TREE"], generate_directory_tree()
    )
    updated_content = replace_between_markers(
        updated_content, *MARKERS["STATS"], get_repo_stats()
    )

    if updated_content != original_content:
        README_FILE.write_text(updated_content, encoding="utf-8")
        print("Successfully updated README.md")
    else:
        print("README.md is already up to date.")


if __name__ == "__main__":
    main()
