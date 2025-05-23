function enableCaptions() {
  const ccButton = document.querySelector('.ytp-subtitles-button');
  if (ccButton && ccButton.getAttribute('aria-pressed') === 'false') {
    ccButton.click();
    console.log('[YouTube Auto CC] Captions enabled');
  }
}

function runIfEnabled() {
  chrome.storage.sync.get(['enabled'], (data) => {
    if (data.enabled !== false) {
      enableCaptions();
    }
  });
}

// Initial run
runIfEnabled();

// Monitor YouTube SPA navigation
let lastUrl = location.href;
new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    setTimeout(runIfEnabled, 1000);
  }
}).observe(document, { subtree: true, childList: true });
