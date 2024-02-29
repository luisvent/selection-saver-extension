export async function getActiveTabURL() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

export async function getSSForUser(userToken, page) {
  // const response = await fetch(
  //   `http://localhost:3910?token=${userToken}&page=${page}`
  // );

  console.log("user", userToken);
  console.log("page", page);

  const response = await fetch(
    `https://api.lv-apps.com/ss/get?token=${userToken}&page=${page}`,
    {
      method: "POST",
      body: {},
    }
  );

  return await response.json();
}
