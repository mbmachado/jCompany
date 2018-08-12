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
		var settingsSection = $('#settings-section');
		var institutionSection = $('#institution-section');
		var featuredImg = $('.featured-img');
		var institutionText = $('#institution-text');
		var discovery = $('#discovery');
		var tapTarget = $('.tap-target');
		var activeSection = homeSection;
		var activeBtn = homeBtn;
		var cyan = '#4DD0E1';
		var white = '#FFFFFF';
		var transparent = 'rgba(0,0,0,0.4)';

		sidenav.sidenav();
		tapTarget.tapTarget();

		if(window.localStorage.getItem("first-time") == undefined) {
			tapTarget.tapTarget('open');
			window.localStorage.setItem("first-time", 1);
		} else {
			discovery.hide('fast');
		}

		homeBtn.on('click', function(event) {
			event.preventDefault();
			activeSection.hide('0');
			activeBtn.attr('class', '');
			homeBtn.attr('class', 'active');
			homeSection.show('0');
			activeSection = homeSection;
			activeBtn = homeBtn;

			sidenav.sidenav('close');
			body.animate({backgroundColor: white}, 500);
			navbar.animate({backgroundColor: white}, 0);
			hbBtn.animate({color: cyan}, 0);
			navLogo.css('display', 'block');
		});
		settingsBtn.on('click', function(event) {
			event.preventDefault();
			activeSection.hide('0');
			activeBtn.attr('class', '');
			settingsBtn.attr('class', 'active');
			settingsSection.show('0');
			activeSection = settingsSection;
			activeBtn = settingsBtn;

			sidenav.sidenav('close');
			body.animate({backgroundColor: cyan}, 500);
			navbar.animate({backgroundColor: white}, 0);
			hbBtn.animate({color: cyan}, 0);
			navLogo.css('display', 'block');
		});
		institutionBtn.on('click', function(event) {
			event.preventDefault();
			activeSection.hide('0');
			activeBtn.attr('class', '');
			institutionBtn.attr('class', 'active');
			institutionSection.show('0');
			activeSection = institutionSection;
			activeBtn = institutionBtn;

			sidenav.sidenav('close');
			body.animate({backgroundColor: white}, 500);
			navbar.animate({backgroundColor: transparent}, 500);
			hbBtn.animate({color: white}, 0);
			navLogo.css('display', 'none');
		});
	}
};

app.initialize();
