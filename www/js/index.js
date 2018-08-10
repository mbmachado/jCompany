var app = {
  
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

	onDeviceReady: function() {
		var sidenav = $('.sidenav');
		var tapTarget = $('.tap-target');
		var discovery = $('#discovery');

		sidenav.sidenav();
		tapTarget.tapTarget();

		if(window.localStorage.getItem("first-time") == undefined) {
			tapTarget.tapTarget('open');
			window.localStorage.setItem("first-time", 1);
		} else {
			discovery.hide('fast');
		}
	}
};

app.initialize();
