document.addEventListener('DOMContentLoaded', () => {
  const images = Array.from(document.querySelectorAll('img'));
  const resetBtn = document.createElement('button');

  resetBtn.textContent = '배경 제거';
  resetBtn.style.display = 'block';
  resetBtn.style.marginTop = '15px';
  resetBtn.style.padding = '12px';
  resetBtn.style.backgroundColor = '#d17171';
  resetBtn.style.color = 'white';
  resetBtn.style.fontSize = '16px';
  resetBtn.style.border = 'none';
  resetBtn.style.borderRadius = '10px';
  resetBtn.style.cursor = 'pointer';

  document.body.appendChild(resetBtn);

  images.forEach((img) => {
    img.addEventListener('click', () => {
      const imageUrl = img.src;
      chrome.storage.local.set({ image: imageUrl });
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'change_bg',
          image: imageUrl,
        });
      });
    });
  });

  resetBtn.addEventListener('click', () => {
    chrome.storage.local.remove('image');
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'remove_bg' });
    });
  });
});
