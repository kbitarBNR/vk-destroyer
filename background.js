let active = true;

function toggleContentScript() {
  active = !active;
  if (active) {
    chrome.action.setIcon({ path: "images/icon-48.png" });
  } else {
    chrome.action.setIcon({ path: "images/icon-48-inactive.png" });
  }
}

chrome.action.onClicked.addListener(toggleContentScript);

// Set the initial icon based on the initial state
chrome.action.setIcon({ path: active ? "images/icon-48.png" : "images/icon-48-inactive.png" });
