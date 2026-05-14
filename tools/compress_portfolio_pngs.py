#!/usr/bin/env python3
"""Resize / recompress portfolio PNGs. Large files are downscaled for web."""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PORTFOLIO = ROOT / "assets" / "portfolio"
DEFAULT_MAX = 1400
HEAVY_BYTES = 700_000
HEAVY_MAX = 720


def process(path: Path) -> None:
    before = path.stat().st_size
    with Image.open(path) as im:
        has_alpha = im.mode in ("P", "RGBA")
        im = im.convert("RGBA") if has_alpha else im.convert("RGB")
        w, h = im.size
        max_edge = DEFAULT_MAX
        if before >= HEAVY_BYTES:
            max_edge = min(max_edge, HEAVY_MAX)
        if max(w, h) > max_edge:
            ratio = max_edge / max(w, h)
            nw = max(1, int(w * ratio))
            nh = max(1, int(h * ratio))
            im = im.resize((nw, nh), Image.Resampling.LANCZOS)
        im.save(path, format="PNG", optimize=True, compress_level=9)
    after = path.stat().st_size
    print(f"{path.name}: {before // 1024} KB -> {after // 1024} KB")


def main() -> None:
    for path in sorted(PORTFOLIO.glob("*.png")):
        if path.stat().st_size > 90_000:
            process(path)


if __name__ == "__main__":
    main()
