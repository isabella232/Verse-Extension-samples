(function() {
  'use strict';

  const classifications = {
    protected: 'PROTECTED',
    private: 'PRIVATE',
    classified: 'CLASSIFIED',
    secret: 'SECRET',
  }

  window.addEventListener('message', function(event) {
    // Add check for the event origin here
    if(event.data) {
      if (event.data.verseApiType === 'com.ibm.verse.ping.application.loaded') {
        var loaded_message = {
          verseApiType: 'com.ibm.verse.application.loaded'
        };
        event.source.postMessage(loaded_message, event.origin);
      } else if (event.data.verseApiType === 'com.ibm.verse.action.clicked') {
        if(event.data.verseApiData.context) {
          console.log("CONTEXT DATA: ", event.data.verseApiData.context)
          shouldModify(event.data.verseApiData.context, event);
        } else {
          console.warn('No context data retrieved from Verse');
        }
      }
    } else {
      console.warn('No data retrieved from Verse');
    }
  }, false);

  /*
   * @param {String} Mail Compose data context object
   * @param {String} event
   */
  function shouldModify(context, event) {
    const modifyOnSendText = "MODIFYONSEND";
    const shouldModify = !context.subject.includes(modifyOnSendText);
    if (shouldModify) {
      var response_message = {
        verseApiType: 'com.ibm.verse.message.modify.mail',
        modifiedContext: {
          subject: `[MODIFIED SUBJECT] ${context.subject}`,
          signature: "ModifyOnSend Can Add New Line"
        }
      };
      event.source.postMessage(response_message, event.origin);
    } else {
      var response_message = {
        verseApiType: 'com.ibm.verse.message.continue.send'
      };
      event.source.postMessage(response_message, event.origin);
    }
  }
})();
