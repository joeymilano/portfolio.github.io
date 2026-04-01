#!/usr/bin/env python3
"""
Add i18n support to CollovGPT modal in portfolio site.
Adds data-i18n attributes to HTML elements and Chinese translations.
"""

import re

filepath = '/Users/joeyzhao/Documents/portfolio.github.io/index.html'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# === PART 1: Add data-i18n attributes to CollovGPT modal HTML ===

replacements = [
    # --- Header ---
    (
        '<p class="modal-eyebrow">AI Product · 2024 · B2C</p>\n                <h2 class="modal-title">CollovGPT</h2>\n                <p class="modal-subtitle">AI Interior Design Tool for US Market</p>',
        '<p class="modal-eyebrow" data-i18n="modal.collov.eyebrow">AI Product · 2024 · B2C</p>\n                <h2 class="modal-title" data-i18n="modal.collov.title">CollovGPT</h2>\n                <p class="modal-subtitle" data-i18n="modal.collov.subtitle">AI Interior Design Tool for US Market</p>'
    ),
    # --- Meta Labels & Values ---
    (
        '<div class="modal-meta-item"><span class="modal-meta-label">Role</span><span class="modal-meta-value">Product Designer</span></div>\n                    <div class="modal-meta-item"><span class="modal-meta-label">Team</span><span class="modal-meta-value">PM + 3 Engineers</span></div>\n                    <div class="modal-meta-item"><span class="modal-meta-label">Timeline</span><span class="modal-meta-value">6 Months</span></div>\n                    <div class="modal-meta-item"><span class="modal-meta-label">Tools</span><span class="modal-meta-value">Figma, Jira, Miro</span></div>',
        '<div class="modal-meta-item"><span class="modal-meta-label" data-i18n="modal.collov.metaLabel1">Role</span><span class="modal-meta-value" data-i18n="modal.collov.metaValue1">Product Designer</span></div>\n                    <div class="modal-meta-item"><span class="modal-meta-label" data-i18n="modal.collov.metaLabel2">Team</span><span class="modal-meta-value" data-i18n="modal.collov.metaValue2">PM + 3 Engineers</span></div>\n                    <div class="modal-meta-item"><span class="modal-meta-label" data-i18n="modal.collov.metaLabel3">Timeline</span><span class="modal-meta-value" data-i18n="modal.collov.metaValue3">6 Months</span></div>\n                    <div class="modal-meta-item"><span class="modal-meta-label" data-i18n="modal.collov.metaLabel4">Tools</span><span class="modal-meta-value" data-i18n="modal.collov.metaValue4">Figma, Jira, Miro</span></div>'
    ),
    # --- TL;DR ---
    (
        '<div class="modal-tldr-label">TL;DR</div>\n                    <div class="modal-tldr-text">Reduced subscription drop-off rate from 28.2% to 3.8% by designing a Pro Mode that bridges the gap between casual users and professional interior designers.</div>',
        '<div class="modal-tldr-label" data-i18n="modal.collov.tldrLabel">TL;DR</div>\n                    <div class="modal-tldr-text" data-i18n="modal.collov.tldrText">Reduced subscription drop-off rate from 28.2% to 3.8% by designing a Pro Mode that bridges the gap between casual users and professional interior designers.</div>'
    ),
    # --- Metrics ---
    (
        '<div class="modal-metric"><div class="modal-metric-value">50K</div><div class="modal-metric-label">New Users</div><div class="modal-metric-desc">May 2024 only</div></div>\n                    <div class="modal-metric"><div class="modal-metric-value">+29%</div><div class="modal-metric-label">YoY Revenue</div><div class="modal-metric-desc">After launch</div></div>\n                    <div class="modal-metric"><div class="modal-metric-value">3.8%</div><div class="modal-metric-label">Drop-off Rate</div><div class="modal-metric-desc">Down from 28.2%</div></div>\n                    <div class="modal-metric"><div class="modal-metric-value">3M+</div><div class="modal-metric-label">Registered</div><div class="modal-metric-desc">Total users</div></div>',
        '<div class="modal-metric"><div class="modal-metric-value">50K</div><div class="modal-metric-label" data-i18n="modal.collov.metricLabel1">New Users</div><div class="modal-metric-desc" data-i18n="modal.collov.metricDesc1">May 2024 only</div></div>\n                    <div class="modal-metric"><div class="modal-metric-value">+29%</div><div class="modal-metric-label" data-i18n="modal.collov.metricLabel2">YoY Revenue</div><div class="modal-metric-desc" data-i18n="modal.collov.metricDesc2">After launch</div></div>\n                    <div class="modal-metric"><div class="modal-metric-value">3.8%</div><div class="modal-metric-label" data-i18n="modal.collov.metricLabel3">Drop-off Rate</div><div class="modal-metric-desc" data-i18n="modal.collov.metricDesc3">Down from 28.2%</div></div>\n                    <div class="modal-metric"><div class="modal-metric-value">3M+</div><div class="modal-metric-label" data-i18n="modal.collov.metricLabel4">Registered</div><div class="modal-metric-desc" data-i18n="modal.collov.metricDesc4">Total users</div></div>'
    ),
    # --- Section 1: My Role & Context ---
    (
        '<span class="modal-section-number">1</span>My Role & Context</h3>',
        '<span class="modal-section-number">1</span><span data-i18n="modal.collov.section1Title">My Role &amp; Context</span></h3>'
    ),
    # Role grid labels and values
    (
        '<div class="modal-role-label">My Responsibilities</div>\n                            <div class="modal-role-value">End-to-end product design: user research, wireframing, prototyping, usability testing, and design handoff</div>\n                        </div>\n                        <div class="modal-role-item">\n                            <div class="modal-role-label">Team</div>\n                            <div class="modal-role-value">Me (Product Designer), 1 Product Manager, 3 Dev Engineers</div>\n                        </div>\n                        <div class="modal-role-item">\n                            <div class="modal-role-label">Timeline</div>\n                            <div class="modal-role-value">~6 months (2024)</div>\n                        </div>\n                        <div class="modal-role-item">\n                            <div class="modal-role-label">Tools</div>\n                            <div class="modal-role-value">Figma, Jira, Confluence, Miro</div>',
        '<div class="modal-role-label" data-i18n="modal.collov.roleLabel1">My Responsibilities</div>\n                            <div class="modal-role-value" data-i18n="modal.collov.roleValue1">End-to-end product design: user research, wireframing, prototyping, usability testing, and design handoff</div>\n                        </div>\n                        <div class="modal-role-item">\n                            <div class="modal-role-label" data-i18n="modal.collov.roleLabel2">Team</div>\n                            <div class="modal-role-value" data-i18n="modal.collov.roleValue2">Me (Product Designer), 1 Product Manager, 3 Dev Engineers</div>\n                        </div>\n                        <div class="modal-role-item">\n                            <div class="modal-role-label" data-i18n="modal.collov.roleLabel3">Timeline</div>\n                            <div class="modal-role-value" data-i18n="modal.collov.roleValue3">~6 months (2024)</div>\n                        </div>\n                        <div class="modal-role-item">\n                            <div class="modal-role-label" data-i18n="modal.collov.roleLabel4">Tools</div>\n                            <div class="modal-role-value" data-i18n="modal.collov.roleValue4">Figma, Jira, Confluence, Miro</div>'
    ),
    # --- Section 2: Understanding the Business ---
    (
        '<span class="modal-section-number">2</span>Understanding the Business</h3>\n                    <p>Collov is an AI-powered interior design platform that empowers anyone to visualize and create beautiful interiors effortlessly. The platform bridges AI technology with design creativity, offering drag-and-drop design tools, 3D visualization, and furniture shopping integration.</p>',
        '<span class="modal-section-number">2</span><span data-i18n="modal.collov.section2Title">Understanding the Business</span></h3>\n                    <p data-i18n="modal.collov.section2P1">Collov is an AI-powered interior design platform that empowers anyone to visualize and create beautiful interiors effortlessly. The platform bridges AI technology with design creativity, offering drag-and-drop design tools, 3D visualization, and furniture shopping integration.</p>'
    ),
    # Insight 1
    (
        '<div class="modal-insight-text">With 3M+ registered users, 500+ AI-generated templates, and 50K+ monthly active users, Collov was one of the leading AI interior design platforms—but struggling with user retention.</div>',
        '<div class="modal-insight-text" data-i18n="modal.collov.insightText1">With 3M+ registered users, 500+ AI-generated templates, and 50K+ monthly active users, Collov was one of the leading AI interior design platforms—but struggling with user retention.</div>'
    ),
    # --- Section 3: The Challenge ---
    (
        '<span class="modal-section-number">3</span>The Challenge</h3>\n                    <div class="modal-quote">"1 in every 4 users canceled their subscriptions"</div>\n                    <p>Through stakeholder interviews and data analysis, I identified three core problems:</p>',
        '<span class="modal-section-number">3</span><span data-i18n="modal.collov.section3Title">The Challenge</span></h3>\n                    <div class="modal-quote" data-i18n="modal.collov.quote">\u201c1 in every 4 users canceled their subscriptions\u201d</div>\n                    <p data-i18n="modal.collov.section3P1">Through stakeholder interviews and data analysis, I identified three core problems:</p>'
    ),
    # Challenge list items (contain <strong>, need data-i18n-html)
    (
        '<li><strong>Homogeneous Features:</strong> Our tool looked and felt the same as competitors. Users couldn\'t differentiate our value proposition.</li>\n                        <li><strong>Pro Designer Gap:</strong> Professional interior designers found the simple mode too limiting, while casual users found advanced features confusing.</li>\n                        <li><strong>Broken Purchase Flow:</strong> Users loved the AI-generated designs but couldn\'t easily purchase the furniture shown in renderings.</li>',
        '<li data-i18n="modal.collov.challenge1" data-i18n-html><strong>Homogeneous Features:</strong> Our tool looked and felt the same as competitors. Users couldn\'t differentiate our value proposition.</li>\n                        <li data-i18n="modal.collov.challenge2" data-i18n-html><strong>Pro Designer Gap:</strong> Professional interior designers found the simple mode too limiting, while casual users found advanced features confusing.</li>\n                        <li data-i18n="modal.collov.challenge3" data-i18n-html><strong>Broken Purchase Flow:</strong> Users loved the AI-generated designs but couldn\'t easily purchase the furniture shown in renderings.</li>'
    ),
    # --- Section 4: Competitive Analysis ---
    (
        '<span class="modal-section-number">4</span>Competitive Analysis</h3>\n                    <p>I analyzed 4 major competitors to understand the market landscape and identify opportunities:</p>',
        '<span class="modal-section-number">4</span><span data-i18n="modal.collov.section4Title">Competitive Analysis</span></h3>\n                    <p data-i18n="modal.collov.section4P1">I analyzed 4 major competitors to understand the market landscape and identify opportunities:</p>'
    ),
    # Competitor cards
    (
        '<div class="modal-competitor-name">2020 Design Live</div>\n                            <div class="modal-competitor-pros">✓ Advanced features for pros, CAD integration</div>\n                            <div class="modal-competitor-cons">✗ Overwhelming for beginners, steep learning curve</div>',
        '<div class="modal-competitor-name" data-i18n="modal.collov.comp1Name">2020 Design Live</div>\n                            <div class="modal-competitor-pros" data-i18n="modal.collov.comp1Pros">✓ Advanced features for pros, CAD integration</div>\n                            <div class="modal-competitor-cons" data-i18n="modal.collov.comp1Cons">✗ Overwhelming for beginners, steep learning curve</div>'
    ),
    (
        '<div class="modal-competitor-name">Floorplanner</div>\n                            <div class="modal-competitor-pros">✓ Easy to use, real-time 2D/3D visualization</div>\n                            <div class="modal-competitor-cons">✗ Lacks deep customization for advanced users</div>',
        '<div class="modal-competitor-name" data-i18n="modal.collov.comp2Name">Floorplanner</div>\n                            <div class="modal-competitor-pros" data-i18n="modal.collov.comp2Pros">✓ Easy to use, real-time 2D/3D visualization</div>\n                            <div class="modal-competitor-cons" data-i18n="modal.collov.comp2Cons">✗ Lacks deep customization for advanced users</div>'
    ),
    (
        '<div class="modal-competitor-name">RoomSketcher</div>\n                            <div class="modal-competitor-pros">✓ Balanced UI/UX, beginner-friendly</div>\n                            <div class="modal-competitor-cons">✗ Advanced features behind paywall</div>',
        '<div class="modal-competitor-name" data-i18n="modal.collov.comp3Name">RoomSketcher</div>\n                            <div class="modal-competitor-pros" data-i18n="modal.collov.comp3Pros">✓ Balanced UI/UX, beginner-friendly</div>\n                            <div class="modal-competitor-cons" data-i18n="modal.collov.comp3Cons">✗ Advanced features behind paywall</div>'
    ),
    (
        '<div class="modal-competitor-name">Kujiale</div>\n                            <div class="modal-competitor-pros">✓ High-quality 3D rendering, VR capabilities</div>\n                            <div class="modal-competitor-cons">✗ Cluttered interface, steep learning curve</div>',
        '<div class="modal-competitor-name" data-i18n="modal.collov.comp4Name">Kujiale</div>\n                            <div class="modal-competitor-pros" data-i18n="modal.collov.comp4Pros">✓ High-quality 3D rendering, VR capabilities</div>\n                            <div class="modal-competitor-cons" data-i18n="modal.collov.comp4Cons">✗ Cluttered interface, steep learning curve</div>'
    ),
    # Insight 2
    (
        '<div class="modal-insight-text">Key insight: No competitor offered a complete solution that served both professional designers AND casual users. This was our opportunity.</div>',
        '<div class="modal-insight-text" data-i18n="modal.collov.insightText2">Key insight: No competitor offered a complete solution that served both professional designers AND casual users. This was our opportunity.</div>'
    ),
    # --- Section 5: Design Process ---
    (
        '<span class="modal-section-number">5</span>Design Process</h3>\n                    <p>I proposed a dual-mode approach: keeping the simple "Home Mode" for casual users while adding a "Pro Mode" for professionals.</p>',
        '<span class="modal-section-number">5</span><span data-i18n="modal.collov.section5Title">Design Process</span></h3>\n                    <p data-i18n="modal.collov.section5P1">I proposed a dual-mode approach: keeping the simple \u201cHome Mode\u201d for casual users while adding a \u201cPro Mode\u201d for professionals.</p>'
    ),
    # Process steps
    (
        '<div class="modal-process-label">Import Floor Plan / Photo</div>\n                        </div>\n                        <div class="modal-process-item">\n                            <div class="modal-process-number">2</div>\n                            <div class="modal-process-label">Generate Floor Plan</div>\n                        </div>\n                        <div class="modal-process-item">\n                            <div class="modal-process-number">3</div>\n                            <div class="modal-process-label">3D Space Generation</div>\n                        </div>\n                        <div class="modal-process-item">\n                            <div class="modal-process-number">4</div>\n                            <div class="modal-process-label">Render & Edit</div>\n                        </div>\n                        <div class="modal-process-item">\n                            <div class="modal-process-number">5</div>\n                            <div class="modal-process-label">Present & Buy</div>',
        '<div class="modal-process-label" data-i18n="modal.collov.process1">Import Floor Plan / Photo</div>\n                        </div>\n                        <div class="modal-process-item">\n                            <div class="modal-process-number">2</div>\n                            <div class="modal-process-label" data-i18n="modal.collov.process2">Generate Floor Plan</div>\n                        </div>\n                        <div class="modal-process-item">\n                            <div class="modal-process-number">3</div>\n                            <div class="modal-process-label" data-i18n="modal.collov.process3">3D Space Generation</div>\n                        </div>\n                        <div class="modal-process-item">\n                            <div class="modal-process-number">4</div>\n                            <div class="modal-process-label" data-i18n="modal.collov.process4">Render & Edit</div>\n                        </div>\n                        <div class="modal-process-item">\n                            <div class="modal-process-number">5</div>\n                            <div class="modal-process-label" data-i18n="modal.collov.process5">Present & Buy</div>'
    ),
    # --- Section 6: Design Showcase ---
    (
        '<span class="modal-section-number">6</span>Design Showcase</h3>\n                    <p>Key screens from the complete design process — from competitive analysis to final high-fidelity designs:</p>',
        '<span class="modal-section-number">6</span><span data-i18n="modal.collov.section6Title">Design Showcase</span></h3>\n                    <p data-i18n="modal.collov.section6P1">Key screens from the complete design process — from competitive analysis to final high-fidelity designs:</p>'
    ),
    # Image captions (10 total)
    (
        '<p class="modal-image-caption">Strategic recommendation: Home Page → Pro Mode migration</p>',
        '<p class="modal-image-caption" data-i18n="modal.collov.caption1">Strategic recommendation: Home Page → Pro Mode migration</p>'
    ),
    (
        '<p class="modal-image-caption">Home Page — project dashboard and new project creation flow</p>',
        '<p class="modal-image-caption" data-i18n="modal.collov.caption2">Home Page — project dashboard and new project creation flow</p>'
    ),
    (
        '<p class="modal-image-caption">Import Floor Plan — CAD file upload (DWG/DXF) and room photo import</p>',
        '<p class="modal-image-caption" data-i18n="modal.collov.caption3">Import Floor Plan — CAD file upload (DWG/DXF) and room photo import</p>'
    ),
    (
        '<p class="modal-image-caption">Select and generate room types with AI-powered style options</p>',
        '<p class="modal-image-caption" data-i18n="modal.collov.caption4">Select and generate room types with AI-powered style options</p>'
    ),
    (
        '<p class="modal-image-caption">Pro floor plan editor with precise measurement tools</p>',
        '<p class="modal-image-caption" data-i18n="modal.collov.caption5">Pro floor plan editor with precise measurement tools</p>'
    ),
    (
        '<p class="modal-image-caption">AI Assistant — natural language interface for design modifications</p>',
        '<p class="modal-image-caption" data-i18n="modal.collov.caption6">AI Assistant — natural language interface for design modifications</p>'
    ),
    (
        '<p class="modal-image-caption">3D rendering with multi-view selection and move/change capabilities</p>',
        '<p class="modal-image-caption" data-i18n="modal.collov.caption7">3D rendering with multi-view selection and move/change capabilities</p>'
    ),
    (
        '<p class="modal-image-caption">Multi-room rendering — navigate between different room designs</p>',
        '<p class="modal-image-caption" data-i18n="modal.collov.caption8">Multi-room rendering — navigate between different room designs</p>'
    ),
    (
        '<p class="modal-image-caption">Shopping cart — purchase furniture from renders</p>',
        '<p class="modal-image-caption" data-i18n="modal.collov.caption9">Shopping cart — purchase furniture from renders</p>'
    ),
    (
        '<p class="modal-image-caption">Product detail with similar items recommendation</p>',
        '<p class="modal-image-caption" data-i18n="modal.collov.caption10">Product detail with similar items recommendation</p>'
    ),
    # --- Section 7: Solution ---
    (
        '<span class="modal-section-number">7</span>Solution: Key Features I Designed</h3>',
        '<span class="modal-section-number">7</span><span data-i18n="modal.collov.section7Title">Solution: Key Features I Designed</span></h3>'
    ),
    # Feature cards
    (
        '<div class="modal-feature-title">Floor Plan Import</div>\n                        <div class="modal-feature-desc">Support for CAD files (DWG/DXF) and room photos. Professional designers can now import their existing floor plans directly, eliminating the need to recreate layouts from scratch.</div>',
        '<div class="modal-feature-title" data-i18n="modal.collov.feature1Title">Floor Plan Import</div>\n                        <div class="modal-feature-desc" data-i18n="modal.collov.feature1Desc">Support for CAD files (DWG/DXF) and room photos. Professional designers can now import their existing floor plans directly, eliminating the need to recreate layouts from scratch.</div>'
    ),
    (
        '<div class="modal-feature-title">3D Space Generation</div>\n                        <div class="modal-feature-desc">AI-powered conversion from 2D floor plans to full 3D renderings. Users can select room types, style preferences, and generate photorealistic visualizations in minutes.</div>',
        '<div class="modal-feature-title" data-i18n="modal.collov.feature2Title">3D Space Generation</div>\n                        <div class="modal-feature-desc" data-i18n="modal.collov.feature2Desc">AI-powered conversion from 2D floor plans to full 3D renderings. Users can select room types, style preferences, and generate photorealistic visualizations in minutes.</div>'
    ),
    (
        '<div class="modal-feature-title">AI Assistant</div>\n                        <div class="modal-feature-desc">Natural language interface for design modifications. Users can say "Add more seats and a display counter for coffee mugs" and watch the AI regenerate options.</div>',
        '<div class="modal-feature-title" data-i18n="modal.collov.feature3Title">AI Assistant</div>\n                        <div class="modal-feature-desc" data-i18n="modal.collov.feature3Desc">Natural language interface for design modifications. Users can say \u201cAdd more seats and a display counter for coffee mugs\u201d and watch the AI regenerate options.</div>'
    ),
    (
        '<div class="modal-feature-title">Shopping Cart Integration</div>\n                        <div class="modal-feature-desc">Seamless furniture purchasing directly from rendered designs. AI suggests similar products from partners (e.g., IKEA), users can compare and buy with one click.</div>',
        '<div class="modal-feature-title" data-i18n="modal.collov.feature4Title">Shopping Cart Integration</div>\n                        <div class="modal-feature-desc" data-i18n="modal.collov.feature4Desc">Seamless furniture purchasing directly from rendered designs. AI suggests similar products from partners (e.g., IKEA), users can compare and buy with one click.</div>'
    ),
    # --- Reflection ---
    (
        '<div class="modal-reflection-title">💭 What I Learned</div>\n                    <div class="modal-reflection-text">\n                        This project taught me that <strong>user segmentation isn\'t about creating separate products—it\'s about designing adaptive experiences</strong>. The Pro Mode wasn\'t just adding features; it was about understanding that professional designers think in floor plans and measurements, while casual users think in styles and moods. By bridging these mental models with a shared AI backbone, we created a tool that grows with users rather than forcing them to choose sides.\n                    </div>',
        '<div class="modal-reflection-title" data-i18n="modal.collov.reflectionTitle">💭 What I Learned</div>\n                    <div class="modal-reflection-text" data-i18n="modal.collov.reflectionText" data-i18n-html>\n                        This project taught me that <strong>user segmentation isn\'t about creating separate products—it\'s about designing adaptive experiences</strong>. The Pro Mode wasn\'t just adding features; it was about understanding that professional designers think in floor plans and measurements, while casual users think in styles and moods. By bridging these mental models with a shared AI backbone, we created a tool that grows with users rather than forcing them to choose sides.\n                    </div>'
    ),
]

# Apply HTML replacements
count = 0
for old, new in replacements:
    if old in content:
        content = content.replace(old, new, 1)
        count += 1
    else:
        print(f"WARNING: Could not find replacement #{count+1}")
        # Print first 80 chars for debugging
        print(f"  Looking for: {old[:80]}...")

print(f"Applied {count}/{len(replacements)} HTML replacements")

# === PART 2: Add Chinese translations to translations.zh ===

zh_translations = """                'modal.collov.eyebrow': 'AI产品 · 2024 · B2C',
                'modal.collov.title': 'CollovGPT',
                'modal.collov.subtitle': '面向美国市场的AI室内设计工具',
                'modal.collov.metaLabel1': '角色',
                'modal.collov.metaValue1': '产品设计师',
                'modal.collov.metaLabel2': '团队',
                'modal.collov.metaValue2': '产品经理 + 3名工程师',
                'modal.collov.metaLabel3': '周期',
                'modal.collov.metaValue3': '6个月',
                'modal.collov.metaLabel4': '工具',
                'modal.collov.metaValue4': 'Figma, Jira, Miro',
                'modal.collov.tldrLabel': '概述',
                'modal.collov.tldrText': '通过设计Pro模式，将订阅流失率从28.2%降至3.8%，成功弥合了普通用户与专业室内设计师之间的需求鸿沟。',
                'modal.collov.metricLabel1': '新用户',
                'modal.collov.metricDesc1': '仅2024年5月',
                'modal.collov.metricLabel2': '同比营收',
                'modal.collov.metricDesc2': '上线后',
                'modal.collov.metricLabel3': '流失率',
                'modal.collov.metricDesc3': '从28.2%降至',
                'modal.collov.metricLabel4': '注册用户',
                'modal.collov.metricDesc4': '总用户数',
                'modal.collov.section1Title': '我的角色与背景',
                'modal.collov.roleLabel1': '我的职责',
                'modal.collov.roleValue1': '端到端产品设计：用户研究、线框图、原型设计、可用性测试及设计交付',
                'modal.collov.roleLabel2': '团队',
                'modal.collov.roleValue2': '我（产品设计师）、1名产品经理、3名开发工程师',
                'modal.collov.roleLabel3': '周期',
                'modal.collov.roleValue3': '约6个月（2024年）',
                'modal.collov.roleLabel4': '工具',
                'modal.collov.roleValue4': 'Figma、Jira、Confluence、Miro',
                'modal.collov.section2Title': '了解业务',
                'modal.collov.section2P1': 'Collov是一个AI驱动的室内设计平台，让任何人都能轻松地可视化和创建精美的室内设计。该平台将AI技术与设计创意相结合，提供拖放设计工具、3D可视化和家具购物集成。',
                'modal.collov.insightText1': '拥有300万+注册用户、500+AI生成模板和5万+月活跃用户，Collov是领先的AI室内设计平台之一——但在用户留存方面面临困境。',
                'modal.collov.section3Title': '挑战',
                'modal.collov.quote': '"每4个用户中就有1个取消了订阅"',
                'modal.collov.section3P1': '通过利益相关者访谈和数据分析，我发现了三个核心问题：',
                'modal.collov.challenge1': '<strong>功能同质化：</strong>我们的工具在外观和体验上与竞品无异，用户无法分辨我们的价值主张。',
                'modal.collov.challenge2': '<strong>专业设计师缺口：</strong>专业室内设计师觉得简单模式太受限，而普通用户又觉得高级功能令人困惑。',
                'modal.collov.challenge3': '<strong>购买流程断裂：</strong>用户喜欢AI生成的设计，但无法方便地购买渲染图中展示的家具。',
                'modal.collov.section4Title': '竞品分析',
                'modal.collov.section4P1': '我分析了4个主要竞品，以了解市场格局并发现机会：',
                'modal.collov.comp1Name': '2020 Design Live',
                'modal.collov.comp1Pros': '✓ 专业级高级功能，CAD集成',
                'modal.collov.comp1Cons': '✗ 对初学者来说过于复杂，学习曲线陡峭',
                'modal.collov.comp2Name': 'Floorplanner',
                'modal.collov.comp2Pros': '✓ 易于使用，实时2D/3D可视化',
                'modal.collov.comp2Cons': '✗ 缺乏高级用户的深度自定义',
                'modal.collov.comp3Name': 'RoomSketcher',
                'modal.collov.comp3Pros': '✓ 均衡的UI/UX，适合初学者',
                'modal.collov.comp3Cons': '✗ 高级功能在付费墙后面',
                'modal.collov.comp4Name': '酷家乐',
                'modal.collov.comp4Pros': '✓ 高质量3D渲染，VR功能',
                'modal.collov.comp4Cons': '✗ 界面杂乱，学习曲线陡峭',
                'modal.collov.insightText2': '关键洞察：没有竞品能提供同时服务专业设计师和普通用户的完整解决方案。这就是我们的机会。',
                'modal.collov.section5Title': '设计流程',
                'modal.collov.section5P1': '我提出了双模式方案：保留面向普通用户的简单"家居模式"，同时为专业人士增加"专业模式"。',
                'modal.collov.process1': '导入户型图/照片',
                'modal.collov.process2': '生成户型图',
                'modal.collov.process3': '3D空间生成',
                'modal.collov.process4': '渲染与编辑',
                'modal.collov.process5': '展示与购买',
                'modal.collov.section6Title': '设计展示',
                'modal.collov.section6P1': '从竞品分析到最终高保真设计的完整设计流程关键界面：',
                'modal.collov.caption1': '战略建议：首页 → 专业模式迁移',
                'modal.collov.caption2': '首页——项目仪表盘和新建项目流程',
                'modal.collov.caption3': '导入户型图——CAD文件上传（DWG/DXF）和房间照片导入',
                'modal.collov.caption4': '选择并生成房间类型，支持AI风格选项',
                'modal.collov.caption5': '专业户型图编辑器，配备精确测量工具',
                'modal.collov.caption6': 'AI助手——用自然语言进行设计修改',
                'modal.collov.caption7': '3D渲染，支持多视角选择和移动/更改功能',
                'modal.collov.caption8': '多房间渲染——在不同房间设计之间导航',
                'modal.collov.caption9': '购物车——直接从渲染图中购买家具',
                'modal.collov.caption10': '产品详情及相似商品推荐',
                'modal.collov.section7Title': '解决方案：我设计的核心功能',
                'modal.collov.feature1Title': '户型图导入',
                'modal.collov.feature1Desc': '支持CAD文件（DWG/DXF）和房间照片。专业设计师现在可以直接导入现有户型图，无需从头重建布局。',
                'modal.collov.feature2Title': '3D空间生成',
                'modal.collov.feature2Desc': 'AI驱动的2D户型图到完整3D渲染的转换。用户可以选择房间类型、风格偏好，并在几分钟内生成逼真的可视化效果。',
                'modal.collov.feature3Title': 'AI助手',
                'modal.collov.feature3Desc': '用于设计修改的自然语言界面。用户可以说"添加更多座位和一个咖啡杯展示台"，然后观看AI重新生成方案。',
                'modal.collov.feature4Title': '购物车集成',
                'modal.collov.feature4Desc': '直接从渲染设计中无缝购买家具。AI从合作伙伴（如宜家）推荐相似产品，用户可以一键比较和购买。',
                'modal.collov.reflectionTitle': '💭 我的收获',
                'modal.collov.reflectionText': '这个项目让我明白，<strong>用户细分不是创建独立产品——而是设计自适应体验</strong>。专业模式不仅仅是添加功能；更重要的是理解专业设计师以户型图和尺寸来思考，而普通用户则以风格和氛围来思考。通过用共享的AI核心来连接这两种思维模式，我们创造了一个与用户共同成长的工具，而不是迫使他们做选择。',"""

# Also add English translations for the modal
en_translations = """                'modal.collov.eyebrow': 'AI Product · 2024 · B2C',
                'modal.collov.title': 'CollovGPT',
                'modal.collov.subtitle': 'AI Interior Design Tool for US Market',
                'modal.collov.metaLabel1': 'Role',
                'modal.collov.metaValue1': 'Product Designer',
                'modal.collov.metaLabel2': 'Team',
                'modal.collov.metaValue2': 'PM + 3 Engineers',
                'modal.collov.metaLabel3': 'Timeline',
                'modal.collov.metaValue3': '6 Months',
                'modal.collov.metaLabel4': 'Tools',
                'modal.collov.metaValue4': 'Figma, Jira, Miro',
                'modal.collov.tldrLabel': 'TL;DR',
                'modal.collov.tldrText': 'Reduced subscription drop-off rate from 28.2% to 3.8% by designing a Pro Mode that bridges the gap between casual users and professional interior designers.',
                'modal.collov.metricLabel1': 'New Users',
                'modal.collov.metricDesc1': 'May 2024 only',
                'modal.collov.metricLabel2': 'YoY Revenue',
                'modal.collov.metricDesc2': 'After launch',
                'modal.collov.metricLabel3': 'Drop-off Rate',
                'modal.collov.metricDesc3': 'Down from 28.2%',
                'modal.collov.metricLabel4': 'Registered',
                'modal.collov.metricDesc4': 'Total users',
                'modal.collov.section1Title': 'My Role & Context',
                'modal.collov.roleLabel1': 'My Responsibilities',
                'modal.collov.roleValue1': 'End-to-end product design: user research, wireframing, prototyping, usability testing, and design handoff',
                'modal.collov.roleLabel2': 'Team',
                'modal.collov.roleValue2': 'Me (Product Designer), 1 Product Manager, 3 Dev Engineers',
                'modal.collov.roleLabel3': 'Timeline',
                'modal.collov.roleValue3': '~6 months (2024)',
                'modal.collov.roleLabel4': 'Tools',
                'modal.collov.roleValue4': 'Figma, Jira, Confluence, Miro',
                'modal.collov.section2Title': 'Understanding the Business',
                'modal.collov.section2P1': 'Collov is an AI-powered interior design platform that empowers anyone to visualize and create beautiful interiors effortlessly. The platform bridges AI technology with design creativity, offering drag-and-drop design tools, 3D visualization, and furniture shopping integration.',
                'modal.collov.insightText1': 'With 3M+ registered users, 500+ AI-generated templates, and 50K+ monthly active users, Collov was one of the leading AI interior design platforms\\u2014but struggling with user retention.',
                'modal.collov.section3Title': 'The Challenge',
                'modal.collov.quote': '\\u201c1 in every 4 users canceled their subscriptions\\u201d',
                'modal.collov.section3P1': 'Through stakeholder interviews and data analysis, I identified three core problems:',
                'modal.collov.challenge1': '<strong>Homogeneous Features:</strong> Our tool looked and felt the same as competitors. Users couldn\\u2019t differentiate our value proposition.',
                'modal.collov.challenge2': '<strong>Pro Designer Gap:</strong> Professional interior designers found the simple mode too limiting, while casual users found advanced features confusing.',
                'modal.collov.challenge3': '<strong>Broken Purchase Flow:</strong> Users loved the AI-generated designs but couldn\\u2019t easily purchase the furniture shown in renderings.',
                'modal.collov.section4Title': 'Competitive Analysis',
                'modal.collov.section4P1': 'I analyzed 4 major competitors to understand the market landscape and identify opportunities:',
                'modal.collov.comp1Name': '2020 Design Live',
                'modal.collov.comp1Pros': '\\u2713 Advanced features for pros, CAD integration',
                'modal.collov.comp1Cons': '\\u2717 Overwhelming for beginners, steep learning curve',
                'modal.collov.comp2Name': 'Floorplanner',
                'modal.collov.comp2Pros': '\\u2713 Easy to use, real-time 2D/3D visualization',
                'modal.collov.comp2Cons': '\\u2717 Lacks deep customization for advanced users',
                'modal.collov.comp3Name': 'RoomSketcher',
                'modal.collov.comp3Pros': '\\u2713 Balanced UI/UX, beginner-friendly',
                'modal.collov.comp3Cons': '\\u2717 Advanced features behind paywall',
                'modal.collov.comp4Name': 'Kujiale',
                'modal.collov.comp4Pros': '\\u2713 High-quality 3D rendering, VR capabilities',
                'modal.collov.comp4Cons': '\\u2717 Cluttered interface, steep learning curve',
                'modal.collov.insightText2': 'Key insight: No competitor offered a complete solution that served both professional designers AND casual users. This was our opportunity.',
                'modal.collov.section5Title': 'Design Process',
                'modal.collov.section5P1': 'I proposed a dual-mode approach: keeping the simple \\u201cHome Mode\\u201d for casual users while adding a \\u201cPro Mode\\u201d for professionals.',
                'modal.collov.process1': 'Import Floor Plan / Photo',
                'modal.collov.process2': 'Generate Floor Plan',
                'modal.collov.process3': '3D Space Generation',
                'modal.collov.process4': 'Render & Edit',
                'modal.collov.process5': 'Present & Buy',
                'modal.collov.section6Title': 'Design Showcase',
                'modal.collov.section6P1': 'Key screens from the complete design process \\u2014 from competitive analysis to final high-fidelity designs:',
                'modal.collov.caption1': 'Strategic recommendation: Home Page \\u2192 Pro Mode migration',
                'modal.collov.caption2': 'Home Page \\u2014 project dashboard and new project creation flow',
                'modal.collov.caption3': 'Import Floor Plan \\u2014 CAD file upload (DWG/DXF) and room photo import',
                'modal.collov.caption4': 'Select and generate room types with AI-powered style options',
                'modal.collov.caption5': 'Pro floor plan editor with precise measurement tools',
                'modal.collov.caption6': 'AI Assistant \\u2014 natural language interface for design modifications',
                'modal.collov.caption7': '3D rendering with multi-view selection and move/change capabilities',
                'modal.collov.caption8': 'Multi-room rendering \\u2014 navigate between different room designs',
                'modal.collov.caption9': 'Shopping cart \\u2014 purchase furniture from renders',
                'modal.collov.caption10': 'Product detail with similar items recommendation',
                'modal.collov.section7Title': 'Solution: Key Features I Designed',
                'modal.collov.feature1Title': 'Floor Plan Import',
                'modal.collov.feature1Desc': 'Support for CAD files (DWG/DXF) and room photos. Professional designers can now import their existing floor plans directly, eliminating the need to recreate layouts from scratch.',
                'modal.collov.feature2Title': '3D Space Generation',
                'modal.collov.feature2Desc': 'AI-powered conversion from 2D floor plans to full 3D renderings. Users can select room types, style preferences, and generate photorealistic visualizations in minutes.',
                'modal.collov.feature3Title': 'AI Assistant',
                'modal.collov.feature3Desc': 'Natural language interface for design modifications. Users can say \\u201cAdd more seats and a display counter for coffee mugs\\u201d and watch the AI regenerate options.',
                'modal.collov.feature4Title': 'Shopping Cart Integration',
                'modal.collov.feature4Desc': 'Seamless furniture purchasing directly from rendered designs. AI suggests similar products from partners (e.g., IKEA), users can compare and buy with one click.',
                'modal.collov.reflectionTitle': '\\ud83d\\udcad What I Learned',
                'modal.collov.reflectionText': 'This project taught me that <strong>user segmentation isn\\u2019t about creating separate products\\u2014it\\u2019s about designing adaptive experiences</strong>. The Pro Mode wasn\\u2019t just adding features; it was about understanding that professional designers think in floor plans and measurements, while casual users think in styles and moods. By bridging these mental models with a shared AI backbone, we created a tool that grows with users rather than forcing them to choose sides.',"""

# Insert English translations before the closing of en block
en_marker = "'music.viewOnNetease': 'View on NetEase Cloud Music'\n            },"
content = content.replace(
    en_marker,
    "'music.viewOnNetease': 'View on NetEase Cloud Music',\n" + en_translations + "\n            },",
    1
)

# Insert Chinese translations before the closing of zh block
zh_marker = "'music.viewOnNetease': '在网易云音乐上查看'\n            }\n        };"
content = content.replace(
    zh_marker,
    "'music.viewOnNetease': '在网易云音乐上查看',\n" + zh_translations + "\n            }\n        };",
    1
)

# Write the file back
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done! CollovGPT modal i18n applied successfully.")
print("English and Chinese translations added to translations object.")
