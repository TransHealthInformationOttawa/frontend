var data = {people:[]};

function submitPerson(){
    var name = $("#addPersonName").val();
    var phoneNumber = $("#addPersonPhoneNumber").val();
    var enabled = $("#addPersonEnableSend").is(":checked");

    // todo - don't need enabled for edit
    
    addPerson(name, phoneNumber, [], []);
}

function submitSchedule(){
    var week = $("#scheduleWeek").val();
    var hour = $("#scheduleHour").val();
    var minute = $("#scheduleMinute").val();
    console.log(week, hour, minute);
}

function submitMessage(){
    var message = $("#messageTextField").val();
    console.log(message);
}


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
    $("#scheduleListTitle").attr("personId", personId);

    $("#scheduleTable tbody").empty();

    person.schedules.forEach(function(s){
        $("#scheduleTable tbody").append('<tr>'
            + '<td>' + s.year + '</td>'
            + '<td>' + s.dayOfWeek + '</td>'
            + '<td>' + s.month + '</td>'
            + '<td>' + s.hour + '</td>'
            + '<td>' + s.minute + '</td>'
            + '<td>'
                +'<button type="button" class="btn btn-success editScheduleButton"> '
                +'Edit'
            +'</button> '
                +'<button type="button" class="btn btn-danger"> '
                +'Delete'
            +'</button>'
            +'</td>'
        +'</tr>');
    });
    
    $(".editScheduleButton").click(function() {
    var itemId = $("#scheduleListTitle").attr("personId");
    openScheduleModal(itemId);
  })

}



function openPeopleList(){
    $("#peopleListPage").removeClass("invisiblePage");
    $("#messageListPage").addClass("invisiblePage");
    $("#scheduleListPage").addClass("invisiblePage");
}



function openScheduleModal(personId){
    console.log(personId);
}


// ----------------------------------------------------------------------------
// main

$( document ).ready(function(){
   
    getPersons();
});

