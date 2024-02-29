chrome.runtime.onMessage.addListener((obj, sender, response) => {
  console.log("contentjs");

  console.log(obj);
});

(() => {
  let saveBtn$ = null;
  let cache = "";
  let userToken = null;
  const API_URL = "https://api.lv-apps.com/ss/add";

  const getRandomToken = () => {
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = "";
    for (var i = 0; i < randomPool.length; ++i) {
      hex += randomPool[i].toString(16);
    }
    return hex;
  };

  function postSelection(selection) {
    return fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(selection),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }

  const injectNodes = () => {
    let ssBtnElement = `
    <div class="ss-save-btn">
    <img src="data:image/png;base64,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" />
  </div>
    `;

    let container = document.createElement("div");
    container.id = "ss-container";
    container.innerHTML = ssBtnElement;
    document.body.appendChild(container);

    let head = document.head || document.getElementsByTagName("head")[0];
    let style = document.createElement("style");
    style.id = "ss-styles";
    style.textContent = `
        .ss-save-btn {
            width: 25px;
            height: 25px;
            background-color: #18181b;
            border-radius: 50% 50% 50% 6px;
            position: absolute;
            border: 3px solid #5f5f5f;
            color: gray;
            justify-content: center;
            align-items: center;
            text-align: center;
            cursor: pointer;
            scale: 0;
            transition-duration: 150ms;
            transition-property: scale;
          }
          
          .ss-save-btn.ss-show {
            display: flex !important;
            scale: 1;
            z-index: 99999;
          }
          
          .ss-save-btn img {
            width: 16px;
            pointer-events: none;
          }

          @keyframes intro {
            to {scale: 1}
          }
        `;

    head.appendChild(style);
  };

  const fetchSS = () => {
    return new Promise((resolve) => {
      chrome.storage.sync.get("ss", (obj) => {
        resolve(obj["ss"] ? JSON.parse(obj["ss"]) : []);
      });
    });
  };

  const fetchToken = () => {
    return new Promise((resolve) => {
      chrome.storage.sync.get("token", (obj) => {
        resolve(obj["token"] ? JSON.parse(obj["token"]) : null);
      });
    });
  };

  const saveToken = (token) => {
    chrome.storage.sync.set({
      token: JSON.stringify(token),
    });
  };

  const injectTokenOnPage = () => {
    if (location.href != "https://lv-apps.com/ss") {
      return;
    }

    let tokenMeta = document.createElement("meta");
    tokenMeta.content = userToken;
    tokenMeta.name = "ss-user-token";
    document.head.append(tokenMeta);
  };

  const evaluateToken = async () => {
    let token = await fetchToken();
    console.log("token", token);

    if (token) {
      userToken = token;
    } else {
      userToken = getRandomToken();
      saveToken(userToken);
      console.log(userToken);
    }

    injectTokenOnPage();
  };

  const init = async () => {
    injectNodes();
    evaluateToken();

    saveBtn$ = document.querySelector(".ss-save-btn");
  };

  const getSelection = () => {
    let text = window.getSelection().toString() || "";
    return text;
  };

  const isSelection = () => {
    return window.getSelection().toString().length > 0;
  };

  const processSelection = (event) => {
    const isBtnClick = event.target.classList.contains("ss-save-btn");

    if (!isBtnClick) {
      cache = getSelection();
    }

    if (isSelection() && !isBtnClick) {
      showBtn(event);
    } else {
      hideBtn();
    }
  };

  const hideBtn = () => {
    saveBtn$.classList.remove("ss-show");
  };

  const showBtn = (event) => {
    Object.assign(saveBtn$.style, {
      left: `${event.pageX + 15}px`,
      top: `${event.pageY - 50}px`,
    });

    saveBtn$.classList.add("ss-show");
  };

  const clearCache = () => {
    cache = "";
  };

  const saveSelection = async () => {
    try {
      const saveResponse = await postSelection({
        user: userToken,
        selection: {
          url: window.location.href,
          text: cache,
          timestamp: Date.now(),
        },
      });

      hideBtn();
      clearCache();
    } catch (err) {
      console.error("error saving selections on db", err);
    } finally {
    }
  };

  init();

  document.addEventListener("mouseup", (event) => {
    console.log("mouse up");
    setTimeout(() => {
      processSelection(event);
    }, 10);
  });

  document.addEventListener("mousedown", (event) => {
    const isBtnClick = event.target.classList.contains("ss-save-btn");

    if (!isBtnClick) {
      hideBtn();
    }
  });

  document.addEventListener("keydown", (event) => {
    hideBtn();
  });

  saveBtn$.addEventListener("click", (event) => {
    saveSelection();
  });
})();
