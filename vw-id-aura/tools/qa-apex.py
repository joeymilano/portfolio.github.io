"""ID.AURA — APEX 2026-09-05 QA screenshot runner
Captures: intro, post-launch showroom, cluster, console, autonomous.
Usage: python3 qa-apex.py
Requires: server running at http://localhost:8765/vw-id-aura/
"""
import sys, time
from playwright.sync_api import sync_playwright

BASE = "http://localhost:8765/vw-id-aura/"
OUT = "qa"

def shoot(page, name, wait_ms=1200):
    page.wait_for_timeout(wait_ms)
    page.screenshot(path=f"{OUT}/apex-{name}.png", full_page=False)
    print(f"  saved qa/apex-{name}.png")

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, args=[
            "--use-gl=angle", "--enable-webgl", "--ignore-gpu-blocklist"
        ])
        ctx = browser.new_context(viewport={"width": 1680, "height": 1000},
                                  device_scale_factor=1.5,
                                  reduced_motion="no-preference")
        page = ctx.new_page()
        page.on("console", lambda m: print(f"  [console:{m.type}]", m.text[:200]) if m.type in ("error","warning") else None)
        page.on("pageerror", lambda e: print("  [pageerror]", str(e)[:300]))

        print("-> goto", BASE)
        page.goto(BASE, wait_until="domcontentloaded")
        page.wait_for_timeout(2500)
        shoot(page, "01-intro", 800)

        # Launch
        try:
            page.click("#launch", timeout=5000)
        except Exception as e:
            print("  launch click failed:", e)
        page.wait_for_timeout(1800)
        shoot(page, "02-boot", 600)
        page.wait_for_timeout(2800)  # let ritual finish & car appear
        shoot(page, "03-showroom", 800)

        # Switch views via nav
        for vid, name, wait in [
            ("cluster", "04-cluster", 2400),
            ("console", "05-console", 2400),
            ("autonomous", "06-autonomous", 2800),
            ("showroom", "07-back-showroom", 1800),
        ]:
            try:
                page.click(f'.nav-btn[data-view="{vid}"]', timeout=4000)
                page.wait_for_timeout(wait)
                shoot(page, name, 400)
            except Exception as e:
                print(f"  view {vid} failed:", e)

        browser.close()

if __name__ == "__main__":
    main()
