
var globalPersonID = null;


var data = {
   "people" : [
      {
         "id" : "string_id_1",
         "name" : "Alice",
         "lastMessageSent" : "<id of the last message sent>",
         "enabled" : true,
         "phone" : "+16135551212",
         "schedule" : [{
           "id" : "...",
           "year": 1900,
           "dayOfWeek": null,
           "month": 1,
           "dayOfMonth": 31,
           "hour": 0,
           "minute": 0
         }],
         "messages" : [
            {
              "id" : "...",
              "message" : "You're awesome"
            }
         ]
      }
   ]
};

function openMessageList(personId){
    
    $("#peopleListPage").addClass("invisiblePage");
    $("#messageListPage").removeClass("invisiblePage");
    $("#scheduleListPage").addClass("invisiblePage");

    var person = data.people.find(function(item){
        return (item.id == personId);
    });

    $("#messageListTitle").text("List of Messages for " + person.name);

    $("#messagesTable tbody").empty();

    person.messages.forEach(function(m){
        $("#messagesTable tbody").append('<tr>'
            + '<td>' + m.message + '</td>'
            + '<td>'
                +'<button type="button" class="btn btn-success"> '
                +'Edit'
            +'</button> '
                +'<button type="button" class="btn btn-danger"> '
                +'Delete'
            +'</button>'
            +'</td>'
        +'</tr>');
    });
}

function openScheduleList(personId) {

    $("#peopleListPage").addClass("invisiblePage");
    $("#messageListPage").addClass("invisiblePage");
    $("#scheduleListPage").removeClass("invisiblePage");

    var person = data.people.find(function(item){
        return (item.id == personId);
    });

    $("#scheduleListTitle").text("Schedule for " + person.name);

    $("#scheduleTable tbody").empty();

    person.schedule.forEach(function(s){
        $("#scheduleTable tbody").append('<tr>'
            + '<td>' + s.year + '</td>'
            + '<td>' + s.dayOfWeek + '</td>'
            + '<td>' + s.month + '</td>'
            + '<td>' + s.hour + '</td>'
            + '<td>' + s.minute + '</td>'
            + '<td>'
                +'<button type="button" class="btn btn-success"> '
                +'Edit'
            +'</button> '
                +'<button type="button" class="btn btn-danger"> '
                +'Delete'
            +'</button>'
            +'</td>'
        +'</tr>');
    });
}

//function 

function openPeopleList(){
    $("#peopleListPage").removeClass("invisiblePage");
    $("#messageListPage").addClass("invisiblePage");
    $("#scheduleListPage").addClass("invisiblePage");
}

$( document ).ready(function(){
   
    getPersons();
});

