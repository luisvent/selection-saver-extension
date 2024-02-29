export async function getActiveTabURL() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

export async function getSSForUser(userToken, page) {
  const response = await fetch(
    `https://api.lv-apps.com/ss/get?token=${userToken}&page=${page}`,
    {
      method: "POST",
      body: {},
    }
  );

  return await response.json();
}
