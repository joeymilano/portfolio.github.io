"""Render the two static Delivery Chaos portfolio pages from shared media and localized copy."""
from html import escape
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ORIGIN = "https://joeyzhao.cc"
ASSETS = "/assets/delivery-chaos"

COPY = {
    "zh": {
        "lang": "zh-CN", "path": "/delivery-chaos", "name": "猫手猫脚",
        "kicker": "Delivery Chaos · 2026",
        "description": "赵越的游戏设计案例。从推落一只杯子，到躲开监控、穿过猫道、合成新猫，在 Unreal Engine 5 里把万圣节客厅做成一场拆家喜剧。",
        "hook": "猫把杯子推到桌沿。摄像头正转过来。你是再推一下，还是坐下装乖？",
        "watch": "看 15 秒实机", "read": "看设计过程", "back": "返回作品", "explore": "回到街机",
        "nav": "项目导航", "chapters": "案例章节",
        "meta": [("我的部分", "赵越 · 玩法、关卡与美术方向"), ("制作", "Unreal Engine 5 · 参赛原型"), ("活动", "Vibe Hacks #06")],
        "headings": ["再推一点", "坐好，假装什么都没发生", "客厅有两层", "两只猫能惹多大麻烦", "账单留给主人"],
        "short": ["推杯子", "装乖", "客厅", "合成", "账单"],
        "body": [
            ["最早每轮只有三次大扑击。改版后，平时想拍就拍，三次留给超级扑。杯子摆在桌边时，也可以按住 E 慢慢推。爪子碰到杯子才施力，掉下去才记账。", "同一只爪还能往主人背后拍一下。能甩开他才有奖金，拍完得自己找路跑。"],
            ["摄像头扫过地毯时，地上的细线告诉你它看得到哪儿。短暂经过还有余地，持续被拍到捣乱才扣时间。", "主人听见动静会来追。你可以绕开视线，停下来装乖，也可以趁监控转开，靠近把它拍掉或拔线。"],
            ["从茶几边绕过去容易，想甩开主人，可以沿墙一阶一阶跳上猫道。橘团走同一条路还有另一个目的。它从高处落下会把周围的东西震开。"],
            ["拆开藏身处就能找到新猫。阿坏和乌梅单独出场时，一个撞了会弹开，一个得主动喵。把它们合成噪音炸弹，暴冲撞上东西就会自动发出音波，连没碰到的物件也可能被震飞。"],
            ["倒下的东西各有标价，同一件只算一次。结算看的是杯子、灯和刚才那点小聪明加起来值多少钱。猫喵一声，账单给主人。"],
        ],
        "hero_alt": "开场画面里的奶牛猫阿坏，站在杯子旁，身后是蓝绿色沙发",
        "hero_caption": "开场画面 · 万圣节派对还没开始。", "clip_caption": "Mac 实机混剪 · 成品包与开发版近景 · 可选双语字幕",
        "watch_a11y": "播放《猫手猫脚》实机短片", "captions": "中文字幕",
        "watch_frames": [("01 巡查", "监控在地上划出一条清楚的边界"), ("02 装乖", "猫停下来坐好，等镜头过去"), ("03 断线", "监控被拔掉后，扫描边界消失")],
        "ground": "地面绕行", "high": "沿墙台阶上行，猫道在画面外", "route_alt": "实机客厅图，地面路线绕过沙发，另一条路线沿墙边台阶向上",
        "cats": [("阿坏", "暴冲反弹"), ("橘团", "落地震荡"), ("乌梅", "喵声冲击"), ("大福", "推动重物")],
        "pair": [("合成前", "阿坏暴冲撞上道具"), ("合成后", "噪音炸弹撞击时放出扇形音波")],
        "receipt": "游戏结算界面 · 台灯、南瓜灯和杯子逐项入账", "credits": "我的部分",
        "credit": "我负责玩法方向、房间路线、角色表现和界面取舍，并推进 Unreal 原型迭代。项目也用到协作者补充的音频、授权模型和 AI 辅助的代码与资产制作。公开仓库收录可分享的源码。",
        "source": "查看源码", "event": "参赛活动", "top": "回到顶部",
    },
    "en": {
        "lang": "en", "path": "/en/delivery-chaos", "name": "Delivery Chaos",
        "kicker": "Delivery Chaos · 2026",
        "description": "Joey Zhao’s game design case study for Delivery Chaos, an Unreal Engine 5 cat mischief game about pushing things off tables, dodging a pet camera and fusing cats.",
        "hook": "The cup is on the edge. The pet camera is turning. One more push, or sit and look innocent?",
        "watch": "Watch 15 seconds", "read": "Read the case study", "back": "Back to work", "explore": "Back to the arcade",
        "nav": "Project navigation", "chapters": "Case study chapters",
        "meta": [("My role", "Joey Zhao · Gameplay, levels and art direction"), ("Build", "Unreal Engine 5 · Jam prototype"), ("Event", "Vibe Hacks #06")],
        "headings": ["One more push", "Sit. Look innocent.", "The living room has two levels", "How much trouble can two cats make?", "Leave the bill for the owner"],
        "short": ["The cup", "The camera", "The room", "Fusion", "The bill"],
        "body": [
            ["The first design gave you three big pounces per round. Now you can swipe whenever you like, with three super pounces in reserve. At the edge of the table, hold E to inch the cup forward. The paw has to touch it, and the fall goes on the bill.", "You can also sneak up and swat the owner from behind. The reward only comes if you lose him, so pick your way out before you strike."],
            ["A thin line across the rug shows where the camera can see. A quick pass gives you some leeway. Stay in view while making a mess and you lose time.", "The owner comes after you when he notices trouble. Break his line of sight, sit and play innocent, or get close enough to knock the camera down or unplug it."],
            ["You can take the long way around the coffee table or jump up the steps to the catwalk. The orange cat has another reason to climb. A drop from height sends nearby objects flying."],
            ["Smash a hiding place to find a new cat. On their own, Ah Huai rebounds after a hit and Wumei meows on command. Fuse them into Noise Bomb and a collision during zoomies fires a shockwave that can send untouched objects flying."],
            ["Every item has a price and appears on the bill once. The receipt adds up the cups, lamps and trouble you got away with. The cat gives one last meow and leaves the bill for the owner."],
        ],
        "hero_alt": "Ah Huai, a black-and-white cat beside a cup on a red coffee table in the game’s opening scene",
        "hero_caption": "Opening scene · The Halloween party hasn’t even started.", "clip_caption": "Captured on Mac · packaged gameplay and development close-ups · bilingual captions",
        "watch_a11y": "Play Delivery Chaos gameplay footage", "captions": "English captions",
        "watch_frames": [("01 Scanning", "The pet camera traces its field of view on the floor"), ("02 Playing innocent", "The cat sits still while the camera turns"), ("03 Offline", "The scan disappears when the camera is unplugged")],
        "ground": "Floor route", "high": "Steps up to the catwalk, just out of frame", "route_alt": "Gameplay view with a floor route around the couch and a route up the steps along the wall",
        "cats": [("Ah Huai", "Rebounds during zoomies"), ("Jutuan", "Shockwaves on landing"), ("Wumei", "Meows knock things back"), ("Dafu", "Pushes heavy furniture")],
        "pair": [("Before fusion", "Ah Huai collides with a prop during zoomies"), ("After fusion", "Noise Bomb sends out a fan-shaped shockwave on impact")],
        "receipt": "The results screen itemizes a desk lamp, a pumpkin lantern and a cup", "credits": "My part",
        "credit": "I led gameplay direction, room layout, character presentation and UI decisions, and drove iteration on the Unreal prototype. The project also used contributor-supplied audio, licensed models and AI-assisted code and asset production. The public repository contains the shareable source.",
        "source": "View source", "event": "Jam event", "top": "Back to top",
    },
}
CHAPTERS = ("cup", "camera", "room", "fusion", "receipt")
CATS = ("ah-huai", "jutuan", "wumei", "dafu")


def img(name, alt, width=1440, height=810, eager=False):
    loading = 'loading="eager" fetchpriority="high"' if eager else 'loading="lazy"'
    return f'<img src="{ASSETS}/{name}.webp" alt="{escape(alt, quote=True)}" width="{width}" height="{height}" decoding="async" {loading}>'


def figure(name, alt, caption=None, width=1440, height=810):
    return f'<figure>{img(name, alt, width, height)}<figcaption>{caption or escape(alt)}</figcaption></figure>'


def story(c, i, media, theme=""):
    paragraphs = "".join(f"<p>{escape(p)}</p>" for p in c["body"][i])
    return f"""<section class="chapter {theme}" id="{CHAPTERS[i]}"><div class="wrap">
  <div class="story-heading"><div><span class="scene-number">0{i+1} / 05</span><h2>{c["headings"][i]}</h2></div><div>{paragraphs}</div></div>
  {media}
</div></section>"""


def render(locale):
    c = COPY[locale]
    other = COPY["en" if locale == "zh" else "zh"]
    title = f'{c["name"]} | ' + ("Unreal Engine 5 拆家游戏设计案例 · 赵越" if locale == "zh" else "Game Design by Joey Zhao")
    url = ORIGIN + c["path"]
    og = f"{ORIGIN}{ASSETS}/share-title.jpg"
    schema = json.dumps({
        "@context": "https://schema.org", "@type": "CreativeWork", "name": c["name"],
        "alternateName": other["name"], "description": c["description"], "url": url,
        "inLanguage": c["lang"], "image": og, "dateCreated": "2026-10-31",
        "genre": "3D action comedy",
        "creator": {"@type": "Person", "name": "Joey Zhao", "url": ORIGIN + "/"},
    }, ensure_ascii=False)
    h = lambda key: escape(c[key], quote=True)
    active_zh = ' aria-current="page"' if locale == "zh" else ""
    active_en = ' aria-current="page"' if locale == "en" else ""
    meta = "".join(f"<div><dt>{label}</dt><dd>{value}</dd></div>" for label, value in c["meta"])
    links = "".join(f'<a href="#{target}"><span>0{i}</span>{label}</a>' for i, (target, label) in enumerate(zip(CHAPTERS, c["short"]), 1))
    tracks = "".join(
        f'<track kind="captions" src="{ASSETS}/clip-{code}.vtt" srclang="{code}" label="{COPY[code]["captions"]}"'
        + (" default>" if code == locale else ">")
        for code in ("zh", "en")
    )
    clip = f"""<figure class="clip">
    <video id="play" controls playsinline preload="none" width="1280" height="720" poster="{ASSETS}/clip-poster.webp" aria-label="{h("watch_a11y")}">
      <source src="{ASSETS}/gameplay.mp4" type="video/mp4">{tracks}
      <a href="{ASSETS}/gameplay.mp4">{h("watch")}</a>
    </video><figcaption>{h("clip_caption")}</figcaption>
  </figure>"""
    prank_captions = (("从背后拍一爪", "来不及跑，被抱回猫窝") if locale == "zh" else
                      ("A swat from behind", "Caught and carried back to the cat bed"))
    clip += '<div class="pair prank">' + "".join(
        figure(file, caption) for file, caption in zip(("rear-swat", "rear-caught"), prank_captions)
    ) + "</div>"
    camera = '<div class="sequence">' + "".join(
        figure(name, alt, f"<b>{label}</b> {alt}")
        for name, (label, alt) in zip(("scan", "innocent", "offline"), c["watch_frames"])
    ) + "</div>"
    routes = f"""<figure>
    <div class="route-shot">{img("room", c["route_alt"])}
      <svg viewBox="0 0 1440 810" aria-hidden="true">
        <defs><marker id="floor-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path fill="#a9f4e2" d="M0 0L10 5L0 10z"/></marker><marker id="step-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path fill="#ff9558" d="M0 0L10 5L0 10z"/></marker></defs>
        <path d="M617 659 Q545 560 403 499 T301 312" fill="none" stroke="#24312c" stroke-width="13"/>
        <path d="M617 659 Q545 560 403 499 T301 312" fill="none" stroke="#a9f4e2" stroke-width="7" marker-end="url(#floor-arrow)"/>
        <path d="M340 679 Q206 609 48 437 L30 397 L60 165 L131 79" fill="none" stroke="#442410" stroke-width="13"/>
        <path d="M340 679 Q206 609 48 437 L30 397 L60 165 L131 79" fill="none" stroke="#ff9558" stroke-width="7" stroke-dasharray="13 8" marker-end="url(#step-arrow)"/>
      </svg>
    </div><figcaption><span class="route-key">{h("ground")}</span><span class="route-key up">{h("high")}</span></figcaption>
  </figure>"""
    roster = '<div class="roster">' + "".join(
        figure(file, cat, f"<b>{cat}</b>{trait}", 340, 340)
        for file, (cat, trait) in zip(CATS, c["cats"])
    ) + '</div><div class="pair">' + "".join(
        figure(file, text, f"<b>{label}</b> {text}", 1280, 720)
        for file, (label, text) in zip(("zoomies", "noise-bomb"), c["pair"])
    ) + "</div>"
    receipt = f"""<div class="receipt">
    {figure("bill", c["receipt"])}
    <div class="credits"><h3>{h("credits")}</h3><p>{h("credit")}</p>
      <div class="actions"><a class="text-link" href="https://github.com/joeymilano/DELIVER-CHAOS">{h("source")} ↗</a><a class="text-link" href="https://vibecafe.ai/hacks/6">{h("event")} ↗</a></div>
    </div>
  </div>"""
    sections = "\n".join(story(c, i, media, theme) for i, (media, theme) in enumerate(((clip, ""), (camera, "dark"), (routes, ""), (roster, "fusion"), (receipt, ""))))
    return f"""<!doctype html>
<html lang="{c["lang"]}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{escape(title)}</title>
  <meta name="description" content="{h("description")}">
  <link rel="canonical" href="{url}">
  <link rel="alternate" hreflang="zh-CN" href="{ORIGIN}/delivery-chaos">
  <link rel="alternate" hreflang="en" href="{ORIGIN}/en/delivery-chaos">
  <link rel="alternate" hreflang="x-default" href="{ORIGIN}/delivery-chaos">
  <meta property="og:type" content="article">
  <meta property="og:title" content="{escape(title, quote=True)}">
  <meta property="og:description" content="{h("description")}">
  <meta property="og:url" content="{url}">
  <meta property="og:image" content="{og}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="{h("hero_alt")}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#f4edde">
  <link rel="icon" href="/favicon-32.png">
  <link rel="stylesheet" href="{ASSETS}/case.css?v=20261104-title">
  <script type="application/ld+json">{schema}</script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-M8F4G6B3C6"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments)}}gtag('js',new Date());const productionHosts=['joeyzhao.cc','www.joeyzhao.cc'];if(productionHosts.includes(window.location.hostname)){{gtag('config','G-M8F4G6B3C6')}}</script>
  <script defer src="{ASSETS}/case.js?v=20261104"></script>
</head>
<body>
<a class="skip" href="#cup">{h("read")}</a>
<header id="top" class="project-page-nav"><nav class="wrap nav-content" aria-label="{h("nav")}">
  <a href="/?view=classic&amp;lang={locale}#projects">← {h("back")}</a>
  <div class="lang-toggle"><a href="/en/delivery-chaos" lang="en"{active_en}>EN</a><span aria-hidden="true">/</span><a href="/delivery-chaos" lang="zh-CN"{active_zh}>中</a></div>
</nav></header>
<main>
  <section class="wrap hero"><div>
    <p class="kicker">{h("kicker")}</p>
    <h1 class="hero-title">{img("title-mark", c["name"], 1120, 851, eager=True)}</h1>
    <p class="hook">{h("hook")}</p>
    <div class="actions"><a class="button" href="#play"><span aria-hidden="true">▶</span> {h("watch")}</a><a class="text-link" href="#cup">{h("read")} ↓</a></div>
  </div><figure><picture><source media="(max-width: 560px)" srcset="{ASSETS}/hero-mobile.webp">{img("hero", c["hero_alt"], 1200, 900, eager=True)}</picture><figcaption>{h("hero_caption")}</figcaption></figure></section>
  <div class="wrap"><dl class="meta">{meta}</dl>
    <nav class="chapter-nav" aria-label="{h("chapters")}">{links}</nav>
  </div>
  {sections}
</main>
<footer class="wrap project-footer"><a href="/explore/?item=games&amp;lang={locale}">{h("explore")}</a><a href="#top">{h("top")} ↑</a></footer>
</body>
</html>
"""


if __name__ == "__main__":
    for locale, strings in COPY.items():
        (ROOT / (strings["path"].lstrip("/") + ".html")).write_text(render(locale), encoding="utf-8")
