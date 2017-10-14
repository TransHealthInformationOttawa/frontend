
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

function openMessageList(ev){
    
    document.getElementById("peopleListPage").classList.add("invisiblePage");
    document.getElementById("messageListPage").classList.remove("invisiblePage");

    
    globalPersonID = ev.target.id.split("-")[1];

    var person = data.people.find(function(item){
        return (item.id == globalPersonID);
    });
    document.getElementById("messageListTitle").textContent = "List of Messages for "+person.name;
    
    $("#messagesTable tbody").empty();

    person.messages.forEach(function(m){
        $("#messagesTable tbody").append('<tr>'
            + '<td>' + m.message + '<td>'
            + '<td>'
                +'<button type="button" class="btn btn-success">'
                +'Edit'
            +'</button>'
                +'<button type="button" class="btn btn-danger">'
                +'Delete'
            +'</button>'
            +'</td>'
        +'</tr>');
    });
}

//function 

function openPeopleList(){
    document.getElementById("messageListPage").classList.add("invisiblePage");
    document.getElementById("peopleListPage").classList.remove("invisiblePage");
    
    
}

$( document ).ready(function(){
   
    $("#peopleTable tbody").empty();
    
    data.people.forEach(function(item){
        
        var icon = "remove";
        if (item.enabled) {
            icon = 'ok';
        }
        
        $("#peopleTable tbody").append("<tr personId='" + item.id + "'><td>"+item.name+"</td>" +
            "<td>"+item.phone+"</td>" +
            '<td><span class="glyphicon glyphicon-'+icon+'" aria-hidden="true"></span></td>' +
            '<td>'+item.messages.length+'</td>' +
            '<td>'+
                '<button type="button" class="btn btn-success personMessageButton"'+
                    ' id="personMessages-'+item.id+'">'+
                    '<span class="glyphicon glyphicon-envelope"></span>'+
                    'Messages'+
                '</button>'+
                '<button type="button" class="btn btn-success"'+
                    ' id="personSchedule-'+item.id+'">'+
                    '<span class="glyphicon glyphicon-time"></span>'+
                    'Schedule'+
                '</button>'+
                '<button type="button" class="btn btn-danger">'+
                    '<span class="glyphicon glyphicon-trash"></span>'+
                    'Delete'+
                '</button>'+           
            "</td></tr>");
        
//        document.getElementById('personMessages-'+item.id).onclick = openMessageList;
//        document.getElementById('personSchedule-'+item.id).onclick = openSchedule;

    });
    
    $(".personMessagesButton").click(function() {
        var itemId = $( this ).parent().parent().attr("personId");
        console.log(itemId);
    })
    
});

