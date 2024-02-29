import "./style.css";
import { getSSForUser } from "./public/utils.js";

let list$ = document.querySelector("#ss-list");
let loading$ = document.querySelector("#loading");
let userToken = null;
let noMoreSelections = false;
let page = 1;

const fetchToken = () => {
  return new Promise((resolve) => {
    chrome.storage.sync.get("token", (obj) => {
      resolve(obj["token"] ? JSON.parse(obj["token"]) : null);
    });
  });
};

const noSelectionsToShow = () => {
  const empty = document.createElement("div");
  empty.className = "empty-selections";
  empty.innerHTML = "No selections saved";
  list$.appendChild(empty);
  loading$.hidden = true;
};

const addSelectionsToList = (selections) => {
  if (selections.length == 0) {
    noSelectionsToShow();
  }

  for (let i = 0; i < selections.length; i++) {
    let selection = selections[i];
    console.log(selection);
    const li = document.createElement("li");
    const copy = document.createElement("div");
    copy.className = "copy-btn";
    const textDiv = document.createElement("div");
    textDiv.className = "selection-text";
    const urlDiv = document.createElement("div");
    urlDiv.className = "selection-url";

    textDiv.innerHTML = selection.text;
    urlDiv.innerHTML = selection.url;

    copy.addEventListener("click", () => {
      navigator.clipboard.writeText(selection.text);
    });

    li.append(textDiv);
    li.append(urlDiv);
    li.append(copy);
    list$.appendChild(li);
  }

  loading$.hidden = true;
};

const loadSelections = async () => {
  console.log("noMoreSelections", noMoreSelections);
  loading$.hidden = false;
  userToken = await fetchToken();
  const selectionsSaved = await getSSForUser(userToken, page);
  page++;

  console.log("selectionsSaved", selectionsSaved);

  if (selectionsSaved.data) {
    noMoreSelections = selectionsSaved.data.length < 15;
    addSelectionsToList(selectionsSaved.data);
  } else {
    noMoreSelections = true;
    noSelectionsToShow();
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  loadSelections();
  console.log("dom loaded");
});

list$.addEventListener(
  "scroll",
  () => {
    const { scrollTop, scrollHeight, clientHeight } = list$;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      if (!noMoreSelections) {
        loadSelections();
      }
    }
  },
  {
    passive: true,
  }
);
