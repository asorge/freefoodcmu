$(function() {
	Parse.initialize("d3a8mJ2cDddB8gHuHQB8QIPpXTu3oMlD1WuqszwN", "FtvJcUknJQpvVBjX2rlep1YnYSsoj88ncSp3QVQx");

	window.fbAsyncInit = function() {
		FB.init({
		   appId      : '498020883669593', // Facebook App ID
		   channelUrl : '//allysorge.com/freefoodcmu', // Channel File
		   status     : true, // check login status
		   cookie     : true, // enable cookies to allow Parse to access the session
		   xfbml      : true, // parse XFBML
		   version    : 'v2.2'
		});
		
		$("#sync").on("click", function() {

			FB.login(function(){}, {scope: 'publish_actions',
				success: function(user) {
					/*if (!user.existed()) {
						alert("User signed up and logged in through Facebook!");
					} else {
						alert("User logged in through Facebook!");
					}*/
					setWelcome();
				},
				error: function(user, error) {
					alert("User cancelled the Facebook login or did not fully authorize.");
				}
		    });
		});		
	};

	(function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
});