#!/usr/bin/env python3
"""Generate Open Graph image 1200x630 for TurboTech Consulting."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "og-turbotech-share.png"
W, H = 1200, 630


def _gradient_bg(draw: ImageDraw.ImageDraw, img: Image.Image) -> None:
    top = (4, 12, 24)
    bottom = (6, 95, 70)
    for y in range(H):
        t = y / max(H - 1, 1)
        color = tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
        draw.line([(0, y), (W, y)], fill=color)


def _font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/Library/Fonts/Arial.ttf",
    ]
    for path in candidates:
        p = Path(path)
        if p.exists():
            try:
                return ImageFont.truetype(str(p), size)
            except OSError:
                continue
    return ImageFont.load_default()


def main() -> None:
    img = Image.new("RGB", (W, H))
    draw = ImageDraw.Draw(img)
    _gradient_bg(draw, img)

    # Accent bar
    draw.rectangle([0, H - 8, W, H], fill=(16, 185, 129))

    title_font = _font(56)
    sub_font = _font(28)
    small_font = _font(22)

    title = "TurboTech Consulting"
    subtitle = "Conseil IT · Développement web & mobile · Cybersécurité"
    line3 = "Bénin · Afrique de l’Ouest · Europe · Canada"

    draw.text((72, 160), title, fill=(248, 250, 252), font=title_font)
    draw.text((72, 248), subtitle, fill=(148, 163, 184), font=sub_font)
    draw.text((72, 310), line3, fill=(52, 211, 153), font=small_font)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT, format="PNG", optimize=True)
    print(f"Wrote {OUT} ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
