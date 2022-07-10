chrome.action.disable();
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status == 'complete') {
        chrome.storage.local.get(["idWebSiteURL", "idToken"], function(data) {
            // console.log(data.idWebSiteURL); 
            disbaleTab(data.idWebSiteURL, tabId, tab);
        });

    }
});
// let color = '#3aa757';

// chrome.runtime.onInstalled.addListener(() => {
//     chrome.storage.sync.set({ color });
//     console.log('Default background color set to %cgreen', `color: ${color}`);
// });
function disbaleTab(wsURL, tabId, tab) {
    //let wsURL = localStorage['wsURL'];
    if (wsURL == null) {
        wsURL = 'darwynnfulfillment';
    }
    // console.log("wsURL:"+wsURL);
    // console.log("tab.url:"+tab.url);
    // console.log(tab.url.indexOf(wsURL));
    if (tab.url.indexOf(wsURL) != -1) {
        // console.log('enable');
        chrome.action.enable(tabId);
    } else {
        // console.log('disable');
        chrome.action.disable();
    }
}
///////////////////////////////////增加菜单,"permissions":["contextMenus"]
//////https://developer.chrome.com/docs/extensions/reference/contextMenus/#type-OnClickData
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'newLink01',
        title: 'Search Twitter for \'%s\'',
        type: 'normal',
        contexts: ['selection']
    });
    chrome.contextMenus.create({
        id: 'closeOtherTabs',
        title: 'Close other tabs',
        type: 'normal',
        contexts: ['all']
    });
});
///////////////////////////////////从菜单中打开其他网页,"permissions":["contextMenus"]
chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId == 'newLink01') {
        chrome.tabs.create({
            url: 'http://twitter.com/search?q=' +
                encodeURIComponent(info.selectionText)
        });
    }
});
///////////////close other tabs, "permissions":["contextMenus"]
chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId != "closeOtherTabs") {
        return;
    }
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        let currentTab = tabs[0];
        chrome.tabs.query({}, (tabs) => {
            tabs.map((tab) => {
                if ((tab.windowId == currentTab.windowId) &&
                    (tab.id != currentTab.id)) {
                    chrome.tabs.remove(tab.id);
                }
            });
        })
    });
});
///////////////DomainB and DomainA
let value;
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    switch (message.method) {
        case 'Send':
            value = message.value;
            break;
        case 'Recv':
            sendResponse({ value: value });
            break;
    }
});
////////////////"permissions":["alarms"]
chrome.alarms.onAlarm.addListener((alarm) => {
    //alert('Alret'); does not work.
    // appendToLog('alarms.onAlarm --' +
    //     ' name: ' + alarm.name +
    //     ' scheduledTime: ' + alarm.scheduledTime);
    chrome.windows.create({
        width: 200,
        height: 100,
        type: 'popup',
        url: 'html/alert.html'
    });
});
//////////////////////////////////////////////////