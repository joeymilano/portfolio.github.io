#!/usr/bin/env python3
"""Transform Ctrip modal for i18n support."""

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# ── HTML REPLACEMENTS ──
html_replacements = [
    # Eyebrow
    (
        '<p class="modal-eyebrow">Travel \u00b7 C2C \u00b7 Well Group \u00d7 Ctrip</p>',
        '<p class="modal-eyebrow" data-i18n="modal.ctrip.eyebrow">Travel \u00b7 C2C \u00b7 Well Group \u00d7 Ctrip</p>',
    ),
    # Title
    (
        '<h2 class="modal-title">Ctrip Hotel</h2>',
        '<h2 class="modal-title" data-i18n="modal.ctrip.title">Ctrip Hotel</h2>',
    ),
    # Subtitle
    (
        '<p class="modal-subtitle">Hotel Video Cover Upgrade</p>',
        '<p class="modal-subtitle" data-i18n="modal.ctrip.subtitle">Hotel Video Cover Upgrade</p>',
    ),
    # Meta labels & values (all on one line)
    (
        '<span class="modal-meta-label">Role</span><span class="modal-meta-value">Product Designer</span></div>\n'
        '                    <div class="modal-meta-item"><span class="modal-meta-label">Client</span><span class="modal-meta-value">Ctrip (\u643a\u7a0b)</span></div>\n'
        '                    <div class="modal-meta-item"><span class="modal-meta-label">Agency</span><span class="modal-meta-value">Well Group</span></div>\n'
        '                    <div class="modal-meta-item"><span class="modal-meta-label">Platform</span><span class="modal-meta-value">Mobile App</span></div>',

        '<span class="modal-meta-label" data-i18n="modal.ctrip.metaLabel1">Role</span><span class="modal-meta-value" data-i18n="modal.ctrip.metaValue1">Product Designer</span></div>\n'
        '                    <div class="modal-meta-item"><span class="modal-meta-label" data-i18n="modal.ctrip.metaLabel2">Client</span><span class="modal-meta-value" data-i18n="modal.ctrip.metaValue2">Ctrip (\u643a\u7a0b)</span></div>\n'
        '                    <div class="modal-meta-item"><span class="modal-meta-label" data-i18n="modal.ctrip.metaLabel3">Agency</span><span class="modal-meta-value" data-i18n="modal.ctrip.metaValue3">Well Group</span></div>\n'
        '                    <div class="modal-meta-item"><span class="modal-meta-label" data-i18n="modal.ctrip.metaLabel4">Platform</span><span class="modal-meta-value" data-i18n="modal.ctrip.metaValue4">Mobile App</span></div>',
    ),
    # TL;DR
    (
        '<div class="modal-tldr-label">TL;DR</div>\n'
        '                    <div class="modal-tldr-text">Increased indirect conversion rate by 5.32% through a data-driven redesign of hotel video covers, optimizing for user viewing behavior and sound preferences.</div>',
        '<div class="modal-tldr-label" data-i18n="modal.ctrip.tldrLabel">TL;DR</div>\n'
        '                    <div class="modal-tldr-text" data-i18n="modal.ctrip.tldrText">Increased indirect conversion rate by 5.32% through a data-driven redesign of hotel video covers, optimizing for user viewing behavior and sound preferences.</div>',
    ),
    # Metrics - metric 1
    (
        '<div class="modal-metric-label">Conversion</div><div class="modal-metric-desc">Indirect rate</div>',
        '<div class="modal-metric-label" data-i18n="modal.ctrip.metricLabel1">Conversion</div><div class="modal-metric-desc" data-i18n="modal.ctrip.metricDesc1">Indirect rate</div>',
    ),
    # Metrics - metric 2
    (
        '<div class="modal-metric-label">Video CTR</div><div class="modal-metric-desc">vs 2.0% images</div>',
        '<div class="modal-metric-label" data-i18n="modal.ctrip.metricLabel2">Video CTR</div><div class="modal-metric-desc" data-i18n="modal.ctrip.metricDesc2">vs 2.0% images</div>',
    ),
    # Metrics - metric 3
    (
        '<div class="modal-metric-label">Sound-On CTR</div><div class="modal-metric-desc">vs 1.1% muted</div>',
        '<div class="modal-metric-label" data-i18n="modal.ctrip.metricLabel3">Sound-On CTR</div><div class="modal-metric-desc" data-i18n="modal.ctrip.metricDesc3">vs 1.1% muted</div>',
    ),
    # Metrics - metric 4
    (
        '<div class="modal-metric-label">Active Users</div><div class="modal-metric-desc">Annual platform</div>',
        '<div class="modal-metric-label" data-i18n="modal.ctrip.metricLabel4">Active Users</div><div class="modal-metric-desc" data-i18n="modal.ctrip.metricDesc4">Annual platform</div>',
    ),
    # Section 1 title + role labels/values
    (
        '<span class="modal-section-number">1</span>My Role & Context</h3>',
        '<span class="modal-section-number">1</span><span data-i18n="modal.ctrip.section1Title">My Role & Context</span></h3>',
    ),
    (
        '<div class="modal-role-label">My Responsibilities</div>\n'
        '                            <div class="modal-role-value">Wireframing, prototyping, user testing, data analysis, and A/B test design</div>',
        '<div class="modal-role-label" data-i18n="modal.ctrip.roleLabel1">My Responsibilities</div>\n'
        '                            <div class="modal-role-value" data-i18n="modal.ctrip.roleValue1">Wireframing, prototyping, user testing, data analysis, and A/B test design</div>',
    ),
    (
        '<div class="modal-role-label">Team</div>\n'
        '                            <div class="modal-role-value">Me (Product Designer), PM, 5 Dev Engineers, Design Manager</div>',
        '<div class="modal-role-label" data-i18n="modal.ctrip.roleLabel2">Team</div>\n'
        '                            <div class="modal-role-value" data-i18n="modal.ctrip.roleValue2">Me (Product Designer), PM, 5 Dev Engineers, Design Manager</div>',
    ),
    (
        '<div class="modal-role-label">Timeline</div>\n'
        '                            <div class="modal-role-value">~2 months</div>',
        '<div class="modal-role-label" data-i18n="modal.ctrip.roleLabel3">Timeline</div>\n'
        '                            <div class="modal-role-value" data-i18n="modal.ctrip.roleValue3">~2 months</div>',
    ),
    (
        '<div class="modal-role-label">Tools</div>\n'
        '                            <div class="modal-role-value">Figma, Sketch, Maze</div>',
        '<div class="modal-role-label" data-i18n="modal.ctrip.roleLabel4">Tools</div>\n'
        '                            <div class="modal-role-value" data-i18n="modal.ctrip.roleValue4">Figma, Sketch, Maze</div>',
    ),
    # Section 1 insight (has <strong>, needs data-i18n-html)
    (
        '<div class="modal-insight-text"><strong>Project Context:</strong> Well Group (design consultancy based in Shenzhen) was contracted by Ctrip (international OTA based in Shanghai) to improve the hotel browsing experience. I worked as the lead designer on this engagement.</div>',
        '<div class="modal-insight-text" data-i18n="modal.ctrip.insightText1" data-i18n-html><strong>Project Context:</strong> Well Group (design consultancy based in Shenzhen) was contracted by Ctrip (international OTA based in Shanghai) to improve the hotel browsing experience. I worked as the lead designer on this engagement.</div>',
    ),
    # Section 2 title
    (
        '<span class="modal-section-number">2</span>Understanding Ctrip</h3>',
        '<span class="modal-section-number">2</span><span data-i18n="modal.ctrip.section2Title">Understanding Ctrip</span></h3>',
    ),
    # Section 2 paragraph
    (
        '<p>Ctrip is one of the world\'s largest online travel agencies, enabling seamless travel experiences for global users. The platform integrates technology with innovative services, empowering travelers to explore the world with confidence.</p>',
        '<p data-i18n="modal.ctrip.section2P1">Ctrip is one of the world\'s largest online travel agencies, enabling seamless travel experiences for global users. The platform integrates technology with innovative services, empowering travelers to explore the world with confidence.</p>',
    ),
    # Section 2 role grid items
    (
        '<div class="modal-role-label">Annual Active Users</div>\n'
        '                            <div class="modal-role-value">400 million+</div>',
        '<div class="modal-role-label" data-i18n="modal.ctrip.ctripLabel1">Annual Active Users</div>\n'
        '                            <div class="modal-role-value" data-i18n="modal.ctrip.ctripValue1">400 million+</div>',
    ),
    (
        '<div class="modal-role-label">Partnered Hotels</div>\n'
        '                            <div class="modal-role-value">1.5 million+ worldwide</div>',
        '<div class="modal-role-label" data-i18n="modal.ctrip.ctripLabel2">Partnered Hotels</div>\n'
        '                            <div class="modal-role-value" data-i18n="modal.ctrip.ctripValue2">1.5 million+ worldwide</div>',
    ),
    (
        '<div class="modal-role-label">Global Presence</div>\n'
        '                            <div class="modal-role-value">200+ countries and regions</div>',
        '<div class="modal-role-label" data-i18n="modal.ctrip.ctripLabel3">Global Presence</div>\n'
        '                            <div class="modal-role-value" data-i18n="modal.ctrip.ctripValue3">200+ countries and regions</div>',
    ),
    (
        '<div class="modal-role-label">Monthly Reviews</div>\n'
        '                            <div class="modal-role-value">2 million+ verified</div>',
        '<div class="modal-role-label" data-i18n="modal.ctrip.ctripLabel4">Monthly Reviews</div>\n'
        '                            <div class="modal-role-value" data-i18n="modal.ctrip.ctripValue4">2 million+ verified</div>',
    ),
    # Section 3 title
    (
        '<span class="modal-section-number">3</span>Problems Identified</h3>',
        '<span class="modal-section-number">3</span><span data-i18n="modal.ctrip.section3Title">Problems Identified</span></h3>',
    ),
    # Section 3 quote
    (
        '<div class="modal-quote">"To improve user experience in browsing image/video content"</div>',
        '<div class="modal-quote" data-i18n="modal.ctrip.quote">"To improve user experience in browsing image/video content"</div>',
    ),
    # Section 3 paragraph
    (
        '<p>Through UX audit and user testing, I identified multiple issues with the current video cover implementation:</p>',
        '<p data-i18n="modal.ctrip.section3P1">Through UX audit and user testing, I identified multiple issues with the current video cover implementation:</p>',
    ),
    # Challenges (all have <strong>, need data-i18n-html)
    (
        '<li><strong>Content Issues:</strong> Video content not properly cropped\u2014black edges appeared on many hotel listings</li>',
        '<li data-i18n="modal.ctrip.challenge1" data-i18n-html><strong>Content Issues:</strong> Video content not properly cropped\u2014black edges appeared on many hotel listings</li>',
    ),
    (
        '<li><strong>Sound/Image Problems:</strong> No sound on detail page; video playback area too small for comfortable viewing</li>',
        '<li data-i18n="modal.ctrip.challenge2" data-i18n-html><strong>Sound/Image Problems:</strong> No sound on detail page; video playback area too small for comfortable viewing</li>',
    ),
    (
        '<li><strong>Operation Friction:</strong> Videos too long with no pause control; 5G environment cues displayed unreasonably</li>',
        '<li data-i18n="modal.ctrip.challenge3" data-i18n-html><strong>Operation Friction:</strong> Videos too long with no pause control; 5G environment cues displayed unreasonably</li>',
    ),
    (
        '<li><strong>Technical Bugs:</strong> Progress bar not adapted to hotel overview card when sliding; video doesn\'t blend with reflection below</li>',
        '<li data-i18n="modal.ctrip.challenge4" data-i18n-html><strong>Technical Bugs:</strong> Progress bar not adapted to hotel overview card when sliding; video doesn\'t blend with reflection below</li>',
    ),
    # Section 4 title
    (
        '<span class="modal-section-number">4</span>Data Analysis</h3>',
        '<span class="modal-section-number">4</span><span data-i18n="modal.ctrip.section4Title">Data Analysis</span></h3>',
    ),
    # Section 4 paragraph
    (
        '<p>I conducted a deep dive into video performance metrics and user behavior data:</p>',
        '<p data-i18n="modal.ctrip.section4P1">I conducted a deep dive into video performance metrics and user behavior data:</p>',
    ),
    # Competitor cards (4 cards, each with name/pros/cons)
    (
        '<div class="modal-competitor-name">Video Source Analysis</div>\n'
        '                            <div class="modal-competitor-pros">70% of source videos are 16:9 ratio</div>\n'
        '                            <div class="modal-competitor-cons">Need optimized cropping for different screen sizes</div>',
        '<div class="modal-competitor-name" data-i18n="modal.ctrip.compName1">Video Source Analysis</div>\n'
        '                            <div class="modal-competitor-pros" data-i18n="modal.ctrip.compPros1">70% of source videos are 16:9 ratio</div>\n'
        '                            <div class="modal-competitor-cons" data-i18n="modal.ctrip.compCons1">Need optimized cropping for different screen sizes</div>',
    ),
    (
        '<div class="modal-competitor-name">Image Ratio Distribution</div>\n'
        '                            <div class="modal-competitor-pros">47.18% are 3:2, 34.98% are 4:3</div>\n'
        '                            <div class="modal-competitor-cons">Multiple formats require adaptive display logic</div>',
        '<div class="modal-competitor-name" data-i18n="modal.ctrip.compName2">Image Ratio Distribution</div>\n'
        '                            <div class="modal-competitor-pros" data-i18n="modal.ctrip.compPros2">47.18% are 3:2, 34.98% are 4:3</div>\n'
        '                            <div class="modal-competitor-cons" data-i18n="modal.ctrip.compCons2">Multiple formats require adaptive display logic</div>',
    ),
    (
        '<div class="modal-competitor-name">Engagement Metrics</div>\n'
        '                            <div class="modal-competitor-pros">Video CTR: 4.8% vs Image CTR: 2.0%</div>\n'
        '                            <div class="modal-competitor-cons">Videos significantly outperform static images</div>',
        '<div class="modal-competitor-name" data-i18n="modal.ctrip.compName3">Engagement Metrics</div>\n'
        '                            <div class="modal-competitor-pros" data-i18n="modal.ctrip.compPros3">Video CTR: 4.8% vs Image CTR: 2.0%</div>\n'
        '                            <div class="modal-competitor-cons" data-i18n="modal.ctrip.compCons3">Videos significantly outperform static images</div>',
    ),
    (
        '<div class="modal-competitor-name">Sound Preference</div>\n'
        '                            <div class="modal-competitor-pros">Sound-on CTR: 8.4% vs Muted CTR: 1.1%</div>\n'
        '                            <div class="modal-competitor-cons">Users strongly prefer audio-enabled videos</div>',
        '<div class="modal-competitor-name" data-i18n="modal.ctrip.compName4">Sound Preference</div>\n'
        '                            <div class="modal-competitor-pros" data-i18n="modal.ctrip.compPros4">Sound-on CTR: 8.4% vs Muted CTR: 1.1%</div>\n'
        '                            <div class="modal-competitor-cons" data-i18n="modal.ctrip.compCons4">Users strongly prefer audio-enabled videos</div>',
    ),
    # Section 4 insight
    (
        '<div class="modal-insight-text">Key insight: The data showed users want immersive video experiences with sound\u2014contrary to the assumption that muted autoplay was better for UX. This counter-intuitive finding drove our solution.</div>',
        '<div class="modal-insight-text" data-i18n="modal.ctrip.insightText2">Key insight: The data showed users want immersive video experiences with sound\u2014contrary to the assumption that muted autoplay was better for UX. This counter-intuitive finding drove our solution.</div>',
    ),
    # Section 5 title
    (
        '<span class="modal-section-number">5</span>Design Showcase</h3>',
        '<span class="modal-section-number">5</span><span data-i18n="modal.ctrip.section5Title">Design Showcase</span></h3>',
    ),
    # Section 5 paragraph
    (
        '<p>Complete analysis and solution design for the hotel cover upgrade:</p>',
        '<p data-i18n="modal.ctrip.section5P1">Complete analysis and solution design for the hotel cover upgrade:</p>',
    ),
    # Image captions (4)
    (
        '<p class="modal-image-caption">Overview & Results \u2014 5.32% indirect conversion rate improvement via A/B testing</p>',
        '<p class="modal-image-caption" data-i18n="modal.ctrip.caption1">Overview & Results \u2014 5.32% indirect conversion rate improvement via A/B testing</p>',
    ),
    (
        '<p class="modal-image-caption">My Role \u2014 wireframing, prototyping, user testing, and A/B experiment design</p>',
        '<p class="modal-image-caption" data-i18n="modal.ctrip.caption2">My Role \u2014 wireframing, prototyping, user testing, and A/B experiment design</p>',
    ),
    (
        '<p class="modal-image-caption">Problem categorization \u2014 Content, Sound/Image, and Operation issues identified</p>',
        '<p class="modal-image-caption" data-i18n="modal.ctrip.caption3">Problem categorization \u2014 Content, Sound/Image, and Operation issues identified</p>',
    ),
    (
        '<p class="modal-image-caption">User demand analysis \u2014 video/image viewing patterns and crop logic study</p>',
        '<p class="modal-image-caption" data-i18n="modal.ctrip.caption4">User demand analysis \u2014 video/image viewing patterns and crop logic study</p>',
    ),
    # Section 6 title
    (
        '<span class="modal-section-number">6</span>Solutions Delivered</h3>',
        '<span class="modal-section-number">6</span><span data-i18n="modal.ctrip.section6Title">Solutions Delivered</span></h3>',
    ),
    # Feature cards (4)
    (
        '<div class="modal-feature-title">Adaptive Cropping Logic</div>\n'
        '                        <div class="modal-feature-desc">Smart cropping based on screen size: 16:9 ratio for large screens (60% of users), 2:1 ratio for small screens (40%). Cropping direction prioritizes width, using center-of-gravity detection to preserve key content.</div>',
        '<div class="modal-feature-title" data-i18n="modal.ctrip.feature1Title">Adaptive Cropping Logic</div>\n'
        '                        <div class="modal-feature-desc" data-i18n="modal.ctrip.feature1Desc">Smart cropping based on screen size: 16:9 ratio for large screens (60% of users), 2:1 ratio for small screens (40%). Cropping direction prioritizes width, using center-of-gravity detection to preserve key content.</div>',
    ),
    (
        '<div class="modal-feature-title">Sound Enhancement</div>\n'
        '                        <div class="modal-feature-desc">Default sound-on with easy user control. Based on data showing 8.4% CTR with sound vs 1.1% muted, we reversed the previous silent-first approach while respecting user preferences.</div>',
        '<div class="modal-feature-title" data-i18n="modal.ctrip.feature2Title">Sound Enhancement</div>\n'
        '                        <div class="modal-feature-desc" data-i18n="modal.ctrip.feature2Desc">Default sound-on with easy user control. Based on data showing 8.4% CTR with sound vs 1.1% muted, we reversed the previous silent-first approach while respecting user preferences.</div>',
    ),
    (
        '<div class="modal-feature-title">Progress Optimization</div>\n'
        '                        <div class="modal-feature-desc">Redesigned progress bar that adapts to card sliding behavior. Progress indicator now properly syncs with video playback and responds to user swipe gestures.</div>',
        '<div class="modal-feature-title" data-i18n="modal.ctrip.feature3Title">Progress Optimization</div>\n'
        '                        <div class="modal-feature-desc" data-i18n="modal.ctrip.feature3Desc">Redesigned progress bar that adapts to card sliding behavior. Progress indicator now properly syncs with video playback and responds to user swipe gestures.</div>',
    ),
    (
        '<div class="modal-feature-title">Content Guidelines</div>\n'
        '                        <div class="modal-feature-desc">Established new standards for hotel video uploads: recommended ratios, length limits, quality requirements, and content guidelines to ensure consistent user experience.</div>',
        '<div class="modal-feature-title" data-i18n="modal.ctrip.feature4Title">Content Guidelines</div>\n'
        '                        <div class="modal-feature-desc" data-i18n="modal.ctrip.feature4Desc">Established new standards for hotel video uploads: recommended ratios, length limits, quality requirements, and content guidelines to ensure consistent user experience.</div>',
    ),
    # Reflection title + text (has <strong>, needs data-i18n-html)
    (
        '<div class="modal-reflection-title">\U0001F4AD What I Learned</div>\n'
        '                    <div class="modal-reflection-text">',
        '<div class="modal-reflection-title" data-i18n="modal.ctrip.reflectionTitle">\U0001F4AD What I Learned</div>\n'
        '                    <div class="modal-reflection-text" data-i18n="modal.ctrip.reflectionText" data-i18n-html>',
    ),
]

count = 0
for old, new in html_replacements:
    if old in content:
        content = content.replace(old, new, 1)
        count += 1
    else:
        print("WARNING: Could not find: {}".format(repr(old[:120])))

print("Applied {}/{} HTML replacements.".format(count, len(html_replacements)))

# ── TRANSLATION KEYS ──
en_ctrip = r"""
                'modal.ctrip.eyebrow': 'Travel \u00b7 C2C \u00b7 Well Group \u00d7 Ctrip',
                'modal.ctrip.title': 'Ctrip Hotel',
                'modal.ctrip.subtitle': 'Hotel Video Cover Upgrade',
                'modal.ctrip.metaLabel1': 'Role',
                'modal.ctrip.metaValue1': 'Product Designer',
                'modal.ctrip.metaLabel2': 'Client',
                'modal.ctrip.metaValue2': 'Ctrip (\u643a\u7a0b)',
                'modal.ctrip.metaLabel3': 'Agency',
                'modal.ctrip.metaValue3': 'Well Group',
                'modal.ctrip.metaLabel4': 'Platform',
                'modal.ctrip.metaValue4': 'Mobile App',
                'modal.ctrip.tldrLabel': 'TL;DR',
                'modal.ctrip.tldrText': 'Increased indirect conversion rate by 5.32% through a data-driven redesign of hotel video covers, optimizing for user viewing behavior and sound preferences.',
                'modal.ctrip.metricLabel1': 'Conversion',
                'modal.ctrip.metricDesc1': 'Indirect rate',
                'modal.ctrip.metricLabel2': 'Video CTR',
                'modal.ctrip.metricDesc2': 'vs 2.0% images',
                'modal.ctrip.metricLabel3': 'Sound-On CTR',
                'modal.ctrip.metricDesc3': 'vs 1.1% muted',
                'modal.ctrip.metricLabel4': 'Active Users',
                'modal.ctrip.metricDesc4': 'Annual platform',
                'modal.ctrip.section1Title': 'My Role & Context',
                'modal.ctrip.roleLabel1': 'My Responsibilities',
                'modal.ctrip.roleValue1': 'Wireframing, prototyping, user testing, data analysis, and A/B test design',
                'modal.ctrip.roleLabel2': 'Team',
                'modal.ctrip.roleValue2': 'Me (Product Designer), PM, 5 Dev Engineers, Design Manager',
                'modal.ctrip.roleLabel3': 'Timeline',
                'modal.ctrip.roleValue3': '~2 months',
                'modal.ctrip.roleLabel4': 'Tools',
                'modal.ctrip.roleValue4': 'Figma, Sketch, Maze',
                'modal.ctrip.insightText1': '<strong>Project Context:</strong> Well Group (design consultancy based in Shenzhen) was contracted by Ctrip (international OTA based in Shanghai) to improve the hotel browsing experience. I worked as the lead designer on this engagement.',
                'modal.ctrip.section2Title': 'Understanding Ctrip',
                'modal.ctrip.section2P1': 'Ctrip is one of the world\'s largest online travel agencies, enabling seamless travel experiences for global users. The platform integrates technology with innovative services, empowering travelers to explore the world with confidence.',
                'modal.ctrip.ctripLabel1': 'Annual Active Users',
                'modal.ctrip.ctripValue1': '400 million+',
                'modal.ctrip.ctripLabel2': 'Partnered Hotels',
                'modal.ctrip.ctripValue2': '1.5 million+ worldwide',
                'modal.ctrip.ctripLabel3': 'Global Presence',
                'modal.ctrip.ctripValue3': '200+ countries and regions',
                'modal.ctrip.ctripLabel4': 'Monthly Reviews',
                'modal.ctrip.ctripValue4': '2 million+ verified',
                'modal.ctrip.section3Title': 'Problems Identified',
                'modal.ctrip.quote': '"To improve user experience in browsing image/video content"',
                'modal.ctrip.section3P1': 'Through UX audit and user testing, I identified multiple issues with the current video cover implementation:',
                'modal.ctrip.challenge1': '<strong>Content Issues:</strong> Video content not properly cropped\u2014black edges appeared on many hotel listings',
                'modal.ctrip.challenge2': '<strong>Sound/Image Problems:</strong> No sound on detail page; video playback area too small for comfortable viewing',
                'modal.ctrip.challenge3': '<strong>Operation Friction:</strong> Videos too long with no pause control; 5G environment cues displayed unreasonably',
                'modal.ctrip.challenge4': '<strong>Technical Bugs:</strong> Progress bar not adapted to hotel overview card when sliding; video doesn\'t blend with reflection below',
                'modal.ctrip.section4Title': 'Data Analysis',
                'modal.ctrip.section4P1': 'I conducted a deep dive into video performance metrics and user behavior data:',
                'modal.ctrip.compName1': 'Video Source Analysis',
                'modal.ctrip.compPros1': '70% of source videos are 16:9 ratio',
                'modal.ctrip.compCons1': 'Need optimized cropping for different screen sizes',
                'modal.ctrip.compName2': 'Image Ratio Distribution',
                'modal.ctrip.compPros2': '47.18% are 3:2, 34.98% are 4:3',
                'modal.ctrip.compCons2': 'Multiple formats require adaptive display logic',
                'modal.ctrip.compName3': 'Engagement Metrics',
                'modal.ctrip.compPros3': 'Video CTR: 4.8% vs Image CTR: 2.0%',
                'modal.ctrip.compCons3': 'Videos significantly outperform static images',
                'modal.ctrip.compName4': 'Sound Preference',
                'modal.ctrip.compPros4': 'Sound-on CTR: 8.4% vs Muted CTR: 1.1%',
                'modal.ctrip.compCons4': 'Users strongly prefer audio-enabled videos',
                'modal.ctrip.insightText2': 'Key insight: The data showed users want immersive video experiences with sound\u2014contrary to the assumption that muted autoplay was better for UX. This counter-intuitive finding drove our solution.',
                'modal.ctrip.section5Title': 'Design Showcase',
                'modal.ctrip.section5P1': 'Complete analysis and solution design for the hotel cover upgrade:',
                'modal.ctrip.caption1': 'Overview & Results \u2014 5.32% indirect conversion rate improvement via A/B testing',
                'modal.ctrip.caption2': 'My Role \u2014 wireframing, prototyping, user testing, and A/B experiment design',
                'modal.ctrip.caption3': 'Problem categorization \u2014 Content, Sound/Image, and Operation issues identified',
                'modal.ctrip.caption4': 'User demand analysis \u2014 video/image viewing patterns and crop logic study',
                'modal.ctrip.section6Title': 'Solutions Delivered',
                'modal.ctrip.feature1Title': 'Adaptive Cropping Logic',
                'modal.ctrip.feature1Desc': 'Smart cropping based on screen size: 16:9 ratio for large screens (60% of users), 2:1 ratio for small screens (40%). Cropping direction prioritizes width, using center-of-gravity detection to preserve key content.',
                'modal.ctrip.feature2Title': 'Sound Enhancement',
                'modal.ctrip.feature2Desc': 'Default sound-on with easy user control. Based on data showing 8.4% CTR with sound vs 1.1% muted, we reversed the previous silent-first approach while respecting user preferences.',
                'modal.ctrip.feature3Title': 'Progress Optimization',
                'modal.ctrip.feature3Desc': 'Redesigned progress bar that adapts to card sliding behavior. Progress indicator now properly syncs with video playback and responds to user swipe gestures.',
                'modal.ctrip.feature4Title': 'Content Guidelines',
                'modal.ctrip.feature4Desc': 'Established new standards for hotel video uploads: recommended ratios, length limits, quality requirements, and content guidelines to ensure consistent user experience.',
                'modal.ctrip.reflectionTitle': '\ud83d\udcad What I Learned',
                'modal.ctrip.reflectionText': 'This project reinforced that <strong>assumptions kill design</strong>. Everyone "knew" that muted autoplay was the industry standard\u2014but data showed our users were different. Working with a platform serving 400M+ users taught me to let data lead while staying curious about outliers. The 5.32% conversion lift came from a series of small, data-validated improvements\u2014not one big redesign. Sometimes the most impactful design work is fixing what\'s broken, not inventing what\'s new.',"""

zh_ctrip = """
                'modal.ctrip.eyebrow': '旅行 · C2C · Well Group × 携程',
                'modal.ctrip.title': '携程酒店',
                'modal.ctrip.subtitle': '酒店视频封面升级',
                'modal.ctrip.metaLabel1': '角色',
                'modal.ctrip.metaValue1': '产品设计师',
                'modal.ctrip.metaLabel2': '客户',
                'modal.ctrip.metaValue2': '携程',
                'modal.ctrip.metaLabel3': '代理机构',
                'modal.ctrip.metaValue3': 'Well Group',
                'modal.ctrip.metaLabel4': '平台',
                'modal.ctrip.metaValue4': '移动端App',
                'modal.ctrip.tldrLabel': '概要',
                'modal.ctrip.tldrText': '通过数据驱动的酒店视频封面重设计，优化用户浏览行为和声音偏好，将间接转化率提升了5.32%。',
                'modal.ctrip.metricLabel1': '转化率',
                'modal.ctrip.metricDesc1': '间接转化',
                'modal.ctrip.metricLabel2': '视频点击率',
                'modal.ctrip.metricDesc2': '对比图片2.0%',
                'modal.ctrip.metricLabel3': '有声点击率',
                'modal.ctrip.metricDesc3': '对比静音1.1%',
                'modal.ctrip.metricLabel4': '活跃用户',
                'modal.ctrip.metricDesc4': '年度平台',
                'modal.ctrip.section1Title': '我的角色与背景',
                'modal.ctrip.roleLabel1': '我的职责',
                'modal.ctrip.roleValue1': '线框图绘制、原型设计、用户测试、数据分析及A/B测试设计',
                'modal.ctrip.roleLabel2': '团队',
                'modal.ctrip.roleValue2': '我（产品设计师）、产品经理、5位开发工程师、设计经理',
                'modal.ctrip.roleLabel3': '时间线',
                'modal.ctrip.roleValue3': '约2个月',
                'modal.ctrip.roleLabel4': '工具',
                'modal.ctrip.roleValue4': 'Figma、Sketch、Maze',
                'modal.ctrip.insightText1': '<strong>项目背景：</strong>Well Group（深圳设计咨询公司）受携程（上海国际OTA平台）委托，改善酒店浏览体验。我作为该项目的主设计师参与。',
                'modal.ctrip.section2Title': '了解携程',
                'modal.ctrip.section2P1': '携程是全球最大的在线旅行社之一，为全球用户提供无缝的旅行体验。该平台将技术与创新服务相结合，赋能旅行者自信地探索世界。',
                'modal.ctrip.ctripLabel1': '年活跃用户',
                'modal.ctrip.ctripValue1': '4亿+',
                'modal.ctrip.ctripLabel2': '合作酒店',
                'modal.ctrip.ctripValue2': '全球150万+',
                'modal.ctrip.ctripLabel3': '全球覆盖',
                'modal.ctrip.ctripValue3': '200+国家和地区',
                'modal.ctrip.ctripLabel4': '月度评论',
                'modal.ctrip.ctripValue4': '200万+已验证',
                'modal.ctrip.section3Title': '发现的问题',
                'modal.ctrip.quote': '"改善用户在浏览图片/视频内容时的体验"',
                'modal.ctrip.section3P1': '通过UX审查和用户测试，我发现了当前视频封面实现中的多个问题：',
                'modal.ctrip.challenge1': '<strong>内容问题：</strong>视频内容裁剪不当——许多酒店列表出现黑边',
                'modal.ctrip.challenge2': '<strong>声音/图像问题：</strong>详情页无声音；视频播放区域太小，不便于观看',
                'modal.ctrip.challenge3': '<strong>操作摩擦：</strong>视频过长且无暂停控制；5G环境提示显示不合理',
                'modal.ctrip.challenge4': '<strong>技术缺陷：</strong>进度条未适配酒店概览卡片滑动；视频与下方倒影无法融合',
                'modal.ctrip.section4Title': '数据分析',
                'modal.ctrip.section4P1': '我对视频性能指标和用户行为数据进行了深入分析：',
                'modal.ctrip.compName1': '视频源分析',
                'modal.ctrip.compPros1': '70%的源视频为16:9比例',
                'modal.ctrip.compCons1': '需要针对不同屏幕尺寸优化裁剪',
                'modal.ctrip.compName2': '图片比例分布',
                'modal.ctrip.compPros2': '47.18%为3:2，34.98%为4:3',
                'modal.ctrip.compCons2': '多种格式需要自适应显示逻辑',
                'modal.ctrip.compName3': '互动指标',
                'modal.ctrip.compPros3': '视频点击率：4.8% vs 图片点击率：2.0%',
                'modal.ctrip.compCons3': '视频显著优于静态图片',
                'modal.ctrip.compName4': '声音偏好',
                'modal.ctrip.compPros4': '有声点击率：8.4% vs 静音点击率：1.1%',
                'modal.ctrip.compCons4': '用户强烈偏好有声视频',
                'modal.ctrip.insightText2': '关键洞察：数据显示用户希望获得有声的沉浸式视频体验——这与"静音自动播放对UX更好"的假设相反。这一反直觉的发现驱动了我们的解决方案。',
                'modal.ctrip.section5Title': '设计展示',
                'modal.ctrip.section5P1': '酒店封面升级的完整分析与解决方案设计：',
                'modal.ctrip.caption1': '概览与结果——通过A/B测试实现5.32%间接转化率提升',
                'modal.ctrip.caption2': '我的角色——线框图、原型设计、用户测试和A/B实验设计',
                'modal.ctrip.caption3': '问题分类——内容、声音/图像和操作问题识别',
                'modal.ctrip.caption4': '用户需求分析——视频/图片浏览模式和裁剪逻辑研究',
                'modal.ctrip.section6Title': '交付的解决方案',
                'modal.ctrip.feature1Title': '自适应裁剪逻辑',
                'modal.ctrip.feature1Desc': '基于屏幕尺寸的智能裁剪：大屏（60%用户）使用16:9比例，小屏（40%）使用2:1比例。裁剪方向优先保证宽度，使用重心检测保留关键内容。',
                'modal.ctrip.feature2Title': '声音增强',
                'modal.ctrip.feature2Desc': '默认开启声音并提供便捷控制。基于有声8.4%点击率vs静音1.1%的数据，我们颠覆了之前的静音优先方案，同时尊重用户偏好。',
                'modal.ctrip.feature3Title': '进度条优化',
                'modal.ctrip.feature3Desc': '重新设计的进度条可适应卡片滑动行为。进度指示器现在与视频播放正确同步，并响应用户滑动手势。',
                'modal.ctrip.feature4Title': '内容规范',
                'modal.ctrip.feature4Desc': '为酒店视频上传制定了新标准：推荐比例、时长限制、质量要求和内容指南，以确保一致的用户体验。',
                'modal.ctrip.reflectionTitle': '💭 我的收获',
                'modal.ctrip.reflectionText': '这个项目强化了<strong>假设会扼杀设计</strong>的认知。每个人都"知道"静音自动播放是行业标准——但数据显示我们的用户不一样。与一个服务4亿+用户的平台合作教会了我让数据引领，同时对异常值保持好奇。5.32%的转化提升来自一系列小而经数据验证的改进——而非一次大的重新设计。有时候最有影响力的设计工作是修复坏掉的东西，而不是发明新的。',"""

# Insert translations after the last unifyux keys
lines = content.split('\n')
en_inserted = False
zh_inserted = False

for i, line in enumerate(lines):
    if not en_inserted and "'modal.unifyux.reflectionText'" in line and 'fellow designers' in line:
        lines[i] = line + en_ctrip
        en_inserted = True
    elif not zh_inserted and "'modal.unifyux.reflectionText'" in line and '\u540c\u4e8b' in line:
        # 同事 = \u540c\u4e8b
        lines[i] = line + zh_ctrip
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

print("Done! Ctrip modal i18n applied successfully.")
