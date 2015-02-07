function(response){
	if (response.status === 'connected') {
		console.log("connected");
	} else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
	} else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
	}
}

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
			FB.login(fbresponse, {scope: 'user_events,rsvp_events,read_stream,user_groups'}
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