chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.msg === 'show-popup') {
        chrome.pageAction.show(sender.tab.id);
    }
}
)


// create context menu START
const CONTEXT_MENU_ID = "MY_CONTEXT_MENU";
function getword(info, tab) {
    if (info.menuItemId !== CONTEXT_MENU_ID)
        return;

        chrome.tabs.create({
            url: 'popup.html?company='+ info.selectionText
          });


}
chrome.contextMenus.create({
    title: "IND Checker for : %s",
    contexts: ["selection"],
    id: CONTEXT_MENU_ID
});
chrome.contextMenus.onClicked.addListener(getword)
// create context menu END

