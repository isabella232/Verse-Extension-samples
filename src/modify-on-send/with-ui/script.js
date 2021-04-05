(function() {
  'use strict';

  // List of email classifications
  const classifications = {
    protected: 'PROTECTED',
    private: 'PRIVATE',
    classified: 'CLASSIFIED',
    secret: 'SECRET',
    invalid: 'This option is not a valid classification.',
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

  const classify = (modifiedSubject, classification, event) => {
    var response_message = {
        verseApiType: 'com.ibm.verse.message.modify.mail',
        modifiedContext: {
          subject: modifiedSubject,
          signature: `${classification} ModifyOnSend can add new line!`
        }
      };
      event.source.postMessage(response_message, event.origin);
  }

  const continueSending = (event) => {
    var response_message = {
        verseApiType: 'com.ibm.verse.message.continue.send'
      };
      event.source.postMessage(response_message, event.origin);
  }

  /*
   * @param {String} Mail Compose data context object
   * @param {String} event
   */
  function shouldModify(context, event) {
    const modifyOnSendText = "MODIFYONSEND";
    const shouldModify = !context.subject.includes(modifyOnSendText);

    // If subject does not contain MODIFYONSEND then display UI
    if (shouldModify) {
      const list = document.querySelector('#mos-list');
      const header = document.querySelector('#header').innerText = "Please Select from the Following Classifications:"
      Object.keys(classifications).forEach((key) => {
        const listItem = document.createElement('li');
        listItem.appendChild(document.createTextNode(classifications[key]));
        listItem.addEventListener('click', () => {
          const classification = `[${classifications[key]}]`
          const modifiedSubject = `${classification} ${context.subject}`;
          classify(modifiedSubject, classification, event);
        });
        list.appendChild(listItem);
      })
      const button = document.createElement('button');
      button.innerText = "Make No Changes"
      button.addEventListener('click', () => { continueSending(event); });
      document.querySelector('body').appendChild(button);
    } else {
      // Otherwise, continue sending
      continueSending(event);
    }
  }

})();
