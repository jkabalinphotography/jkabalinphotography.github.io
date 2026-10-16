#!/usr/bin/env python3
"""Fill each collection's photo list from the files in photos/<slug>/.

Run from this folder:  python3 update_photos.py

- New images in a folder are added; deleted ones are removed.
- Captions you've typed into collections.js are kept.
- If a collection's cover is a placeholder or missing, the first photo becomes the cover.
- Collections whose folder is still empty keep their placeholder images.
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "collections.js")
PHOTOS = os.path.join(HERE, "photos")
IMAGE_EXT = {".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"}
BIG_FILE = 1.5 * 1024 * 1024

text = open(DATA, encoding="utf-8").read()
match = re.search(r"const COLLECTIONS\s*=\s*(\[.*\])\s*;?\s*$", text, re.S)
if not match:
    sys.exit("Couldn't find 'const COLLECTIONS = [...]' in collections.js")
header = text[: match.start(1)]
try:
    collections = json.loads(match.group(1))
except json.JSONDecodeError as e:
    sys.exit(f"collections.js isn't valid JSON (line {e.lineno} of the list): {e.msg}")

big_files = []
for c in collections:
    folder = os.path.join(PHOTOS, c["slug"])
    os.makedirs(folder, exist_ok=True)
    files = sorted(
        f for f in os.listdir(folder)
        if os.path.splitext(f)[1].lower() in IMAGE_EXT and not f.startswith(".")
    )
    if not files:
        print(f"  {c['title']}: no photos yet (keeping placeholders)")
        continue

    captions = {p["src"]: p.get("caption", "") for p in c.get("photos", [])}
    c["photos"] = []
    for f in files:
        src = f"photos/{c['slug']}/{f}"
        c["photos"].append({"src": src, "caption": captions.get(src, "")})
        if os.path.getsize(os.path.join(folder, f)) > BIG_FILE:
            big_files.append(src)

    srcs = {p["src"] for p in c["photos"]}
    if c.get("cover") not in srcs:
        c["cover"] = c["photos"][0]["src"]
    print(f"  {c['title']}: {len(files)} photo{'' if len(files) == 1 else 's'}")

with open(DATA, "w", encoding="utf-8") as fh:
    fh.write(header + json.dumps(collections, indent=2, ensure_ascii=False) + ";\n")
print("Updated collections.js")

if big_files:
    print(f"\nHeads up: {len(big_files)} file(s) are over 1.5 MB and will load slowly.")
    print("Export at ~2000px on the long edge, JPEG quality ~80. Largest offenders:")
    for src in big_files[:10]:
        print("  ", src)
