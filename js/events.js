$(function() {
	window.populateEvents = function() {
		var Event = Parse.Object.extend("Event");
		var query = new Parse.Query(Event);
		query.get(null, {
			success: function(events) {
				console.log("Got events");
				console.log(events);
			},
			error: function(object, error) {
				console.log("Did not get events");
				console.log(object);
				console.log(error);
			}
		});
	};

	populateEvents();

});