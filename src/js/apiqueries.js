var API_URL = "http://somewhere/"

function apiUrl(pathElements) {
  return API_URL + "/" + pathElements.join("/");
}

function getPersons() {
  $.getJSON(apiUrl(["people"]))
    .done(function(json) {
      getPersonsSuccess(json);
    })
    .fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      getPersonsFailed(err);
  });
}

function addPerson(name, phoneNumber, schedules, messages) {
  $.getJSON(apiUrl(["people"]), 
    personObject(name, phoneNumber, schedules, messages))
    .done(function(json) {
      addPersonSuccess(json);
    })
    .fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      addPersonFailed(error);
  });
}

function updatePerson(personId, phoneNumber, schedule, messages) {
  $.getJSON(apiUrl(["people", personId]),
    personObject(name, phoneNumber, schedule, messages))
    .done(function(json) {
      updatePersonSuccess(json);
    })
    .fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      updatePersonFailed(err);
  });
}

function deletePerson(personId) {
    $.ajax({
      url: apiUrl(["people", personId]),
      type: 'DELETE',
      success: function(json) {
        deletePersonSuccess(json);
      },
      error: function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        deletePersonFailed(err);
    }
  });
}

function getMessages(personId) {
  $.getJSON(apiUrl(["people", personId, "messages"]))
    .done(function(json) {
      getMessagesSuccess(json);
    })
    .fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      getMessagesFailed(err);
  });
}

function addMessage(personId, messageText) {
  $.getJSON(apiUrl(["people", personId, "messages"]),
    messageObject(messageText))
    .done(function(json) {
      addMessageSuccess(json);
    })
    .fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      addMessageFailed(error);
  });
}

function deleteMessage(personId, messageId) {
  $.ajax({
    url: apiUrl(["people", personId, "messages", messageId]),
    type: 'DELETE',
    success: function(json) {
      deleteMessageSuccess(json);
    },
    error: function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      deleteMessageFailed(err);
  }
});
}

function updateMessage(personId, messageId, messageText) {
  $.getJSON(apiUrl(["people", personId, "messages", messageId]),
    messageObject(messageText))
    .done(function(json) {
      updateMessageSuccess(json);
    })
    .fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      updateMessageFailed(err);
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
