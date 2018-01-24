// Set FireBase Server Key & URL
var key = "key=YOUR-FIREBASE-API-KEY";

// Firebase API URL
var url = "https://fcm.googleapis.com/fcm/send";

// Set Firebase Topics for Your App
var topics = new Array("all");

// Build irst topic selection on load
$(document).ready( function() {
    var topicSection = "<div class='form-group topic'> \
                            <label for='topic'>Topic:</label> \
                            <select name='topic0' class='form-control'>";
    for(i = 0; i < topics.length; i++) {
        topicSection += "<option value='" + topics[i] + "'>" + topics[i] + "</option>";
    }
    topicSection += "</select> \
                    </div>";
    $("#addTopicSection").after(topicSection);
});

function addTopic(){

    //Check topic sections available
    var topicSections = $("div.form-group.topic").length;
    console.log("Topics " + topicSections);

    //Alert if more than 3 topics
    if(topicSections >= 3) {
        console.log("Too many topics");
        $("nav").after(
            "<div class='alert alert-info'> \
                <strong>Alert!</strong> Firebase does not allow more than 3 topics per notification. \
            </div>");
    }

    //If less than 3 topics
    else if(topicSections < 3) {

        //Build topic selection HTML
        var newTopic = "<div class='form-group topic'> \
                            <label for='topic'>Topic:</label> \
                            <select name='topic" +
                        topicSections +
                        "' class='form-control'>";
        for(i = 0; i < topics.length; i++) {
            newTopic += "<option value='" + topics[i] + "'>" + topics[i] + "</option>";
        }
        newTopic += "</select> \
                        </div>";

        //Add topic
        $(".topic").last().after(newTopic);
    }
};

function makeNotification() {
    console.log("Sending notification");
    
    // Set notification body & title
	var notifMessage = $("input[name='message']").val();
    var notifTitle = $("input[name='title']").val();
    
	// Create a string to append topics to
    var notifTopic = '';
    var topicSections = $("div.form-group.topic").length;
    for(var i = 0; i < topicSections; i++) {
        if(i==0) {
            notifTopic += 
                "'" + 
                $("select[name='topic" + i + "']").val() + 
                "' in topics";
        }
        else {
            notifTopic += 
                " || '" +
                $("select[name='topic"+i+"']").val() + 
                "' in topics";
        }
    }

	// Build notification as JSON string
	var data = JSON.stringify(
        { 
            "condition" : notifTopic, 
            "notification" : { 
                "body" : notifMessage, 
                "title" : notifTitle, 
                "icon" : "ic_notification" 
            }
        }
    );

	// Log JSON string for debugging
	console.log(data);
	
    //Send notification
    $.ajax({
        type: "POST",
        beforeSend: function(request){
                        request.setRequestHeader("Authorization",key);
                        request.setRequestHeader("Content-type","application/json");
                    },
        url: url,
        data: data,
        success:
            function(data,status){
                console.log("Notification Response:\n" + 
                            JSON.stringify(data));
                var dataObj = JSON.parse(JSON.stringify(data));
                if(dataObj.message_id != null) {
                    $("nav").after(
                        "<div class='alert alert-success'> \
                            <strong>Success!</strong> Firebase message sent. Message ID: " + 
                            dataObj.message_id +
                        "</div>");
                }
            }
    });
};