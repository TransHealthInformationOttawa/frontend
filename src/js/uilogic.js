
function getPersonsSuccess_main(json) {
    

  $("#peopleTable tbody").empty();
  
  json.forEach(function(item){
      
      var icon = "remove";
      if (item.enabled) {
          icon = 'ok';
      }
      
      $("#peopleTable tbody").append("<tr personId='" + item.id + "'><td>"+item.name+"</td>" +
          "<td>"+item.phone+"</td>" +
          '<td><span class="glyphicon glyphicon-' + icon + '" aria-hidden="true"></span></td>' +
          '<td>'+item.messages.length+'</td>' +
          '<td>'+
              '<button type="button" class="btn btn-default personMessageButton">'+
                  '<span class="glyphicon glyphicon-envelope"></span> '+
                  'Messages'+
              '</button> '+
              '<button type="button" class="btn btn-default personSchedule">'+
                  '<span class="glyphicon glyphicon-time"></span> '+
                  'Schedule'+
              '</button> '+
              '<button type="button" class="btn btn-danger">'+
                  '<span class="glyphicon glyphicon-trash"></span> '+
                  'Delete'+
              '</button>'+           
          "</td></tr>");
  });
  
  $(".personMessageButton").click(function() {
      var itemId = $( this ).parent().parent().attr("personId");
      openMessageList(itemId);
  })
  
  $(".personSchedule").click(function() {
      var itemId = $( this ).parent().parent().attr("personId");
      openScheduleList(itemId);
  });
}

function getPersonsFailed(error) {

}

function addPersonSuccess(json) {

    $("#addPersonModal").modal('hide');

    getPersons(null, null);
}
function addScheduleSuccess(json, personId) {

    $("#scheduleModal").modal('hide');

    getPersons(openScheduleList, personId);
    
    
}
function addMessageSuccess(json, personId) {

    $("#messageModal").modal('hide');

    getPersons(openMessageList, personId);
        
}
function getMessagesSuccess(json) {
}


function addPersonFailed(error) {
    alert("error: failed to add person.");
}

function updatePersonSuccess(json) {

}

function updatePersonFailed(error) {

}

function deletePersonSuccess(json) {

}

function deletePersonFailed(error) {

}


function getMessagesFailed(error) {

}

function addMessageFailed(error) {

}

function deleteMessageSuccess(json) {

}

function deleteMessageFailed(error) {

}

function updateMessageSuccess(json) {

}

function updateMessageFailed(error) {
  
}