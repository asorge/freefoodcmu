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
  var $li = $('<li class="z-depth-2"></li>');
  var $table = $li.append($("<table></table>"));
  var $thead = $table.append($("<th></th>"));
  $thead.text(day);
  var $headers = $table.append($("<tr></tr>"));
  $headers.append($("<td>Event</td>"));
  $headers.append($("<td>Time</td>"));
  $headers.append($("<td>Location</td>"));
  $headers.append($("<td>Food</td>"));

  $.each(events, function(ix, event) {
    var start = event.get("start").toLocaleTimeString();
    var finish = event.get("finish").toLocaleTimeString();

    var $row = $table.append($("<tr></tr>"));
    var $name = $row.append($("<td></td>"));
    var $time = $row.append($("<td></td>"));
    var $location = $row.append($("<td></td>"));
    var $food = $row.append($("<td></td>"));
    $name.text(event.get("name"));
    $time.text(start + " - " + finish);
    $location.text(event.get("locationName"));
    $food.text(event.get("foodDescription"));
 });
}

function populateEvents() {
 var Event = Parse.Object.extend("Event");
 var query = new Parse.Query(Event);
 query.limit(16);
 query.ascending("start");
 query.find({
  success: function(events) {
   console.log("Got events");
   console.log(events);
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

 window.populateEvents = function() {

 };

 populateEvents();

});