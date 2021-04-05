# custom-name-picker-with-organization-tree

This is a sample of custom name picker with organization tree.

There are two methods to add recipient(s) from the name picker.
1. Add a single recipient to whichever of *To*, *Cc* or *Bcc* input fields is currently selected.
    It is introduced in Verse on-Premises 1.0.2 and is available in Verse on-Cloud as well.
    The [vop1.0.2 branch](../../tree/vop1.0.2) illustrates how to create this kind of name picker.
    ![Demo](./OneRecipientDemo.gif)

1. Add recipients to *To*, *Cc* and *Bcc* input fields all together in one action.
    It is introduced in Verse on-Premises 1.0.4 and is available in Verse on-Cloud as well. 
    **This repository illustrates how to create this kind of name picker.**
    ![Demo](./MultipleRecipientsDemo.gif)


## How to run this sample

### Prerequisites

This is a [Nodejs](https://nodejs.org/en/) project. Please make sure that you have installed the latest Nodejs before try this demo.

### Steps

1. Clone this repository
1. Run `npm i` in the root folder of the cloned project
1. Run `npm run server` to start the server
1. Open https://127.0.0.1:8080 in your browser, you should see the sample custom name picker with organization tree UI
1. Use the applications.json under the root folder of the cloned project to register Verse applications. You have several options to register applications into Verse.
    1. If you want to try this sample on your personal client, you can locally register applications through IBM Verse Developer Browser Extension. The tutorial is [here](https://ibmverse.github.io/verse-developer/developers/#get-started).
    1. If you want to register applications for your organization, you need to register it on server. For VoC, you can register it with use of IBM App Registry. Please take the section *"Deploy application on Verse on-Cloud"* of [Registering an Application in IBM Verse](https://ibmverse.github.io/verse-developer/developers/#registering-an-application-in-ibm-verse) as a reference.
1. Check the `originsList` variable in `src/javascripts/index.jsx`, please add your VOP server hostname in it.
1. Login Verse with web browser and make sure you have enabled feature `custom-name-picker`
1. It should be good to try in Verse now !

This sample works with Chrome/Firefox/IE11.

## About the data

The data in this sample is fake. Related codes are in file `/utils.js` and file `/src/javascripts/service/api.js`. You can modify corresponding code logic according to your requirements.

## License

[MIT licensed](./LICENSE)
