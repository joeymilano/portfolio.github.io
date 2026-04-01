import re

with open('/Users/joeyzhao/Documents/portfolio.github.io/index.html', 'r') as f:
    content = f.read()

# Find Ctrip modal - look for the closing div pattern instead
start = content.find('id="modal-ctrip"')
if start == -1:
    print("NOT FOUND")
else:
    # Find the next script tag or next modal
    end = content.find('<script>', start)
    if end == -1:
        end = len(content)
    modal_html = content[start:end]
    modal_html = re.sub(r'src="data:image[^"]*"', 'src="[BASE64]"', modal_html)
    modal_html = re.sub(r'<svg[^>]*>.*?</svg>', '[SVG]', modal_html, flags=re.DOTALL)
    print(modal_html)
