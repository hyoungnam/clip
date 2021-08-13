/* eslint-disable no-undef */
console.log('chrome back: ', chrome)
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({ url: chrome.runtime.getURL('index.html') })
})
