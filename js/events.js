function requestFinished() {
  $("#loadingli").remove();
}

function groupByDay(events) {
  var byDay = {};
  $.each(events, function (_, event) {
    var start = event.get("start");
    var day = start.toLocaleDateString();
    if (!byDay.hasOwnProperty(day)) {
      byDay[day] = [];
    }
    byDay[day].push(event);
  });
  return byDay;
}

function addEventsForDay(day, events) {
  var $li = $('<li class="z-depth-2"></li>').appendTo($("#eventList"));
  var $table = $("<table></table>").appendTo($li);
  var $thead = $("<thead></thead>").appendTo($table);
  $thead.text(day);
  var $headers = $("<thead></thead>").appendTo($table);
  $headers.append($("<td>Event</td>"));
  $headers.append($("<td>Time</td>"));
  $headers.append($("<td>Location</td>"));
  $headers.append($("<td>Food</td>"));

  $.each(events, function(ix, event) {
    var start = event.get("start").toLocaleTimeString();
    var finish = event.get("finish").toLocaleTimeString();

    start = start.substr(0, start.length-3); // remove seconds
    finish = finish.substr(0, finish.length-3);

    var $row = $("<tr></tr>").appendTo($table);
    var $name = $("<td></td>").appendTo($row);
    var $time = $("<td></td>").appendTo($row);
    var $location = $("<td></td>").appendTo($row);
    var $food = $("<td></td>").appendTo($row);
    $name.text(event.get("name"));
    $time.text(start + " - " + finish);
    $location.text(event.get("locationName"));
    $food.text(event.get("foodDescription"));
  });
}

function populateEvents() {
 var calEvents = [];

 var Event = Parse.Object.extend("Event");
 var query = new Parse.Query(Event);
 query.limit(16);
 query.ascending("start");
 query.find({
  success: function(events) {
   console.log("Got events");
   console.log(events);

   if (document.getElementById("calendar")) {
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
   }

   requestFinished();
   var byDay = groupByDay(events);
   $.each(byDay, function(day, events) {
    addEventsForDay(day, events);
  });
 },
 error: function(object, error) {
   console.log("Did not get events");
   console.log(object);
   console.log(error);
 }
});
}

$(function() {
 Parse.initialize("d3a8mJ2cDddB8gHuHQB8QIPpXTu3oMlD1WuqszwN", "FtvJcUknJQpvVBjX2rlep1YnYSsoj88ncSp3QVQx");

 populateEvents();

});

