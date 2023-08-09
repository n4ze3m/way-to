export {};

chrome.omnibox.setDefaultSuggestion({
  description: "Search WayToWebsite for %s",
});

chrome.omnibox.onInputEntered.addListener((text) => {
  const REDIRECT_URL = `http://to/${text}`;
  chrome.tabs.create({ url: REDIRECT_URL });
});

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  if (!text) {
    return;
  }

  // we need do add a search suggestion api
});
