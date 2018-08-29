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
		var appInput = $('#url-input')
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
		var offlineConfirmation = false;

		appBegin();

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

			var url = window.localStorage.getItem("url");
		    appInput.val(url.substring(7)).focus();
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
			discovery.css('display', 'none');
			settingsBtn.trigger("click");
		});

		appForm.on('submit', function(event) {
			event.preventDefault();
			localStorage();
		});

		appFrame.on('load', function(event) {
			event.preventDefault();
			progressBar.css('display', 'none');
		});

		document.addEventListener("offline", onOffline, false);
		document.addEventListener("online", onOnline, false);

		function onOffline() {
			var count = 1;
			appFrame.css('display', 'none');
			progressBar.css('display', 'block');
			if (!offlineConfirmation) {
				navigator.notification.alert('Tentando reconectar ('+(count++)+')...', offlineConfirmed, 'Sem conexão', 'Ok');
				offlineConfirmation = true;
			}
			var tryingToReconnect = setInterval(function() {
				if(navigator.connection.type != Connection.NONE) {
					clearInterval(tryingToReconnect);
				} else {
					if (!offlineConfirmation) {
						navigator.notification.alert('Tentando reconectar ('+(count++)+')...', offlineConfirmed, 'Sem conexão', 'Ok');
						offlineConfirmation = true;
					}
				}
			}, 12000);
		}

		function onOnline() {
			console.log("hello");
			appFrame.attr('src', 'http://app-transaereo.sistemapostal.com.br/login');
			appFrame.css('display', 'block');
		}

		function offlineConfirmed() {
			offlineConfirmation = false;
		}

		function localStorage() {
	        var er = new RegExp('[a-z|0-9]+\\.sistemapostal\\.com\\.br$');
	        var url = appInput.val();

	        if(!(url.substring(0,7) == "http://" || url.substring(0,8) == "https://")) {
	            url = "http://" + url;
	        }

	        if(er.test(url)) {
	            window.localStorage.setItem("url", url);
	            navigator.notification.alert('Endereço cadastrado!', function(){}, 'Sucesso','Ok');
	        } else {
	            window.localStorage.setItem("url", "http://app-transaereo.sistemapostal.com.br/login");
	            navigator.notification.alert('Endereço inserido não é permitido. Endereço padrão foi configurado no lugar.', function(){},'Erro','Ok');
	            appInput.val("app-transaereo.sistemapostal.com.br/login");
	        }
	    }

	    function appBegin() {
	        sidenav.sidenav();
			tapTarget.tapTarget();

	        if (window.localStorage.getItem("url") == undefined) {
	        	appFrame.attr("src", "http://app-transaereo.sistemapostal.com.br/login");
	        	window.localStorage.setItem("url", "http://app-transaereo.sistemapostal.com.br/login");
	        } else {
	        	appFrame.attr("src", window.localStorage.getItem("url"));
	        }

			if(window.localStorage.getItem("first-time") == undefined) {
				tapTarget.tapTarget('open');
				window.localStorage.setItem("first-time", 1);
			} else {
				discovery.css('display', 'none');
			}

			if(navigator.connection.type == Connection.NONE) {
				onOffline();
			}
	    }
	}
};

app.initialize();
