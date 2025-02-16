chrome.storage.local.get(['image'], function (result) {
  if (result.image) {
    applyBackground(result.image);
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'change_bg') {
    applyBackground(message.image);
  } else if (message.action === 'remove_bg') {
    document.body.style.backgroundImage = 'none';
  }
});

function applyBackground(imageUrl) {
  document.body.style.backgroundImage = `url(${imageUrl})`;
  document.body.style.backgroundSize = '200px';
  document.body.style.backgroundRepeat = 'repeat';
}
