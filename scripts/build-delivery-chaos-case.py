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
        "description": "赵越的游戏设计案例。用 Unreal Engine 5 做一场万圣节拆家喜剧。推杯子赚金币，坐下躲监控，找到四只猫并合成大坏猫。",
        "hook": "万圣节派对还没开，猫已经把杯子推到了桌沿。监控正转过来。你要再推一下，还是坐下装乖？",
        "watch": "看 15 秒实机", "read": "看看怎么玩", "back": "返回作品", "explore": "回到街机",
        "nav": "项目导航", "chapters": "案例章节",
        "meta": [("我的部分", "赵越 · 玩法、关卡与美术方向"), ("制作", "Unreal Engine 5 · 参赛原型"), ("活动", "Vibe Hacks #06")],
        "headings": ["杯子只差半爪", "监控一转，猫就乖了", "万圣节派对，猫先开场", "阿坏加大福，客厅遭殃", "追猫也要有节奏", "账单留给主人"],
        "short": ["拆家", "装乖", "万圣节", "找猫与合成", "声音", "结算"],
        "body": [
            ["轻点 J 拍一下，按住 E 慢慢推。杯子只挪了一点时，账单纹丝不动。等它从桌沿翻下去，才听见碎裂声，看见金币飞向账单。每件东西只计价一次。", "早期每局只有三次大扑击，玩家容易舍不得出手。现在普通挥爪和扑击随便用。长按 J 时，猫会扭屁股蓄力，三次额度留给这种超级扑。也可以按 Shift 暴冲，让阿坏撞上东西弹回来。"],
            ["摄像头把视野画在地毯上。正常路过没事，连续拍到你捣乱约一秒，挑战就少两秒。收爪坐好还能拿乖猫奖励。嫌镜头碍事，就绕到旁边拍掉它，或按住 E 拔线。监控一黑，账单多 ¥399。", "主人转身前，可以从背后拍他一爪。被抓就抱回猫窝，限时局少 15 秒。能甩开追捕，在视线外待满两秒，才拿得到 ¥500 恶作剧奖金。"],
            ["派对还没开，南瓜灯、蛋糕和糖果已经摆好了。拍翻糖果碗，24 颗糖撒到地上，轻物件也开始反弹。最高那盏南瓜灯还藏着一只猫。", "绕过沙发可以躲视线，沿墙八级台阶则能跳上猫道。橘团走到高处就有了新的用法，从上面落下去，能把落点周围的东西一起震开。"],
            ["拆开藏身处，再走近出现的小猫，就能把它带回实验室。两只猫的本领会合在一起。阿坏本来撞到东西就弹开，和乌梅合成「噪音炸弹」后，撞上去还会自动放出一扇音波。"],
            ["我想致敬《汤姆和杰瑞》追逐戏里的音乐节奏。平时拆家用《CanCan》的快拍，主人开始追，或挑战进入最后 20 秒，就切到追逐曲。逃掉了也让它把这一段奏完，再接回主曲。", "杯子碎了是一下脆响，金币飞进账单是收银机的叮声。最后给猫留一声喵。接下来就是主人要付的账。"],
            ["限时局打完，账单逐项列出弄坏的东西和恶作剧奖金，总金额计入本机排行榜。想摸清楼梯和藏身处，可以先进不限时的自由拆家，找到的猫照样能带走。"],
        ],
        "loop_title": "这局拆家，下局换猫",
        "loop": [("拆", "推杯子、打翻糖果碗，金币飞进主人的账单。"), ("找", "翻纸箱、碰书架、打南瓜灯，把藏起来的猫带回去。"), ("合", "选两只猫，把它们的本领带进下一局。"), ("躲", "监控转过来就坐好。主人追上来，就跑。")],
        "modes": [("180 秒挑战", "冲账单总额，上本机排行榜。"), ("不限时自由拆家", "慢慢找猫和试招，收藏照样保留。")],
        "poster_alt": "万圣节概念海报，几只猫在南瓜灯和散落的糖果间拆家，海报下半部分展示收集、合成和躲监控",
        "poster_caption": "万圣节玩法概念海报",
        "giant_label": "隐藏配方",
        "giant_equation": "阿坏 ＋ 大福",
        "giant_title": "大坏猫",
        "giant_body": "先找齐四只猫，再完成三种其他配方。合成后体型变成 1.8 倍，暴冲撞到重物时能继续往前推。以前撞电视得弹回去，现在连电视也能推走。",
        "giant_caption": "实机合成界面 · 还差三种配方",
        "recipes_title": "看另外五种配方",
        "recipes": [
            ("阿坏 ＋ 橘团", "弹跳炸弹", "暴冲撞了会弹，落地还有震荡。"),
            ("阿坏 ＋ 乌梅", "噪音炸弹", "暴冲撞击自动放音波。"),
            ("橘团 ＋ 乌梅", "低音炮", "先从高处震一下，再按 Q 喵一声。"),
            ("橘团 ＋ 大福", "猫猫山", "变大后落地，震得更远。"),
            ("乌梅 ＋ 大福", "巨型扩音器", "完成两种普通配方后解锁，音波打得更远。"),
        ],
        "audio_beats": [("拆家", "CanCan", "让推、拍、扑有轻快的节奏。"), ("追捕", "Chase", "进入结算时把追逐曲压低，给最后那声喵留位置。"), ("记账", "碎裂声＋收银机", "连锁越长，收银机的叮声越高。")],
        "hero_alt": "开场画面里的奶牛猫阿坏，站在杯子旁，身后是蓝绿色沙发",
        "hero_caption": "开场画面 · 万圣节派对还没开始。", "clip_caption": "Mac 实机混剪 · 成品包与开发版近景 · 可选双语字幕",
        "watch_a11y": "播放《猫手猫脚》实机短片", "captions": "中文字幕",
        "watch_frames": [("01 巡查", "监控在地上划出一条清楚的边界"), ("02 装乖", "猫停下来坐好，等镜头过去"), ("03 断线", "监控被拔掉后，扫描边界消失")],
        "ground": "地面绕行", "high": "沿墙台阶上行，猫道在画面外", "route_alt": "实机客厅图，地面路线绕过沙发，另一条路线沿墙边台阶向上",
        "cats": [("阿坏", "开局搭档。暴冲撞到东西会弹开。"), ("橘团", "藏在快递纸箱。高处落地会震开物件。"), ("乌梅", "线索在书架的杯子。按 Q 发出扇形音波。"), ("大福", "线索在最高的南瓜灯。体型 1.8 倍，推得动重物。")],
        "pair": [("合成前", "阿坏暴冲撞上道具"), ("合成后", "噪音炸弹撞击时放出扇形音波")],
        "receipt": "游戏结算界面 · 台灯、南瓜灯和杯子逐项入账", "credits": "我的部分",
        "credit": "我负责玩法方向、房间路线、角色表现和界面取舍，并推进 Unreal 原型迭代。项目也用到协作者补充的音频、授权模型和 AI 辅助的代码与资产制作。公开仓库收录可分享的源码。",
        "source": "GitHub 游戏主页", "event": "参赛活动", "top": "回到顶部",
    },
    "en": {
        "lang": "en", "path": "/en/delivery-chaos", "name": "Delivery Chaos",
        "kicker": "Delivery Chaos · 2026",
        "description": "Joey Zhao’s game design case study for Delivery Chaos, an Unreal Engine 5 cat mischief game about pushing things off tables, dodging a pet camera and fusing cats.",
        "hook": "The Halloween party hasn’t started, but the cat has already nudged a cup to the edge. The pet camera is turning. One more push, or sit and look innocent?",
        "watch": "Watch 15 seconds", "read": "See how it plays", "back": "Back to work", "explore": "Back to the arcade",
        "nav": "Project navigation", "chapters": "Case study chapters",
        "meta": [("My role", "Joey Zhao · Gameplay, levels and art direction"), ("Build", "Unreal Engine 5 · Jam prototype"), ("Event", "Vibe Hacks #06")],
        "headings": ["One last nudge", "Quick, look innocent.", "The cat gets to the Halloween party first", "Ah Huai + Dafu = bad news for the living room", "A chase needs a beat", "Leave the bill for the owner"],
        "short": ["Smash", "Play innocent", "Halloween", "Find and fuse", "Sound", "The bill"],
        "body": [
            ["Tap J to swat or hold E to inch a cup forward. A little nudge leaves the bill untouched. Once the cup tumbles over the edge, you hear it break and see coins fly into the bill. Each object only counts once.", "The early version gave you three big pounces per round, which made every strike feel expensive. Now you can swipe or pounce whenever you like. Hold J and the cat wiggles its rear to charge one of three super pounces. Or hit Shift and watch Ah Huai ricochet off a prop."],
            ["The pet camera draws its field of view on the rug. Walking through is fine. Get filmed causing trouble for about a second and the timed challenge loses two seconds. Sit still to earn a good-cat bonus, or sneak up and swat the camera down or unplug it. Taking it offline adds ¥399 to the bill.", "Slip behind the owner and swat him before he turns. Get caught and you’re sent back to the cat bed, with 15 seconds off the clock in a timed round. Lose the chase and stay out of sight for two seconds to collect the ¥500 prank bonus."],
            ["The pumpkin lanterns, cake and candy are set out before the party starts. Knock over the bowl and 24 pieces of candy scatter across the floor while light objects start to bounce. The tallest pumpkin lantern is hiding a cat.", "Go around the couch to break line of sight, or hop up eight steps to the catwalk. Jutuan has a second reason to climb. Dropping from up there sends nearby objects flying."],
            ["Break a hiding spot, then walk up to the cat you’ve found to bring it back to the lab. Fusion combines two instincts. Ah Huai usually bounces off whatever he hits. Fuse him with Wumei to make Noise Bomb and the impact also fires a fan-shaped shockwave."],
            ["I borrowed the rhythm of a Tom and Jerry chase. The CanCan gives everyday mischief a quick beat. When the owner gives chase or a timed round reaches its last 20 seconds, the pursuit cue takes over. Escape early and the cue still gets to finish its run.", "A falling cup gets a sharp crack. Coins hit the bill with a cash-register chime. At the end I give the cat one last meow, then let the mess speak for itself."],
            ["At the end of a timed round, the receipt lists damaged objects and prank bonuses. The total goes on the local leaderboard. Free Play gives you time to learn the stairs and find the hiding spots. Any cats you find still come home with you."],
        ],
        "loop_title": "Make a mess. Come back as another cat.",
        "loop": [("Smash", "Push a cup or tip the candy bowl. The coins go straight onto the owner’s bill."), ("Find", "Open boxes and knock things off shelves to uncover hidden cats."), ("Fuse", "Pick two cats and take their combined instincts into the next round."), ("Dodge", "Sit when the camera turns. Run when the owner does.")],
        "modes": [("180-second challenge", "Run up the bill and aim for the local leaderboard."), ("Untimed Free Play", "Find cats and try moves at your own pace. Discoveries carry over.")],
        "poster_alt": "Halloween concept poster showing cats, pumpkin lanterns and scattered candy, with panels on collecting, fusing and evading the camera",
        "poster_caption": "Halloween gameplay concept poster",
        "giant_label": "Hidden recipe",
        "giant_equation": "Ah Huai + Dafu",
        "giant_title": "Big Bad Cat",
        "giant_body": "Find all four cats and complete three other recipes. The result is 1.8 times normal size, and its zoomies keep pushing when they hit heavy objects. The TV is finally something you can run straight at.",
        "giant_caption": "In-game fusion screen · Three recipes to go",
        "recipes_title": "See the other five recipes",
        "recipes": [
            ("Ah Huai + Jutuan", "Bounce Bomb", "Rebound on impact and send out a shockwave on landing."),
            ("Ah Huai + Wumei", "Noise Bomb", "Fire a sound blast on impact during zoomies."),
            ("Jutuan + Wumei", "Subwoofer", "Shake the floor on landing, then press Q to meow."),
            ("Jutuan + Dafu", "Cat Mountain", "Grow bigger and shake a wider area on landing."),
            ("Wumei + Dafu", "Giant Megaphone", "Unlock after two standard recipes and knock things back from farther away."),
        ],
        "audio_beats": [("Mischief", "CanCan", "A quick beat for swipes, nudges and pounces."), ("Pursuit", "Chase", "The chase track drops in volume at the results screen so the final meow can come through."), ("Payment", "Crash + chime", "The cash-register chime rises in pitch as a chain gets longer.")],
        "hero_alt": "Ah Huai, a black-and-white cat beside a cup on a red coffee table in the game’s opening scene",
        "hero_caption": "Opening scene · The Halloween party hasn’t even started.", "clip_caption": "Captured on Mac · packaged gameplay and development close-ups · bilingual captions",
        "watch_a11y": "Play Delivery Chaos gameplay footage", "captions": "English captions",
        "watch_frames": [("01 Scanning", "The pet camera traces its field of view on the floor"), ("02 Playing innocent", "The cat sits still while the camera turns"), ("03 Offline", "The scan disappears when the camera is unplugged")],
        "ground": "Floor route", "high": "Steps up to the catwalk, just out of frame", "route_alt": "Gameplay view with a floor route around the couch and a route up the steps along the wall",
        "cats": [("Ah Huai", "Your first cat. Bounces back after a collision during zoomies."), ("Jutuan", "Hidden in a delivery box. Sends out a shockwave on landing from a height."), ("Wumei", "Follow the cup on the bookshelf. Press Q for a fan-shaped sound blast."), ("Dafu", "Follow the tallest pumpkin lantern. At 1.8× size, Dafu can shove heavy objects.")],
        "pair": [("Before fusion", "Ah Huai collides with a prop during zoomies"), ("After fusion", "Noise Bomb sends out a fan-shaped shockwave on impact")],
        "receipt": "The results screen itemizes a desk lamp, a pumpkin lantern and a cup", "credits": "My part",
        "credit": "I led gameplay direction, room layout, character presentation and UI decisions, and drove iteration on the Unreal prototype. The project also used contributor-supplied audio, licensed models and AI-assisted code and asset production. The public repository contains the shareable source.",
        "source": "Game page on GitHub", "event": "Jam event", "top": "Back to top",
    },
}
CHAPTERS = ("cup", "camera", "room", "fusion", "sound", "receipt")
CATS = ("ah-huai", "jutuan", "wumei", "dafu")


def img(name, alt, width=1440, height=810, eager=False):
    loading = 'loading="eager" fetchpriority="high"' if eager else 'loading="lazy"'
    return f'<img src="{ASSETS}/{name}.webp" alt="{escape(alt, quote=True)}" width="{width}" height="{height}" decoding="async" {loading}>'


def figure(name, alt, caption=None, width=1440, height=810):
    return f'<figure>{img(name, alt, width, height)}<figcaption>{caption or escape(alt)}</figcaption></figure>'


def story(c, i, media, theme=""):
    paragraphs = "".join(f"<p>{escape(p)}</p>" for p in c["body"][i])
    return f"""<section class="chapter {theme}" id="{CHAPTERS[i]}"><div class="wrap">
  <div class="story-heading"><div><span class="scene-number">{i + 1:02d} / {len(CHAPTERS):02d}</span><h2>{c["headings"][i]}</h2></div><div>{paragraphs}</div></div>
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
    links = "".join(f'<a href="#{target}"><span>{i:02d}</span>{label}</a>' for i, (target, label) in enumerate(zip(CHAPTERS, c["short"]), 1))
    moves = "".join(f"<li><h3>{label}</h3><p>{text}</p></li>" for label, text in c["loop"])
    modes = "".join(f"<div><dt>{label}</dt><dd>{text}</dd></div>" for label, text in c["modes"])
    overview = f"""<section class="wrap overview" id="how" aria-labelledby="loop-title">
  <div><h2 id="loop-title">{h("loop_title")}</h2><ol class="moves">{moves}</ol><dl class="modes">{modes}</dl></div>
  {figure("halloween-poster", c["poster_alt"], h("poster_caption"), 880, 1244)}
</section>"""
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
    recipes = "".join(
        f"<li><small>{parents}</small><b>{name}</b><p>{effect}</p></li>"
        for parents, name, effect in c["recipes"]
    )
    roster += f"""<div class="giant-recipe" id="big-bad-cat">
    <div class="giant-copy"><span class="scene-number">{h("giant_label")}</span>
      <p class="giant-equation">{h("giant_equation")} <span aria-hidden="true">=</span></p>
      <h3>{h("giant_title")}</h3><p>{h("giant_body")}</p>
    </div>
    {figure("big-cat-recipe", c["giant_caption"], width=1440, height=810)}
  </div>
  <details class="recipe-list"><summary>{h("recipes_title")}</summary><ul>{recipes}</ul></details>"""
    sound = '<ul class="audio-beats">' + "".join(
        f'<li><span class="scene-number">{label}</span><h3>{cue}</h3><p>{text}</p></li>'
        for label, cue, text in c["audio_beats"]
    ) + "</ul>"
    receipt = f"""<div class="receipt">
    {figure("bill", c["receipt"])}
    <div class="credits"><h3>{h("credits")}</h3><p>{h("credit")}</p>
      <div class="actions"><a class="text-link" href="https://github.com/joeymilano/DELIVER-CHAOS">{h("source")} ↗</a><a class="text-link" href="https://vibecafe.ai/hacks/6">{h("event")} ↗</a></div>
    </div>
  </div>"""
    panels = ((clip, ""), (camera, "dark"), (routes, ""), (roster, "fusion"), (sound, ""), (receipt, ""))
    sections = "\n".join(story(c, i, media, theme) for i, (media, theme) in enumerate(panels))
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
  <link rel="stylesheet" href="{ASSETS}/case.css?v=20261104-gameplay-story">
  <script type="application/ld+json">{schema}</script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-M8F4G6B3C6"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){{dataLayer.push(arguments)}}gtag('js',new Date());const productionHosts=['joeyzhao.cc','www.joeyzhao.cc'];if(productionHosts.includes(window.location.hostname)){{gtag('config','G-M8F4G6B3C6')}}</script>
  <script defer src="{ASSETS}/case.js?v=20261104"></script>
</head>
<body>
<a class="skip" href="#how">{h("read")}</a>
<header id="top" class="project-page-nav"><nav class="wrap nav-content" aria-label="{h("nav")}">
  <a href="/?view=classic&amp;lang={locale}#projects">← {h("back")}</a>
  <div class="lang-toggle"><a href="/en/delivery-chaos" lang="en"{active_en}>EN</a><span aria-hidden="true">/</span><a href="/delivery-chaos" lang="zh-CN"{active_zh}>中</a></div>
</nav></header>
<main>
  <section class="wrap hero"><div>
    <p class="kicker">{h("kicker")}</p>
    <h1 class="hero-title">{img("title-mark", c["name"], 1120, 851, eager=True)}</h1>
    <p class="hook">{h("hook")}</p>
    <div class="actions"><a class="button" href="#play"><span aria-hidden="true">▶</span> {h("watch")}</a><a class="text-link" href="#how">{h("read")} ↓</a></div>
  </div><figure><picture><source media="(max-width: 560px)" srcset="{ASSETS}/hero-mobile.webp">{img("hero", c["hero_alt"], 1200, 900, eager=True)}</picture><figcaption>{h("hero_caption")}</figcaption></figure></section>
  <div class="wrap"><dl class="meta">{meta}</dl>
    <nav class="chapter-nav" aria-label="{h("chapters")}">{links}</nav>
  </div>
  {overview}
  {sections}
</main>
<footer class="wrap project-footer"><a href="/explore/?item=games&amp;lang={locale}">{h("explore")}</a><a href="#top">{h("top")} ↑</a></footer>
</body>
</html>
"""


if __name__ == "__main__":
    for locale, strings in COPY.items():
        (ROOT / (strings["path"].lstrip("/") + ".html")).write_text(render(locale), encoding="utf-8")
