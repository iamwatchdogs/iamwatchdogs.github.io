#!/usr/bin/env python3

import re
from pathlib import Path
from bs4 import BeautifulSoup


def remove_unnecessary_closing_tags(html_content):
    """
    Remove unnecessary closing tags for void/self-closing elements.

    Args:
        html_content: HTML string

    Returns:
        Cleaned HTML string
    """
    SELF_CLOSING_TAGS = [
        'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
        'link', 'meta', 'param', 'source', 'track', 'wbr'
    ]

    for element in SELF_CLOSING_TAGS:
        pattern = rf'</{element}\s*>'
        html_content = re.sub(pattern, '', html_content, flags=re.IGNORECASE)

        # Also ensure self-closing tags don't have content between open and close
        # Pattern: <element ...>...</element> -> <element ...>
        pattern = rf'<({element}\b[^>]*)>\s*</{element}\s*>'
        html_content = re.sub(
            pattern, r'<\1>', html_content, flags=re.IGNORECASE)

    return html_content


def move_orphan_scripts(html_file_path):
    """
    Parse HTML file and move script tags outside body/head to end of body.
    Modifies the file in place.

    Args:
        html_file_path: Path to HTML file

    Returns:
        Number of scripts moved
    """
    with open(html_file_path, 'r', encoding='utf-8') as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, 'html.parser')

    body = soup.find('body')
    head = soup.find('head')

    if not body:
        print(f"  Warning: No <body> tag found in {html_file_path}. Skipping.")
        return 0

    all_scripts = soup.find_all('script')

    # Find script tags that are not children of body or head
    orphan_scripts = [
        script for script in all_scripts
        if not (
            (body and script.find_parent('body')) or
            (head and script.find_parent('head'))
        )
    ]

    # Move orphan script tags to end of body
    if orphan_scripts:
        for script in orphan_scripts:
            script.extract()
            body.append(script)

        # Write the modified HTML back to the same file
        # Use formatter=None to preserve original formatting and void elements
        output_html = soup.decode(formatter=None)

        # Clean up any unnecessary closing tags
        output_html = remove_unnecessary_closing_tags(output_html)

        with open(html_file_path, 'w', encoding='utf-8') as f:
            f.write(output_html)

    return len(orphan_scripts)


def process_site_directory(site_dir):
    """
    Find and process all HTML files in the _site directory.

    Args:
        site_dir: Path to directory contain static HTML files
    """
    if not site_dir.exists():
        raise FileNotFoundError(
            f"Error: '_site' directory not found in {Path.cwd()}")

    if not site_dir.is_dir():
        raise FileNotFoundError(
            f"Error: '_site' exists but is not a directory")

    # Find all HTML files recursively
    html_files = list(site_dir.rglob('*.html'))

    if not html_files:
        print(f"No HTML files found in {site_dir}")
        return

    print(f"Found {len(html_files)} HTML file(s) in _site directory")
    print("=" * 60)

    total_moved = 0
    files_modified = 0

    # Process each HTML file
    for html_file in html_files:
        print(f"\nProcessing: {html_file.relative_to(Path.cwd())}")
        scripts_moved = move_orphan_scripts(html_file)

        if scripts_moved > 0:
            print(f"  ✓ Moved {scripts_moved} orphan script(s)")
            files_modified += 1
            total_moved += scripts_moved
        else:
            print(f"  - No orphan scripts found")

    print("\n" + "=" * 60)
    print(f"Summary:")
    print(f"  Total files processed: {len(html_files)}")
    print(f"  Files modified: {files_modified}")
    print(f"  Total scripts moved: {total_moved}")


if __name__ == "__main__":
    try:
        SITE_DIR = Path.cwd() / '_site'
        process_site_directory(SITE_DIR)
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
