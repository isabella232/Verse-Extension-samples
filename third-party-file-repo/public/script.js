window.onload = function () {
  var verseWindow;
  var verseOrigin;

  // Add message listeners
  // The extension must reply 'com.ibm.verse.ping.application.loaded' message sent from Verse as below,
  // to tell Verse the extension is loaded
  window.addEventListener('message', function(evt) {
    var verseApiType = evt && evt.data && evt.data.verseApiType;
    if (verseApiType === 'com.ibm.verse.ping.application.loaded') {
      verseWindow = evt.source;
      verseOrigin = evt.origin;
      verseWindow.postMessage({
        verseApiType: 'com.ibm.verse.application.loaded'
      }, verseOrigin);
    }
  }, false);

  /**
   * Construct a link object
   * @param {DOMElement} box - a checkbox
   * @return {Object} File link object in format
   * {
   *   url, {String} The target url to open a file link
   *   name {String} Used as the display text of a link
   * }
   */
  var constructLinkData = function(box) {
    return {
      url: box.value,
      name: box && box.dataset && box.dataset.name || box.value
    };
  };

  // add click listener for choose button
  var btnChoose = document.getElementById('btn-choose');
  btnChoose && btnChoose.addEventListener('click', function() {
    var selected = [];
    Array.prototype.forEach.call(document.querySelectorAll('.file-box'), function(box) {
      if (box.checked) {
        selected.push(constructLinkData(box));
      }
    });
    // below code is how to send message from third-party file repository to Verse to insert file link(s)
    var msg = {
      verseApiType: 'com.ibm.verse.ext.file.add.links',
      links: selected,
      closeWindow: true
    };
    if (verseWindow && verseOrigin) {
      verseWindow.postMessage(msg, verseOrigin);
    } else if (window.top && window.top.opener) {
      window.top.opener.postMessage(msg, '*');
    } else {
      console.error('Do not know which window that the message should be sent to');
    }
  });
};
