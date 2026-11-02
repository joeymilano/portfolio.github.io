# coding: utf-8
"""Build both languages of the MissionGet editorial case from one template."""
from pathlib import Path
import html,json
root=Path(__file__).resolve().parent.parent
sizes=json.loads((root/'scripts/missionget-image-sizes.json').read_text())
analytics='''<script async src="https://www.googletagmanager.com/gtag/js?id=G-M8F4G6B3C6"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());const productionHosts=['joeyzhao.cc','www.joeyzhao.cc'];if(productionHosts.includes(window.location.hostname)){gtag('config','G-M8F4G6B3C6')}</script>'''
copy={'zh': {'lang': 'zh-CN',
        'path': '/missionget-glasses',
        'other': '/en/missionget-glasses',
        'switch': 'EN',
        'title': 'MissionGet AI 眼镜办公助手｜赵越的产品设计案例',
        'description': '从眼镜语音到手机确认，再到电脑工作台。赵越在苏客松推进 MissionGet AI 眼镜办公助手的产品定义、体验设计与原型整合。',
        'back': '回到工作室',
        'tag': 'MissionGet',
        'status': '苏客松 2026',
        'h1': '戴上 AI 眼镜<br><em>开口办公</em>',
        'intro': '用眼镜说需求，小觅接话，MissionGet 工作台继续执行',
        'tryit': '交办一句试试',
        'watch': '看 29 秒演示',
        'heroalt': '佩戴 AI 眼镜的女性在明亮的商务空间中走动，移动办公场景演绎',
        'herocaption': '场景演绎 · AI 辅助视觉',
        'role': '我的部分',
        'roletext': '产品定义 / 体验设计 / 眼镜端整合',
        'team': '团队协作',
        'teamtext': 'MissionGet 平台团队 × OneGlance AG05',
        'format': '这次想试试',
        'formattext': '把桌前的 AI 协作，延伸到戴着眼镜的时候',
        'scroll': '往下走，看看这句话如何抵达工作台',
        'chapters': ['出发', '卡住', '重新安排', '交办一句', '接到同一处', '带到现场', '下一步'],
        'opening': '工作为什么总要<br>等到回电脑前',
        'openingp': '路上想起的一个待办，开会时冒出来的一个想法。记下来以后，还要再找回来、解释一遍，再打开工具去做。我们想把这个来回缩短。',
        'openingcaption': '眼镜作为输入终端；任务与成果留在 MissionGet。',
        'hardware': '现成的眼镜<br>新的工作入口',
        'hardwarep': '我们使用 AG05 和厂商 SDK，把重点放在它后面的体验。眼镜采集声音，手机承接对话，小觅把请求带入同一个 MissionGet 工作台。',
        'hardwaretags': ['眼镜 · 采集', '手机 · 对话与确认', '工作台 · 执行与文件'],
        'stuck': '眼镜连上了<br>办公还没开始',
        'stuckp': '第一版已经能录音、识别文字。可说完一句话，仍要在手机上结束录音、发送，再找任务入口。手空出来了，操作还跟在后面。',
        'stuckquote': '说完以后，为什么还要一直点？',
        'voicecaption': '早期语音界面',
        'voicealt': '早期真机语音页，显示识别文字与交给Agent等多个入口',
        'connectionTitle': '把连接、录音和执行分开',
        'connectionp': '眼镜控制、蓝牙音频和任务执行，是三种不同的状态。分开呈现，才能知道当前进度和下一步操作。',
        'connection': ['连接眼镜', '听见指令', '核对请求', '交给工作台'],
        'turn': '少点几次手机<br>把话接下去',
        'turnp': '短指令停顿后结束，回复后继续听。会议录音则走独立入口，保留录音和转写。真正会改动任务的动作，仍然停下来，请人确认。',
        'before': '最初',
        'after': '调整后',
        'flowLabel': '操作流程复原',
        'flowbefore': ['开始录音', '手动结束', '发送文字', '再找任务入口'],
        'flowafter': ['说出需求', '停顿后识别', '小觅接话', '核对并确认'],
        'flowbeforep': '一次请求，被拆成了好几个手机操作。',
        'flowafterp': '把录音结束和继续接话交给系统，把业务决定留给人。',
        'choice': '少点操作<br>保留人的决定',
        'playtitle': '用眼镜<br>交办一件事',
        'playp': '会议纪要、待办、文稿，选一句试试',
        'sample': '交互演示 · 固定示例',
        'sceneLabel': '选择办公场景',
        'scenes': ['整理会议纪要', '记下一个待办', '起草一份方案'],
        'input': 'AI 眼镜',
        'review': '02 / 手机',
        'output': 'MissionGet 工作台',
        'ready': '选一句，看看它会去哪。',
        'pending': '小觅正在整理这句话…',
        'reviewmsg': '我理解的是下面这件事。请先核对。',
        'confirm': '确认交给小觅',
        'cancel': '重新选择',
        'working': '请求已确认，工作台正在推进。',
        'done': '示例文件已保存。',
        'reset': '再试一次',
        'document': '打开示例文件',
        'example': '以下为交互示例，不是真实生成或保存的文件。',
        'skip': '直接看示例结果',
        'playnote': '可以反复试，不会改动真实账号中的任务。',
        'phaseLabels': ['等待输入', '整理请求', '等待核对', '工作台推进', '查看成果'],
        'same': '手机与电脑<br>同一个工作台',
        'samep': '第一版另做了任务页，手机和官网成了两套入口。后来我们把小觅接回原有账号和工作台，让对话、任务和文件同步。',
        'prototype': '早期独立原型',
        'platform': '接入正式工作台',
        'compareLabel': '切换查看工作台整合前后',
        'compareBefore': '早期原型',
        'compareAfter': 'MissionGet 工作台',
        'workbenchalt': 'MissionGet正式工作台，左侧任务、中间编辑区与右侧AI工作流',
        'integrationp': '去掉重复的网页导航和小觅浮窗，沿用同一账号。手机发起的请求，能在电脑的工作台找到；确认后的文件，也回到同一份任务里。',
        'proofTitle': '手机交办，电脑接着做',
        'proofp': '用一份测试文稿完成联验：手机发起请求，工作台保存文件，电脑端看到同一成果。',
        'proof': ['手机端发起请求', '确认后生成并保存', '电脑端看到同一文件'],
        'proofnote': '2026.11 · 跨端联验记录 · 测试文稿',
        'field': '把 AI 眼镜办公<br>带到现场',
        'fieldp': '戴上眼镜，当场交办，打开电脑看结果',
        'eventalt': '路演现场，一位佩戴AI眼镜的参赛者站在MissionGet展板和电脑工作台旁',
        'eventcap': '苏客松现场',
        'campaigncap': 'AI 场景视觉',
        'videoLabel': '播放项目演示',
        'videocap': 'AI 眼镜办公 · 29 秒演示',
        'videofallback': '浏览器暂不支持播放。可直接打开视频。',
        'next': '下一步<br>把手机放回口袋',
        'nextp': '这次整合把语音、手机与工作台接得更近。眼镜实体按键的照片回传仍未完成本轮验收，前台语音对话也有使用条件。接下来的工作，是让这些边界变得更清楚、更稳定。',
        'learning': '这次设计一直做到界面之外<br>连上、听见、确认、执行，每一步都需要被接住',
        'credits': '产品与体验 / Joey Zhao<br>平台开发 / MissionGet 团队<br>眼镜与 SDK / OneGlance AG05<br>视觉素材 / AI '
                   '场景图、真机截图与现场照片',
        'contact': '一起做点新东西',
        'contactp': 'AI 产品、跨端体验、可穿戴交互，欢迎聊聊。',
        'contactbtn': '联系 Joey',
        'live': '了解 MissionGet',
        'all': '全部作品',
        'top': '回到顶部',
        'zoom': '放大查看',
        'close': '关闭',
        'videoClose': '关闭视频',
        'notes': '制作与验证边界',
        'readmore': '项目分工与技术细节',
        'details': '先拆清眼镜控制与音频连接，再分别处理录音和播报；区分短指令与会议录音；复用官网账号与任务文件，保留业务确认。这个案例呈现的是设计与原型整合过程，不宣称眼镜硬件由我设计，也不将固定演示写成线上执行。'},
 'en': {'lang': 'en',
        'path': '/en/missionget-glasses',
        'other': '/missionget-glasses',
        'switch': '中',
        'title': 'MissionGet AI Glasses Office Assistant | Joey Zhao',
        'description': 'A wearable office experiment connecting glasses, a phone and an AI workbench. '
                       'Product definition, experience design and prototype integration by Joey Zhao.',
        'back': 'Back to the studio',
        'tag': 'MissionGet',
        'status': '2026 Hackathon · Experience prototype',
        'h1': 'AI glasses<br><em>for office work</em>',
        'intro': 'Talk to Xiao Mi. Keep work moving in the MissionGet workbench.',
        'tryit': 'Try handing off a task',
        'watch': 'Watch the 29-second demo',
        'heroalt': 'A professional wearing AI glasses in a bright atrium, an illustrated mobile-work '
                   'scenario',
        'herocaption': 'Scenario illustration · AI-assisted visual',
        'role': 'MY PART',
        'roletext': 'Product definition, experience design and glasses-side prototype integration',
        'team': 'BUILT WITH',
        'teamtext': 'MissionGet platform team; glasses and SDK by the hardware vendor',
        'format': 'THE EXPERIMENT',
        'formattext': 'Take an AI workflow beyond the desk',
        'scroll': 'Follow a sentence all the way to the workbench',
        'chapters': ['The idea',
                     'The friction',
                     'The decisions',
                     'Try it',
                     'One workspace',
                     'In the room',
                     'What is next'],
        'opening': 'So much work waits<br>until we get back.',
        'openingp': 'An action item on the way somewhere. An idea in the middle of a meeting. Capturing '
                    'it is only the start. Later, we still have to find it, explain it again and open '
                    'the right tool. We wanted to shorten that journey.',
        'openingcaption': 'Glasses are the input. Tasks and deliverables live in MissionGet.',
        'hardware': 'Existing hardware.<br>A new way into work.',
        'hardwarep': 'We used AG05 glasses and the vendor SDK. Our focus was the experience behind '
                     'them. Glasses capture speech, a phone carries the conversation, and Xiao Mi (小觅), '
                     'MissionGet’s assistant, connects the request to the same MissionGet workbench.',
        'hardwaretags': ['Glasses · capture', 'Phone · talk and confirm', 'Workbench · work and files'],
        'stuck': 'Connected.<br>But not working yet.',
        'stuckp': 'The first version could record and transcribe. But finishing a sentence still meant '
                  'stopping the recording, sending the text and finding the task entry on a phone. The '
                  'steps had followed us away from the desk.',
        'stuckquote': 'Why am I still tapping after I finish speaking?',
        'voicecaption': 'Early voice interface',
        'voicealt': 'Early iPhone voice screen with transcribed text and several competing actions',
        'connectionTitle': 'There is more after “connected.”',
        'connectionp': 'A control connection does not mean the microphone is ready. Receiving text does '
                       'not mean a task ran. People need to know what happened and who takes over next.',
        'connection': ['Connect glasses', 'Capture speech', 'Review request', 'Hand off work'],
        'turn': 'Let the conversation<br>carry on.',
        'turnp': 'A pause ends a short command; after the reply, listening can continue. Meeting '
                 'recording gets a separate path, with audio and transcripts kept. Actions that change '
                 'real work still stop for a person to confirm.',
        'before': 'Before',
        'after': 'After',
        'flowLabel': 'Reconstructed interaction flow',
        'flowbefore': ['Start recording', 'Stop manually', 'Send the text', 'Find the task'],
        'flowafter': ['Say the request', 'Pause to finish', 'Hear the reply', 'Review and confirm'],
        'flowbeforep': 'One request was scattered across several phone actions.',
        'flowafterp': 'Let the system finish recording and continue the conversation. Keep the business '
                      'decision with the person.',
        'choice': 'Fewer taps.<br>A deliberate moment to decide.',
        'playtitle': 'Your turn.<br>Hand off a sentence.',
        'playp': 'Pick a scenario and follow the request from the glasses to the workbench.',
        'sample': 'INTERACTIVE DEMO · fixed examples',
        'sceneLabel': 'Choose an office scenario',
        'scenes': ['Meeting notes', 'A quick task', 'A first draft'],
        'input': 'AI GLASSES',
        'review': '02 / PHONE',
        'output': 'MISSIONGET WORKBENCH',
        'ready': 'Pick a sentence. See where it goes.',
        'pending': 'Xiao Mi is shaping the request…',
        'reviewmsg': 'Here is what I understood. Please review it first.',
        'confirm': 'Confirm the handoff',
        'cancel': 'Choose again',
        'working': 'Confirmed. The workbench takes it from here.',
        'done': 'The example file is saved.',
        'reset': 'Try again',
        'document': 'Open the example file',
        'example': 'This is an interaction example, not a file generated or saved to a real account.',
        'skip': 'Skip to the example result',
        'playnote': 'Try it again as often as you like. Your real account stays untouched.',
        'phaseLabels': ['Ready', 'Preparing', 'Review', 'Working', 'Delivered'],
        'same': 'One MissionGet.<br>One shared piece of work.',
        'samep': 'A separate task page was quick to make. Connecting it to the actual platform took '
                 'more decisions about accounts, messages and files. We brought the phone back into the '
                 'existing product so the conversation could reach the work on the desktop.',
        'prototype': 'Early standalone prototype',
        'platform': 'Official workbench',
        'compareLabel': 'Compare the early prototype and integrated workbench',
        'compareBefore': 'Early standalone prototype · too many forms and parallel actions',
        'compareAfter': 'Official MissionGet workbench · tasks, files and AI workflow together',
        'workbenchalt': 'The actual MissionGet workbench with tasks, editing and AI workflow columns',
        'integrationp': 'We removed duplicate navigation and assistant launchers, and reused the same '
                        'account. Requests initiated on the phone could be found on the desktop; '
                        'confirmed files returned to the same task.',
        'proofTitle': 'This time, the file showed up at the other end.',
        'proofp': 'We checked the handoff with a test document: a request started on the phone, a file '
                  'was saved in the workbench, and the same result appeared on desktop. The sentence '
                  'finally had somewhere to return to.',
        'proof': ['Request from the phone',
                  'Generate and save after confirmation',
                  'Same file on desktop'],
        'proofnote': 'November 2026 · cross-device integration check · test document',
        'field': 'Then we brought it<br>into the room.',
        'fieldp': 'Glasses, a phone, a workbench and a poster, together on the demo table. A rendered '
                  'idea became something people could see and ask about.',
        'eventalt': 'At the hackathon, a participant wears AI glasses beside the MissionGet poster and '
                    'laptop workbench',
        'eventcap': 'At the hackathon',
        'campaigncap': 'AI-assisted scenario visual',
        'videoLabel': 'Play the project demo',
        'videocap': 'AI glasses for work · 29-second demo',
        'videofallback': 'Your browser cannot play this video. Open the file directly.',
        'next': 'A few fewer taps.<br>That is what comes next.',
        'nextp': 'This prototype brought voice, phone and workbench closer together. Photo transfer '
                 'from the physical glasses button was still awaiting acceptance, and foreground voice '
                 'interaction has conditions. Next is making those boundaries clearer and more '
                 'dependable.',
        'learning': 'The design continued beyond the screen.<br>Connect, listen, confirm, execute. Each '
                    'handoff needed care.',
        'credits': 'Product definition and experience design / Joey Zhao<br>Platform and engineering / '
                   'MissionGet team<br>Hardware and SDK / OneGlance AG05 vendor<br>Visuals / '
                   'AI-assisted scenes; device interfaces and event photos labeled separately',
        'contact': 'Let’s make the next thing work.',
        'contactp': 'AI products, cross-device experiences and wearable interaction.',
        'contactbtn': 'Talk to Joey',
        'live': 'Visit MissionGet',
        'all': 'All projects',
        'top': 'Back to top',
        'zoom': 'Enlarge image',
        'close': 'Close',
        'videoClose': 'Close video',
        'notes': 'Production and validation notes',
        'readmore': 'Credits and technical details',
        'details': 'Separate device control from audio readiness. Give short commands and meeting '
                   'recording distinct paths. Reuse the official account, tasks and files while keeping '
                   'business confirmation. This case covers design and prototype integration; it does '
                   'not claim hardware authorship or present fixed examples as live execution.'}}

def build(locale):
 c=copy[locale];t=lambda key:c[key];a='/assets/missionget';e=html.escape
 def picture(name,alt,cls='',eager=False):
  return f'<img class="{cls}" src="{a}/images/{name}.webp" width="{sizes[name][0]}" height="{sizes[name][1]}" alt="{e(alt)}" loading="{"eager" if eager else "lazy"}" decoding="async"'+(' fetchpriority="high"' if eager else '')+'>'
 def photo(name,alt,caption,cls=''):
  return f'<figure class="{cls}"><button class="zoom" type="button" aria-label="{e(t("zoom"))+": "+e(alt)}">{picture(name,alt)}</button><figcaption>{caption}</figcaption></figure>'
 nav=''.join(f'<a href="#{id}" aria-label="{e(name)}"><span>{i+1:02}</span><b>{name}</b></a>' for i,(id,name) in enumerate(zip(['idea','friction','decisions','try','workspace','field','next'],t('chapters'))))
 meta=''.join(f'<div><dt>{t(k)}</dt><dd>{t(v)}</dd></div>' for k,v in [('role','roletext'),('team','teamtext')])
 connection=''.join(f'<li><span>{i+1:02}</span>{v}</li>' for i,v in enumerate(t('connection')))
 flow=''.join(f'<li><span>{i+1:02}</span><b data-flow="{i}">{v}</b></li>' for i,v in enumerate(t('flowafter')))
 scenarios=''.join(f'<button type="button" data-scenario="{i}" aria-pressed="false"><span>0{i+1}</span>{v}<span aria-hidden="true">↗</span></button>' for i,v in enumerate(t('scenes')))
 proofs=''.join(f'<li><span>↗</span><h3>{v}</h3></li>' for v in t('proof'))
 captions={'before':t('compareBefore'),'after':t('compareAfter')}
 runtime={k:t(k) for k in ['ready','pending','reviewmsg','confirm','cancel','working','done','reset','document','example','phaseLabels','flowbefore','flowafter','flowbeforep','flowafterp']}
 runtime.update(lang=locale,captions=captions)
 schema={'@context':'https://schema.org','@type':'CreativeWork','name':t('title'),'description':t('description'),'url':'https://joeyzhao.cc'+t('path'),'inLanguage':t('lang'),'image':'https://joeyzhao.cc/assets/missionget/images/og-cover.jpg','dateCreated':'2026-11-01','dateModified':'2026-11-02','creator':{'@type':'Person','name':'Joey Zhao','url':'https://joeyzhao.cc/'}}
 page=f'''<!doctype html>
<html lang="{t('lang')}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{t('title')}</title>
<meta name="description" content="{e(t('description'))}"><link rel="canonical" href="https://joeyzhao.cc{t('path')}"><link rel="alternate" hreflang="zh-CN" href="https://joeyzhao.cc/missionget-glasses"><link rel="alternate" hreflang="en" href="https://joeyzhao.cc/en/missionget-glasses"><link rel="alternate" hreflang="x-default" href="https://joeyzhao.cc/missionget-glasses">
<meta property="og:type" content="article"><meta property="og:title" content="{e(t('title'))}"><meta property="og:description" content="{e(t('description'))}"><meta property="og:url" content="https://joeyzhao.cc{t('path')}"><meta property="og:image" content="https://joeyzhao.cc/assets/missionget/images/og-cover.jpg"><meta name="twitter:card" content="summary_large_image"><meta name="theme-color" content="#f5f5f1">
<link rel="icon" href="/favicon-32.png"><link rel="preload" href="/assets/finfold/fonts/manrope-400.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="{a}/case.css?v=20261102-r3"><script type="application/ld+json">{json.dumps(schema,ensure_ascii=False)}</script><script type="application/json" id="case-copy">{json.dumps(runtime,ensure_ascii=False)}</script><script type="module" src="{a}/case.mjs?v=20261102-r3"></script>{analytics}</head>
<body><a class="skip" href="#idea">{t('scroll')}</a><header class="case-nav"><a href="/explore/" class="back">↖ <span>JOEY ZHAO</span></a><a class="language" href="{t('other')}" data-language>{t('switch')}</a></header>
<main id="top">
<section class="hero"><div class="hero-photo">{picture('lifestyle',t('heroalt'),'',True)}</div><div class="hero-shade"></div><div class="hero-copy"><p class="project-brand">{t('tag')}</p><h1>{t('h1')}</h1><p class="lede">{t('intro')}</p><div class="actions"><a class="pill primary" href="#try">{t('tryit')} <span>↗</span></a><button class="text-button" type="button" data-play>▷ {t('watch')}</button></div></div><div class="hero-bottom"><a href="#idea" aria-label="{e(t('scroll'))}">↓</a></div></section>
<nav class="chapter-nav" aria-label="{'案例章节' if locale=='zh' else 'Case chapters'}">{nav}</nav>
<div class="wrap"><dl class="project-meta">{meta}</dl></div>
<section class="section wrap" id="idea"><div class="story-heading"><h2>{t('opening')}</h2><p>{t('openingp')}</p></div><div class="hardware-stage" data-tilt><div class="orb"></div>{picture('glasses','OneGlance AG05 '+('智能眼镜' if locale=='zh' else 'smart glasses'),'hardware-render')}<button class="lens-hotspot" type="button" aria-expanded="false" aria-controls="hardware-detail"><span>+</span><span>{'看看里面的关系' if locale=='zh' else 'Look beyond the glasses'}</span></button><div id="hardware-detail" class="hardware-detail" hidden><p>{t('hardwarep')}</p><ol>{''.join('<li>'+x+'</li>' for x in t('hardwaretags'))}</ol></div></div></section>
<section class="section dark" id="friction"><div class="wrap friction-layout"><div class="friction-copy"><h2>{t('stuck')}</h2><p>{t('stuckp')}</p><p class="pullquote">{t('stuckquote')}</p><h3>{t('connectionTitle')}</h3><p>{t('connectionp')}</p><ol class="connection">{connection}</ol></div>{photo('voice-early',t('voicealt'),t('voicecaption'),'phone-evidence')}</div></section>
<section class="section wrap" id="decisions"><div class="story-heading"><h2>{t('turn')}</h2><p>{t('turnp')}</p></div><div class="flow-panel"><div class="flow-header"><div class="segmented" role="group" aria-label="{e(t('flowLabel'))}"><button type="button" data-flow-mode="before" aria-pressed="false">{t('before')}</button><button class="selected" type="button" data-flow-mode="after" aria-pressed="true">{t('after')}</button></div></div><ol class="flow-steps">{flow}</ol><p class="flow-caption">{t('flowafterp')}</p></div><p class="decision-line">{t('choice')}</p></section>
<section class="section playground" id="try"><div class="wrap"><div class="play-heading"><div><h2>{t('playtitle')}</h2></div><p>{t('playp')}</p></div><p class="demo-badge"><i></i>{t('sample')}</p><div class="scene-choices" role="group" aria-label="{e(t('sceneLabel'))}">{scenarios}</div>
<div class="journey-stage" data-phase="idle"><div class="journey-input"><p class="eyebrow">{t('input')}</p>{picture('glasses','AG05','journey-glasses')}<div class="signal" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><p class="utterance" data-utterance>{t('ready')}</p></div><div class="journey-arrow" aria-hidden="true">→</div><div class="demo-phone"><div class="phone-notch"></div><div class="phone-head"><img src="{a}/images/icon.webp" width="25" height="25" alt=""><span>{'小觅' if locale=='zh' else 'Xiao Mi'}</span><span class="phone-status" data-phase-label>{t('phaseLabels')[0]}</span></div><div class="phone-body"><div class="chat-request" data-request hidden></div><div class="chat-reply"><span class="sparkle">✧</span><p data-status aria-live="polite" role="status">{t('ready')}</p></div><div class="request-preview" hidden><span class="eyebrow">{'待确认' if locale=='zh' else 'REVIEW'}</span><h3 data-request-title></h3><p data-request-detail></p><button class="pill primary" type="button" data-confirm>{t('confirm')} ↗</button></div><div class="processing" hidden aria-hidden="true"><i></i><i></i><i></i></div><button class="text-button reset" type="button" data-reset hidden>{t('cancel')} ↺</button></div><div class="phone-home"></div></div><div class="journey-arrow" aria-hidden="true">→</div><div class="demo-workbench"><div class="window-bar"><span><i></i><i></i><i></i></span><b>MissionGet</b><span>↗</span></div><div class="workbench-body"><p class="eyebrow">{t('output')}</p><div class="file-orbit"><span class="file-symbol">▤</span></div><h3 data-file-title>{'等待新的工作' if locale=='zh' else 'Ready for the next thing'}</h3><div class="file-skeleton" aria-hidden="true"><i></i><i></i><i></i></div><p data-file-status>{'确认后，请求会继续向这里走。' if locale=='zh' else 'A confirmed request continues here.'}</p><button class="pill" type="button" data-open-file hidden>{t('document')} ↗</button></div></div></div><div class="play-foot"><button type="button" class="text-button" data-skip>{t('skip')} ↗</button></div><noscript><p>{t('example')}</p><p>{'选择指令 → 核对请求 → 工作台推进 → 查看示例文件。' if locale=='zh' else 'Choose a request → review → hand off → view an example file.'}</p></noscript></div></section>
<section class="section wrap" id="workspace"><div class="story-heading"><h2>{t('same')}</h2><p>{t('samep')}</p></div><div class="compare-controls segmented" role="group" aria-label="{e(t('compareLabel'))}"><button type="button" data-compare="before" aria-pressed="false">{t('prototype')}</button><button class="selected" type="button" data-compare="after" aria-pressed="true">{t('platform')}</button></div><figure class="workbench-evidence"><button class="zoom" type="button" aria-label="{e(t('zoom'))}">{picture('workbench',t('workbenchalt'),'comparison-image')}</button><figcaption class="sr-only" data-comparison-caption>{t('compareAfter')}</figcaption></figure><div class="proof"><h3>{t('proofTitle')}</h3><ol>{proofs}</ol><p>{t('proofp')}</p></div></section>
<section class="section field" id="field"><div class="wrap"><div class="story-heading"><h2>{t('field')}</h2><p>{t('fieldp')}</p></div><div class="field-grid">{photo('at-the-demo',t('eventalt'),t('eventcap'),'field-photo')}{photo('campaign',t('heroalt'),t('campaigncap'),'campaign-photo')}</div><div class="video-card"><button type="button" class="video-preview" data-play aria-label="{e(t('videoLabel'))}">{picture('demo-poster-sdr',t('videocap'))}<span class="video-play">▷</span></button></div></div></section>
<section class="section wrap closing" id="next"><h2>{t('next')}</h2><p class="closing-copy">{t('nextp')}</p><details><summary>{t('readmore')} <span>+</span></summary><p>{t('details')}</p><div class="credits">{t('credits')}</div></details></section>
<footer><div class="wrap"><h2>{t('contact')}</h2><div class="actions"><a class="pill primary" href="mailto:super666joey@gmail.com?subject=MissionGet%20portfolio">{t('contactbtn')} ↗</a><a class="pill" href="https://www.missionget.com/" target="_blank" rel="noopener noreferrer">{t('live')} ↗</a></div><div class="footer-bottom"><a href="/explore/?item=work">↖ {t('all')}</a><span>© 2026 JOEY ZHAO</span><a href="#top">{t('top')} ↑</a></div></div></footer></main>
<dialog class="lightbox" aria-label="{e(t('zoom'))}"><button type="button" data-close>{t('close')} ×</button><img alt=""><p></p></dialog><dialog class="video-dialog" aria-label="{e(t('watch'))}"><button type="button" data-close>{t('videoClose')} ×</button><video controls playsinline preload="none" poster="{a}/images/demo-poster-sdr.webp"><a href="{a}/media/demo-sdr.mp4">{t('videofallback')}</a></video><p>{t('videocap')}</p></dialog>
<dialog class="file-dialog" aria-label="{e(t('document'))}"><button type="button" data-close>{t('close')} ×</button><span class="demo-badge">{t('sample')}</span><h2 data-document-title></h2><p class="sample-note">{t('example')}</p><div data-document-body></div></dialog></body></html>'''
 dest=root/('missionget-glasses.html' if locale=='zh' else 'en/missionget-glasses.html');dest.parent.mkdir(parents=True,exist_ok=True);dest.write_text(page)
for locale in copy:build(locale)
print('Built both MissionGet case-study languages')
