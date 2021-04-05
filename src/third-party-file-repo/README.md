# Verse Third-Party File Repository Integration Server Sample

This project acts as the Files server sample of Verse Third-Party Files Repository Integration extension.

## Demo

Below is a demo of this third-party file repository integration sample.

![Demo](./third_party_file_repository_integration.gif)

## Steps To Run This Files Server Sample Locally

### Clone this File server project and run it locally

1. Clone it into your local disk
2. use `npm install` to install all dependencies
3. use `npm start` to start the server

### Register third-party file repository extension in Verse

1. Set up the Verse Developer Chrome extension using these [instructions](https://doc.cwpcollaboration.com/verse-developer/docs/development)
2. Copy the `applications.json` file from this project to `src` folder of the project `verse-developer-chrome-ext` cloned in step 1.
3. Open the `manifest.json` file which is located in the project `verse-developer-chrome-ext` cloned in step 1, add your Verse server url in matches array.

```
  ...

  "content_scripts": [ {
    "js": [ "contentscript.js"],
    "matches": [
      "https://mail.notes.na.collabserv.com/verse*",
      "https://mail.notes.ap.collabserv.com/verse*",
      "https://mail.notes.ce.collabserv.com/verse*",
      // add your Verse server url here similar to the above
    ],
    "run_at": "document_start"
  }],

  ...
```

4. Install above cloned project as Chrome extension.

### Try extension in Verse

1. Launch Verse in Chrome.
2. In Chrome, open a new tab with the Files server sample url https://localhost:3002/, it will show you a blocker `Your connection is not private`. Click `ADVANCED` and then `Proceed to localhost (unsafe)`. This is only need to do for the first time after sample server started.
3. Compose a new message, then you can try the third-party file repository integration feature.
