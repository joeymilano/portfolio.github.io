import re

with open('index.html', 'r') as f:
    content = f.read()

# Find all 4 modals
modals = ['modal-collov', 'modal-signals', 'modal-unifyux', 'modal-ctrip']
for mid in modals:
    # Find modal content
    pattern = r'id="' + mid + r'"(.*?)(?=<div class="modal-overlay" id="modal-|<section |<footer)'
    match = re.search(pattern, content, re.DOTALL)
    if match:
        modal_html = match.group(0)
        # Strip base64 images
        modal_html = re.sub(r'src="data:image[^"]*"', 'src="[BASE64]"', modal_html)
        # Strip SVG content
        modal_html = re.sub(r'<svg[^>]*>.*?</svg>', '[SVG]', modal_html, flags=re.DOTALL)
        print(f'\n===== {mid} =====')
        print(modal_html[:8000])
        if len(modal_html) > 8000:
            print('...(truncated)')
