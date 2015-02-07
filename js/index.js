$(document).ready(function() {

    // page is now ready, initialize the calendar...

    /* make the API call */
FB.api(
    "/me/events",
    function (response) {
      if (response && !response.error) {
        console.log(response.name);
      }
    }
);

});