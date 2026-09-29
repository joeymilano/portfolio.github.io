# Explore 3D 工作室：待办交接

> 交接日期：2026-09-29。最近一次提交：`e5a11fb`（已部署）。
> 给接手的 coding agent 看：先读完「项目约定」这一节再动代码。这个仓库有几个不看就会出错的规则。

## 1. 背景与目标

https://joeyzhao.cc 是 Joey Zhao 的个人作品集。默认首页 `/` 会跳到 `/explore/`，这是一个用 three.js 搭建的 3D 工作室：Joey 的数字分身坐在桌前，房间里的物件都是入口（作品、音乐、游戏、书、摄影等）。

目标：对标世界顶级设计师和工作室的网站，**拉长访客停留时间**，让人感到惊艳，同时**性能不能退步**。

已完成（都已上线）：

- 无 UI 首屏封面图（v3）、About 特写镜头、面板旁的镜头偏移、GA4 事件、手机端界面精简
- 昼夜跟随上海时间，窗外是陆家嘴天际线
- 环境声（默认静音）
- Blender 烘焙的昼夜光照贴图，带真实遮挡和反射光；主光保持实时

## 2. 项目约定（必读）

**托管与缓存**

- 纯静态站，没有构建步骤和打包器。推送到 `main` 后，Cloudflare Pages 大约 1 分钟自动部署。
- `_headers` 让 `/explore/*.mjs`、`/explore/assets/*`、`/explore/vendor/*`、`/explore/studio.css` **永久不可变缓存**。
  - **改了任何 .mjs 或资源，都要改文件名或更新引用处的 `?v=` 版本号。** 版本号形如 `?v=20260929-baked1`。
  - 引用链是：`explore/index.html` → `runtime.mjs` / `ui.mjs` → 各模块的 import。
  - 改了子模块，要一路向上更新引用它的那一行。
- HTML 不缓存，改了立刻生效。

**three.js**

- 版本 r160，通过 import map 加载：`"three":"/vw-id-aura/vendor/three.module.js"`，`"three/addons/":"/vw-id-aura/vendor/addons/"`。
- `vw-id-aura/vendor/` 与站内另一个项目共用，**不要改动或替换里面已有的文件**，要新增就用新路径。
- `explore/baked-light.mjs` 会按字符串匹配改写 three 的 `lights_fragment_begin` / `lights_fragment_maps` 着色器片段。
  - 升级 three 后如果匹配不上，会自动退回实时灯光，不会黑屏。
  - 但退回后烘焙效果就没了，所以**不要升级 three**，除非同时更新这个补丁和对应的测试。

**依赖**

- `node_modules/` 被提交在 git 里，**不要往里 `npm install` 新包**。
- 构建工具装到 git 忽略的目录，比如 `artifacts/<任务>/tools`，用 `createRequire` 加载。`scripts/studio/prepare-lightmap-room.mjs` 就是这么做的，可以照抄。

**代码风格**

- 现有代码是紧凑写法：单行多语句、短变量名、注释很少但会说明原因。新代码请保持一致。
- 界面文案是中英双语，放在 `explore/content.mjs` 的 `copy.en` / `copy.zh` 里。新增文案必须两种语言都写。
- 切换语言时会派发 `studio:language` 事件。

**模块间事件**

- `studio:select`，`detail.id` 为选中物件或 `null`
- `studio:frame`，右侧面板的位置
- `studio:ready`
- `studio:progress`
- `studio:sound`
- `studio:reset-view`

**运行时指标**（写在 `#scene-root` 的 dataset 上，测试和验收可以直接读）

- `sampleFps`、`drawCalls`、`triangles`
- `lighting`：值为 `baked` 或缺省（表示实时灯光）
- `firstFrameMs`、`interactiveMs`
- `document.body.dataset.loadState==='complete'` 表示加载完成

**测试**

- `node --test tests/*.test.mjs`：目前 45 项全部通过
- `npm run -s validate:seo`
- 测试直接从 `vw-id-aura/vendor` 加载 three，见 `tests/studio-assets.test.mjs` 开头。

**本地预览与截图**

- 本地预览：`python3 scripts/serve-preview.py --port 4186`
- 截图和浏览器验证用 puppeteer（已在 `node_modules`）加系统 Chrome：
  - 路径：`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
  - 启动参数：`--use-angle=metal --enable-gpu --ignore-gpu-blocklist`
- 可参考 `scripts/studio/capture-posters.mjs`。

**首屏封面图**

- 默认视角的画面一旦明显变化，就要用 `scripts/studio/capture-posters.mjs` 重拍封面图。
- 用新的版本名（v4），并更新 `explore/index.html` 与 `explore/light-mode.mjs` 里的引用，包括 og 图。

**提交**

- 只在用户要求时提交和推送。
- 提交说明末尾加上用户要求的署名行。

## 3. 关键文件速查

| 文件 | 作用 |
|---|---|
| `explore/index.html` | 页面骨架、import map、各模块的版本号、首屏脚本（按上海时间决定昼夜） |
| `explore/runtime.mjs` | 渲染器、加载流程（带进度权重 `weights`）、相机、交互射线、`frame()` 渲染循环、标注点定位 |
| `explore/ui.mjs` | 面板（`#content-panel`）、`select()`、历史路由、Work/Games 等面板内容的渲染 |
| `explore/lighting.mjs` | 灯光组、昼夜混合 `mix`、`bake()` 应用光照贴图 |
| `explore/baked-light.mjs` | 光照贴图地址、强度系数、着色器补丁 |
| `explore/creative-props.mjs` | 街机（`arcade-packed.glb`，屏幕网格名 `arcade_game_screen`，`userData.item='games'`）和唱片封套 |
| `explore/desk-objects.mjs` | 桌面上可打开的笔记本等物件 |
| `explore/skyline.mjs` | 窗外天际线 |
| `explore/ambient.mjs` | 环境声 |
| `explore/analytics.mjs` | GA4 事件 |
| `explore/content.mjs` | 双语文案、作品数据 |
| `explore/refined.css`、`chrome.css` | 界面样式，设计变量见下 |
| `index.html`（根目录） | Classic 版首页；没有 `?view=classic` 参数时会跳到 `/explore/` |
| `scripts/studio/*` | 封面图拍摄和光照烘焙流程 |

Explore 的设计变量（`explore/refined.css` 的 `:root`）：

- 颜色：`--paper:#ece6db`、`--muted:#c2bcb1`、`--line:#ece6db26`
- 圆角：`--radius-panel:20px`、`--radius-chip:16px`、`--radius-inner:12px`
- 字体：`"Helvetica Neue","PingFang SC","Hiragino Sans GB",sans-serif`

## 4. 待办任务（按优先级）

先做性能（P1），再加新内容（P2），因为新内容都会增加渲染负担。

### P1-1 静止时降到 30 帧

- **现状：** `runtime.mjs` 的 `frame()` 每帧都用 `requestAnimationFrame` 完整渲染一次。
- **做法：**
  - 满足以下全部条件时，隔一帧渲染一次（约 30 帧）：
    - 最近约 2 秒没有指针或键盘输入
    - 没有选中物件，或选中的过渡已经结束
    - 相机已收敛（`camera.position` 与 `desired` 的距离小于阈值）
    - 昼夜混合已稳定（`lighting.mix` 等于 0 或 1）
  - 一有输入或 `studio:select` 事件，立刻恢复 60 帧。
  - `dt` 计算保持基于真实时间，这样人物打字动画不会变慢。
- **验收：**
  - 静置 5 秒后 `sampleFps` 约为 30。
  - 拖动视角时约为 60。
  - 动画速度不变，截图对比无差异。

### P1-2 标注点改用 transform 定位

- **现状：** `frame()` 末尾每帧对每个 anchor 调用 `document.querySelector(\`[data-object="${id}"]\`)`，再写 `style.left/top`，会触发布局。
- **做法：**
  - 按钮元素只查询一次并缓存。在 `ui.mjs` 重建按钮或切换语言后需要重新缓存。
  - 改用 `style.transform=translate3d(...)`，并加上 `will-change`。
  - 坐标四舍五入到 0.5px，只在变化时写入。
  - 现有的 `data-visible`、`tabIndex`、`aria-hidden` 逻辑保持不变。
  - 对照 `refined.css` 和 `chrome.css` 里标注点的定位样式，确认 `translate(-50%,-50%)` 之类的偏移最终效果一致。
- **验收：**
  - 各尺寸下标注点位置与改动前逐像素一致，桌面和手机都要截图对比。
  - Performance 面板里每帧不再有 Layout。

### P1-3 自适应画质

- **做法：**
  - 以 `sampleFps`（每 2 秒更新一次）为依据分档降级：
    1. 降低 `setPixelRatio` 的上限：桌面 2 → 1.5 → 1，手机 1.5 → 1
    2. 阴影贴图尺寸 2048 → 1024，在 `lighting.mjs` 的 key 灯
    3. 关闭阴影更新
  - 设置迟滞：连续两个采样周期低于 45 帧才降一档，持续高于 58 帧才升一档。
  - 画面静止时的 30 帧（P1-1）**不能被误判为性能差**，只在满帧模式下评估。
  - 可以在 URL 加 `?quality=low|high` 强制指定档位，方便调试。
- **验收：** 用 puppeteer 的 CPU 节流（`page.emulateCPUThrottling(4)`）能看到降档，取消节流后能恢复。

### P1-4 纹理改用 KTX2

- **范围：** 这些 GLB 里内嵌的贴图：
  - `explore/assets/room-lit-packed.glb`
  - `avatar-v2-packed.glb`、`avatar-v2-mobile-packed.glb`
  - `turntable-packed.glb`
  - `arcade-packed.glb`
- **做法：**
  - 用 gltf-transform 的 `toktx` 或 `@gltf-transform/functions` 的 KTX2 编码：
    - 颜色贴图用 ETC1S
    - 法线贴图和粗糙度贴图用 UASTC
  - 在运行时加上 `KTX2Loader`：
    - 需要 `three/examples/jsm/libs/basis/`（r160 版本）里的 transcoder 文件
    - 放到 `/explore/vendor/basis/`，不要放进 `vw-id-aura`
    - 调用 `loader.setKTX2Loader(new KTX2Loader().setTranscoderPath(...).detectSupport(renderer))`
  - 输出**新文件名**，同时更新 `tests/studio-assets.test.mjs` 里的资源列表。
- **不要转换光照贴图 `lightmap-v1-*.webp`。** 它们用了自定义的立方根编码（`NoColorSpace`，着色器里解码为 t³），ETC1S 会产生色带。如果一定要转，只能用 UASTC，并对比夜景的暗部。
- **验收：** 显存和下载体积下降（写明前后数字），画面截图无明显差异，手机端正常。

### P1-5 精简 three.js

- **现状：** `vw-id-aura/vendor/three.module.js` 是未压缩的 r160，1.27 MB。
- **做法：**
  - 把同版本 r160 的 `three.module.min.js` 放到新路径，比如 `/explore/vendor/three-r160.module.min.js`。
  - **只改 `explore/index.html` 的 import map**，不动 `vw-id-aura`。
  - addons 仍然引用 `three`，走 import map，不受影响。
- **验收：**
  - `node --test` 全部通过。
  - 着色器补丁测试基于 `THREE.ShaderChunk`，必须在 min 版本上也成立。可以在浏览器里确认 `#scene-root` 的 `data-lighting="baked"`。

### P2-1 显示器“钻进屏幕”过渡到 Work

- **现状：**
  - Work 面板由 `ui.mjs` 的 `select('work')` 和 `appendWork()` 打开。
  - 显示器网格名是 `monitor_screen`，对应 anchor `finfold`。
  - 相机特写参数在 `runtime.mjs` 的 `focusShots` 和 `cameraPose()` 里。
- **做法：**
  - 从导航的 Work 或点击显示器进入时：
    1. 相机推近 `monitor_screen`，约 0.8–1.2 秒，用缓动
    2. 屏幕画面放大到铺满视口，可以用一层 DOM 覆盖做交叉淡入
    3. 展示 Work 面板
  - 关闭时反向退出。
  - `prefers-reduced-motion` 为真时直接淡入淡出。
  - 不要打断 `history` 路由（`explore/state.mjs` 的 `buildLocation`，参数是 `?item=<id>&lang=`）。`?item=work` 这类深链接要能直接打开 Work，跳过动画。
- **验收：** 桌面和手机都顺滑，不掉帧；键盘和读屏焦点正确，焦点落在面板标题；返回键行为正确。

### P2-2 能玩的街机

- **现状：** 街机在 `creative-props.mjs`，屏幕是贴了 `/images/bl-hero.jpg` 的平面。Games 面板列出的是外部游戏链接。
- **做法：**
  - 做一个小游戏，建议 30–60 秒一局的复古小游戏，要贴合 Joey 的作品气质。
  - 画布（`CanvasTexture`）先渲染到街机屏幕上，或者选中后在面板里全尺寸游玩。
  - 游戏代码在选中 games 时才懒加载（`import()`），不增加首屏体积。
  - 支持键盘和触屏；最高分存 `localStorage`；通过 `analytics.mjs` 记录开始和结束事件。
- **验收：** 不选中时零开销（不 import、不跑循环）；手机能玩；声音遵守 `ambient.mjs` 的静音状态。

### P2-3 收集物和彩蛋

- **做法：**
  - 在房间里藏 5–8 个可发现的细节，例如：
    - 书架上某本书的特殊反应
    - 深夜（上海时间 0–5 点）才出现的东西
    - 连续点击台灯
    - Konami 秘籍
  - 进度存 `localStorage`，找齐后有一个小奖励（专属画面或留言入口）。
  - 通过 GA4 记录发现事件。
  - 文案中英双语。
- **验收：**
  - 不影响现有的交互射线命中，彩蛋物件不能挡住主要入口的点击。
  - 用 `userData.item` 区分，不写进 `anchors`，避免出现可见的标注点。

### P2-4 留言簿（需要先问用户）

- 纯静态站没有后端，需要用户先拍板方案：
  - Cloudflare Pages Functions 加 D1 或 KV
  - 或者第三方服务
- 方案里必须包含内容审核、限流和防垃圾（例如 Turnstile）。
- **没有得到用户确认前，不要注册服务，也不要创建任何云资源。**
- 前端可以先做出界面：留言显示为便签贴在墙上或屏幕上。

### P3 Classic 首页视觉统一

- **现状：** 根目录的 `index.html` 是 Classic 版，入口为 `/?view=classic`，页面上也有 Classic 和 Explore 的切换。它的视觉语言和 Explore 不一致。
- **做法：**
  - 统一色彩、字体、圆角、按钮和标签样式，直接用上面列出的 Explore 设计变量。
  - 保留 Classic 的信息结构和 SEO 标记，不删改 canonical、hreflang、结构化数据。
  - 双语页面（`/en/` 等）一起检查。
- **验收：**
  - `npm run -s validate:seo` 通过。
  - Lighthouse 性能、可访问性和 SEO 分数不下降。
  - 桌面和手机都截图给用户确认。

## 5. 如果改了房间模型：重新烘焙光照贴图

光照贴图与 `room-lit-packed.glb` 的第二套 UV 严格对应。只要改了房间的几何体，就**必须重新烘焙**，否则光照会错位。

1. 安装工具（在被 git 忽略的目录里）：
   ```sh
   mkdir -p artifacts/lightmap/tools && cd artifacts/lightmap/tools && npm init -y
   npm i three@0.160.0 @gltf-transform/core@4 @gltf-transform/extensions@4 @gltf-transform/functions@4 meshoptimizer xatlasjs@0.2.0 sharp
   ```
2. 运行 `node scripts/studio/prepare-lightmap-room.mjs`。
   - 源文件是 `explore/assets/room-packed.glb`，它是作者原始模型，运行时已经不用它，但**不要删**。
   - 输出 `room-lit-packed.glb`，以及给 Blender 用的无压缩模型。
3. 启动本地预览，然后运行 `node scripts/studio/export-occluders.mjs`，导出人物和道具作为遮挡物。
4. 运行 `/Applications/Blender.app/Contents/MacOS/Blender --background --python scripts/studio/bake-lightmaps.py`。
   - 默认 2048 分辨率、2048 采样，约 5 分钟。
5. 运行 `node scripts/studio/encode-lightmaps.mjs`，把输出的 `SCALE` 值填进 `explore/baked-light.mjs` 的 `bakedScales`。
6. 版本号：
   - 把 `lightmapVersion` 改为 v2，编码时加 `LIGHTMAP_VERSION=v2`。
   - 更新 GLB 的 `?v=` 版本号。
   - 更新 `runtime.mjs` 等的引用版本号。
7. 验证：
   - 昼夜、正面和旋转视角的截图，都要和改动前对比。
   - `node --test tests/*.test.mjs`
   - 屏蔽光照贴图请求时，应退回实时灯光。

已知的坑：

- xatlasjs 返回的 `coords1` **已经归一化到 0–1**，不要再除以宽度。
- Blender 的 Metal 内核编译偶尔会崩溃，重跑一次即可；也可以设 `LIGHTMAP_DEVICE=CPU`。
- 书架那盏灯故意不投射阴影，这样才能保留墙上的暖光。
- 窗户灯的发光半径必须很小，否则会照亮窗户上沿的底面，出现一道亮条。
- 不参与烘焙、保持实时光照的：
  - 物件：`book_01`（可以抽出）、`monitor_screen`
  - 材质：玻璃、灯罩、屏幕
- `book_01` 和书架上的书共用材质，运行时会克隆一份，见 `lighting.mjs` 的 `bake()`。

## 6. 每项任务的通用验收

1. `node --test tests/*.test.mjs` 全部通过。新增的纯函数逻辑要补单元测试，测试文件放在 `tests/studio-*.test.mjs`。
2. `npm run -s validate:seo` 通过。
3. 用 puppeteer 在 1440×900 和 390×844（DPR 3）两种尺寸、昼夜两种模式下截图，和改动前对比。控制台不能有错误。
4. 对照 `sampleFps` 和 `drawCalls` 的前后数值，不能退步。
5. 所有改过的 .mjs 和资源都更新了 `?v=` 或文件名。
6. 删除 `/tmp` 和 `artifacts/` 下的临时文件。

## 7. 需要用户决定的事

- 留言簿用什么后端、由谁审核（P2-4）。
- 街机小游戏的题材和玩法。可以先做 1–2 个原型给用户选。
- 彩蛋的奖励内容，比如是否用未公开的作品、音乐或照片。

## 8. 本轮实施状态（2026-09-29，本地待审）

本轮改动在隔离工作区 `explore-performance/portfolio.github.io` 完成；用户已授权提交、推送和部署。上面的待办保留为原始需求，实施结果如下。

- **P1 已实现并验证**：静止约 30 帧，输入恢复约 60 帧；标注点缓存及 transform 定位；自适应画质、强制高低画质、升降档迟滞；KTX2 模型；独立 r160 压缩引擎。低画质每 45 秒进行一次 6.5 秒恢复探测，阴影在首次加载、资源加载完成及昼夜变化时刷新。
- **P2 已实现并验证**：显示器/Work 导航约 0.93 秒推进与淡入，反向退出、直接链接及减少动态效果模式；仅选中 Games 时加载的 45 秒「像素取景」；6 个细节收集与专属工作室画面；About 内的本地便签。
- **留言簿范围已由用户确认**：只做本地界面。便签明确说明仅保存在本机，不公开、不发送；没有创建后端或云资源。正式公开留言簿仍需用户另行决定后端和审核方案。
- **彩蛋入口**：Work 的显示器边缘、音乐封套、书脊、About 台灯三次轻点、照片背面、街机成功捕捉光点。About 显示进度与集齐奖励。
- **P3 已实现并验证**：Classic 使用 Explore 暖灰配色、系统字体和圆角；保留信息结构与 SEO。中英切换、简历链接和手机菜单已检查。

### 性能与资源数据

- Chrome 本地验证：1440×900 与 390×844（DPR 3），昼夜四种组合无页面错误；烘焙光照有效。静止 30.0–30.2 FPS，交互约 60 FPS；绘制次数仍为桌面 108、手机 73。
- 4 倍 CPU 节流本身未使本机跌破阈值；叠加可控主线程负载后，观察到画质从 0 降到 2，移除负载后回到 0 与约 60 FPS。
- 五个模型合计 6,092,000 → 5,663,888 字节。包含新增解码器的冷请求资源，本地 gzip 估算减少桌面 144,091 字节、手机 30,320 字节；不是 Cloudflare 实际传输测量。
- 模型纹理内存按格式与 mipmap 估算：桌面 71.3 → 5.5 MB，手机 37.7 → 3.2 MB；不是显卡实际驻留内存测量。
- 木纹颜色贴图用 **UASTC 例外**，因为 ETC1S 即使最高质量也产生明显色块；其他颜色 ETC1S，法线/粗糙度 UASTC。桌面人物颜色 2048→1536；手机人物、唱片机与街机颜色 1024→768；街机法线/粗糙度 1024→512。
- **光照贴图未转换**，几何、UV 与 meshopt 数据保持一致，本轮无需重烘焙。共享 `vw-id-aura/vendor` 未修改。
- Classic 同一套本地 Lighthouse：性能 61→72、可访问性 96→100、SEO 100→100。分数为单次对照，仍会随环境波动。

### 验证与后续维护

- 56 项 Node 测试通过；SEO 校验通过（40 个公开页面、12 对双语文章）。
- 实际鼠标/触屏得分、完整 45 秒结束、最高分、本地便签、关闭销毁循环、历史返回、标题焦点、减少动态效果与禁用存储提示已检查。
- 编码脚本：`scripts/studio/convert-ktx2-assets.mjs`，工具只安装到忽略目录。每次重新生成模型后，必须更新运行时 GLB 的 `?v=`，再更新 `index.html` 的运行时版本。模型几何变化仍先按第 5 节重新烘焙，然后重做 KTX2。
- 本轮为本地 Chrome 桌面及移动视口验证；真实手机 Safari 与生产 CDN 尚未验证。
- 已知原有问题：Classic 的网易云内嵌播放器会在控制台报告跨域读取 `window.document` 被浏览器阻止；原始未修改页面也能复现。本轮视觉修改没有改变播放器。这不影响本站页面脚本，但第三方控制台无错这一项不能标为全通过。

### 发布前补充：夜间人物颈部

柔化延伸颈部在夜间侧光下的条状明暗；在下颌处渐隐，随昼夜切换平滑变化，白天保持原有光照。已在实际 WebGL 页面检查夜间与白天，无需改模型或重烘光照贴图。
