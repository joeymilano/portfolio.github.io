#!/usr/bin/env python3
"""Transform UnifyUX modal for i18n support."""

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# ── HTML REPLACEMENTS ──
html_replacements = [
    # Eyebrow
    (
        '<p class="modal-eyebrow">Design System \u00b7 2024</p>',
        '<p class="modal-eyebrow" data-i18n="modal.unifyux.eyebrow">Design System \u00b7 2024</p>',
    ),
    # Title
    (
        '<h2 class="modal-title">UnifyUX</h2>',
        '<h2 class="modal-title" data-i18n="modal.unifyux.title">UnifyUX</h2>',
    ),
    # Subtitle
    (
        '<p class="modal-subtitle">United in Product User Experience</p>',
        '<p class="modal-subtitle" data-i18n="modal.unifyux.subtitle">United in Product User Experience</p>',
    ),
    # Meta labels & values
    (
        '<span class="modal-meta-label">Role</span><span class="modal-meta-value">Lead Designer</span></div>\n                    <div class="modal-meta-item"><span class="modal-meta-label">Scope</span><span class="modal-meta-value">3 Products</span></div>\n                    <div class="modal-meta-item"><span class="modal-meta-label">Company</span><span class="modal-meta-value">Revvity</span></div>\n                    <div class="modal-meta-item"><span class="modal-meta-label">Website</span><span class="modal-meta-value">revvity.design</span></div>',
        '<span class="modal-meta-label" data-i18n="modal.unifyux.metaLabel1">Role</span><span class="modal-meta-value" data-i18n="modal.unifyux.metaValue1">Lead Designer</span></div>\n                    <div class="modal-meta-item"><span class="modal-meta-label" data-i18n="modal.unifyux.metaLabel2">Scope</span><span class="modal-meta-value" data-i18n="modal.unifyux.metaValue2">3 Products</span></div>\n                    <div class="modal-meta-item"><span class="modal-meta-label" data-i18n="modal.unifyux.metaLabel3">Company</span><span class="modal-meta-value" data-i18n="modal.unifyux.metaValue3">Revvity</span></div>\n                    <div class="modal-meta-item"><span class="modal-meta-label" data-i18n="modal.unifyux.metaLabel4">Website</span><span class="modal-meta-value" data-i18n="modal.unifyux.metaValue4">revvity.design</span></div>',
    ),
    # TL;DR
    (
        '<div class="modal-tldr-label">TL;DR</div>\n                    <div class="modal-tldr-text">Led the creation of Revvity\'s first unified design system, reducing design iteration time by 25% and handoff errors by 30% across 3 enterprise products in the life sciences industry.</div>',
        '<div class="modal-tldr-label" data-i18n="modal.unifyux.tldrLabel">TL;DR</div>\n                    <div class="modal-tldr-text" data-i18n="modal.unifyux.tldrText">Led the creation of Revvity\'s first unified design system, reducing design iteration time by 25% and handoff errors by 30% across 3 enterprise products in the life sciences industry.</div>',
    ),
    # Metric labels & descs
    (
        '<div class="modal-metric-label">Faster Design</div><div class="modal-metric-desc">Iteration time</div>',
        '<div class="modal-metric-label" data-i18n="modal.unifyux.metricLabel1">Faster Design</div><div class="modal-metric-desc" data-i18n="modal.unifyux.metricDesc1">Iteration time</div>',
    ),
    (
        '<div class="modal-metric-label">Fewer Errors</div><div class="modal-metric-desc">Dev handoff</div>',
        '<div class="modal-metric-label" data-i18n="modal.unifyux.metricLabel2">Fewer Errors</div><div class="modal-metric-desc" data-i18n="modal.unifyux.metricDesc2">Dev handoff</div>',
    ),
    (
        '<div class="modal-metric-label">Products</div><div class="modal-metric-desc">Unified</div>',
        '<div class="modal-metric-label" data-i18n="modal.unifyux.metricLabel3">Products</div><div class="modal-metric-desc" data-i18n="modal.unifyux.metricDesc3">Unified</div>',
    ),
    (
        '<div class="modal-metric-label">Accessibility</div><div class="modal-metric-desc">Compliant</div>',
        '<div class="modal-metric-label" data-i18n="modal.unifyux.metricLabel4">Accessibility</div><div class="modal-metric-desc" data-i18n="modal.unifyux.metricDesc4">Compliant</div>',
    ),
    # Section 1 title
    (
        '<span class="modal-section-number">1</span>My Role & Context</h3>\n                    <div class="modal-role-grid">\n                        <div class="modal-role-item">\n                            <div class="modal-role-label">My Responsibilities</div>',
        '<span class="modal-section-number">1</span><span data-i18n="modal.unifyux.section1Title">My Role & Context</span></h3>\n                    <div class="modal-role-grid">\n                        <div class="modal-role-item">\n                            <div class="modal-role-label" data-i18n="modal.unifyux.roleLabel1">My Responsibilities</div>',
    ),
    # Role values
    (
        '<div class="modal-role-value">Design system architecture, component design, documentation, stakeholder alignment, and adoption strategy</div>',
        '<div class="modal-role-value" data-i18n="modal.unifyux.roleValue1">Design system architecture, component design, documentation, stakeholder alignment, and adoption strategy</div>',
    ),
    (
        '<div class="modal-role-label">Scope</div>\n                            <div class="modal-role-value">3 Enterprise Products: Signals BioDesign, Signals Notebook, Signals Inventa</div>',
        '<div class="modal-role-label" data-i18n="modal.unifyux.roleLabel2">Scope</div>\n                            <div class="modal-role-value" data-i18n="modal.unifyux.roleValue2">3 Enterprise Products: Signals BioDesign, Signals Notebook, Signals Inventa</div>',
    ),
    (
        '<div class="modal-role-label">Company</div>\n                            <div class="modal-role-value">Revvity (formerly PerkinElmer)</div>',
        '<div class="modal-role-label" data-i18n="modal.unifyux.roleLabel3">Company</div>\n                            <div class="modal-role-value" data-i18n="modal.unifyux.roleValue3">Revvity (formerly PerkinElmer)</div>',
    ),
    (
        '<div class="modal-role-label">Website</div>\n                            <div class="modal-role-value"><a href="https://revvity.design" target="_blank" style="color: var(--accent);">revvity.design</a></div>',
        '<div class="modal-role-label" data-i18n="modal.unifyux.roleLabel4">Website</div>\n                            <div class="modal-role-value"><a href="https://revvity.design" target="_blank" style="color: var(--accent);">revvity.design</a></div>',
    ),
    # Section 2 title: The Challenge
    (
        '<span class="modal-section-number">2</span>The Challenge</h3>\n                    <div class="modal-quote">"Building a design system is easy. Getting people to use it is the hard part."</div>',
        '<span class="modal-section-number">2</span><span data-i18n="modal.unifyux.section2Title">The Challenge</span></h3>\n                    <div class="modal-quote" data-i18n="modal.unifyux.quote">"Building a design system is easy. Getting people to use it is the hard part."</div>',
    ),
    # Section 2 paragraph
    (
        "<p>Creating a design system for enterprise software is uniquely challenging because you're not just designing components\u2014you're changing how teams work:</p>",
        '<p data-i18n="modal.unifyux.section2P1" data-i18n-html>Creating a design system for enterprise software is uniquely challenging because you\'re not just designing components\u2014you\'re changing how teams work:</p>',
    ),
    # Challenges (all have <strong> + em-dash)
    (
        '<li><strong>Stage 1: Proposing the Initiative</strong> \u2014 Convincing leadership to fund a design system when the value hasn\'t been proven yet. "Why spend resources on this when we could ship features?"</li>',
        '<li data-i18n="modal.unifyux.challenge1" data-i18n-html><strong>Stage 1: Proposing the Initiative</strong> \u2014 Convincing leadership to fund a design system when the value hasn\'t been proven yet. "Why spend resources on this when we could ship features?"</li>',
    ),
    (
        '<li><strong>Stage 2: Creating Components</strong> \u2014 Building abstract, reusable components that work across vastly different products with different codebases and frameworks.</li>',
        '<li data-i18n="modal.unifyux.challenge2" data-i18n-html><strong>Stage 2: Creating Components</strong> \u2014 Building abstract, reusable components that work across vastly different products with different codebases and frameworks.</li>',
    ),
    (
        "<li><strong>Stage 3: Team Adoption</strong> \u2014 Getting established design teams to change their workflows and adopt new processes they didn't ask for.</li>",
        '<li data-i18n="modal.unifyux.challenge3" data-i18n-html><strong>Stage 3: Team Adoption</strong> \u2014 Getting established design teams to change their workflows and adopt new processes they didn\'t ask for.</li>',
    ),
    (
        '<li><strong>Stage 4: Continuous Contribution</strong> \u2014 Ensuring teams contribute back to the system instead of creating one-off solutions.</li>',
        '<li data-i18n="modal.unifyux.challenge4" data-i18n-html><strong>Stage 4: Continuous Contribution</strong> \u2014 Ensuring teams contribute back to the system instead of creating one-off solutions.</li>',
    ),
    # Section 3 title: UX Design Principles
    (
        '<span class="modal-section-number">3</span>UX Design Principles</h3>',
        '<span class="modal-section-number">3</span><span data-i18n="modal.unifyux.section3Title">UX Design Principles</span></h3>',
    ),
    # Section 3 paragraph
    (
        '<p>I established four core principles specifically for designing software in the life sciences industry:</p>',
        '<p data-i18n="modal.unifyux.section3P1">I established four core principles specifically for designing software in the life sciences industry:</p>',
    ),
    # Principle cards
    (
        "<div class=\"modal-feature-title\">Customers First</div>\n                        <div class=\"modal-feature-desc\">We build products that create value for our customers. We partner with them to understand and solve their challenges\u2014not blindly follow the solutions they present to us.</div>",
        "<div class=\"modal-feature-title\" data-i18n=\"modal.unifyux.principle1Title\">Customers First</div>\n                        <div class=\"modal-feature-desc\" data-i18n=\"modal.unifyux.principle1Desc\">We build products that create value for our customers. We partner with them to understand and solve their challenges\u2014not blindly follow the solutions they present to us.</div>",
    ),
    (
        "<div class=\"modal-feature-title\">Facts Over Opinions</div>\n                        <div class=\"modal-feature-desc\">We defer to facts over opinions, using evidence and research-based design philosophy. This allows us to challenge everything and favor present reality over past assumptions. If unsure\u2014ask!</div>",
        "<div class=\"modal-feature-title\" data-i18n=\"modal.unifyux.principle2Title\">Facts Over Opinions</div>\n                        <div class=\"modal-feature-desc\" data-i18n=\"modal.unifyux.principle2Desc\">We defer to facts over opinions, using evidence and research-based design philosophy. This allows us to challenge everything and favor present reality over past assumptions. If unsure\u2014ask!</div>",
    ),
    (
        '<div class="modal-feature-title">Always a Work in Progress</div>\n                        <div class="modal-feature-desc">Our focus is on learning, iteration, and continuous improvement. We are agile, always learning, and open to change. There are always ways to solve problems in easier, simpler, more intuitive ways.</div>',
        '<div class="modal-feature-title" data-i18n="modal.unifyux.principle3Title">Always a Work in Progress</div>\n                        <div class="modal-feature-desc" data-i18n="modal.unifyux.principle3Desc">Our focus is on learning, iteration, and continuous improvement. We are agile, always learning, and open to change. There are always ways to solve problems in easier, simpler, more intuitive ways.</div>',
    ),
    (
        "<div class=\"modal-feature-title\">Usable by Everyone</div>\n                        <div class=\"modal-feature-desc\">User experience connects humans to products through empathy and understanding. We are inherently inclusive and strive to create solutions for everyone\u2014always advocating for WCAG AA accessibility compliance.</div>",
        "<div class=\"modal-feature-title\" data-i18n=\"modal.unifyux.principle4Title\">Usable by Everyone</div>\n                        <div class=\"modal-feature-desc\" data-i18n=\"modal.unifyux.principle4Desc\">User experience connects humans to products through empathy and understanding. We are inherently inclusive and strive to create solutions for everyone\u2014always advocating for WCAG AA accessibility compliance.</div>",
    ),
    # Section 4 title: Design System Architecture
    (
        '<span class="modal-section-number">4</span>Design System Architecture</h3>',
        '<span class="modal-section-number">4</span><span data-i18n="modal.unifyux.section4Title">Design System Architecture</span></h3>',
    ),
    # Section 4 paragraph
    (
        '<p>I structured the design system with scalable foundations that support growth:</p>',
        '<p data-i18n="modal.unifyux.section4P1">I structured the design system with scalable foundations that support growth:</p>',
    ),
    # Process steps
    (
        '<div class="modal-process-label">Design Tokens</div>\n                        </div>\n                        <div class="modal-process-item">\n                            <div class="modal-process-number">2</div>\n                            <div class="modal-process-label">Core Components</div>\n                        </div>\n                        <div class="modal-process-item">\n                            <div class="modal-process-number">3</div>\n                            <div class="modal-process-label">Pattern Library</div>\n                        </div>\n                        <div class="modal-process-item">\n                            <div class="modal-process-number">4</div>\n                            <div class="modal-process-label">Documentation</div>',
        '<div class="modal-process-label" data-i18n="modal.unifyux.process1">Design Tokens</div>\n                        </div>\n                        <div class="modal-process-item">\n                            <div class="modal-process-number">2</div>\n                            <div class="modal-process-label" data-i18n="modal.unifyux.process2">Core Components</div>\n                        </div>\n                        <div class="modal-process-item">\n                            <div class="modal-process-number">3</div>\n                            <div class="modal-process-label" data-i18n="modal.unifyux.process3">Pattern Library</div>\n                        </div>\n                        <div class="modal-process-item">\n                            <div class="modal-process-number">4</div>\n                            <div class="modal-process-label" data-i18n="modal.unifyux.process4">Documentation</div>',
    ),
    # Section 4 insight (has <strong>, needs data-i18n-html)
    (
        "<div class=\"modal-insight-text\"><strong>Design Tokens:</strong> I created semantic tokens for colors (Primary, Success, Warning, Danger, Neutral), typography (native Roboto font system with Display, Heading, and Body scales), and spacing\u2014all with AA-compliant contrast ratios.</div>",
        "<div class=\"modal-insight-text\" data-i18n=\"modal.unifyux.insightText1\" data-i18n-html><strong>Design Tokens:</strong> I created semantic tokens for colors (Primary, Success, Warning, Danger, Neutral), typography (native Roboto font system with Display, Heading, and Body scales), and spacing\u2014all with AA-compliant contrast ratios.</div>",
    ),
    # Section 5 title: Design System Showcase
    (
        '<span class="modal-section-number">5</span>Design System Showcase</h3>',
        '<span class="modal-section-number">5</span><span data-i18n="modal.unifyux.section5Title">Design System Showcase</span></h3>',
    ),
    # Section 5 paragraph
    (
        '<p>Complete design system documentation \u2014 from UX principles to component library:</p>',
        '<p data-i18n="modal.unifyux.section5P1">Complete design system documentation \u2014 from UX principles to component library:</p>',
    ),
    # Image captions
    (
        '<p class="modal-image-caption">UX Design Principles \u2014 Customers First, Facts Over Opinions, Always WIP, Usable by Everyone</p>',
        '<p class="modal-image-caption" data-i18n="modal.unifyux.caption1">UX Design Principles \u2014 Customers First, Facts Over Opinions, Always WIP, Usable by Everyone</p>',
    ),
    (
        '<p class="modal-image-caption">Styles \u2014 Color System with AA-compliant contrast ratios across all product themes</p>',
        '<p class="modal-image-caption" data-i18n="modal.unifyux.caption2">Styles \u2014 Color System with AA-compliant contrast ratios across all product themes</p>',
    ),
    (
        '<p class="modal-image-caption">Styles \u2014 Typography scale using native Roboto font for optimal legibility</p>',
        '<p class="modal-image-caption" data-i18n="modal.unifyux.caption3">Styles \u2014 Typography scale using native Roboto font for optimal legibility</p>',
    ),
    (
        '<p class="modal-image-caption">Styles \u2014 Navigation patterns with interactive prototypes</p>',
        '<p class="modal-image-caption" data-i18n="modal.unifyux.caption4">Styles \u2014 Navigation patterns with interactive prototypes</p>',
    ),
    (
        '<p class="modal-image-caption">Navigation anatomy \u2014 left panel, top bar, and page link structure</p>',
        '<p class="modal-image-caption" data-i18n="modal.unifyux.caption5">Navigation anatomy \u2014 left panel, top bar, and page link structure</p>',
    ),
    (
        '<p class="modal-image-caption">Component Library \u2014 50+ reusable UI components with variants and states</p>',
        '<p class="modal-image-caption" data-i18n="modal.unifyux.caption6">Component Library \u2014 50+ reusable UI components with variants and states</p>',
    ),
    # Section 6 title: Key Deliverables
    (
        '<span class="modal-section-number">6</span>Key Deliverables</h3>',
        '<span class="modal-section-number">6</span><span data-i18n="modal.unifyux.section6Title">Key Deliverables</span></h3>',
    ),
    # Deliverable cards
    (
        '<div class="modal-feature-title">Color System</div>\n                        <div class="modal-feature-desc">Primary, Success, Warning, Danger, and Neutral color palettes with carefully calculated contrast ratios meeting WCAG AA standards. Each color has light/dark variants for different UI contexts.</div>',
        '<div class="modal-feature-title" data-i18n="modal.unifyux.feature1Title">Color System</div>\n                        <div class="modal-feature-desc" data-i18n="modal.unifyux.feature1Desc">Primary, Success, Warning, Danger, and Neutral color palettes with carefully calculated contrast ratios meeting WCAG AA standards. Each color has light/dark variants for different UI contexts.</div>',
    ),
    (
        '<div class="modal-feature-title">Typography Scale</div>\n                        <div class="modal-feature-desc">Native Roboto font system with Display (44-80px), Heading (20-32px), and Body (12-16px) scales. Optimized for scientific content with high data density.</div>',
        '<div class="modal-feature-title" data-i18n="modal.unifyux.feature2Title">Typography Scale</div>\n                        <div class="modal-feature-desc" data-i18n="modal.unifyux.feature2Desc">Native Roboto font system with Display (44-80px), Heading (20-32px), and Body (12-16px) scales. Optimized for scientific content with high data density.</div>',
    ),
    (
        '<div class="modal-feature-title">50+ Components</div>\n                        <div class="modal-feature-desc">Reusable Figma components with coded equivalents in React. Each component includes variants, states, and accessibility annotations.</div>',
        '<div class="modal-feature-title" data-i18n="modal.unifyux.feature3Title">50+ Components</div>\n                        <div class="modal-feature-desc" data-i18n="modal.unifyux.feature3Desc">Reusable Figma components with coded equivalents in React. Each component includes variants, states, and accessibility annotations.</div>',
    ),
    (
        '<div class="modal-feature-title">Navigation Patterns</div>\n                        <div class="modal-feature-desc">Research-backed navigation patterns. User testing showed labels with icons had faster response times and higher satisfaction scores than icons alone.</div>',
        '<div class="modal-feature-title" data-i18n="modal.unifyux.feature4Title">Navigation Patterns</div>\n                        <div class="modal-feature-desc" data-i18n="modal.unifyux.feature4Desc">Research-backed navigation patterns. User testing showed labels with icons had faster response times and higher satisfaction scores than icons alone.</div>',
    ),
    # Reflection title + text
    (
        '<div class="modal-reflection-title">\U0001F4AD What I Learned</div>\n                    <div class="modal-reflection-text">',
        '<div class="modal-reflection-title" data-i18n="modal.unifyux.reflectionTitle">\U0001F4AD What I Learned</div>\n                    <div class="modal-reflection-text" data-i18n="modal.unifyux.reflectionText" data-i18n-html>',
    ),
]

count = 0
for old, new in html_replacements:
    if old in content:
        content = content.replace(old, new, 1)
        count += 1
    else:
        print(f"WARNING: Could not find: {repr(old[:100])}")

print(f"Applied {count}/{len(html_replacements)} HTML replacements.")

# ── TRANSLATION KEYS ──
en_unifyux = r"""
                'modal.unifyux.eyebrow': 'Design System \u00b7 2024',
                'modal.unifyux.title': 'UnifyUX',
                'modal.unifyux.subtitle': 'United in Product User Experience',
                'modal.unifyux.metaLabel1': 'Role',
                'modal.unifyux.metaValue1': 'Lead Designer',
                'modal.unifyux.metaLabel2': 'Scope',
                'modal.unifyux.metaValue2': '3 Products',
                'modal.unifyux.metaLabel3': 'Company',
                'modal.unifyux.metaValue3': 'Revvity',
                'modal.unifyux.metaLabel4': 'Website',
                'modal.unifyux.metaValue4': 'revvity.design',
                'modal.unifyux.tldrLabel': 'TL;DR',
                'modal.unifyux.tldrText': 'Led the creation of Revvity\'s first unified design system, reducing design iteration time by 25% and handoff errors by 30% across 3 enterprise products in the life sciences industry.',
                'modal.unifyux.metricLabel1': 'Faster Design',
                'modal.unifyux.metricDesc1': 'Iteration time',
                'modal.unifyux.metricLabel2': 'Fewer Errors',
                'modal.unifyux.metricDesc2': 'Dev handoff',
                'modal.unifyux.metricLabel3': 'Products',
                'modal.unifyux.metricDesc3': 'Unified',
                'modal.unifyux.metricLabel4': 'Accessibility',
                'modal.unifyux.metricDesc4': 'Compliant',
                'modal.unifyux.section1Title': 'My Role & Context',
                'modal.unifyux.roleLabel1': 'My Responsibilities',
                'modal.unifyux.roleValue1': 'Design system architecture, component design, documentation, stakeholder alignment, and adoption strategy',
                'modal.unifyux.roleLabel2': 'Scope',
                'modal.unifyux.roleValue2': '3 Enterprise Products: Signals BioDesign, Signals Notebook, Signals Inventa',
                'modal.unifyux.roleLabel3': 'Company',
                'modal.unifyux.roleValue3': 'Revvity (formerly PerkinElmer)',
                'modal.unifyux.roleLabel4': 'Website',
                'modal.unifyux.section2Title': 'The Challenge',
                'modal.unifyux.quote': '"Building a design system is easy. Getting people to use it is the hard part."',
                'modal.unifyux.section2P1': 'Creating a design system for enterprise software is uniquely challenging because you\'re not just designing components\u2014you\'re changing how teams work:',
                'modal.unifyux.challenge1': '<strong>Stage 1: Proposing the Initiative</strong> \u2014 Convincing leadership to fund a design system when the value hasn\'t been proven yet. "Why spend resources on this when we could ship features?"',
                'modal.unifyux.challenge2': '<strong>Stage 2: Creating Components</strong> \u2014 Building abstract, reusable components that work across vastly different products with different codebases and frameworks.',
                'modal.unifyux.challenge3': '<strong>Stage 3: Team Adoption</strong> \u2014 Getting established design teams to change their workflows and adopt new processes they didn\'t ask for.',
                'modal.unifyux.challenge4': '<strong>Stage 4: Continuous Contribution</strong> \u2014 Ensuring teams contribute back to the system instead of creating one-off solutions.',
                'modal.unifyux.section3Title': 'UX Design Principles',
                'modal.unifyux.section3P1': 'I established four core principles specifically for designing software in the life sciences industry:',
                'modal.unifyux.principle1Title': 'Customers First',
                'modal.unifyux.principle1Desc': 'We build products that create value for our customers. We partner with them to understand and solve their challenges\u2014not blindly follow the solutions they present to us.',
                'modal.unifyux.principle2Title': 'Facts Over Opinions',
                'modal.unifyux.principle2Desc': 'We defer to facts over opinions, using evidence and research-based design philosophy. This allows us to challenge everything and favor present reality over past assumptions. If unsure\u2014ask!',
                'modal.unifyux.principle3Title': 'Always a Work in Progress',
                'modal.unifyux.principle3Desc': 'Our focus is on learning, iteration, and continuous improvement. We are agile, always learning, and open to change. There are always ways to solve problems in easier, simpler, more intuitive ways.',
                'modal.unifyux.principle4Title': 'Usable by Everyone',
                'modal.unifyux.principle4Desc': 'User experience connects humans to products through empathy and understanding. We are inherently inclusive and strive to create solutions for everyone\u2014always advocating for WCAG AA accessibility compliance.',
                'modal.unifyux.section4Title': 'Design System Architecture',
                'modal.unifyux.section4P1': 'I structured the design system with scalable foundations that support growth:',
                'modal.unifyux.process1': 'Design Tokens',
                'modal.unifyux.process2': 'Core Components',
                'modal.unifyux.process3': 'Pattern Library',
                'modal.unifyux.process4': 'Documentation',
                'modal.unifyux.insightText1': '<strong>Design Tokens:</strong> I created semantic tokens for colors (Primary, Success, Warning, Danger, Neutral), typography (native Roboto font system with Display, Heading, and Body scales), and spacing\u2014all with AA-compliant contrast ratios.',
                'modal.unifyux.section5Title': 'Design System Showcase',
                'modal.unifyux.section5P1': 'Complete design system documentation \u2014 from UX principles to component library:',
                'modal.unifyux.caption1': 'UX Design Principles \u2014 Customers First, Facts Over Opinions, Always WIP, Usable by Everyone',
                'modal.unifyux.caption2': 'Styles \u2014 Color System with AA-compliant contrast ratios across all product themes',
                'modal.unifyux.caption3': 'Styles \u2014 Typography scale using native Roboto font for optimal legibility',
                'modal.unifyux.caption4': 'Styles \u2014 Navigation patterns with interactive prototypes',
                'modal.unifyux.caption5': 'Navigation anatomy \u2014 left panel, top bar, and page link structure',
                'modal.unifyux.caption6': 'Component Library \u2014 50+ reusable UI components with variants and states',
                'modal.unifyux.section6Title': 'Key Deliverables',
                'modal.unifyux.feature1Title': 'Color System',
                'modal.unifyux.feature1Desc': 'Primary, Success, Warning, Danger, and Neutral color palettes with carefully calculated contrast ratios meeting WCAG AA standards. Each color has light/dark variants for different UI contexts.',
                'modal.unifyux.feature2Title': 'Typography Scale',
                'modal.unifyux.feature2Desc': 'Native Roboto font system with Display (44-80px), Heading (20-32px), and Body (12-16px) scales. Optimized for scientific content with high data density.',
                'modal.unifyux.feature3Title': '50+ Components',
                'modal.unifyux.feature3Desc': 'Reusable Figma components with coded equivalents in React. Each component includes variants, states, and accessibility annotations.',
                'modal.unifyux.feature4Title': 'Navigation Patterns',
                'modal.unifyux.feature4Desc': 'Research-backed navigation patterns. User testing showed labels with icons had faster response times and higher satisfaction scores than icons alone.',
                'modal.unifyux.reflectionTitle': '\ud83d\udcad What I Learned',
                'modal.unifyux.reflectionText': 'Design systems aren\'t about components\u2014they\'re about <strong>changing organizational culture</strong>. The hardest part wasn\'t building the system; it was building trust. I learned that adoption happens when you solve real pain points, not when you have the prettiest documentation. The teams that adopted UnifyUX fastest were the ones I paired with early, understanding their specific challenges and designing solutions together. A design system is a product, and its users are your fellow designers and developers.',"""

zh_unifyux = """
                'modal.unifyux.eyebrow': '设计系统 · 2024',
                'modal.unifyux.title': 'UnifyUX',
                'modal.unifyux.subtitle': '统一产品用户体验',
                'modal.unifyux.metaLabel1': '角色',
                'modal.unifyux.metaValue1': '首席设计师',
                'modal.unifyux.metaLabel2': '范围',
                'modal.unifyux.metaValue2': '3个产品',
                'modal.unifyux.metaLabel3': '公司',
                'modal.unifyux.metaValue3': 'Revvity',
                'modal.unifyux.metaLabel4': '网站',
                'modal.unifyux.metaValue4': 'revvity.design',
                'modal.unifyux.tldrLabel': '概要',
                'modal.unifyux.tldrText': '主导创建了Revvity首个统一设计系统，将设计迭代时间缩短25%，开发交付错误减少30%，覆盖生命科学行业的3个企业级产品。',
                'modal.unifyux.metricLabel1': '设计加速',
                'modal.unifyux.metricDesc1': '迭代时间',
                'modal.unifyux.metricLabel2': '错误减少',
                'modal.unifyux.metricDesc2': '开发交付',
                'modal.unifyux.metricLabel3': '产品',
                'modal.unifyux.metricDesc3': '已统一',
                'modal.unifyux.metricLabel4': '无障碍',
                'modal.unifyux.metricDesc4': '合规',
                'modal.unifyux.section1Title': '我的角色与背景',
                'modal.unifyux.roleLabel1': '我的职责',
                'modal.unifyux.roleValue1': '设计系统架构、组件设计、文档编写、利益相关者协调及采用策略',
                'modal.unifyux.roleLabel2': '范围',
                'modal.unifyux.roleValue2': '3个企业级产品：Signals BioDesign、Signals Notebook、Signals Inventa',
                'modal.unifyux.roleLabel3': '公司',
                'modal.unifyux.roleValue3': 'Revvity（前身为PerkinElmer）',
                'modal.unifyux.roleLabel4': '网站',
                'modal.unifyux.section2Title': '挑战',
                'modal.unifyux.quote': '"构建设计系统很容易。让人们使用它才是难点。"',
                'modal.unifyux.section2P1': '为企业软件创建设计系统具有独特的挑战性，因为你不仅仅是在设计组件——你是在改变团队的工作方式：',
                'modal.unifyux.challenge1': '<strong>阶段一：提出倡议</strong>——在价值尚未被证明时说服领导层投资设计系统。"我们为什么要在这上面花资源，而不是去开发功能？"',
                'modal.unifyux.challenge2': '<strong>阶段二：创建组件</strong>——构建抽象、可复用的组件，使其能在技术栈和框架完全不同的产品中通用。',
                'modal.unifyux.challenge3': '<strong>阶段三：团队采用</strong>——让已有工作流程的设计团队改变习惯，采用他们并未主动要求的新流程。',
                'modal.unifyux.challenge4': '<strong>阶段四：持续贡献</strong>——确保团队回馈系统，而不是创建一次性解决方案。',
                'modal.unifyux.section3Title': 'UX设计原则',
                'modal.unifyux.section3P1': '我为生命科学行业的软件设计确立了四项核心原则：',
                'modal.unifyux.principle1Title': '客户优先',
                'modal.unifyux.principle1Desc': '我们构建为客户创造价值的产品。与客户合作来理解和解决他们的挑战——而非盲目遵循他们提出的解决方案。',
                'modal.unifyux.principle2Title': '事实胜于观点',
                'modal.unifyux.principle2Desc': '我们以事实为导向而非个人观点，采用基于证据和研究的设计理念。这让我们能够质疑一切，偏重当前现实而非过去的假设。不确定时——就去问！',
                'modal.unifyux.principle3Title': '永远在进步中',
                'modal.unifyux.principle3Desc': '我们的重点是学习、迭代和持续改进。我们保持敏捷，始终学习，拥抱变化。总有更简单、更直观的方式来解决问题。',
                'modal.unifyux.principle4Title': '人人可用',
                'modal.unifyux.principle4Desc': '用户体验通过共情和理解连接人与产品。我们本质上是包容的，致力于为所有人创造解决方案——始终倡导WCAG AA无障碍合规。',
                'modal.unifyux.section4Title': '设计系统架构',
                'modal.unifyux.section4P1': '我以可扩展的基础来构建设计系统，支持未来增长：',
                'modal.unifyux.process1': '设计令牌',
                'modal.unifyux.process2': '核心组件',
                'modal.unifyux.process3': '模式库',
                'modal.unifyux.process4': '文档',
                'modal.unifyux.insightText1': '<strong>设计令牌：</strong>我创建了颜色（Primary、Success、Warning、Danger、Neutral）、排版（原生Roboto字体系统，含Display、Heading和Body层级）和间距的语义化令牌——全部符合AA级对比度标准。',
                'modal.unifyux.section5Title': '设计系统展示',
                'modal.unifyux.section5P1': '完整的设计系统文档——从UX原则到组件库：',
                'modal.unifyux.caption1': 'UX设计原则——客户优先、事实胜于观点、永远在进步中、人人可用',
                'modal.unifyux.caption2': '样式——色彩系统，所有产品主题均符合AA级对比度标准',
                'modal.unifyux.caption3': '样式——使用原生Roboto字体的排版层级，优化阅读体验',
                'modal.unifyux.caption4': '样式——带有交互原型的导航模式',
                'modal.unifyux.caption5': '导航解剖——左侧面板、顶部栏和页面链接结构',
                'modal.unifyux.caption6': '组件库——50+可复用UI组件，含变体和状态',
                'modal.unifyux.section6Title': '核心交付物',
                'modal.unifyux.feature1Title': '色彩系统',
                'modal.unifyux.feature1Desc': 'Primary、Success、Warning、Danger和Neutral色板，精心计算的对比度满足WCAG AA标准。每种颜色都有亮/暗变体，适用于不同的UI场景。',
                'modal.unifyux.feature2Title': '排版层级',
                'modal.unifyux.feature2Desc': '原生Roboto字体系统，含Display（44-80px）、Heading（20-32px）和Body（12-16px）层级。针对高数据密度的科学内容进行了优化。',
                'modal.unifyux.feature3Title': '50+组件',
                'modal.unifyux.feature3Desc': '可复用的Figma组件及React代码实现。每个组件包含变体、状态和无障碍标注。',
                'modal.unifyux.feature4Title': '导航模式',
                'modal.unifyux.feature4Desc': '基于研究的导航模式。用户测试表明，带标签的图标比纯图标有更快的响应时间和更高的满意度。',
                'modal.unifyux.reflectionTitle': '💭 我的收获',
                'modal.unifyux.reflectionText': '设计系统不是关于组件——而是关于<strong>改变组织文化</strong>。最难的部分不是构建系统，而是建立信任。我学到，当你解决了真正的痛点时采用才会发生，而不是当你拥有最漂亮的文档时。最快采用UnifyUX的团队是我早期就与之配对的团队，理解他们的具体挑战并一起设计解决方案。设计系统是一个产品，它的用户是你的同事设计师和开发者。',"""

# Insert translations after the last signals keys
lines = content.split('\n')
en_inserted = False
zh_inserted = False

for i, line in enumerate(lines):
    if not en_inserted and "'modal.signals.reflectionText'" in line and 'just shows me' in line:
        lines[i] = line + en_unifyux
        en_inserted = True
    elif not zh_inserted and "'modal.signals.reflectionText'" in line and '\u9690\u5f62' in line:
        # 隐形 = \u9690\u5f62
        lines[i] = line + zh_unifyux
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

print("Done! UnifyUX modal i18n applied successfully.")
