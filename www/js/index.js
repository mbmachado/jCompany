var app = {
  
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

	onDeviceReady: function() {
		var body = $('#app-body');
		var navbar = $('#app-navbar');
		var navLogo = $('.nav-wrapper > a:first-child');
		var hbBtn = $('#hb-btn');
		var sidenav = $('.sidenav');
		var homeBtn = $('#home-btn');
		var settingsBtn = $('#settings-btn');
		var institutionBtn = $('#institution-btn');
		var mainContent = $('#main-content');
		var homeSection = $('#home-section');
		var appFrame = $('#app-frame');
		var progressBar = $('#home-section .progress');
		var settingsSection = $('#settings-section');
		var appForm = $('#app-form');
		var institutionSection = $('#institution-section');
		var featuredImg = $('.featured-img');
		var institutionText = $('#institution-text');
		var discovery = $('#discovery');
		var discoveryTrigger = $('#discovery-trigger');
		var tapTarget = $('.tap-target');
		var activeSection = homeSection;
		var activeBtn = homeBtn;
		var cyan = '#4DD0E1';
		var white = '#FFF';
		var transparent = 'rgba(0,0,0,0.4)';

		sidenav.sidenav();
		tapTarget.tapTarget();

		if(window.localStorage.getItem("first-time") == undefined) {
			tapTarget.tapTarget('open');
			window.localStorage.setItem("first-time", 1);
		} else {
			discovery.hide('fast');
		}

		if(navigator.connection.type == Connection.NONE) {
			var count = 1;
			appFrame.css('display', 'none');
			var tryingToReconnect = setInterval(function() { 
				if(navigator.connection.type != Connection.NONE) {
					appFrame.src = appFrame.src;
					appFrame.css('display', 'block');
					clearInterval(tryToReconnect);
				} else {
					navigator.notification.alert('Tentando reconectar ('+(count++)+')...', function(){}, 'Sem conexão', 'Ok');
				}
			}, 15000);
		}

		homeBtn.on('click', function(event) {
			event.preventDefault();
			activeSection.css('display', 'none');
			activeBtn.attr('class', '');
			homeBtn.attr('class', 'active');
			homeSection.css('display', 'block');
			activeSection = homeSection;
			activeBtn = homeBtn;

			sidenav.sidenav('close');
			body.animate({backgroundColor: white}, 600);
			navbar.animate({backgroundColor: white}, 600);
			hbBtn.animate({color: cyan}, 0);
			navLogo.css('display', 'block');
			StatusBar.backgroundColorByHexString("#bdbdbd");
		});
		settingsBtn.on('click', function(event) {
			event.preventDefault();
			activeSection.css('display', 'none');
			activeBtn.attr('class', '');
			settingsBtn.attr('class', 'active');
			settingsSection.css('display', 'block');
			activeSection = settingsSection;
			activeBtn = settingsBtn;

			sidenav.sidenav('close');
			body.animate({backgroundColor: cyan}, 600);
			navbar.animate({backgroundColor: white}, 600);
			hbBtn.animate({color: cyan}, 0);
			navLogo.css('display', 'block');
			StatusBar.backgroundColorByHexString("#bdbdbd");
		});
		institutionBtn.on('click', function(event) {
			event.preventDefault();
			activeSection.css('display', 'none');
			activeBtn.attr('class', '');
			institutionBtn.attr('class', 'active');
			institutionSection.css('display', 'block');
			activeSection = institutionSection;
			activeBtn = institutionBtn;

			sidenav.sidenav('close');
			body.animate({backgroundColor: white}, 600);
			navbar.animate({backgroundColor: transparent}, 600);
			hbBtn.animate({color: white}, 0);
			navLogo.css('display', 'none');
			StatusBar.backgroundColorByHexString("#000");
		});

		discoveryTrigger.on('click', function(event) {
			event.preventDefault();
			settingsBtn.trigger("click");
		});

		appForm.on('submit', function(event) {
			event.preventDefault();
			navigator.notification.alert('Função em desenvolvimento', function(){}, 'Em breve', 'Ok');
		});

		appFrame.on('load', function(event) {
			event.preventDefault();
			progressBar.css('display', 'none');
		});		
	}
};

app.initialize();