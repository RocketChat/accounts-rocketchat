Accounts.oauth.registerService("rocketchat");

if (Meteor.isClient) {
  Meteor.loginWithRocketchat = function (options, callback) {
    // support a callback without options
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    RocketChat.requestCredential(options, credentialRequestCompleteCallback);
  };
} else {
  Accounts.addAutopublishFields({
    // publish all fields including access token, which can legitimately be used
    // from the client (if transmitted over ssl or on localhost).
    forLoggedInUser: ['services.rocketchat'],
    forOtherUsers: [
      'services.rocketchat.id',
      'services.rocketchat.username'
    ]
  });
}
