Package.describe({
  name: "rocketchat:accounts-rocketchat",
  summary: "Login service for Rocket.Chat accounts",
  version: "1.0.0"
});

Package.onUse(function (api) {
  api.use(['underscore', 'random']);
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
  api.use(['underscore', 'service-configuration'], ['client', 'server']);
  api.use(['random', 'templating'], 'client');
  api.use('accounts-base', ['client', 'server']);

  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);

  // api.export('RocketChat');

  api.addFiles("rocketchat.js");
  api.addFiles(['rocketchat_configure.html', 'rocketchat_configure.js', 'rocketchat-login-button.css'], 'client');
  api.addFiles('rocketchat_server.js', 'server');
  api.addFiles('rocketchat_client.js', 'client');
});
