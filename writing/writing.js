const pageUrl = document.querySelector('link[rel="canonical"]')?.href || window.location.href;
const pageTitle = document.querySelector("h1")?.textContent.trim() || document.title;

document.querySelectorAll("[data-share-x]").forEach((link) => {
  link.href = `https://x.com/intent/post?text=${encodeURIComponent(pageTitle)}&url=${encodeURIComponent(pageUrl)}`;
});

document.querySelectorAll("[data-share-linkedin]").forEach((link) => {
  link.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
});

document.querySelectorAll("[data-copy-link]").forEach((button) => {
  button.addEventListener("click", async () => {
    await navigator.clipboard.writeText(pageUrl);
    const original = button.textContent;
    button.textContent = "链接已复制 ✓";
    setTimeout(() => { button.textContent = original; }, 1800);
  });
});

document.querySelectorAll("[data-copy-channel]").forEach((button) => {
  button.addEventListener("click", async () => {
    await navigator.clipboard.writeText("sphmQz03lemSzBD");
    const original = button.textContent;
    button.textContent = "视频号 ID 已复制 ✓";
    setTimeout(() => { button.textContent = original; }, 1800);
  });
});

