const host = "http://ec2-52-14-255-9.us-east-2.compute.amazonaws.com";
chrome.tabs.onActivated.addListener((activeTab) => {
  chrome.tabs.get(activeTab.tabId, (tab) => {
    chrome.storage.local.get(["jwtToken"], (result) => {
      const token = result.jwtToken;
      fetch(`${host}/api/notes/url`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({url: tab.url}),
      })
        .then((response) => {
          console.log(response)
          if (response.status === 400) return []
          return response.json()
        })
        .then((notes) => {
          console.log(notes);
          const noteCount = notes.length;
          chrome.action.setBadgeText({ text: "" + noteCount });
        });
    });
  });
});
