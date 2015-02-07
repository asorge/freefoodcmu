var freeFoodStrings = [
  "free food",
  "refreshments",
  "complimentary"
];

function submitForReview(groupName, message, posterName) {
	console.log("---");
	console.log("Message from " + posterName + " in " + groupName);
	console.log(message);
	console.log("---");
}

function considerPost(groupName, message, posterName) {
	if (!message)
		return;
	var lower = message.toLowerCase();
	for (var i = 0; i < freeFoodStrings.length; i++) {
		if (lower.indexOf(freeFoodStrings[i]) !== -1) {
			submitForReview(groupName, message, posterName);
		}
	}
}

function searchGroups(groups) {
	var idx = 0;

	function processOneGroup() {
		if (idx == groups.length) {
		} else {
			var group = groups[idx];
			var id = group.id;
			FB.api(id + "/feed", function(response) {
				console.log("Searching " + group.name + "(" + response.data.length + " posts)");
				idx += 1;
				setTimeout(processOneGroup, 20);
				$.each(response.data, function(index, post) {
					considerPost(group.name, post.message, post.from.name);
				});
			});
		}
	}
	processOneGroup();
}


function fbsync() {
	FB.api('/me/groups', function(response) { 
		var groups = [];
		$.each(response.data, function(idx, group) { 
			groups.push({id: group.id, name: group.name});
		});
		searchGroups(groups);
	});

}


function fbresponse(response){
	if (response.status === 'connected') {
		console.log("connected");
		fbsync();
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
			FB.login(fbresponse, {scope: 'user_events,rsvp_event,read_stream,user_groups'});
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