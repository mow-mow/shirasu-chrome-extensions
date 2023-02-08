chrome.tabs.onActivated.addListener(function(tabId){
    chrome.tabs.query({"active": true}, function (tab) {
        shirasuContextMenuVisible(tab[0].url);
    });
});

chrome.tabs.onUpdated.addListener(function(id,info,tab){
    if(tab.active){
        shirasuContextMenuVisible(tab.url);
    }
});


chrome.runtime.onInstalled.addListener(function (details) {
chrome.contextMenus.create({
    id: "shirasu-download",
    title: "Import Pixiv images into Eagle",
    contexts: ["all"]
})
});

function shirasuContextMenuVisible(url) {
    console.log("active tab:" + url);
    if (url.indexOf("https://www.pixiv.net/artworks/") != -1) {
        chrome.contextMenus.update("shirasu-download", {
            visible: true
        });
        console.log("shirasu menu active");
    } else {
        chrome.contextMenus.update("shirasu-download", {
            visible: false
        });
        console.log("shirasu menu inactive");
    }
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "shirasu-download":
            chrome.tabs.sendMessage(tab.id, null, (receive) => {
            console.log(receive.title);
            id = tab.url.replace("https://www.pixiv.net/artworks/","");
            console.log(id);
            sendShirasuApi(id, receive);
        });
        break;
    }
});

function sendShirasuApi(id, param) {
    const parameter = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(param)
    }
    console.log(parameter);
    const result = fetch('http://localhost:8888/artwork/' + id, parameter).then((response) => {
        console.log(response);
        return response.json();
    });
}