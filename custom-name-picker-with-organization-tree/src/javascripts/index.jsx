import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {Provider} from 'react-redux';
import reducer from './reducers/root';
import NamePicker from './components/NamePicker';
import {fetchOrg} from './actions/actions';
import _ from 'lodash';
import '../stylesheets/index.less';

import { addLocaleData, IntlProvider } from 'react-intl';
import zh from 'react-intl/locale-data/zh';
addLocaleData([...zh]);

import 'whatwg-fetch';

const loggerMiddleware = createLogger();
var store = createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
store.dispatch(fetchOrg());

var verse = null;
var verseOrigin = null;

function sendRecipientsToVerse() {
  if(!verse || !verseOrigin) {
    return;
  }

  var state = store.getState();
  const adapter = (recipient) => {
    return {
      userEmail: recipient.email,
      userName: recipient.name
    };
  };

  var message = {
    verseApiType: "com.ibm.verse.add.contact",
    recipientTo: _.values(state.recipient.to).map(adapter),
    recipientCC: _.values(state.recipient.cc).map(adapter),
    recipientBcc: _.values(state.recipient.bcc).map(adapter)
  }
  verse.postMessage(message, verseOrigin);
}

const locale = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;
const languageWithoutRegionCode = locale.toLowerCase().split(/[_-]+/)[0];

fetch(`/messages/${languageWithoutRegionCode}.json`).then(res => res.json()).then(
  (localeData) => {
    ReactDOM.render(
      <IntlProvider locale={locale} messages={localeData}>
        <Provider store={store}>
          <NamePicker onOkBtnClick={sendRecipientsToVerse}></NamePicker>
        </Provider>
      </IntlProvider>,
      document.getElementById('root')
    );
  }
).catch(error => {
  console.error(error);
  //render with default language if failed to get translated messages
  ReactDOM.render(
    <IntlProvider>
      <Provider store={store}>
        <NamePicker onOkBtnClick={sendRecipientsToVerse}></NamePicker>
      </Provider>
    </IntlProvider>,
    document.getElementById('root')
  );
});

var originsList = [
  "https://mail.notes.collabservintegration.com",
  "https://mail.notes.na.collabserv.com",
  "https://mail.notes.ap.collabserv.com",
  "https://mail.notes.ce.collabserv.com"
];

window.addEventListener('message', function(event) {
  if (originsList.indexOf(event.origin) < 0) {
    return;
  }

  var eventData = event.data;

  /**
   * Message from Verse to check whether your web application is ready.
   */
  if (eventData.verseApiType === 'com.ibm.verse.ping.application.loaded') {
    var loaded_message = {
      verseApiType: 'com.ibm.verse.application.loaded'
    };
    /**
     * Your application must send a message back to Verse
     * to identify that it's ready to receive data from Verse.
     */
    event.source.postMessage(loaded_message, event.origin);

    verse = event.source;
    verseOrigin = event.origin;
  }
}, false);
