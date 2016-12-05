"use strict";chrome.app.runtime.onLaunched.addListener(function(e){chrome.power.requestKeepAwake("system"),chrome.app.window.onClosed.addListener(function(){chrome.power.releaseKeepAwake()}),
    chrome.system.display.getInfo(function(d){
      chrome.app.window.create("../index.html", {
        'frame': 'none',
        'id': 'browser',
        'state': 'fullscreen',
        'bounds':{
           'left':0,
           'top':0,
           'width':d[0].bounds.width,
           'height':d[0].bounds.height
        }
      });
    });
  });