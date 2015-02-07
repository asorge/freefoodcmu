$(function() {
    Parse.initialize("d3a8mJ2cDddB8gHuHQB8QIPpXTu3oMlD1WuqszwN", "FtvJcUknJQpvVBjX2rlep1YnYSsoj88ncSp3QVQx");
    
	window.fbAsyncInit = function() {
		Parse.FacebookUtils.init({
		   appId      : '498020883669593', // Facebook App ID
		   channelUrl : '//allysorge.com/freefoodcmu', // Channel File
		   status     : true, // check login status
		   cookie     : true, // enable cookies to allow Parse to access the session
		   xfbml      : true  // parse XFBML
		});
	};
	
	(function(d, debug){
	 var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
	 if (d.getElementById(id)) {return;}
	 js = d.createElement('script'); js.id = id; js.async = true;
	 js.src = "//connect.facebook.net/en_US/sdk.js";
	 ref.parentNode.insertBefore(js, ref);
	}(document, /*debug*/ false));
	
	Parse.FacebookUtils.logIn(null, {
	  success: function(user) {
		if (!user.existed()) {
		  alert("User signed up and logged in through Facebook!");
		} else {
		  alert("User logged in through Facebook!");
		}
	  },
	  error: function(user, error) {
		alert("User cancelled the Facebook login or did not fully authorize.");
	  }
	});
	
	$(".newEvent .submit").on("click", function() {
		var Event = Parse.Object.extend("Event");
		var newEvent = new Event();
		var eventName = $(this).siblings(".eventName")[0].value
		console.log("Event Name");
		console.log(eventName);
		newEvent.save({
			name: eventName
		}, {
		success: function(object) {
			console.log("Saved event!");
		},
		error: function(model, error) {
			console.log("Failed to save event");
			console.log(model);
			console.log(error);	
		}});
	});
	
	if (false) {
		var TestObject = Parse.Object.extend("TestObject");
		var testObject = new TestObject();
		  testObject.save({foo: "bar"}, {
		  success: function(object) {
			console.log("Created item");
		  },
		  error: function(model, error) {
			console.log("Failed to create item");
		  }
		});
	}
	
});