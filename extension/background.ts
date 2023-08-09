export {};

chrome.omnibox.setDefaultSuggestion({
  description: "Search WayToWebsite for %s",
});

chrome.omnibox.onInputEntered.addListener((text) => {
//   const url = `https://www.com/search?q=${text}`;
//   chrome.tabs.create({ url });

});


// show suggestions

chrome.omnibox.onInputChanged.addListener((text, suggest) => {

    if (!text) {
        return;
    }

    // we need do a api call here

});