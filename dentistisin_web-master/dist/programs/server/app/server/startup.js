(function(){BrowserPolicy.framing.disallow();
BrowserPolicy.content.disallowInlineScripts();
BrowserPolicy.content.disallowEval();
//BrowserPolicy.content.disallowInlineStyles();
BrowserPolicy.content.allowStyleOrigin('https://fonts.googleapis.com');
BrowserPolicy.content.allowFontOrigin('https://fonts.gstatic.com');
BrowserPolicy.content.allowFontDataUrl('https://fonts.gstatic.com');
BrowserPolicy.content.allowScriptOrigin('https://download.rtccloud.net');
BrowserPolicy.content.allowScriptOrigin('https://static.rtccloud.net');
BrowserPolicy.content.allowMediaOrigin('https://static.rtccloud.net');

Meteor.startup(function () {
	SyncedCron.config({
		log: false,
	});

	SightCall.config({
		ca: Assets.getText(Meteor.settings.sightcall.ca),
		public_cert: Assets.getText(Meteor.settings.sightcall.public_cert),
		private_key: Assets.getText(Meteor.settings.sightcall.private_key),
		cert_pass: Meteor.settings.sightcall.cert_pass,
		client_id: Meteor.settings.sightcall.client_id,client_id: Meteor.settings.sightcall.client_id,
		client_secret: Meteor.settings.sightcall.client_secret
	});

	TrueVault.config({
		vaultId: Meteor.settings.truevault.vaultId,
		kioskGroupId: Meteor.settings.truevault.kioskGroupId,
		dentistGroupId: Meteor.settings.truevault.dentistGroupId,
		taGroupId: Meteor.settings.truevault.taGroupId,
		maGroupId: Meteor.settings.truevault.maGroupId,
		adminKey: Meteor.settings.truevault.adminKey
	});

	SFax.config({
		username: Meteor.settings.sfax.username,
		apiKey: Meteor.settings.sfax.apiKey,
		encryptionKey: Meteor.settings.sfax.encryptionKey,
		initVector: Meteor.settings.sfax.initVector
	});
	SyncedCron.start();
}); 

})();
