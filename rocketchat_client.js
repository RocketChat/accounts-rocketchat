RocketChat = {};

// Request Rocket.Chat credentials for the user
//
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
RocketChat.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'rocketchat'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(
      new ServiceConfiguration.ConfigError());
    return;
  }

  if (!config.loginStyle) {
    config.loginStyle = 'popup';
  }

  var credentialToken = Random.secret();
  var loginStyle = OAuth._loginStyle('rocketchat', config, options);

  var loginUrl =
        config.server +
        "/oauth/authorize?" +
        "client_id=" + config.clientId +
        "&state=" + OAuth._stateParam(loginStyle, credentialToken, options && options.redirectUrl) +
        "&redirect_uri=" + OAuth._redirectUri('rocketchat', config);

  launchLogin = {
    loginService: "rocketchat",
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken,
    popupOptions: {width: 620, height: 650}
  };

  OAuth.launchLogin(launchLogin);
};
