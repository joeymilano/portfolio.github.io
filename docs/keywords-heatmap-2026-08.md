# 关键词热词数据报告 — 7-11 动线篇 & 星巴克杯篇

> 数据来源：Google Trends 官方数据（pytrends API 实时拉取）
> 查询日期：2026-08-16 | 窗口：近 12 个月 | 热度：0-100 相对指数
> 方向：近 3 个月均值 ÷ 前 9 个月均值（>1.05 ↑ / <0.95 ↓）

## 一、实测数据总表（美国区）

| 关键词 | 12个月均值 | 方向 | 选题含义 |
|---|---|---|---|
| ikea | 56.5 | ×1.09 ↑ | 已有文章占位，集群核心，流量基本盘 |
| retail design | 51.9 | ×1.02 → | 高位稳定，系列通用词 |
| store layout | 26.7 | ×1.13 ↑ | 7-11 篇英文主词方向 |
| coffee cup design | 9.1 | ×1.55 ↑ | 星巴克篇英文主词方向（增量词） |
| convenience store | 4.4 | ×1.20 ↑ | 7-11 篇支撑词 |
| starbucks cup | 3.8 | ×0.74 ↓ | 大词季节性回落 → 不做标题主词，做组合词 |
| 7-eleven | 1.7 | ×1.79 ↑ | 品牌词低位快升 → newsjacking 窗口 |
| uniqlo | 13.5 | ×0.82 ↓ | 备选题正式排除 |

**香港区**：starbucks 75.0（→）、7-eleven 6.1（×1.70 ↑）、convenience store 1.9（×1.08 ↑）——两篇在港新沪地区均有自然搜索基础。

## 二、Rising Queries（上升关联词，US）

**7-eleven：**
- `7-eleven location downsizing` +162,700% ← 北美关店话题爆发
- `when is free slurpee day at 7-eleven 2026` +7,500%
- `7-eleven north america store closures` +5,350%
- → 已写入 7-11 篇开场：北美关店 vs 日本 3000 亿日元改装的对比叙事

**starbucks：**
- `starbucks bear cup` +21,900% ← 熊杯抢购潮
- `starbucks bearista cup` +18,600%
- `starbucks teddy bear cup` +8,500%
- `starbucks summer menu 2026` +4,100%
- → 已写入星巴克篇开场与"手写名字"章节，作为感知价值论点的时效实证

**convenience store：**
- `konoha japanese convenience store` +600%、`japan convenience store` +160%、`cu convenience store` +160%、`lawson convenience store` +60%
- → "日本便利店"是持续上升兴趣点，7-11 篇全文锚定日本框架，天然承接

## 三、两篇文章的关键词布局

### 7-11 动线篇（seven-eleven-layout-psychology）
| 层级 | 中文版 | 英文版 |
|---|---|---|
| Title 主词 | 7-11 动线 / 30㎡ | 7-Eleven layout（品牌×类型组合） |
| 支撑词 | 便利店动线设计、黄金三角、货架高度、收银台 | convenience store layout、counterclockwise、golden triangle、checkout |
| 时效钩子 | 3000 亿日元改装 5000 家店 | ¥300B remodel / store closures 对比 |
| 意图类型 | 信息型（拆解）+ 品牌型 | 同左 |

### 星巴克杯篇（starbucks-cup-perceived-value）
| 层级 | 中文版 | 英文版 |
|---|---|---|
| Title 主词 | 星巴克 杯子 40 块 | Starbucks cup design（组合主词，避开下降的裸词 starbucks cup） |
| 支撑词 | 感知价值、消费心理学、杯型、熊杯 | perceived value、tapered cup、haptic branding、Bearista |
| 时效钩子 | 熊杯抢空 + 黄牛加价 | bear cup +21,900% |
| 策略说明 | bear cup 类词只做内文论据不做标题（避免热度过后标题过时） | 同左 |

## 四、内链集群地图（零售 × 消费心理）

```
                ┌─ ikea-one-way-layout（动线·万㎡对照）
7-11 动线篇 ────┼─ casino-design-four-traps（空间心理·伦理对照）
                └─ starbucks-cup-perceived-value（互链·系列下一篇）

                ┌─ casino-design-four-traps（储值卡=筹码亲戚）
星巴克杯篇 ─────┼─ apple-store-invisible-door（进店阻力 vs 消费许可）
                └─ 7-11 动线篇（互链）
```

两篇新文 continue 卡各指向 2 篇站内文章；中文列表页已置顶（01/02），序号顺延。

## 五、后续迭代指引（2-4 周后）

1. **Search Console 重点盯**：
   - 7-11 篇：`convenience store layout`、`7-eleven layout`、`便利店动线`
   - 星巴克篇：`starbucks cup design`、`星巴克杯子`、`perceived value`
2. **季节性预期**：`starbucks cup` 类词每年 Q4（节日杯季）周期性回升，星巴克篇宜在 11-12 月复查排名与 CTR，必要时在文首补一段当季钩子。
3. **标题迭代触发条件**：若星巴克英文篇 CTR 高但平均排名 >20，可把 H1 从 "Convinces You the Price Is Fine" 调整为更贴搜索意图的 "Why a Starbucks Cup Makes $6 Feel Reasonable"。
4. **数据复核命令**（本机可直接重跑）：
   ```bash
   python3 /private/tmp/gtrends_check.py      # 大词趋势对比
   python3 /private/tmp/gtrends_related.py    # rising queries
   ```
   临时脚本若被清理，重装 `pip3 install pytrends` 后按本文档口径重建即可。

## 六、来源

- Google Trends 官方数据（pytrends 非官方 API，2026-08-16 拉取）
- 7-Eleven 日本改装计划：广告门报道 https://www.adquan.com/article/359548
- 行业背景：毕马威×CCFA《2026 中国便利店发展报告》 https://kpmg.com/cn/zh/insights/2026/05/china-convenience-store-development-report-2026.html
- 星巴克实拍图：Wikimedia Commons（CC BY-SA 2.0 / 4.0，已在文章 References 署名）

---
*本报告为内部工作文档，不随站点发布。*
