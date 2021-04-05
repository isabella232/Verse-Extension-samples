// Add event handlers for select boxes and call the API to load new people
function addEventHandler(elem, eventType, handler) {
  if (elem.addEventListener) {
    elem.addEventListener (eventType, handler, false);
  } else if (elem.attachEvent) {
    elem.attachEvent ('on' + eventType, handler);
  }
}

var evt = '';
var originsList = [
  "https://mail.notes.na.collabserv.com",
  "https://mail.notes.ap.collabserv.com",
  "https://mail.notes.ce.collabserv.com"
];

(function() {
  window.addEventListener('message', function(event) {
    if (!isValidOrigin(event.origin)) {
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
      evt = event;
    }
  }, false);
})();

/** Verify we are listening to the right origin
 * @param {String} currentOrigin - The url which we should listen to
 * @return {Boolean} true if the origin is valid, false otherwise
 */
function isValidOrigin(currentOrigin) {
  return (originsList.indexOf(currentOrigin) >= 0);
}

window.CustomNamePicker_AdvancedSearch = {

  // initialize
  init: function() {
    // focus to name field
    this.focus(document.getElementById('e-search-name-text'));
  },

  // Summary/Detail button
  expand: function() {
    var oElem = document.getElementById('e-name-picker');
    if (!oElem) {
      return;
    }
    var fExpand = oElem.className == 's-namepicker-collapse';
    oElem.className = fExpand? 's-namepicker-expand': 's-namepicker-collapse';
    // focus name or title field
    this.focus(document.getElementById(fExpand? 'e-search-title-text': 'e-search-name-text'));
  },

  // focus to input
  focus: function(oElem) {
    if (!oElem) {
      return;
    }
    try {
      oElem.focus();
    } catch (e) {
    }
  },

  // search users
  search: function() {
    // generate search patameter
    var oParams = {};
    var fHasValue = false;
    for (var s in {'name':void 0, 'jobtitle':void 0, 'department':void 0, 'location':void 0, 'internetaddress':void 0}) {
      var oElem = document.getElementById('e-search-' + s + '-text');
      if (oElem) {
        oParams[s] = oElem.value;
        fHasValue |= !!oElem.value;
      }
    }
    // clear name cards
    if (this.aoEntries && this.aoEntries.length) {
      for (var i=0; i<this.aoEntries.length; i++) {
        var oElem = document.getElementById('e-search-result-' + i);
        if (oElem)
          oElem.parentNode.removeChild(oElem);
      }
      this.aoEntries = void 0;
    }
    // retrieve data from server
    if (!fHasValue) {
      return;
    }
    CustomNamePicker_AdvancedSearch_findUsers.load(oParams, this);
  },

  // show result
  draw: function(aoEntries) {
    // load template of name card
    if (!this.sTemplate) {
      var oElem = document.getElementById('e-search-result-template');
      if (oElem) {
        this.sTemplate = oElem.innerHTML;
        oElem.parentNode.removeChild(oElem);
      }
      if (!this.sTemplate) {
        return;
      }
    }
    // show name cards
    for (var i=0; i<aoEntries.length; i++) {
      var oEntry = aoEntries[i];
      // generate name card
      var oDiv = document.createElement('div');
      oDiv.innerHTML = this.sTemplate.replace(/\$\{ID\}/g, '' + i).replace('${DISPLAY_NAME}', oEntry.displayName || oEntry.name).replace('${PHONETIC_NAME}', oEntry.phoneticName ? ('('+oEntry.phoneticName+')'): '').replace('${EMAIL_ADDRESS}', oEntry.email).replace('${JOBTITLE}', oEntry.jobtitle).replace('${DEPARTMENT}', oEntry.department).replace('${LOCATION}', oEntry.location);

      // adjust position
      oDiv.firstChild.className = 's-search-result-entry-' + (i%2? 'right': 'left');
      oDiv.firstChild.style.top = (100 * Math.floor(i/2)) + 'px';

      // show it
      var oResult = document.getElementById('e-search-result');
      oResult.appendChild(oDiv.firstChild);
    }
    this.aoEntries = aoEntries;
  },

  // send selected name to Verse
  add: function(nNum) {
    if (!this.aoEntries || !this.aoEntries[nNum]) {
      return;
    }
    var userEmail = this.aoEntries[nNum].email;
    var userName = this.aoEntries[nNum].displayName;
    var emails_message = {
      verseApiType: 'com.ibm.verse.add.contact',
      userEmail: userEmail,
      userName: userName
    };
    evt.source.postMessage(emails_message, evt.origin);
  }
};

window.CustomNamePicker_AdvancedSearch.init();
