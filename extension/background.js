chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({ url: chrome.extension.getURL('index.html'), selected: true });
});


function checkElement(info,tab) {
  // info doesn't have real information about the clicked object
  console.log(info, tab);
}
chrome.contextMenus.create({
  title: "Open element in playground", 
  contexts:["page"], 
  onclick: checkElement,
});