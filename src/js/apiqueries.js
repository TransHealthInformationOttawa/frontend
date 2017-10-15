var API_URL = "https://inkfv9sdaa.execute-api.us-east-1.amazonaws.com/prod"

function apiUrl(pathElements) {
  return API_URL + "/" + pathElements.join("/");
}

/**
 * Makes a GET request to /people/
 * @constructor
 */
function getPersons(callback, personId) {
  $.getJSON(apiUrl(["people"]))
    .done(function(json) {
      
      // *************************
      console.log(" get personS success ")
      
      if (callback == null){
          console.log ("main getpersonS success");
        getPersonsSuccess_main(json);
      } else {
          console.log ("callback in getpersonS");
          callback(personId);
      }
      
      
    })
    .fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      getPersonsFailed(err);
  });
}

/**
 * Makes a POST request to /people/
 * @constructor
 * @param {string} name - The person's name.
 * @param {string} phoneNumber - The person's phone number.
 * @param {scheduleObject[]} schedules - The person's schedule for messages.
 * @param {messageObject[]} messages - The person's messages.
 */

function addPerson(name, phoneNumber, schedules, messages) {
  $.ajax({
      method: "POST",
      url: apiUrl(["people"]),
      contentType: 'application/json', 
    data: JSON.stringify(personObject(name, phoneNumber, schedules, messages))
  })
    .done(function(json) {
      
      addPersonSuccess(json);
    })
    .fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      addPersonFailed(error);
  });
}


/**
 * Makes a POST request to /people/{id}
 * @constructor
 * @param {string} personId - The person's ID.
 * @param {string} name - The person's name.
 * @param {string} phoneNumber - The person's phone number.
 * @param {scheduleObject[]} schedules - The person's schedule for messages.
 * @param {messageObject[]} messages - The person's messages.
 */
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

/**
 * Makes a DELETE request to /people/{id}
 * @constructor
 * @param {string} personId - The person's ID.
 */
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

/**
 * Makes a GET request to /people/{id}/messages
 * @constructor
 * @param {string} personId - The person's ID.
 */
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

/**
 * Makes a POST request to /people/{id}/messages
 * @constructor
 * @param {string} personId - The person's ID.
 * @param {string} messageText - The message to send.
 */
function addMessage(personId, messageText) {
  $.ajax({
      method: "POST",
      url: apiUrl(["people", personId, "messages"]),
      contentType: 'application/json', 
    data: JSON.stringify(messageObject(messageText))
  })
    .done(function(json) {
      // propagating person id
      addMessageSuccess(json, personId);
    })
    .fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      addMessageFailed(error);
  });

}

/**
 * Makes a DELETE request to /people/{id}/messages/{message id}
 * @constructor
 * @param {string} personId - The person's ID.
 * @param {string} messageId - The message's ID.
 */
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

/**
 * Makes a POST request to /people/{id}/messages/{message id}
 * @constructor
 * @param {string} personId - The person's ID.
 * @param {string} messageId - The message's ID.
 * @param {string} messageText - The message's updated text.
 */
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
