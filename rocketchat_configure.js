Template.configureLoginServiceDialogForRocketchat.helpers({
  siteUrl: function () {
    return Meteor.absoluteUrl();
  },
  server: function() {
    var config = ServiceConfiguration.configurations.findOne({service: 'rocketchat'});
  	return config && config.server;
  }
});

Template.configureLoginServiceDialogForRocketchat.fields = function () {
  return [
    {property: 'clientId', label: 'App ID'},
    {property: 'secret', label: 'App secret'},
    {property: 'server', label: 'Server'}
  ];
};
