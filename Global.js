function settingChanged(event) {
  if (event.key == "newTabDefault") {
    var newTabDefault = event.newValue;
    for (var i = 0; i < safari.application.browserWindows.length; i++) {
      var browserWindow = safari.application.browserWindows[i];
      for (var j = 0; j < browserWindow.tabs.length; j++) {
        var page = browserWindow.tabs[j].page;
        if (page) {
          page.dispatchMessage("settingValue", newTabDefault);
        }
      }
    }
  }
}

function getSettingValue(event) {
  if (event.name == "getSettingValue") {
    if (event.message == "newTabDefault") {
      var newTabDefault = safari.extension.settings.newTabDefault;
      event.target.page.dispatchMessage("settingValue", newTabDefault);
    }
  }
}

safari.extension.settings.addEventListener("change", settingChanged, false);
safari.application.addEventListener("message", getSettingValue, false);
