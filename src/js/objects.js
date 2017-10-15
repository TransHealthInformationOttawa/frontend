
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
    "dayOfWeek": dayOfWeek,
    "hour": hour,
    "minute": minute
  }
}

function messageObject(messageText) {
  return {
    "message": messageText
  }
}