window.CustomNamePicker_AdvancedSearch_findUsers = {

  // database path and view name to search users
  sDbPath: 'names.nsf',
  sViewName: '($CustomNamePicker_Search)',

  // retrive data from server
  load: function(oParams, oPicker) {
    // store params
    this.oParams = oParams;
    this.oPicker = oPicker;
    
    this.loadHash();
  },

  // retrieve directory info
  loadHash: function() {
    if(!this.sHash) {
      // generate url
      var sUrl = '/iNotes/forms9.nsf/iNotes/Proxy?OpenDocument&Form=s_DirectoryInfo';
      this.oHttpRequest = new XMLHttpRequest;
      var _this = this;
      this.oHttpRequest.onreadystatechange = function(){_this.processHash()};
      this.oHttpRequest.open('GET', sUrl, true);
      this.oHttpRequest.send('');
    } else {
      this.loadUsers();
    }
  },

  // get hash string in XML response
  processHash: function() {
    if (this.oHttpRequest.readyState != 4) {
      return;
    }
    var oNode;

    // check XML reponse
    try {
      if (this.oHttpRequest.getResponseHeader('Content-Type').indexOf('text/xml') != 0) {
        return;
      }
      oNode = this.oHttpRequest.responseXML.documentElement;
    } catch (e) {
      alert('Error encountered retrieving directory info');
      return;
    }
    
    // get hash string for directory
    if(oNode) {
      var oDirectories = this.selectNodes(oNode, '/directoryinfo/directorylistext/directories/directory');
      for(var i=0;i<oDirectories.length;i++) {
        var oPath = this.selectNode(oDirectories[i], "directorydata[@name='Path']");
        if(oPath && this.getText(oPath)==this.sDbPath) {
          var oHash = this.selectNode(oDirectories[i], "directorydata[@name='DirHash']");
          if(oHash) {
            this.sHash = this.getText(oHash);
            break;
          }
        }
      }
    }
    if(this.sHash) {
      this.loadUsers();
    } else {
      alert('No hash string for ' + this.sDbPath + ' retrieved');
    }
  },

  // find users
  loadUsers: function() {
    // filter by person
    var aParams = ['FIELD%20TYPE%20CONTAINS("Person")'];
    for(var name in this.oParams) {
      var sParam = this.oParams[name];
      if(sParam) {
        // add * for partial match
        if(!sParam.match(/[\u0700-\uFFFF\u00A0]/g))
          sParam = '*' + sParam + '*';

        // find name in primary name, alternate name, phonetic name
        if(name=='name')
          aParams.push('('
          + 'FIELD%20FULLNAME%20CONTAINS("' + encodeURIComponent(sParam) + '")%20OR%20'
          + 'FIELD%20ALTFULLNAME%20CONTAINS("' + encodeURIComponent(sParam) + '")%20OR%20'
          + 'FIELD%20ALTFULLNAMESORT%20CONTAINS("' + encodeURIComponent(sParam) + '")'
          + ')');
        else
          aParams.push('FIELD%20' + name + '%20CONTAINS("' + encodeURIComponent(sParam) + '")');
      }
    }
    // generate url
    var sUrl = '/iNotes/forms9.nsf/iNotes/Proxy?OpenDocument&Form=s_ReadDirEntries&Presetfields=FolderName;' + this.sViewName + ',DirHash;' + this.sHash + ',SearchString;' + aParams.join('%20AND%20') + '&start=1&count=100';
    this.oHttpRequest = new XMLHttpRequest;
    var _this = this;
    this.oHttpRequest.onreadystatechange = function(){_this.processUsers()};
    this.oHttpRequest.open('GET', sUrl, true);
    this.oHttpRequest.send('');
  },

  // get user data in XML response
  processUsers: function() {
    if (this.oHttpRequest.readyState != 4) {
      return;
    }
    var oNode;

    // check XML response
    try {
      if (this.oHttpRequest.getResponseHeader('Content-Type').indexOf('text/xml') != 0) {
        return;
      }
      oNode = this.oHttpRequest.responseXML.documentElement;
    } catch (e) {
      alert('Error encountered retrieving user data');
      return;
    }
    
    // generate data for each name card
    if(oNode) {
      var oViewEntries = this.selectNodes(oNode, '/viewentries/viewentry');
      var aoEntries = [];
      for(var i=0;i<oViewEntries.length;i++) {
        var oViewEntry = oViewEntries[i];
        aoEntries.push({
          // primary name
          name:this.abbreviateName(this.getText(this.selectNode(oViewEntry, "entrydata[@name='MAMailAddress']"))),
          // alternate name
          displayName:this.abbreviateName(this.getText(this.selectNode(oViewEntry, "entrydata[@name='AltFullName']"))),
          // phonetic name
          phoneticName:this.getText(this.selectNode(oViewEntry, "entrydata[@name='AltFullNameSort']")),
          // job title
          jobtitle:this.getText(this.selectNode(oViewEntry, "entrydata[@name='JobTitle']")),
          // department
          department:this.getText(this.selectNode(oViewEntry, "entrydata[@name='Department']")),
          // location
          location:this.getText(this.selectNode(oViewEntry, "entrydata[@name='Location']")),
          // address
          email:this.getText(this.selectNode(oViewEntry, "entrydata[@name='InternetAddress']")),
        });
      }
      // draw name cards
      if (this.oPicker && this.oPicker.draw) {
        this.oPicker.draw(aoEntries);
        this.oPicker = void 0;
      }
    }
  },

  // misc XML functions
  oXE: new XPathEvaluator(),

  selectNodes: function (oNode, sPat){
    var oXPathResult = this.oXE.evaluate(sPat, oNode, this.oXE.createNSResolver(oNode), 7, null);
    var aNodes = [];
    for (var i = 0; i < oXPathResult.snapshotLength; i++) {
      aNodes[i] = oXPathResult.snapshotItem(i);
    }
    return aNodes;
  },

  selectNode: function (oNode, sPat){
    var oXPathResult = this.oXE.evaluate(sPat, oNode, this.oXE.createNSResolver(oNode), 9, null);
    return (oXPathResult ? oXPathResult.singleNodeValue : null);
  },

  getText: function (oNode){
    if(!oNode) {
      return 'No column';
    }
    
    var aoNodes = this.selectNodes(oNode, 'descendant::text()');
    var aoText = [];
    for(var i=0;i<aoNodes.length;i++) {
      if(aoNodes[i].nodeValue && aoNodes[i].nodeValue!='\n') {
        aoText.push(aoNodes[i].nodeValue);
      }
    }
    return aoText.join('');
  },

  abbreviateName: function(sName){
    return (sName||'').replace('CN=','').replace('/OU=','/').replace('/O=','/');
  }
};
