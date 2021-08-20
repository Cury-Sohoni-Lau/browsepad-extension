//const tokenExpiration = 60 * 60 * 1000;
const tokenExpiration = 15 * 1000;

const logout = () => {
  chrome.storage.local.remove(["jwtToken"], () => {
    console.log("removing the JWT token");
  });
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.loggedIn) setTimeout(() => logout(), tokenExpiration);
});
