var API_URL = "http://somewhere/"

function apiUrl(pathElements) {
  return API_URL + "/" + pathElements.join("/");
}

function getPersons() {
  $.getJSON(apiUrl(["people"]))
    .done(function( json ) {
      console.log( "JSON Data: " + json);
    })
    .fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
  });
}

function addPerson(name, phoneNumber, schedules, messages) {
  $.getJSON(apiUrl(["people"]), 
    personObject(name, phoneNumber, schedules, messages))
    .done(function( json ) {
      console.log( "JSON Data: " + json);
    })
    .fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
  });
}

function updatePerson(personId, phoneNumber, schedule, messages) {
  $.getJSON(apiUrl(["people", personId]),
    personObject(name, phoneNumber, schedule, messages))
    .done(function( json ) {
      console.log( "JSON Data: " + json);
    })
    .fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
  });
}

function deletePerson(personId) {
    $.ajax({
      url: apiUrl(["people", personId]),
      type: 'DELETE',
      success: function(result) {
          // Do something with the result
      }
  });
}

function getMessages(personId) {
  $.getJSON(apiUrl(["people", personId, "messages"]))
    .done(function( json ) {
      console.log( "JSON Data: " + json);
    })
    .fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
  });
}

function addMessage(personId, messageText) {
  $.getJSON(apiUrl(["people", personId, "messages"]),
    messageObject(messageText))
    .done(function( json ) {
      console.log( "JSON Data: " + json);
    })
    .fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
  });
}

function deleteMessage(personId, messageId) {
  $.ajax({
    url: apiUrl(["people", personId, "messages", messageId]),
    type: 'DELETE',
    success: function(result) {
        // Do something with the result
    }
});
}

function updateMessage(personId, messageId, messageText) {
  $.getJSON(apiUrl(["people", personId, "messages", messageId]),
    messageObject(messageText))
    .done(function( json ) {
      console.log( "JSON Data: " + json);
    })
    .fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
  });
}

function personObject(name, phoneNumber, schedule, messages) {
  return {
    "name" : name,
    "enabled" : true,
    "phone": phoneNumber,
    "schedule": schedule,
    "messages": messages
  }
}

function scheduleObject(year, dayOfWeek, month, dayOfMonth, hour, minute) {
  return {
    "year": year,
    "dayOfWeek": dayOfWeek,
    "month": month,
    "dayOfMonth": dayOfMonth,
    "hour": hour,
    "minute": minute
  }
}

function messageObject(messageText) {
  return {
    "message": messageText
  }
}
