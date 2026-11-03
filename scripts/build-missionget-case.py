# coding: utf-8
"""Build both languages of the MissionGet editorial case from one template."""
from pathlib import Path
import html,json,re
root=Path(__file__).resolve().parent.parent
sizes=json.loads((root/'scripts/missionget-image-sizes.json').read_text())
analytics='''<script async src="https://www.googletagmanager.com/gtag/js?id=G-M8F4G6B3C6"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());const productionHosts=['joeyzhao.cc','www.joeyzhao.cc'];if(productionHosts.includes(window.location.hostname)){gtag('config','G-M8F4G6B3C6')}</script>'''
copy={'zh': {'lang': 'zh-CN',
        'path': '/missionget-glasses',
        'other': '/en/missionget-glasses',
        'switch': 'EN',
        'title': 'MissionGet AI 眼镜办公助手｜赵越的产品设计案例',
        'description': '从眼镜语音到手机确认，再到电脑工作台。赵越在苏客松推进 MissionGet AI 眼镜办公助手的产品定义、体验设计与原型整合。',
        'back': '返回',
        'tag': 'MissionGet',
        'status': '苏客松 2026',
        'h1': '戴上 AI 眼镜<br><em>开口办公</em>',
        'intro': '用眼镜交办会议纪要和待办<br>在 MissionGet 工作台继续处理',
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
        'scroll': '跳到项目正文',
        'chapters': ['想法', '第一版', '改法', '手机 App', '试一条', '工作台', '现场', '下一步'],
        'opening': '录下来了<br>然后呢',
        'openingp': '戴着眼镜说一句“帮我整理今天的会议纪要”，电脑上就能继续处理。录音和转写之后，还得认出任务，请人核对，再交给 MissionGet。',
        'openingcaption': '眼镜作为输入终端；任务与成果留在 MissionGet。',
        'hardware': '现成的眼镜<br>新的工作入口',
        'hardwarep': '眼镜用的是 OneGlance AG05，硬件和 SDK 由原厂提供。我负责它接入 MissionGet 之后的办公体验，以及手机端的原型整合。',
        'hardwaretags': ['眼镜 · 采集', '手机 · 对话与确认', '工作台 · 执行与文件'],
        'stuck': '话说完了<br>还得拿起手机',
        'stuckp': '第一版能录音，也能转成文字。但“说完了”和“交给小觅”都是按钮。戴着眼镜说完一句话，还得拿起手机点两下。',
        'stuckquote': '说完以后，为什么还要一直点？',
        'voicecaption': '最初的语音页',
        'voicealt': '早期真机语音页，显示识别文字与交给Agent等多个入口',
        'connectionTitle': '两个连接状态分开看',
        'connectionp': '手机蓝牙显示已连接时，App 也可能还没连上眼镜的控制通道。语音输入又是另一条连接。控制和音频各自显示状态，才知道该从哪里重连。',
        'connection': ['连接眼镜', '听见指令', '核对请求', '交给工作台'],
        'turn': '短指令<br>和会议录音分开',
        'turnp': '我平时开会都是几十分钟起步，45 秒的语音入口不够用。后来把会议录音单独做了入口，短指令仍用来查安排或交办待办。录音留在首页，后面可以回听；要改动任务，仍由人确认。',
        'before': '最初',
        'after': '调整后',
        'flowLabel': '短指令的操作流程',
        'flowbefore': ['开始录音', '手动结束', '发送文字', '再找任务入口'],
        'flowafter': ['说出需求', '停顿后识别', '小觅接话', '核对并确认'],
        'flowbeforep': '说完以后，还要回到手机上继续操作。',
        'flowafterp': '短指令停顿后结束录音，核对请求后再确认。',
        'choice': '少点几次手机<br>该确认的事，仍由人决定',
        'playtitle': '试着交办<br>一件办公小事',
        'playp': '选一句指令，看看核对和交办的过程',
        'sample': '交互演示 · 固定示例',
        'sceneLabel': '选择办公场景',
        'scenes': ['整理会议纪要', '记下一个待办', '起草演示讲稿'],
        'input': 'AI 眼镜',
        'review': '02 / 手机',
        'output': 'MissionGet 工作台',
        'ready': '先选一条办公指令',
        'pending': '正在整理请求',
        'reviewmsg': '先核对一下，要做的是这件事吗？',
        'confirm': '确认交给小觅',
        'cancel': '重新选择',
        'working': '好，按这份内容继续。',
        'done': '示例已就绪',
        'reset': '再试一次',
        'document': '查看示例',
        'example': '这是一份预置示例，不会创建真实任务。',
        'skip': '直接看示例结果',
        'playnote': '可以反复试，不会改动真实账号中的任务。',
        'greeting': '今天，想先做什么？',
        'phaseLabels': ['等待指令', '整理请求', '等待核对', '处理中', '查看示例'],
        'same': '手机里说的事<br>回电脑上接着做',
        'samep': '一开始，手机端另做了一个任务页面，和官网成了两套入口。后来改成接入 MissionGet 原有的账号，让小觅的对话能接到同一份任务和文件上。',
        'prototype': '早期独立原型',
        'platform': '接入正式工作台',
        'compareLabel': '切换查看工作台整合前后',
        'compareBefore': '早期原型',
        'compareAfter': 'MissionGet 工作台',
        'workbenchalt': 'MissionGet正式工作台，左侧任务、中间编辑区与右侧AI工作流',
        'integrationp': '去掉重复的网页导航和小觅浮窗，沿用同一账号。手机发起的请求，能在电脑的工作台找到；确认后的文件，也回到同一份任务里。',
        'proofTitle': '先确认电脑端能看到文稿',
        'proofp': '从手机发起请求，工作台保存测试文稿后，电脑端能看到同一份文件。这轮验证用的是测试内容。',
        'proof': ['手机端发起请求', '确认后生成并保存', '电脑端看到同一文件'],
        'proofnote': '2026.11 · 跨端联验记录 · 测试文稿',
        'field': '带着眼镜<br>去苏客松现场',
        'fieldp': '眼镜和电脑一起带到了苏客松现场。海报用来说明它们怎么配合，桌上的 App 则用来演示。',
        'eventalt': '路演现场，一位佩戴AI眼镜的参赛者站在MissionGet展板和电脑工作台旁',
        'eventcap': '苏客松现场',
        'campaigncap': 'AI 场景视觉',
        'videoLabel': '播放项目演示',
        'videocap': 'AI 眼镜办公 · 29 秒演示',
        'videofallback': '浏览器暂不支持播放。可直接打开视频。',
        'next': '还要继续<br>戴着眼镜试',
        'nextp': '语音对话目前需要 App 在前台。实体按键拍照后的回传还要继续验，长会议也需要拿真实录音来测。接下来先把这些地方用稳。',
        'learning': '这次设计一直做到界面之外<br>连上、听见、确认、执行，每一步都需要被接住',
        'credits': '产品与体验 / Joey Zhao<br>平台开发 / MissionGet 团队<br>眼镜与 SDK / OneGlance AG05<br>视觉素材 / AI '
                   '场景图、真机截图与现场照片',
        'contact': '聊聊产品设计',
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
        'details': '眼镜的控制通道和蓝牙音频分别处理，短指令与会议录音使用不同入口。采集记录保存在手机里，工作台里的任务和文件沿用 MissionGet 账号。页面中的交互使用预置示例。',
        'appTitle': '录完的内容<br>回首页还能找到',
        'appIntro': '后来，首页加了“最近采集”。录过的音频可以回听，不需要的记录也能删掉。这里保存的是手机里的采集记录，和工作台的任务文件分开。',
        'homeCaption': '首页 · 最近采集',
        'deviceCaption': '设备页 · 搜索与连接',
        'homeAlt': '手机 App 首页，显示拍照、短语音、会议录音入口和本机采集记录；当前控制未连接',
        'deviceAlt': '手机 App 设备页，控制待连接、音频待激活，正在搜索附近眼镜',
        'taskAlt': '手机工作台中的测试任务，标题为整理指定会议纪要双版本文档，状态进行中',
        'taskCaption': '手机工作台中的测试任务 · 进行中',
        'zoomFit': '适合屏幕',
        'zoomFull': '原尺寸',
        'zoomRegion': '图片查看区域'},
 'en': {'lang': 'en',
        'path': '/en/missionget-glasses',
        'other': '/missionget-glasses',
        'switch': '中',
        'title': 'MissionGet AI Glasses Office Assistant | Joey Zhao',
        'description': 'A wearable office experiment connecting glasses, a phone and an AI workbench. '
                       'Product definition, experience design and prototype integration by Joey Zhao.',
        'back': 'Back',
        'tag': 'MissionGet',
        'status': '2026 Hackathon · Experience prototype',
        'h1': 'AI glasses<br><em>for office work</em>',
        'intro': 'Request meeting notes or a task.<br>Continue in the MissionGet workbench.',
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
        'scroll': 'Skip to the case study',
        'chapters': ['Intent',
                     'First version',
                     'Decisions',
                     'Mobile app',
                     'Try it',
                     'Workbench',
                     'Demo day',
                     'Next'],
        'opening': 'Recorded.<br>What happens next?',
        'openingp': 'The request was specific: say “help me write up today’s meeting” through the '
                    'glasses, then continue on the computer. After recording and transcription, the '
                    'request still needs to become a task that a person can review and hand off.',
        'openingcaption': 'Glasses are the input. Tasks and deliverables live in MissionGet.',
        'hardware': 'Existing hardware.<br>A new way into work.',
        'hardwarep': 'The glasses are OneGlance AG05, using the vendor’s hardware and SDK. My part was '
                     'the office experience around MissionGet and the phone-side prototype integration.',
        'hardwaretags': ['Glasses · capture', 'Phone · talk and confirm', 'Workbench · work and files'],
        'stuck': 'Finish speaking.<br>Pick up the phone again.',
        'stuckp': 'The first version could record and transcribe. But “Done speaking” and “Send to Xiao '
                  'Mi” were still separate buttons. A spoken request left people with two more taps on '
                  'the phone.',
        'stuckquote': 'Why am I still tapping after I finish speaking?',
        'voicecaption': 'The first voice interface',
        'voicealt': 'Early iPhone voice screen with transcribed text and several competing actions',
        'connectionTitle': 'Two connections to check',
        'connectionp': 'An iPhone Bluetooth connection could be active while the app’s control channel '
                       'was disconnected. Voice input used another connection. Showing control and '
                       'audio separately made it clearer where to reconnect.',
        'connection': ['Connect glasses', 'Capture speech', 'Review request', 'Hand off work'],
        'turn': 'Short requests.<br>Meetings get their own path.',
        'turnp': 'My meetings usually last tens of minutes. A 45-second voice command was not enough. '
                 'Meeting recording got its own entry, while short commands remained for schedule '
                 'queries or task requests. Audio stays findable on Home; changes to tasks still need '
                 'confirmation.',
        'before': 'Before',
        'after': 'After',
        'flowLabel': 'Short-request interaction',
        'flowbefore': ['Start recording', 'Stop manually', 'Send the text', 'Find the task'],
        'flowafter': ['Say the request', 'Pause to finish', 'Hear the reply', 'Review and confirm'],
        'flowbeforep': 'Finishing a sentence still left more work on the phone.',
        'flowafterp': 'A pause ends the short recording. Review the request before confirming.',
        'choice': 'Fewer phone actions.<br>A clear place to confirm.',
        'playtitle': 'Try a small<br>office request.',
        'playp': 'Choose a request and follow the review and handoff',
        'sample': 'INTERACTIVE DEMO · fixed examples',
        'sceneLabel': 'Choose an office scenario',
        'scenes': ['Meeting notes', 'A quick task', 'A presentation draft'],
        'input': 'AI GLASSES',
        'review': '02 / PHONE',
        'output': 'MISSIONGET WORKBENCH',
        'ready': 'Choose an office request',
        'pending': 'Preparing the request',
        'reviewmsg': 'Please check: is this what you want to do?',
        'confirm': 'Confirm the handoff',
        'cancel': 'Choose again',
        'working': 'Confirmed. Follow the example into the workbench.',
        'done': 'Example ready',
        'reset': 'Try again',
        'document': 'View example',
        'example': 'This is a fixed example. It does not create a real task.',
        'skip': 'Skip to the example result',
        'playnote': 'Try it again as often as you like. Your real account stays untouched.',
        'greeting': 'What would you like to do today?',
        'phaseLabels': ['Ready', 'Preparing', 'Review', 'Working', 'Example'],
        'same': 'Start on the phone.<br>Continue at the desk.',
        'samep': 'The first phone prototype had a separate task page. We then connected it to the '
                 'existing MissionGet account, so Xiao Mi could reach the same tasks and files as the '
                 'desktop.',
        'prototype': 'Early standalone prototype',
        'platform': 'Official workbench',
        'compareLabel': 'Compare the early prototype and integrated workbench',
        'compareBefore': 'Early standalone prototype · too many forms and parallel actions',
        'compareAfter': 'Official MissionGet workbench · tasks, files and AI workflow together',
        'workbenchalt': 'The actual MissionGet workbench with tasks, editing and AI workflow columns',
        'integrationp': 'We removed duplicate navigation and assistant launchers, and reused the same '
                        'account. Requests initiated on the phone could be found on the desktop; '
                        'confirmed files returned to the same task.',
        'proofTitle': 'Check that the document reaches the desktop',
        'proofp': 'A request started on the phone, the workbench saved a test document, and the same '
                  'file appeared on desktop. The integration check used test content.',
        'proof': ['Request from the phone',
                  'Generate and save after confirmation',
                  'Same file on desktop'],
        'proofnote': 'November 2026 · cross-device integration check · test document',
        'field': 'Bring the glasses<br>to the hackathon.',
        'fieldp': 'The glasses and computer went to the hackathon together. The poster explained how '
                  'they worked together, with the app on the demo table.',
        'eventalt': 'At the hackathon, a participant wears AI glasses beside the MissionGet poster and '
                    'laptop workbench',
        'eventcap': 'At the hackathon',
        'campaigncap': 'AI-assisted scenario visual',
        'videoLabel': 'Play the project demo',
        'videocap': 'AI glasses for work · 29-second demo',
        'videofallback': 'Your browser cannot play this video. Open the file directly.',
        'next': 'More time<br>wearing the glasses.',
        'nextp': 'Voice conversation currently needs the app in the foreground. Physical-button photo '
                 'transfer still needs verification, as do real, long meeting recordings. Those are the '
                 'next things to make dependable.',
        'learning': 'The design continued beyond the screen.<br>Connect, listen, confirm, execute. Each '
                    'handoff needed care.',
        'credits': 'Product definition and experience design / Joey Zhao<br>Platform and engineering / '
                   'MissionGet team<br>Hardware and SDK / OneGlance AG05 vendor<br>Visuals / '
                   'AI-assisted scenes; device interfaces and event photos labeled separately',
        'contact': 'Let’s talk product design',
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
        'details': 'Device control and Bluetooth audio are handled separately. Short commands and '
                   'meeting recording have distinct entries. Captures stay on the phone; tasks and '
                   'workbench files use the existing MissionGet account. The interactive sequence on '
                   'this page uses fixed examples.',
        'appTitle': 'Record it.<br>Find it again on Home.',
        'appIntro': 'Recent captures was added to Home so recordings could be replayed or deleted. '
                    'These records live on the phone, separate from task files in the workbench.',
        'homeCaption': 'Home · recent captures',
        'deviceCaption': 'Device · search and connections',
        'homeAlt': 'The phone app’s capture home, with photo, voice and meeting recording entries and '
                   'local recordings; control is disconnected',
        'deviceAlt': 'The phone app’s device screen, searching for glasses with control and audio '
                     'pending',
        'taskAlt': 'A test task in the phone workbench, to prepare two versions of meeting notes, still '
                   'in progress',
        'taskCaption': 'Test task in the phone workbench · in progress',
        'zoomFit': 'Fit to screen',
        'zoomFull': 'Actual size',
        'zoomRegion': 'Image viewing area'}}

def build(locale):
 c=copy[locale];t=lambda key:c[key];a='/assets/missionget';e=html.escape
 def title(key):
  return ''.join(f'<span class="title-line">{line}</span>' for line in t(key).split('<br>'))
 def prose(key):
  value=t(key)
  if locale=='zh':
   value=re.sub(r'MissionGet 工作台|会议纪要|会议录音|语音输入|采集记录|任务文件|控制通道|实体按键|工作台|回听|录音|蓝牙|小觅',lambda match:f'<span class="keep-word">{match.group()}</span>',value)
  return value
 def picture(name,alt,cls='',eager=False):
  return f'<img class="{cls}" src="{a}/images/{name}.webp" width="{sizes[name][0]}" height="{sizes[name][1]}" alt="{e(alt)}" loading="{"eager" if eager else "lazy"}" decoding="async"'+(' fetchpriority="high"' if eager else '')+'>'
 def photo(name,alt,caption,cls=''):
  return f'<figure class="{cls}"><button class="zoom" type="button" aria-label="{e(t("zoom"))+": "+e(alt)}">{picture(name,alt)}</button><figcaption>{caption}</figcaption></figure>'
 nav=''.join(f'<a href="#{id}" aria-label="{e(name)}"><span>{i+1:02}</span><b>{name}</b></a>' for i,(id,name) in enumerate(zip(['idea','friction','decisions','app','try','workspace','field','next'],t('chapters'))))
 meta=''.join(f'<div><dt>{t(k)}</dt><dd>{t(v)}</dd></div>' for k,v in [('role','roletext'),('team','teamtext')])
 connection=''.join(f'<li><span>{i+1:02}</span>{v}</li>' for i,v in enumerate(t('connection')))
 flow=''.join(f'<li><span>{i+1:02}</span><b data-flow="{i}">{v}</b></li>' for i,v in enumerate(t('flowafter')))
 scenarios=''.join(f'<button type="button" data-scenario="{i}" aria-pressed="false"><span>0{i+1}</span>{v}<span aria-hidden="true">↗</span></button>' for i,v in enumerate(t('scenes')))
 proofs=''.join(f'<li><span>↗</span><h3>{v}</h3></li>' for v in t('proof'))
 captions={'before':t('compareBefore'),'after':t('compareAfter')}
 runtime={k:t(k) for k in ['ready','pending','reviewmsg','confirm','cancel','working','done','reset','document','example','phaseLabels','flowbefore','flowafter','flowbeforep','flowafterp','zoomFit','zoomFull','greeting']}
 runtime.update(lang=locale,captions=captions)
 schema={'@context':'https://schema.org','@type':'CreativeWork','name':t('title'),'description':t('description'),'url':'https://joeyzhao.cc'+t('path'),'inLanguage':t('lang'),'image':'https://joeyzhao.cc/assets/missionget/images/og-cover.jpg','dateCreated':'2026-11-01','dateModified':'2026-11-03','creator':{'@type':'Person','name':'Joey Zhao','url':'https://joeyzhao.cc/'}}
 page=f'''<!doctype html>
<html lang="{t('lang')}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{t('title')}</title>
<meta name="description" content="{e(t('description'))}"><link rel="canonical" href="https://joeyzhao.cc{t('path')}"><link rel="alternate" hreflang="zh-CN" href="https://joeyzhao.cc/missionget-glasses"><link rel="alternate" hreflang="en" href="https://joeyzhao.cc/en/missionget-glasses"><link rel="alternate" hreflang="x-default" href="https://joeyzhao.cc/missionget-glasses">
<meta property="og:type" content="article"><meta property="og:title" content="{e(t('title'))}"><meta property="og:description" content="{e(t('description'))}"><meta property="og:url" content="https://joeyzhao.cc{t('path')}"><meta property="og:image" content="https://joeyzhao.cc/assets/missionget/images/og-cover.jpg"><meta name="twitter:card" content="summary_large_image"><meta name="theme-color" content="#f5f5f1">
<link rel="icon" href="/favicon-32.png"><link rel="preload" href="/assets/finfold/fonts/manrope-400.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="{a}/case.css?v=20261103-typesetting-r3"><script type="application/ld+json">{json.dumps(schema,ensure_ascii=False)}</script><script type="application/json" id="case-copy">{json.dumps(runtime,ensure_ascii=False)}</script><script type="module" src="{a}/case.mjs?v=20261103-typesetting-r3"></script>{analytics}</head>
<body><a class="skip" href="#idea">{t('scroll')}</a><header class="project-page-nav"><nav class="nav-content" aria-label="{'项目导航' if locale=='zh' else 'Project navigation'}"><a class="back-link" href="/#projects"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg><span>{t('back')}</span></a><div class="lang-toggle" aria-label="{'语言' if locale=='zh' else 'Language'}"><a href="/en/missionget-glasses" lang="en" {'class="active" aria-current="page"' if locale=='en' else 'data-language aria-label="Read in English"'}>EN</a><span aria-hidden="true">/</span><a href="/missionget-glasses" lang="zh-CN" {'class="active" aria-current="page"' if locale=='zh' else 'data-language aria-label="切换到中文"'}>中</a></div></nav></header>
<main id="top">
<section class="hero"><div class="hero-photo">{picture('lifestyle',t('heroalt'),'',True)}</div><div class="hero-shade"></div><div class="hero-copy"><p class="project-brand">{t('tag')}</p><h1>{title('h1')}</h1><p class="lede">{prose('intro')}</p><div class="actions"><a class="pill primary" href="#try">{t('tryit')} <span>↗</span></a><button class="text-button" type="button" data-play>▷ {t('watch')}</button></div></div><div class="hero-bottom"><a href="#idea" aria-label="{e(t('scroll'))}">↓</a></div></section>
<nav class="chapter-nav" aria-label="{'案例章节' if locale=='zh' else 'Case chapters'}">{nav}</nav>
<div class="wrap"><dl class="project-meta">{meta}</dl></div>
<section class="section wrap" id="idea"><div class="story-heading"><h2>{title('opening')}</h2><p>{prose('openingp')}</p></div><div class="hardware-stage" data-tilt><div class="orb"></div>{picture('glasses','OneGlance AG05 '+('智能眼镜' if locale=='zh' else 'smart glasses'),'hardware-render')}<button class="lens-hotspot" type="button" aria-expanded="false" aria-controls="hardware-detail"><span>+</span><span>{'眼镜如何办公' if locale=='zh' else 'How the glasses fit in'}</span></button><div id="hardware-detail" class="hardware-detail" hidden><p>{t('hardwarep')}</p><ol>{''.join('<li>'+x+'</li>' for x in t('hardwaretags'))}</ol></div></div></section>
<section class="section dark" id="friction"><div class="wrap friction-layout"><div class="friction-copy"><h2>{title('stuck')}</h2><p>{prose('stuckp')}</p><h3>{t('connectionTitle')}</h3><p>{prose('connectionp')}</p><ol class="connection">{connection}</ol></div>{photo('voice-early',t('voicealt'),t('voicecaption'),'phone-evidence')}</div></section>
<section class="section wrap" id="decisions"><div class="story-heading"><h2>{title('turn')}</h2><p>{prose('turnp')}</p></div><div class="flow-panel"><div class="flow-header"><div class="segmented" role="group" aria-label="{e(t('flowLabel'))}"><button type="button" data-flow-mode="before" aria-pressed="false">{t('before')}</button><button class="selected" type="button" data-flow-mode="after" aria-pressed="true">{t('after')}</button></div></div><ol class="flow-steps">{flow}</ol><p class="flow-caption">{t('flowafterp')}</p></div><p class="decision-line">{title('choice')}</p></section>
<section class="section app-section" id="app"><div class="wrap"><div class="story-heading"><h2>{title('appTitle')}</h2><p>{prose('appIntro')}</p></div><div class="app-gallery">{photo('app-home',t('homeAlt'),t('homeCaption'),'app-screen home-screen')}{photo('app-device',t('deviceAlt'),t('deviceCaption'),'app-screen device-screen')}</div></div></section>
<section class="section playground" id="try"><div class="wrap"><div class="play-heading"><div><h2>{title('playtitle')}</h2></div><p>{prose('playp')}</p></div><p class="demo-badge"><i></i>{t('sample')}</p><div class="scene-choices" role="group" aria-label="{e(t('sceneLabel'))}">{scenarios}</div>
<div class="journey-stage" data-phase="idle"><div class="journey-input"><p class="eyebrow">{t('input')}</p>{picture('glasses','AG05','journey-glasses')}<div class="signal" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><p class="utterance" data-utterance>{t('ready')}</p></div><div class="journey-arrow" aria-hidden="true">→</div><div class="demo-phone"><div class="phone-notch"></div><div class="phone-head"><span class="assistant-mark" aria-hidden="true">✧</span><span>{'小觅' if locale=='zh' else 'Xiao Mi'}</span><span class="phone-status" data-phase-label>{t('phaseLabels')[0]}</span></div><div class="phone-body"><div class="chat-request" data-request hidden></div><div class="chat-reply"><span class="sparkle">✧</span><p data-status aria-live="polite" role="status">{t('greeting')}</p></div><div class="request-preview" hidden><span class="eyebrow">{'待确认' if locale=='zh' else 'REVIEW'}</span><h3 data-request-title></h3><p data-request-detail></p><button class="pill primary" type="button" data-confirm>{t('confirm')} ↗</button></div><div class="processing" hidden aria-hidden="true"><i></i><i></i><i></i></div><button class="text-button reset" type="button" data-reset hidden>{t('cancel')} ↺</button></div><div class="phone-home"></div></div><div class="journey-arrow" aria-hidden="true">→</div><div class="demo-workbench"><div class="window-bar"><span><i></i><i></i><i></i></span><b>MissionGet</b><span>↗</span></div><div class="workbench-body"><p class="eyebrow">{t('output')}</p><div class="file-orbit"><span class="file-symbol">▤</span></div><h3 data-file-title>{'等待新的工作' if locale=='zh' else 'Ready for the next thing'}</h3><div class="file-skeleton" aria-hidden="true"><i></i><i></i><i></i></div><p data-file-status>{'核对后，查看任务或文稿示例' if locale=='zh' else 'Review first, then view the sample result.'}</p><button class="pill" type="button" data-open-file hidden>{t('document')} ↗</button></div></div></div><div class="play-foot"><button type="button" class="text-button" data-skip>{t('skip')} ↗</button></div><noscript><p>{t('example')}</p><p>{'选择指令 → 核对请求 → 工作台推进 → 查看示例文件。' if locale=='zh' else 'Choose a request → review → hand off → view an example file.'}</p></noscript></div></section>
<section class="section wrap" id="workspace"><div class="story-heading"><h2>{title('same')}</h2><p>{prose('samep')}</p></div><div class="compare-controls segmented" role="group" aria-label="{e(t('compareLabel'))}"><button type="button" data-compare="before" aria-pressed="false">{t('prototype')}</button><button class="selected" type="button" data-compare="after" aria-pressed="true">{t('platform')}</button></div><figure class="workbench-evidence"><button class="zoom" type="button" aria-label="{e(t('zoom'))}">{picture('workbench',t('workbenchalt'),'comparison-image')}</button><figcaption class="sr-only" data-comparison-caption>{t('compareAfter')}</figcaption></figure><div class="proof"><h3>{t('proofTitle')}</h3><div class="proof-grid">{photo('app-task-detail',t('taskAlt'),t('taskCaption'),'task-evidence')}<p>{prose('proofp')}</p></div></div></section>
<section class="section field" id="field"><div class="wrap"><div class="story-heading"><h2>{title('field')}</h2><p>{prose('fieldp')}</p></div><div class="field-grid">{photo('at-the-demo-redacted',t('eventalt'),t('eventcap'),'field-photo')}{photo('campaign',t('heroalt'),t('campaigncap'),'campaign-photo')}</div><div class="video-card"><button type="button" class="video-preview" data-play aria-label="{e(t('videoLabel'))}">{picture('demo-approved-poster',t('videocap'))}<span class="video-play">▷</span></button></div></div></section>
<section class="section wrap closing" id="next"><h2>{title('next')}</h2><p class="closing-copy">{prose('nextp')}</p><details><summary>{t('readmore')} <span>+</span></summary><p>{prose('details')}</p><div class="credits">{t('credits')}</div></details></section>
<footer><div class="wrap"><h2>{title('contact')}</h2><div class="actions"><a class="pill primary" href="mailto:super666joey@gmail.com?subject=MissionGet%20portfolio">{t('contactbtn')} ↗</a><a class="pill" href="https://www.missionget.com/" target="_blank" rel="noopener noreferrer">{t('live')} ↗</a></div><div class="footer-bottom"><a href="/explore/?item=work">↖ {t('all')}</a><span>© 2026 JOEY ZHAO</span><a href="#top">{t('top')} ↑</a></div></div></footer></main>
<dialog class="lightbox" aria-label="{e(t('zoom'))}"><div class="lightbox-toolbar"><p data-image-caption></p><div><button type="button" data-scale aria-pressed="false">{t('zoomFull')}</button><button type="button" data-close>{t('close')} ×</button></div></div><div class="lightbox-canvas" tabindex="0" role="region" aria-label="{e(t('zoomRegion'))}"><img alt=""></div></dialog><dialog class="video-dialog" aria-label="{e(t('watch'))}"><button type="button" data-close>{t('videoClose')} ×</button><video controls playsinline preload="none" poster="{a}/images/demo-approved-poster.webp"><a href="{a}/media/demo-approved.mp4">{t('videofallback')}</a></video><p>{t('videocap')}</p></dialog>
<dialog class="file-dialog" aria-label="{e(t('document'))}"><button type="button" data-close>{t('close')} ×</button><span class="demo-badge">{t('sample')}</span><h2 data-document-title></h2><p class="sample-note">{t('example')}</p><div data-document-body></div></dialog></body></html>'''
 dest=root/('missionget-glasses.html' if locale=='zh' else 'en/missionget-glasses.html');dest.parent.mkdir(parents=True,exist_ok=True);dest.write_text(page)
for locale in copy:build(locale)
print('Built both MissionGet case-study languages')
