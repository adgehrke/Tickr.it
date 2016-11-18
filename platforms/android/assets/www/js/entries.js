var baseUrl = "http://tickr.adriangehrke.de/";

var img;

function getTickerByUserId(){
    
    $("#entryTitle").text("New Entry: "+activeTicker);
    
}

function createEntry(){
    var geo = $("#geolocation").val();
    
    if (geo == "on"){
        
        navigator.geolocation.getCurrentPosition(createEntry1, onError); 
        
    }
    else{
        createEntry1(null);
    }
    
}

function createEntry1(position){
    
    var name = "createTicker";
    var headline = $("#headline").val();
    var text = $("#text").val();
    var geolocation = $("#geolocation").val();
    if (position == null){
        var lat = 0.0;
        var lng = 0.0;
    }
    else{
        
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
    }
    
    $.getJSON( baseUrl+"/ajax/createEntry.php/", { name:name, headline:headline, text:text, lat:lat, lng:lng, tickerId:activeTicker, img:img } )
    .done(function( json ) {
    
            if (json == true){
                new $.nd2Toast({
					message : "Entry created",
					action : {
						title : "Ok got it",
						fn : function() {
							console.log("I am the function called by 'Pick phone...'");
						},
						color : "orange"
					},
					ttl : 3000
				});

            }
            else{
                 new $.nd2Toast({
					message : "Error while creating Tickr",
					action : {
						title : "Too bad :(",
						fn : function() {
							console.log("I am the function called by 'Pick phone...'");
						},
						color : "red"
					},
					ttl : 3000
				});
            }
    })
    .error(function(){ 
        alert( "error" );
     })
}


function uploadImage(imageData){
	//alert("Upload rly!");
    $.ajax({

        type: "POST",
        url: baseUrl+"ajax/uploadImage.php",
        data: {img_data:imageData},
        cache: false,
        contentType: "application/x-www-form-urlencoded",
        success: function (result) {
			img = result;
			$("#tickrBtn").prop('disabled', false);
        }

    });
}

function takePicture(){
	//alert("TAke PICTURE");
	$("#tickrBtn").prop('disabled', true);
	navigator.camera.getPicture(onSuccessTakePicture, onFailTakePicture, { 
	quality: 30,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.CAMERA
	
});

function onSuccessTakePicture(imageData) {
	//var smallImage = document.getElementById('imgPrev');
    //smallImage.src = "data:image/jpeg;base64," + imageData;
	//alert("Upload now");
	 uploadImage(imageData);
}

function onFailTakePicture(message) {
    alert('Failed because: ' + message);
}
}
