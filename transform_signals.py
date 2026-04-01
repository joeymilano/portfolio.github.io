#!/usr/bin/env python3
"""Transform Signals Notebook modal for i18n support."""

import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# ── HTML REPLACEMENTS ──
html_replacements = [
    # Eyebrow
    (
        '<p class="modal-eyebrow">Enterprise B2B \u00b7 2021-Present</p>',
        '<p class="modal-eyebrow" data-i18n="modal.signals.eyebrow">Enterprise B2B \u00b7 2021-Present</p>',
    ),
    # Title
    (
        '<h2 class="modal-title">Signals Notebook</h2>',
        '<h2 class="modal-title" data-i18n="modal.signals.title">Signals Notebook</h2>',
    ),
    # Subtitle
    (
        '<p class="modal-subtitle">Lineage Visualization for Pharmaceutical Giants</p>',
        '<p class="modal-subtitle" data-i18n="modal.signals.subtitle">Lineage Visualization for Pharmaceutical Giants</p>',
    ),
    # Meta labels & values
    (
        '<span class="modal-meta-label">Role</span><span class="modal-meta-value">Sr. Product Designer</span></div>\n                    <div class="modal-meta-item"><span class="modal-meta-label">Company</span><span class="modal-meta-value">Revvity</span></div>\n                    <div class="modal-meta-item"><span class="modal-meta-label">Users</span><span class="modal-meta-value">10,000+ Teams</span></div>\n                    <div class="modal-meta-item"><span class="modal-meta-label">Countries</span><span class="modal-meta-value">50+</span></div>',
        '<span class="modal-meta-label" data-i18n="modal.signals.metaLabel1">Role</span><span class="modal-meta-value" data-i18n="modal.signals.metaValue1">Sr. Product Designer</span></div>\n                    <div class="modal-meta-item"><span class="modal-meta-label" data-i18n="modal.signals.metaLabel2">Company</span><span class="modal-meta-value" data-i18n="modal.signals.metaValue2">Revvity</span></div>\n                    <div class="modal-meta-item"><span class="modal-meta-label" data-i18n="modal.signals.metaLabel3">Users</span><span class="modal-meta-value" data-i18n="modal.signals.metaValue3">10,000+ Teams</span></div>\n                    <div class="modal-meta-item"><span class="modal-meta-label" data-i18n="modal.signals.metaLabel4">Countries</span><span class="modal-meta-value" data-i18n="modal.signals.metaValue4">50+</span></div>',
    ),
    # TL;DR
    (
        '<div class="modal-tldr-label">TL;DR</div>',
        '<div class="modal-tldr-label" data-i18n="modal.signals.tldrLabel">TL;DR</div>',
    ),
    (
        '<div class="modal-tldr-text">Reduced lineage tracing time by 66% (from 2 hours to 40 minutes) by designing an interactive visualization system for tracking complex biological material relationships in pharmaceutical research.</div>',
        '<div class="modal-tldr-text" data-i18n="modal.signals.tldrText">Reduced lineage tracing time by 66% (from 2 hours to 40 minutes) by designing an interactive visualization system for tracking complex biological material relationships in pharmaceutical research.</div>',
    ),
    # Metric labels & descs
    (
        '<div class="modal-metric-label">NPS Score</div><div class="modal-metric-desc">25 \u2192 30</div>',
        '<div class="modal-metric-label" data-i18n="modal.signals.metricLabel1">NPS Score</div><div class="modal-metric-desc" data-i18n="modal.signals.metricDesc1">25 \u2192 30</div>',
    ),
    (
        '<div class="modal-metric-label">Tracing Time</div><div class="modal-metric-desc">2hrs \u2192 40min</div>',
        '<div class="modal-metric-label" data-i18n="modal.signals.metricLabel2">Tracing Time</div><div class="modal-metric-desc" data-i18n="modal.signals.metricDesc2">2hrs \u2192 40min</div>',
    ),
    (
        '<div class="modal-metric-label">Annual Revenue</div><div class="modal-metric-desc">Contribution</div>',
        '<div class="modal-metric-label" data-i18n="modal.signals.metricLabel3">Annual Revenue</div><div class="modal-metric-desc" data-i18n="modal.signals.metricDesc3">Contribution</div>',
    ),
    (
        '<div class="modal-metric-label">Workflows</div><div class="modal-metric-desc">Annually</div>',
        '<div class="modal-metric-label" data-i18n="modal.signals.metricLabel4">Workflows</div><div class="modal-metric-desc" data-i18n="modal.signals.metricDesc4">Annually</div>',
    ),
    # Section 1 title
    (
        '<span class="modal-section-number">1</span>My Role & Context</h3>',
        '<span class="modal-section-number">1</span><span data-i18n="modal.signals.section1Title">My Role & Context</span></h3>',
    ),
    # Role grid labels & values
    (
        '<div class="modal-role-label">My Responsibilities</div>\n                            <div class="modal-role-value">End-to-end product design: wireframing, prototyping, user testing, design handoff, and cross-functional collaboration</div>',
        '<div class="modal-role-label" data-i18n="modal.signals.roleLabel1">My Responsibilities</div>\n                            <div class="modal-role-value" data-i18n="modal.signals.roleValue1">End-to-end product design: wireframing, prototyping, user testing, design handoff, and cross-functional collaboration</div>',
    ),
    (
        '<div class="modal-role-label">Team</div>\n                            <div class="modal-role-value">Me (Sr. Product Designer), 1 Product Manager, 10 Dev Engineers</div>',
        '<div class="modal-role-label" data-i18n="modal.signals.roleLabel2">Team</div>\n                            <div class="modal-role-value" data-i18n="modal.signals.roleValue2">Me (Sr. Product Designer), 1 Product Manager, 10 Dev Engineers</div>',
    ),
    (
        '<div class="modal-role-label">Timeline</div>\n                            <div class="modal-role-value">~5 months (2021-Present)</div>',
        '<div class="modal-role-label" data-i18n="modal.signals.roleLabel3">Timeline</div>\n                            <div class="modal-role-value" data-i18n="modal.signals.roleValue3">~5 months (2021-Present)</div>',
    ),
    (
        '<div class="modal-role-label">Tools</div>\n                            <div class="modal-role-value">Figma, Jira, Confluence, Miro</div>',
        '<div class="modal-role-label" data-i18n="modal.signals.roleLabel4">Tools</div>\n                            <div class="modal-role-value" data-i18n="modal.signals.roleValue4">Figma, Jira, Confluence, Miro</div>',
    ),
    # Section 2 title
    (
        '<span class="modal-section-number">2</span>Understanding the Product</h3>',
        '<span class="modal-section-number">2</span><span data-i18n="modal.signals.section2Title">Understanding the Product</span></h3>',
    ),
    # Section 2 paragraph
    (
        '<p>Signals Notebook is an AI-powered electronic lab notebook (ELN) trusted by over 10,000 scientific teams worldwide. It connects with ChemDraw, Spotfire, and lab instruments via APIs, supporting over 1M workflows annually.</p>',
        '<p data-i18n="modal.signals.section2P1">Signals Notebook is an AI-powered electronic lab notebook (ELN) trusted by over 10,000 scientific teams worldwide. It connects with ChemDraw, Spotfire, and lab instruments via APIs, supporting over 1M workflows annually.</p>',
    ),
    # Section 2 insight (has <strong> tag, needs data-i18n-html)
    (
        '<div class="modal-insight-text"><strong>Key Clients:</strong> Pfizer, Roche, Novartis, Johnson & Johnson, Takeda, Moderna, GSK, Merck, AstraZeneca, Bayer, and more. These pharmaceutical giants rely on our software for mission-critical research.</div>',
        '<div class="modal-insight-text" data-i18n="modal.signals.insightText1" data-i18n-html><strong>Key Clients:</strong> Pfizer, Roche, Novartis, Johnson & Johnson, Takeda, Moderna, GSK, Merck, AstraZeneca, Bayer, and more. These pharmaceutical giants rely on our software for mission-critical research.</div>',
    ),
    # Section 3 title
    (
        '<span class="modal-section-number">3</span>The Challenge</h3>',
        '<span class="modal-section-number">3</span><span data-i18n="modal.signals.section3Title">The Challenge</span></h3>',
    ),
    # Quote - uses curly double quotes \u201c \u201d
    (
        '<div class="modal-quote">\u201cScientists spent 2+ hours just to trace where a single cell line came from\u201d</div>',
        '<div class="modal-quote" data-i18n="modal.signals.quote">\u201cScientists spent 2+ hours just to trace where a single cell line came from\u201d</div>',
    ),
    # Section 3 paragraph
    (
        '<p>Through user interviews with lab researchers at major pharmaceutical companies, I uncovered critical pain points:</p>',
        '<p data-i18n="modal.signals.section3P1">Through user interviews with lab researchers at major pharmaceutical companies, I uncovered critical pain points:</p>',
    ),
    # Challenges - uses em-dash \u2014 and straight apostrophe '
    (
        '<li><strong>Data Fragmentation:</strong> Lineage data was scattered across different experiments, tools, and formats\u2014making it error-prone to piece together a complete history.</li>',
        '<li data-i18n="modal.signals.challenge1" data-i18n-html><strong>Data Fragmentation:</strong> Lineage data was scattered across different experiments, tools, and formats\u2014making it error-prone to piece together a complete history.</li>',
    ),
    (
        "<li><strong>Complex Relationships:</strong> Biological materials (cell lines, proteins, antibodies, viral vectors) have layered parent-child connections that existing tools couldn't visualize clearly.</li>",
        "<li data-i18n=\"modal.signals.challenge2\" data-i18n-html><strong>Complex Relationships:</strong> Biological materials (cell lines, proteins, antibodies, viral vectors) have layered parent-child connections that existing tools couldn't visualize clearly.</li>",
    ),
    (
        '<li><strong>Scalability Issues:</strong> As research grew, systems struggled to handle large datasets and real-time collaboration.</li>',
        '<li data-i18n="modal.signals.challenge3" data-i18n-html><strong>Scalability Issues:</strong> As research grew, systems struggled to handle large datasets and real-time collaboration.</li>',
    ),
    (
        '<li><strong>Non-Technical Users:</strong> Current visualization tools were designed for data scientists, not bench scientists who needed quick answers.</li>',
        '<li data-i18n="modal.signals.challenge4" data-i18n-html><strong>Non-Technical Users:</strong> Current visualization tools were designed for data scientists, not bench scientists who needed quick answers.</li>',
    ),
    # Section 4 title
    (
        '<span class="modal-section-number">4</span>Competitive Analysis</h3>',
        '<span class="modal-section-number">4</span><span data-i18n="modal.signals.section4Title">Competitive Analysis</span></h3>',
    ),
    # Section 4 paragraph
    (
        '<p>I evaluated existing solutions in the life sciences industry:</p>',
        '<p data-i18n="modal.signals.section4P1">I evaluated existing solutions in the life sciences industry:</p>',
    ),
    # Competitors
    (
        '<div class="modal-competitor-name">WormWeb</div>\n                            <div class="modal-competitor-pros">\u2713 Simple, interactive lineage tracking for model organisms</div>\n                            <div class="modal-competitor-cons">\u2717 Lacks scalability for complex biologics workflows</div>',
        '<div class="modal-competitor-name" data-i18n="modal.signals.comp1Name">WormWeb</div>\n                            <div class="modal-competitor-pros" data-i18n="modal.signals.comp1Pros">\u2713 Simple, interactive lineage tracking for model organisms</div>\n                            <div class="modal-competitor-cons" data-i18n="modal.signals.comp1Cons">\u2717 Lacks scalability for complex biologics workflows</div>',
    ),
    (
        '<div class="modal-competitor-name">LabKey</div>\n                            <div class="modal-competitor-pros">\u2713 Flexible data integration and lineage grids</div>\n                            <div class="modal-competitor-cons">\u2717 Struggles with real-time collaboration and large datasets</div>',
        '<div class="modal-competitor-name" data-i18n="modal.signals.comp2Name">LabKey</div>\n                            <div class="modal-competitor-pros" data-i18n="modal.signals.comp2Pros">\u2713 Flexible data integration and lineage grids</div>\n                            <div class="modal-competitor-cons" data-i18n="modal.signals.comp2Cons">\u2717 Struggles with real-time collaboration and large datasets</div>',
    ),
    (
        '<div class="modal-competitor-name">IDBS</div>\n                            <div class="modal-competitor-pros">\u2713 Robust cell line genealogy and compliance features</div>\n                            <div class="modal-competitor-cons">\u2717 Complex interfaces for non-technical users</div>',
        '<div class="modal-competitor-name" data-i18n="modal.signals.comp3Name">IDBS</div>\n                            <div class="modal-competitor-pros" data-i18n="modal.signals.comp3Pros">\u2713 Robust cell line genealogy and compliance features</div>\n                            <div class="modal-competitor-cons" data-i18n="modal.signals.comp3Cons">\u2717 Complex interfaces for non-technical users</div>',
    ),
    # Section 4 insight - uses straight apostrophe, em-dash, curly double quotes
    (
        "<div class=\"modal-insight-text\">Key insight: Scientists don't think in database queries\u2014they think in relationships. \u201cWhere did this cell line come from? What experiments used it? What batches were derived from it?\u201d The solution needed to mirror this mental model.</div>",
        "<div class=\"modal-insight-text\" data-i18n=\"modal.signals.insightText2\">Key insight: Scientists don't think in database queries\u2014they think in relationships. \u201cWhere did this cell line come from? What experiments used it? What batches were derived from it?\u201d The solution needed to mirror this mental model.</div>",
    ),
    # Section 5 title
    (
        '<span class="modal-section-number">5</span>Design Process</h3>',
        '<span class="modal-section-number">5</span><span data-i18n="modal.signals.section5Title">Design Process</span></h3>',
    ),
    # Section 5 paragraph
    (
        '<p>I designed a streamlined workflow that lets scientists trace lineage in seconds instead of hours:</p>',
        '<p data-i18n="modal.signals.section5P1">I designed a streamlined workflow that lets scientists trace lineage in seconds instead of hours:</p>',
    ),
    # Process steps
    (
        '<div class="modal-process-label">Materials Smart Folder</div>',
        '<div class="modal-process-label" data-i18n="modal.signals.process1">Materials Smart Folder</div>',
    ),
    (
        '<div class="modal-process-label">Select Material</div>',
        '<div class="modal-process-label" data-i18n="modal.signals.process2">Select Material</div>',
    ),
    (
        '<div class="modal-process-label">Go to Lineage Tab</div>',
        '<div class="modal-process-label" data-i18n="modal.signals.process3">Go to Lineage Tab</div>',
    ),
    (
        '<div class="modal-process-label">View Map & Table</div>',
        '<div class="modal-process-label" data-i18n="modal.signals.process4">View Map & Table</div>',
    ),
    (
        '<div class="modal-process-label">Configure & Export</div>',
        '<div class="modal-process-label" data-i18n="modal.signals.process5">Configure & Export</div>',
    ),
    # Section 6 title
    (
        '<span class="modal-section-number">6</span>Design Showcase</h3>',
        '<span class="modal-section-number">6</span><span data-i18n="modal.signals.section6Title">Design Showcase</span></h3>',
    ),
    # Section 6 paragraph
    (
        '<p>Complete design flow for the Lineage Visualisation feature \u2014 from existing state to final high-fidelity screens:</p>',
        '<p data-i18n="modal.signals.section6P1">Complete design flow for the Lineage Visualisation feature \u2014 from existing state to final high-fidelity screens:</p>',
    ),
    # Image captions
    (
        '<p class="modal-image-caption">Before: Existing experiments table \u2014 lineage data scattered across views</p>',
        '<p class="modal-image-caption" data-i18n="modal.signals.caption1">Before: Existing experiments table \u2014 lineage data scattered across views</p>',
    ),
    (
        '<p class="modal-image-caption">Recommended: Materials Smart Folder with unified search and filtering</p>',
        '<p class="modal-image-caption" data-i18n="modal.signals.caption2">Recommended: Materials Smart Folder with unified search and filtering</p>',
    ),
    (
        '<p class="modal-image-caption">Materials Smart Folder \u2014 view all material types in one interface</p>',
        '<p class="modal-image-caption" data-i18n="modal.signals.caption3">Materials Smart Folder \u2014 view all material types in one interface</p>',
    ),
    (
        '<p class="modal-image-caption">Material Detail Page \u2014 view and edit single material properties</p>',
        '<p class="modal-image-caption" data-i18n="modal.signals.caption4">Material Detail Page \u2014 view and edit single material properties</p>',
    ),
    (
        '<p class="modal-image-caption">Lineage Tab \u2014 interactive lineage map and lineage table view</p>',
        '<p class="modal-image-caption" data-i18n="modal.signals.caption5">Lineage Tab \u2014 interactive lineage map and lineage table view</p>',
    ),
    (
        '<p class="modal-image-caption">Configure/Export \u2014 advanced actions for lineage data management</p>',
        '<p class="modal-image-caption" data-i18n="modal.signals.caption6">Configure/Export \u2014 advanced actions for lineage data management</p>',
    ),
    # Section 7 title
    (
        '<span class="modal-section-number">7</span>Solution: Key Features I Designed</h3>',
        '<span class="modal-section-number">7</span><span data-i18n="modal.signals.section7Title">Solution: Key Features I Designed</span></h3>',
    ),
    # Feature cards
    (
        '<div class="modal-feature-title">Materials Smart Folder</div>\n                        <div class="modal-feature-desc">A unified view of all material types (Cell Lines, Proteins, Antibodies, Viral Vectors) organized in one searchable, filterable interface. Scientists can now find any material in seconds.</div>',
        '<div class="modal-feature-title" data-i18n="modal.signals.feature1Title">Materials Smart Folder</div>\n                        <div class="modal-feature-desc" data-i18n="modal.signals.feature1Desc">A unified view of all material types (Cell Lines, Proteins, Antibodies, Viral Vectors) organized in one searchable, filterable interface. Scientists can now find any material in seconds.</div>',
    ),
    (
        '<div class="modal-feature-title">Interactive Lineage Map</div>\n                        <div class="modal-feature-desc">Visual representation of parent-child relationships with clear distinction between Asset Level (black nodes) and Batch Level (orange nodes). Users can click to expand, collapse, and explore relationships.</div>',
        '<div class="modal-feature-title" data-i18n="modal.signals.feature2Title">Interactive Lineage Map</div>\n                        <div class="modal-feature-desc" data-i18n="modal.signals.feature2Desc">Visual representation of parent-child relationships with clear distinction between Asset Level (black nodes) and Batch Level (orange nodes). Users can click to expand, collapse, and explore relationships.</div>',
    ),
    (
        '<div class="modal-feature-title">Lineage Table View</div>\n                        <div class="modal-feature-desc">Tabular alternative for users who prefer data grids. Supports sorting, filtering, and bulk export to Excel/PDF for compliance documentation.</div>',
        '<div class="modal-feature-title" data-i18n="modal.signals.feature3Title">Lineage Table View</div>\n                        <div class="modal-feature-desc" data-i18n="modal.signals.feature3Desc">Tabular alternative for users who prefer data grids. Supports sorting, filtering, and bulk export to Excel/PDF for compliance documentation.</div>',
    ),
    (
        "<div class=\"modal-feature-title\">Cross-Product Integration</div>\n                        <div class=\"modal-feature-desc\">Seamless integration with Signals Inventa and BioDesign\u2014scientists can trace lineage across experiments, projects, and even different product lines.</div>",
        "<div class=\"modal-feature-title\" data-i18n=\"modal.signals.feature4Title\">Cross-Product Integration</div>\n                        <div class=\"modal-feature-desc\" data-i18n=\"modal.signals.feature4Desc\">Seamless integration with Signals Inventa and BioDesign\u2014scientists can trace lineage across experiments, projects, and even different product lines.</div>",
    ),
    # Reflection title (💭 = \U0001F4AD)
    (
        '<div class="modal-reflection-title">\U0001F4AD What I Learned</div>\n                    <div class="modal-reflection-text">',
        '<div class="modal-reflection-title" data-i18n="modal.signals.reflectionTitle">\U0001F4AD What I Learned</div>\n                    <div class="modal-reflection-text" data-i18n="modal.signals.reflectionText" data-i18n-html>',
    ),
]

count = 0
for old, new in html_replacements:
    if old in content:
        content = content.replace(old, new, 1)
        count += 1
    else:
        print(f"WARNING: Could not find: {repr(old[:80])}")

print(f"Applied {count}/{len(html_replacements)} HTML replacements.")

# ── TRANSLATION KEYS ──
en_signals = r"""
                'modal.signals.eyebrow': 'Enterprise B2B \u00b7 2021-Present',
                'modal.signals.title': 'Signals Notebook',
                'modal.signals.subtitle': 'Lineage Visualization for Pharmaceutical Giants',
                'modal.signals.metaLabel1': 'Role',
                'modal.signals.metaValue1': 'Sr. Product Designer',
                'modal.signals.metaLabel2': 'Company',
                'modal.signals.metaValue2': 'Revvity',
                'modal.signals.metaLabel3': 'Users',
                'modal.signals.metaValue3': '10,000+ Teams',
                'modal.signals.metaLabel4': 'Countries',
                'modal.signals.metaValue4': '50+',
                'modal.signals.tldrLabel': 'TL;DR',
                'modal.signals.tldrText': 'Reduced lineage tracing time by 66% (from 2 hours to 40 minutes) by designing an interactive visualization system for tracking complex biological material relationships in pharmaceutical research.',
                'modal.signals.metricLabel1': 'NPS Score',
                'modal.signals.metricDesc1': '25 \u2192 30',
                'modal.signals.metricLabel2': 'Tracing Time',
                'modal.signals.metricDesc2': '2hrs \u2192 40min',
                'modal.signals.metricLabel3': 'Annual Revenue',
                'modal.signals.metricDesc3': 'Contribution',
                'modal.signals.metricLabel4': 'Workflows',
                'modal.signals.metricDesc4': 'Annually',
                'modal.signals.section1Title': 'My Role & Context',
                'modal.signals.roleLabel1': 'My Responsibilities',
                'modal.signals.roleValue1': 'End-to-end product design: wireframing, prototyping, user testing, design handoff, and cross-functional collaboration',
                'modal.signals.roleLabel2': 'Team',
                'modal.signals.roleValue2': 'Me (Sr. Product Designer), 1 Product Manager, 10 Dev Engineers',
                'modal.signals.roleLabel3': 'Timeline',
                'modal.signals.roleValue3': '~5 months (2021-Present)',
                'modal.signals.roleLabel4': 'Tools',
                'modal.signals.roleValue4': 'Figma, Jira, Confluence, Miro',
                'modal.signals.section2Title': 'Understanding the Product',
                'modal.signals.section2P1': 'Signals Notebook is an AI-powered electronic lab notebook (ELN) trusted by over 10,000 scientific teams worldwide. It connects with ChemDraw, Spotfire, and lab instruments via APIs, supporting over 1M workflows annually.',
                'modal.signals.insightText1': '<strong>Key Clients:</strong> Pfizer, Roche, Novartis, Johnson & Johnson, Takeda, Moderna, GSK, Merck, AstraZeneca, Bayer, and more. These pharmaceutical giants rely on our software for mission-critical research.',
                'modal.signals.section3Title': 'The Challenge',
                'modal.signals.quote': '\u201cScientists spent 2+ hours just to trace where a single cell line came from\u201d',
                'modal.signals.section3P1': 'Through user interviews with lab researchers at major pharmaceutical companies, I uncovered critical pain points:',
                'modal.signals.challenge1': '<strong>Data Fragmentation:</strong> Lineage data was scattered across different experiments, tools, and formats\u2014making it error-prone to piece together a complete history.',
                'modal.signals.challenge2': '<strong>Complex Relationships:</strong> Biological materials (cell lines, proteins, antibodies, viral vectors) have layered parent-child connections that existing tools couldn\'t visualize clearly.',
                'modal.signals.challenge3': '<strong>Scalability Issues:</strong> As research grew, systems struggled to handle large datasets and real-time collaboration.',
                'modal.signals.challenge4': '<strong>Non-Technical Users:</strong> Current visualization tools were designed for data scientists, not bench scientists who needed quick answers.',
                'modal.signals.section4Title': 'Competitive Analysis',
                'modal.signals.section4P1': 'I evaluated existing solutions in the life sciences industry:',
                'modal.signals.comp1Name': 'WormWeb',
                'modal.signals.comp1Pros': '\u2713 Simple, interactive lineage tracking for model organisms',
                'modal.signals.comp1Cons': '\u2717 Lacks scalability for complex biologics workflows',
                'modal.signals.comp2Name': 'LabKey',
                'modal.signals.comp2Pros': '\u2713 Flexible data integration and lineage grids',
                'modal.signals.comp2Cons': '\u2717 Struggles with real-time collaboration and large datasets',
                'modal.signals.comp3Name': 'IDBS',
                'modal.signals.comp3Pros': '\u2713 Robust cell line genealogy and compliance features',
                'modal.signals.comp3Cons': '\u2717 Complex interfaces for non-technical users',
                'modal.signals.insightText2': 'Key insight: Scientists don\'t think in database queries\u2014they think in relationships. \u201cWhere did this cell line come from? What experiments used it? What batches were derived from it?\u201d The solution needed to mirror this mental model.',
                'modal.signals.section5Title': 'Design Process',
                'modal.signals.section5P1': 'I designed a streamlined workflow that lets scientists trace lineage in seconds instead of hours:',
                'modal.signals.process1': 'Materials Smart Folder',
                'modal.signals.process2': 'Select Material',
                'modal.signals.process3': 'Go to Lineage Tab',
                'modal.signals.process4': 'View Map & Table',
                'modal.signals.process5': 'Configure & Export',
                'modal.signals.section6Title': 'Design Showcase',
                'modal.signals.section6P1': 'Complete design flow for the Lineage Visualisation feature \u2014 from existing state to final high-fidelity screens:',
                'modal.signals.caption1': 'Before: Existing experiments table \u2014 lineage data scattered across views',
                'modal.signals.caption2': 'Recommended: Materials Smart Folder with unified search and filtering',
                'modal.signals.caption3': 'Materials Smart Folder \u2014 view all material types in one interface',
                'modal.signals.caption4': 'Material Detail Page \u2014 view and edit single material properties',
                'modal.signals.caption5': 'Lineage Tab \u2014 interactive lineage map and lineage table view',
                'modal.signals.caption6': 'Configure/Export \u2014 advanced actions for lineage data management',
                'modal.signals.section7Title': 'Solution: Key Features I Designed',
                'modal.signals.feature1Title': 'Materials Smart Folder',
                'modal.signals.feature1Desc': 'A unified view of all material types (Cell Lines, Proteins, Antibodies, Viral Vectors) organized in one searchable, filterable interface. Scientists can now find any material in seconds.',
                'modal.signals.feature2Title': 'Interactive Lineage Map',
                'modal.signals.feature2Desc': 'Visual representation of parent-child relationships with clear distinction between Asset Level (black nodes) and Batch Level (orange nodes). Users can click to expand, collapse, and explore relationships.',
                'modal.signals.feature3Title': 'Lineage Table View',
                'modal.signals.feature3Desc': 'Tabular alternative for users who prefer data grids. Supports sorting, filtering, and bulk export to Excel/PDF for compliance documentation.',
                'modal.signals.feature4Title': 'Cross-Product Integration',
                'modal.signals.feature4Desc': 'Seamless integration with Signals Inventa and BioDesign\u2014scientists can trace lineage across experiments, projects, and even different product lines.',
                'modal.signals.reflectionTitle': '\ud83d\udcad What I Learned',
                'modal.signals.reflectionText': 'Enterprise B2B design is fundamentally different from consumer products. Users can\'t just switch to a competitor if they don\'t like your UI\u2014they\'re locked into multi-year contracts. This means <strong>every friction point compounds into hours of lost productivity</strong> across thousands of users. The lineage map taught me that visualization isn\'t about being clever\u2014it\'s about being invisible. The best compliment we received: \u201cIt just shows me what I need to know.\u201d',"""

zh_signals = """
                'modal.signals.eyebrow': '企业B2B · 2021至今',
                'modal.signals.title': 'Signals Notebook',
                'modal.signals.subtitle': '制药巨头的谱系可视化系统',
                'modal.signals.metaLabel1': '角色',
                'modal.signals.metaValue1': '高级产品设计师',
                'modal.signals.metaLabel2': '公司',
                'modal.signals.metaValue2': 'Revvity',
                'modal.signals.metaLabel3': '用户',
                'modal.signals.metaValue3': '10,000+ 团队',
                'modal.signals.metaLabel4': '覆盖国家',
                'modal.signals.metaValue4': '50+',
                'modal.signals.tldrLabel': '概要',
                'modal.signals.tldrText': '通过设计交互式可视化系统，追踪制药研究中复杂的生物材料关系，将谱系追溯时间缩短了66%（从2小时降至40分钟）。',
                'modal.signals.metricLabel1': 'NPS评分',
                'modal.signals.metricDesc1': '25 → 30',
                'modal.signals.metricLabel2': '追溯时间',
                'modal.signals.metricDesc2': '2小时 → 40分钟',
                'modal.signals.metricLabel3': '年营收',
                'modal.signals.metricDesc3': '贡献',
                'modal.signals.metricLabel4': '工作流',
                'modal.signals.metricDesc4': '每年',
                'modal.signals.section1Title': '我的角色与背景',
                'modal.signals.roleLabel1': '我的职责',
                'modal.signals.roleValue1': '端到端产品设计：线框图、原型设计、用户测试、设计交付及跨职能协作',
                'modal.signals.roleLabel2': '团队',
                'modal.signals.roleValue2': '我（高级产品设计师）、1名产品经理、10名开发工程师',
                'modal.signals.roleLabel3': '时间线',
                'modal.signals.roleValue3': '约5个月（2021至今）',
                'modal.signals.roleLabel4': '工具',
                'modal.signals.roleValue4': 'Figma、Jira、Confluence、Miro',
                'modal.signals.section2Title': '了解产品',
                'modal.signals.section2P1': 'Signals Notebook 是一款AI驱动的电子实验室笔记本（ELN），受到全球超过10,000个科研团队的信赖。它通过API与ChemDraw、Spotfire和实验室仪器连接，每年支持超过100万个工作流。',
                'modal.signals.insightText1': '<strong>核心客户：</strong>辉瑞、罗氏、诺华、强生、武田、Moderna、GSK、默克、阿斯利康、拜耳等。这些制药巨头依赖我们的软件进行关键性研究。',
                'modal.signals.section3Title': '挑战',
                'modal.signals.quote': '"科学家们花了2个多小时，只是为了追溯一个细胞系的来源"',
                'modal.signals.section3P1': '通过对大型制药公司实验室研究人员的用户访谈，我发现了以下关键痛点：',
                'modal.signals.challenge1': '<strong>数据碎片化：</strong>谱系数据分散在不同的实验、工具和格式中——拼凑完整历史记录容易出错。',
                'modal.signals.challenge2': '<strong>复杂的关系：</strong>生物材料（细胞系、蛋白质、抗体、病毒载体）具有多层次的亲子关系，现有工具无法清晰可视化。',
                'modal.signals.challenge3': '<strong>可扩展性问题：</strong>随着研究规模增长，系统难以处理大型数据集和实时协作。',
                'modal.signals.challenge4': '<strong>非技术用户：</strong>当前的可视化工具是为数据科学家设计的，而非需要快速答案的实验台科学家。',
                'modal.signals.section4Title': '竞品分析',
                'modal.signals.section4P1': '我评估了生命科学行业中的现有解决方案：',
                'modal.signals.comp1Name': 'WormWeb',
                'modal.signals.comp1Pros': '✓ 简单、交互式的模式生物谱系追踪',
                'modal.signals.comp1Cons': '✗ 缺乏复杂生物制药工作流的可扩展性',
                'modal.signals.comp2Name': 'LabKey',
                'modal.signals.comp2Pros': '✓ 灵活的数据集成和谱系网格',
                'modal.signals.comp2Cons': '✗ 实时协作和大数据集处理能力不足',
                'modal.signals.comp3Name': 'IDBS',
                'modal.signals.comp3Pros': '✓ 强大的细胞系族谱和合规功能',
                'modal.signals.comp3Cons': '✗ 对非技术用户而言界面复杂',
                'modal.signals.insightText2': '核心洞察：科学家不会用数据库查询来思考——他们用关系来思考。"这个细胞系从哪里来？哪些实验使用了它？从它衍生了哪些批次？"解决方案需要映射这种思维模型。',
                'modal.signals.section5Title': '设计流程',
                'modal.signals.section5P1': '我设计了一个精简的工作流，让科学家在几秒钟内（而非几小时）完成谱系追溯：',
                'modal.signals.process1': '材料智能文件夹',
                'modal.signals.process2': '选择材料',
                'modal.signals.process3': '进入谱系标签页',
                'modal.signals.process4': '查看图谱和表格',
                'modal.signals.process5': '配置与导出',
                'modal.signals.section6Title': '设计展示',
                'modal.signals.section6P1': '谱系可视化功能的完整设计流程——从现有状态到最终高保真界面：',
                'modal.signals.caption1': '改造前：现有实验表格——谱系数据分散在各个视图中',
                'modal.signals.caption2': '推荐方案：材料智能文件夹，支持统一搜索和筛选',
                'modal.signals.caption3': '材料智能文件夹——在一个界面中查看所有材料类型',
                'modal.signals.caption4': '材料详情页——查看和编辑单个材料属性',
                'modal.signals.caption5': '谱系标签页——交互式谱系图和谱系表格视图',
                'modal.signals.caption6': '配置/导出——谱系数据管理的高级操作',
                'modal.signals.section7Title': '解决方案：我设计的核心功能',
                'modal.signals.feature1Title': '材料智能文件夹',
                'modal.signals.feature1Desc': '所有材料类型（细胞系、蛋白质、抗体、病毒载体）的统一视图，组织在一个可搜索、可筛选的界面中。科学家现在可以在几秒内找到任何材料。',
                'modal.signals.feature2Title': '交互式谱系图',
                'modal.signals.feature2Desc': '亲子关系的可视化表示，清晰区分资产层级（黑色节点）和批次层级（橙色节点）。用户可以点击展开、折叠和探索关系。',
                'modal.signals.feature3Title': '谱系表格视图',
                'modal.signals.feature3Desc': '为偏好数据网格的用户提供的表格替代方案。支持排序、筛选和批量导出为Excel/PDF，用于合规文档。',
                'modal.signals.feature4Title': '跨产品集成',
                'modal.signals.feature4Desc': '与Signals Inventa和BioDesign的无缝集成——科学家可以跨实验、项目甚至不同产品线追踪谱系。',
                'modal.signals.reflectionTitle': '💭 我的收获',
                'modal.signals.reflectionText': '企业B2B设计与消费类产品有根本性的不同。用户不能因为不喜欢你的UI就转向竞争对手——他们被锁定在多年合同中。这意味着<strong>每一个摩擦点都会在数千用户中累积成数小时的生产力损失</strong>。谱系图教会我，可视化不是要炫技——而是要做到"隐形"。我们收到的最好评价是："它只是让我看到了我需要知道的东西。"',"""

# Insert translations by finding the collov reflectionText lines
lines = content.split('\n')
en_inserted = False
zh_inserted = False

for i, line in enumerate(lines):
    if not en_inserted and "'modal.collov.reflectionText'" in line and 'choose sides' in line:
        lines[i] = line + en_signals
        en_inserted = True
    elif not zh_inserted and "'modal.collov.reflectionText'" in line and '\u8feb\u4f7f' in line:
        # 迫使 = \u8feb\u4f7f
        lines[i] = line + zh_signals
        zh_inserted = True

if en_inserted:
    print("EN translations inserted.")
else:
    print("WARNING: Could not insert EN translations.")

if zh_inserted:
    print("ZH translations inserted.")
else:
    print("WARNING: Could not insert ZH translations.")

content = '\n'.join(lines)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done! Signals Notebook modal i18n applied successfully.")
