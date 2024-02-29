# Selection Saver API
Backend api to save users selections

## Endpoints

- **/get : POST**: Receives a `token` parameter with the user id and returns a list of selections object and `page`, each page return 15 items
```js

fetch('http://...api?token=<user-id>&page=1')

```
- **/add : POST**: Receives a object with `user` for user token and `selection` object for selection to save
```js

fetch('http://...api/', {
      method: "POST",
      body: JSON.stringify({
        user: '<user-id>'
        selection: {
            url: 'http://...',
            text: '<text-to-save>',
            timestamp: 123456789
        }
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

```

## Prerequisites

Before getting started, ensure you have the following installed:

- Node.js and npm
- MongoDB

## Object

```js

{
    user: 'string',
    selections: [
        {
            url: 'string',
            text: 'string',
            timestamp: number
        }
    ]
}

```


## Installation

1. Clone this repository:

```bash
git clone https://github.com/luisvent/selection-saver-extension.git
```

2. Navigate to API:

```bash
cd api/
```

3. Install dependencies:

```bash
npm install
```

3. Run project:

```bash
npm start
```
