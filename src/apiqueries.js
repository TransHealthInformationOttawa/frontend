var API_URL = "http://somewhere/"

function apiUrl(pathElements) {
  return API_URL + "/" + pathElements.join("/");
}

function getPersons() {
  $.getJSON(API_URL, ["people"])
    .done(function( json ) {
      console.log( "JSON Data: " + json);
    })
    .fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
      console.log( "Request Failed: " + err );
  });
}

function addPerson(name, phoneNumber, schedule, messages) {

}

function updatePerson(personId, phoneNumber, schedule, messages) {

}

function deletePerson(personId) {

}

function getMessages(personId) {

}

function addMessage(personId, message) {

}

function deleteMessage(personId, messageId) {

}

function updateMessage(personId, messageId, message) {

}
