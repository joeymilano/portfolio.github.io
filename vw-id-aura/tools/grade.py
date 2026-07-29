#!/usr/bin/env python3
"""
ID.AURA 电影调色管线 — 青黑夜间调 (cinematic teal-black grade)
用法: python3 grade.py <input> <output> [--strength 0.0-1.0]
手段: 压暗 · 去饱和 · 冷色温 · 青黑 duotone 倾向 · vignette · film grain
这是"后期调色", 不是"生成美术" —— 素材本体来自外网真实摄影。
"""
import sys, os, math
from PIL import Image, ImageEnhance, ImageOps, ImageFilter, ImageDraw

try:
    import numpy as np
    HAS_NP = True
except Exception:
    HAS_NP = False

# 调色目标(与 tokens.css 对齐)
DEEP   = (10, 20, 24)     # 暗部 -> 深青黑 #0a1418
SHADOW = (16, 32, 38)
HIGH   = (159, 216, 232)  # 亮部 -> 青高光 #9fd8e8
TEAL   = (84, 211, 227)   # 主青 #54d3e3

def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

def grade(src, dst, strength=1.0):
    im = Image.open(src).convert('RGB')
    w, h = im.size

    # 1) 去饱和 (保留 ~30% 原色, 让画面"冷"下来)
    im = ImageEnhance.Color(im).enhance(1.0 - 0.70 * strength)

    # 2) 冷色温: 降红 提蓝 (通道级)
    r, g, b = im.split()
    r = r.point(lambda v: int(v * (1 - 0.22 * strength)))
    b = b.point(lambda v: min(255, int(v * (1 + 0.10 * strength) + 8 * strength)))
    im = Image.merge('RGB', (r, g, b))

    # 3) 青黑 duotone 倾向: 用灰度做 luminance 映射, 与原图按比例混合
    gray = ImageOps.grayscale(im)
    duo = ImageOps.colorize(gray, black=DEEP, mid=SHADOW, white=HIGH, midpoint=110)
    im = Image.blend(im, duo, 0.55 * strength)

    # 4) 压暗 + 对比曲线 (S曲线: 提对比, 暗部更深)
    im = ImageEnhance.Brightness(im).enhance(1.0 - 0.42 * strength)
    im = ImageEnhance.Contrast(im).enhance(1.0 + 0.18 * strength)

    # 5) vignette 暗角 (径向)
    if HAS_NP:
        yy, xx = np.mgrid[0:h, 0:w]
        cx, cy = w / 2, h / 2
        dist = np.sqrt(((xx - cx) / (w * 0.62))**2 + ((yy - cy) / (h * 0.62))**2)
        vig = np.clip(1.0 - 0.55 * strength * np.clip(dist - 0.35, 0, None)**1.6, 0, 1)
        arr = np.asarray(im).astype('float32')
        arr *= vig[..., None]
        im = Image.fromarray(np.clip(arr, 0, 255).astype('uint8'))
    else:
        mask = Image.radial_gradient('L').resize((w, h)).point(lambda v: int(v * 0.5 * strength))
        black = Image.new('RGB', (w, h), (0, 0, 0))
        im = Image.composite(black, im, mask)

    # 6) film grain 颗粒 (叠加单色噪点, 很淡)
    if HAS_NP:
        sigma = 9 * strength
        noise = np.random.normal(0, sigma, (h, w, 1)).repeat(3, axis=2)
        arr = np.asarray(im).astype('float32') + noise
        im = Image.fromarray(np.clip(arr, 0, 255).astype('uint8'))
    else:
        n = Image.effect_noise((w, h), 12 * strength).convert('RGB')
        im = Image.blend(im, n, 0.03 * strength)

    # 7) 轻微柔焦高光 (辉光底): 复制一层高斯模糊柔光叠加
    glow = im.filter(ImageFilter.GaussianBlur(radius=max(6, w // 160)))
    im = Image.blend(im, glow, 0.12 * strength)

    im.save(dst, quality=90)
    print(f"graded -> {dst}  ({w}x{h})  strength={strength}")

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print(__doc__); sys.exit(1)
    src, dst = sys.argv[1], sys.argv[2]
    st = 1.0
    if '--strength' in sys.argv:
        st = float(sys.argv[sys.argv.index('--strength') + 1])
    grade(src, dst, st)
