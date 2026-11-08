(() => {
    if (!['joeyzhao.cc', 'www.joeyzhao.cc'].includes(location.hostname)) return;
    const params = new URLSearchParams(location.search);
    if (params.get('utm_medium') === 'qa') return;
    document.addEventListener('click', event => {
        const link = event.target.closest('a[data-resume-download], a[data-contact-method]');
        if (!link || typeof window.gtag !== 'function') return;
        const details = { page_path: location.pathname, locale: document.documentElement.lang };
        if (link.hasAttribute('data-resume-download')) {
            window.gtag('event', 'resume_download_clicked', details);
        } else {
            window.gtag('event', 'portfolio_contact_clicked', { ...details, contact_method: link.dataset.contactMethod });
        }
    });
})();
