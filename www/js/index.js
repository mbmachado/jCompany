var app = {
  
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

	onDeviceReady: function() {
		$('.sidenav').sidenav();
	}
};

app.initialize();
