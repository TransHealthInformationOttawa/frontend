var data = {people:[]};

function submitPerson(){
    var name = $("#addPersonName").val();
    var phoneNumber = $("#addPersonPhoneNumber").val();
    var enabled = $("#addPersonEnableSend").is(":checked");

    // todo - don't need checkbox except for edit
    
    addPerson(name, phoneNumber, [], []);
}

function submitSchedule(){
    console.log ("submit ched");
    
    var dayOfWeek = $("#scheduleWeek").val();
    var hour = $("#scheduleHour").val();
    var minute = $("#scheduleMinute").val();
    
    var dayOfMonth = 0;
    var month = 0;
    var year = 0;
    
    var schedule = scheduleObject(year, dayOfWeek, month, dayOfMonth, hour, minute);
//    console.log(schedule);
    // using person update to affect schedule items
    
    var personId = $("#scheduleListTitle").attr("personId");

//    var tmp_data = {
//        "hour": 17.0, "month": 10.0, "year": 2017.0, "dayOfMonth": "", "minute": 1.0
//    };
    
    
     $.ajax({
      method: "POST",
      url: apiUrl(["people", personId, "schedules"]),
      contentType: 'application/json', 
    data: JSON.stringify(schedule)
  })
    .done(function(json) {
         // propigating the person Id
      addScheduleSuccess(json, personId);
    })
    .fail(function( jqxhr, textStatus, error ) {
      var err = textStatus + ", " + error;
//      addPersonFailed(error);
         console.log(err);
  });
}

function submitMessage(){
    var message = $("#messageTextField").val();
    
    var personId = $("#messageListTitle").attr("personId");
    addMessage(personId, message);
}


function openMessageList(personId){
    console.log ("open message list", personId);
    
    $("#peopleListPage").addClass("invisiblePage");
    $("#messageListPage").removeClass("invisiblePage");
    $("#scheduleListPage").addClass("invisiblePage");

    var person = data.people.find(function(item){
        return (item.id == personId);
    });

    // note - putting person id in title's attributes

    $("#messageListTitle").text("List of Messages for " + person.name);
    $("#messageListTitle").attr("personId", personId);

    $("#messagesTable tbody").empty();

    person.messages.forEach(function(m){
        $("#messagesTable tbody").append('<tr messageId="' + m.id + '">'
            + '<td>' + m.message + '</td>'
            + '<td>'
                +'<button type="button" class="btn btn-default"> '
                +'<span class="glyphicon glyphicon-pencil"></span> '
                +'Edit'
            +'</button> '
                +'<button type="button" class="btn btn-danger deleteMessageButton"> '
                +'<span class="glyphicon glyphicon-trash"></span> '
                +'Delete'
            +'</button>'
            +'</td>'
        +'</tr>');
    });

    $(".deleteMessageButton").click(function() {
        var messageId = $( this ).parent().parent().attr("messageId");
        deleteMessage(personId, messageId);
    });
}

function openScheduleList(personId) {
    console.log ("open message list", personId);

    $("#peopleListPage").addClass("invisiblePage");
    $("#messageListPage").addClass("invisiblePage");
    $("#scheduleListPage").removeClass("invisiblePage");

    var person = data.people.find(function(item){
        return (item.id == personId);
    });

    // note - putting person id in title's attributes
    
    $("#scheduleListTitle").text("Schedule for " + person.name);
    $("#scheduleListTitle").attr("personId", personId);

    $("#scheduleTable tbody").empty();

    person.schedules.forEach(function(s){
        $("#scheduleTable tbody").append('<tr scheduleId="' + s.id + '">'
            + '<td>' + ( s.year == undefined ? "All" : s.year ) + '</td>'
            + '<td>' + ( s.dayOfWeek == undefined ? "All" : s.dayOfWeek ) + '</td>'
            + '<td>' + ( s.month == undefined ? "All" : s.month ) + '</td>'
            + '<td>' + ( s.dayOfMonth == undefined ? "All" : s.dayOfMonth ) + '</td>'
            + '<td>' + ( s.hour == undefined ? "All" : s.hour ) + '</td>'
            + '<td>' + ( s.minute == undefined ? "All" : s.minute ) + '</td>'
            + '<td>'
                +'<button type="button" class="btn btn-default editScheduleButton"> '
                +'<span class="glyphicon glyphicon-pencil"></span> '
                +'Edit'
            +'</button> '
                +'<button type="button" class="btn btn-danger deleteScheduleButton"> '
                +'<span class="glyphicon glyphicon-trash"></span> '
                +'Delete'
            +'</button>'
            +'</td>'
        +'</tr>');
    });
    
    $(".editScheduleButton").click(function() {
        //var itemId = $("#scheduleListTitle").attr("personId");
        var scheduleId = $( this ).parent().parent().attr("scheduleId");
        openScheduleModal(personId, scheduleId);
    })

    $(".deleteScheduleButton").click(function() {
        var scheduleId = $( this ).parent().parent().attr("scheduleId");
        deleteSchedule(personId, scheduleId);
    });

}



function openPeopleList(){
    $("#peopleListPage").removeClass("invisiblePage");
    $("#messageListPage").addClass("invisiblePage");
    $("#scheduleListPage").addClass("invisiblePage");
}


function addScheduleButtonClick() {
    console.log("--- addScheduleButtonClick");
//    $("#scheduleModalTitle").text = "Add Schedule";
//    $("#scheduleSubmitButton").text = "Add";
    
    $("#scheduleWeek").val("*");
    $("#scheduleHour").val("12");
    $("#scheduleMinute").val("00");
}
function openScheduleModal(personId, scheduleId){
    console.log("--- openScheduleModal", personId, scheduleId);
//    $("#scheduleModalTitle").text = "Edit Schedule";
//    $("#scheduleSubmitButton").text = "Update";
    
    var person = data.people.find(function(item){
        return (item.id == personId);
    });
    var schedule = person.schedules.find(function(item){
        return (item.id == scheduleId);
    });
    $("#scheduleWeek").val(schedule.dayOfWeek);
    $("#scheduleHour").val(schedule.hour);
    $("#scheduleMinute").val(schedule.minute);
    
    $("#scheduleModal").modal('show');
}


// ----------------------------------------------------------------------------
// main

$( document ).ready(function(){
   
    getPersons(null, null);
    console.log(data);
});

