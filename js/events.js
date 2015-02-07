
var calEvents = [];

$(function() {
	Parse.initialize("d3a8mJ2cDddB8gHuHQB8QIPpXTu3oMlD1WuqszwN", "FtvJcUknJQpvVBjX2rlep1YnYSsoj88ncSp3QVQx");

	window.populateEvents = function() {
		var Event = Parse.Object.extend("Event");
		var query = new Parse.Query(Event);
		query.limit(16);
		query.ascending("start");
		query.find({
			success: function(events) {
				console.log("Got events");
				console.log(events);
				$.each(events, function(index, value) {
					calEvents.push({"title": value.get("name"), "start": value.get("start").toISOString(), "end": value.get("finish").toISOString()});
				});

				$('#calendar').fullCalendar({
					theme: true,
				    events: calEvents,
				    textColor: 'black',
				    color: '#fff',
				    
				});

				$('#calendar').fullCalendar( 'refetchEvents' );

				
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






$(document).ready(function() {

    // page is now ready, initialize the calendar...

    

});