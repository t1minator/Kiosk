chrome.app.runtime.onLaunched.addListener(init);
chrome.app.runtime.onRestarted.addListener(init);

function init() {
  var win, data;

  //don't let computer sleep
  chrome.power.requestKeepAwake("display");

  chrome.storage.local.get(['url','host','port','username','password'],function(d){
    data = d;
    if(('url' in data)){
      //setup has been completed
      if(data['host'] && data['port']){
        startWebserver(data['host'],data['port'],'www');
      }
      openWindow("../index.html");
    }else{
      //need to run setup
      openWindow("../index.html");
    }
  });

  function openWindow(path){
    if(win) win.close();
    chrome.system.display.getInfo(function(d){
      chrome.app.window.create(path, {
        'frame': 'none',
        'id': 'browser',
        'state': 'fullscreen',
        'bounds':{
           'left':0,
           'top':0,
           'width':d[0].bounds.width,
           'height':d[0].bounds.height
        }
      },function(w){
        win = w;
        win.fullscreen();
        setTimeout(function(){
          win.fullscreen();
        },1000);
      });
    });
  }
}