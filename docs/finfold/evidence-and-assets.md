# Finfold 案例内容与素材记录

更新：2026-10-12

## 内容边界

角色按用户确认：AI 产品设计师，主导体验与界面设计，与团队共同开发。三项奖项属于 Finfold。未声称独立完成全部开发。用户于 2026-10-12 确认已招募参与者并有访谈资料；用户进一步确认测试已完成；具体样本、时长与量化结果不作推断。业务增长数据仍需对应证据。

根路径 `/finfold` 为中文，`/en/finfold` 为英文；静态内容、图片、搜索摘要、结构化数据和语言切换互相对应。页面可独立访问，不依赖运行时替换正文。

## 公开来源

- [CMI / MarketingProfs 2026 B2B 报告](https://contentmarketinginstitute.com/b2b-research/b2b-content-marketing-trends-research)：87% 生产力、39% 内容表现，均为使用 AI 创作内容的人群的自报结果。报告总体 1,015 位 B2B 营销人员，主要来自北美；不是两个 Finfold 产品效果数字
- [Jasper Brand Voice](https://www.jasper.ai/brand-voice)：品牌语气与一致性定位，不据此推导它缺少其他功能
- [Buffer Publish](https://buffer.com/publish)：排期、发布、表现分析、AI 内容助手，不使用过时的“没有发布与分析”比较
- [X-Agent 官方结果](https://github.com/xagentAI/xagt-plugin#event-concluded--final-winners)：Open Innovation 第四名，Finfold Growth Mission
- 华清普智 SoloVerse 第三名·涌现奖、海派初芯 FC-OPC × Next iBot 上海创意黑客松最佳端云协同奖：依据用户本人确认；未制作证书、奖杯图或伪造主办方标志

## 界面素材

用户提供的 2026-10-11 中文截图：

| 来源时间 | 内容 | 优化文件 |
| --- | --- | --- |
| 23.56.38 | 增长总览 | overview-zh-dark.webp |
| 23.57.13 | 内容库 | library-zh-dark.webp |
| 23.56.12 | 智能体 | agent-zh-dark.webp |
| 23.57.05 | 创作台 | studio-zh-dark.webp |
| 23.57.26 | 订阅与账单 | 本轮未采用 |
| 23.54.56 | 官网 | 本轮未采用 |

通过 Computer Use 在已登录的真实 Finfold 产品补拍：

- agent-en-light、agent-en-dark：英文智能体明暗主题
- overview-en-dark：英文增长总览
- kit-en-dark：已存在的英文内容包，标题以 Finfold helps solo founders 开头
- agent-zh-light：中文智能体浅色主题

补拍仅浏览与切换语言／主题，没有提交生成、发布、删除、订阅或付费。已恢复中文和浅色主题。英文总览中的 2,636 是管理中的账号粉丝合计，未当作产品业绩使用。用户原始内容不会随界面语言自动翻译；英文内容包截图裁取到编辑操作区，避开底部历史生成的中文质量标签；不对截图中文字作伪造替换。

images/ 下两张既有现场照片被压缩为 WebP 用于“项目展示与交流记录”，未声称属于某一项具体奖项现场。布局图依据前后产品版本重新整理，并明确标注为布局演进示意。

所有产品图片保留真实界面；处理仅包括尺寸调整、WebP 压缩与明确的局部放大。原始补拍保存在 本地 .tmp-finfold-captures（不随站点发布）。图片、字体均本地加载。

## 页面维护

- `scripts/build-finfold-case.py` 生成中英文 HTML，需要 Python 3.12+ 与 Pillow
- `assets/finfold/case.css`：视觉系统与响应式布局
- `assets/finfold/case.js`：章节导航、无障碍标签切换、放大、语言锚点和联络事件
- 不在本轮修改文章正文、Signals 项目或 Finfold 产品本身


## 2026-10-12 视觉深化

- Jasper Brand Voice 产品图来自 https://www.jasper.ai/brand-voice ，原始图片 https://cdn.prod.website-files.com/6807ee8d73c233fb82842313/6841d30b227f5394029ef644_brand-voice-dash-2.png
- Buffer Calendar 使用 Computer Use 截取 https://buffer.com/publish 的官方日历演示，未改变其 UI
- Letour Cycles 官网品牌图片 https://www.letour.com.au/assets/marketing/107.jpg?1715349484 ，官方 logo https://www.letour.com.au/assets/website_logo.png
- Annoval Medical 官方品牌背景图 https://www.annoval.com.cn/hero-bg.jpg
- 品牌关系由用户提供；没有引用官网患者数字、案例或品牌业务结果作为 Finfold 成效
- `workflow-sculptures.webp`：内置 image_gen 生成的概念插画，仅用于设计判断的视觉表达，不作为研究记录或产品界面
- 新图本地化为 WebP，来源入口保留为卡片品牌链接，去掉页面中的冗余解释性注释

## Landing 封面更新

用户提供的 `Screenshot 2026-10-11 at 23.54.56.png` 转为 `landing-zh-dark.webp`，用于中文案例 Hero、分享图及经典/3D 主页中文 Finfold 卡片。保留原截图内容，仅缩放压缩；英文入口维持英文产品截图。

## 小红书实际内容样本 · BP 9.20

- 来源：用户提供 `/Users/joeyzhao/Downloads/Finfold_BP_9.20.pdf`，第 9 页“内容场景样本”
- 提取：直接渲染 PDF 中的账号与笔记截图区域，未改动截图文字或数据；输出 `xhs-published-example.webp`
- 账号：阿弗洛狄德设计留学
- 笔记：麦当劳的座椅为什么坐 40 分钟就想走
- 可见单篇数据：3,078 点赞、706 收藏、172 评论
- 可见账号数据：2,164 粉丝、1.6 万获赞与收藏；未加入单篇指标卡，避免混淆口径
- 页面注明“单篇笔记表现 · 2026.09 BP 收录”，不称当前数据，不声称由本轮 UI 改版引起，也不推断曝光、转化、收入或增长率
- 英文版保留原始中文证据截图，周边说明和指标使用英文；不是未翻译的英文产品 UI
- BP 第 3 页用户规模已加入项目概览，与单篇社媒互动分开展示

## 项目回顾口吻修订

用户于 2026-10-12 明确要求按已完成项目呈现。中英文测试区改为完成式叙述；删去预设的 45 分钟测试安排，不新增样本数、完成率或虚构发现。全文移除未来研究/测试表述，保留正在迭代的产品状态。

## 2026-10-12 设计证据深化

- 项目概览增加 2,200 累计用户、50%+ 海外用户，来源 BP 第 3 页正文及嵌入图表；统一标注 2026.09，不视为改版带来的增长
- 信息架构增加六项分散工作到三个连续阶段的对照，依据 BP 第 6 页；没有虚构耗时或效率提升比例
- `memory-zh-light.webp` / `memory-en-light.webp`：Computer Use 从实际 `/brand-memory` 截取，仅做 WebP 格式转换。保存内容为 Joey Zhao 个人 + 品牌，表达原则摘自已保存的价值描述。英文版使用英文 UI，用户原始中文资料保持原样
- 品牌记忆说明限于可见、可编辑的身份/定位/语气上下文，没有声称已验证每次编辑都会自动学习
- X / LinkedIn 文案节选来自实际已保存内容包，2026-09-22 创建。源文案以 “Finfold helps solo founders...” 开始；两份草稿分别以 “Solo founders don’t hate writing...” 与 “Most solo founders publish one platform...” 开始
- 文案以案例图解重新排版，标记“草稿节选”，没有使用社交预览中的示意互动数据作为实际结果
- 采集过程中没有创建、编辑或发布内容，没有修改品牌资料；语言恢复中文，主题保持原有浅色

## 2026-10-13 手机与英文精修

- 蓝色团队人物直接提取自 BP 第 17–20 页的嵌入图片，压缩为 `team-design-product.webp`、`team-engineering.webp`、`team-business.webp`、`team-ai.webp`，未重新生成或修改人物
- 页面使用 CSS 裁去原图左侧空白，不显示姓名、履历或学历，仅按 BP 分工呈现 Design & Product、Engineering、Business & Growth、AI Research
- 修正概览数据容器缺少结束标签的问题，截图和个人贡献恢复独立全宽布局
- 英文标题改为具体任务与设计选择；移动端正文、指标说明、图片说明与奖项字级提高
- 章节栏自动横向跟随当前章节；图片查看增加原尺寸模式，手机可滑动查看界面细节
- 删除布局示意图下重复说明，来源与重构方式保留在本记录

## 2026-10-13 中文文案统一

- 中文团队职责为产品与设计、工程开发、商业与增长、人工智能研究，英文页面保留英文职责
- 首屏栏目、职业名称、测试编号、页尾署名及奖项序数统一按页面语言输出
- 中文版跨平台草稿示例改为中文译文并标明，原始英文稿与品牌、平台专名保持其来源
