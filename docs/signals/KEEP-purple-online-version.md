# 保留紫色线上旧版，不随过程文件清理

用户明确要求保留旧版 Signals Notebook（紫色强调色、文字较多）。

独立归档目录：`/Users/joeyzhao/Documents/Portfolio archives/Signals-purple-live-2026-10-14/`

独立 ZIP：`/Users/joeyzhao/Documents/Portfolio archives/Signals-purple-live-2026-10-14.zip`

包含源码、中英文文案、配套图片、交互脚本、线上 DOM 与完整截图。归档版本来自提交 1c94a05033eeafe464c46bbd220dfbf67de6f783，内联样式与当前线上实测完全一致。

此目录及 ZIP 是永久保留版本，不是缓存或过程文件；任何素材清理、构建清理或新旧版替换不得删除它们。除非用户以后明确要求删除旧版。

## 固定回滚标记

Git 标签：`signals-purple-before-2026-redesign`，指向 `1c94a05033eeafe464c46bbd220dfbf67de6f783`。

需要只恢复紫色 Signals 页时，从该标签恢复 `signals.html`，提交后走现有 Vercel 发布流程。旧页面的 `images/render_p25.jpg` 至 `render_p30.jpg`、`images/signals-cover.jpg` 继续保留。不要将整个站点重置到旧提交，以免覆盖其他项目的新改动。独立归档与 ZIP 同样永久保留。
