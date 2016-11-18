var baseUrl = "http://tickr.adriangehrke.de/";

function pageExplore(){
    //searchExplore();
    refreshData();
}


$(document).ready(function() { 
	$( "#registerLater" ).click(function() {
		$("#welcome").css("opacity","0").delay(300).css("display","none");
	});
});

function searchExplore(){
    new $.nd2Search({
					placeholder : "Search",
          defaultIcon : "globe-alt",
          source : [
              {"label": "Afghanistan", "value": "AF"},
              {"label": "�land Islands", "value": "AX"},
              {"label": "Albania", "value": "AL"},
              {"label": "Algeria", "value": "DZ"},
              {"label": "American Samoa", "value": "AS"},
              {"label": "AndorrA", "value": "AD"},
              {"label": "Angola", "value": "AO"},
              {"label": "Anguilla", "value": "AI"},
              {"label": "Antarctica", "value": "AQ"},
              {"label": "Antigua and Barbuda", "value": "AG"},
              {"label": "Argentina", "value": "AR"}
          ],
          fn : function(result) {
            console.log('--- Your custom handling ---');
            console.log('you picked: ');
            console.log(result);
          }
				});
}

function getTicker(){
    $("#exploreContent").html("");
    var name = "getTicker";
    var capMin = 1;
    var capMax = 1;
    
    $.getJSON( baseUrl+"/ajax/getTickerList.php/", { capacityMin: capMin, capacityMax: capMax} )
    .done(function( json ) {
    
            $.each(json, function (i, item){
                    getResultHtml('#exploreContent', item);
            });
    
    })
    .error(function(){ 
        alert( "error" );
     })
}

function setActiveTicker(id){
    console.log("Change Ticker: "+id);
    activeTicker = id;
}

function showActiveTicker(id, title){
    setActiveTicker(id);
    $("#detailContent").html("");
    $("#detailTitle").text(title);
    $.getJSON( baseUrl+"/ajax/getTickerEntries.php/", { tickerId: id } )
    .done(function( json ) {
            console.log("load ticker entries");
            console.log(json);
            $.each(json, function (i, item){
                appendEntryHTML('#detailContent', item);
				initParallax(item.id);
            });
    
    })
    .error(function(){ 
        alert( "error" );
     })
}

function initParallax(id){
	$('#cardImg'+id).parallax({
	});
}

function showOverlay(img){
	console.log("Show Overlay:"+img);
	var img = baseUrl+'images/blur/'+img+'.jpg';
	$('#overlay').css("background-image", "url("+img+")");  
	$('#overlay').css("opacity","1");
	$('#overlay').css("display","block");
	
	$( "#overlay" ).click(function() {
		$('#overlay').css("opacity","0");
		$('#overlay').css("display","none");
	});
}

function appendEntryHTML(div, ticker){
    var html = "";
    var geolocation = ticker.lat+", "+ticker.lng;
    html = '<div class="card" onclick="showOverlay('+ticker.img+');">';
		html += '<div class="card-header">';
			html += '<div class="icon"><img src="img/avatar.png" style=""></div>';
			html += '<div class="title" style="">@taylorW</div>';
			html += '<div class="date" style="">'+ticker.creationDate+'</div>';
			html += '<div class="clear" style=""></div>';
		html += '</div>';
		
		if (ticker.img != ""){
			html += '<div class="card-image" id="cardImg'+ticker.id+'" scalar-y="0.1">';
				html += '<img src="'+baseUrl+'images/blur/'+ticker.img+'.jpg"  class="layer" data-depth="0.20">';
			html += '</div>';
		}
		
		
		html += '<div class="card-footer" style="">';
			html += '<div class="likes left"><i class="zmdi zmdi-thumb-up zmd-fw"></i> 5 Likes</div>';
			html += '<div class="comments left margin"><i class="zmdi zmdi-comment-dots zmd-fw"></i> 73 Comments</div>';
			html += '<div class="clear"></div>';
		html += '</div>';
		
	html += '</div>';
	
	//<img src="'+baseUrl+'images/'+ticker.img+'.jpg"><div class="card-title has-avatar" style="background-color: rgba(0,0,0,0.0);><h3 class="card-primary-title" style="color: #fff;font-weight: bold;font-size: 20px;text-shadow: 1px 1px 2px #777;">'+ticker.headline+'</h3><h5 class="card-subtitle" style="color: #eee;text-transform: none;text-shadow: 1px 1px 2px #777;">'+geolocation+'</h5></div></div><div class="card-supporting-text has-action">'+ticker.text+'</div><div class="card-action"><div class="row between-xs"><div class="col-xs-4"><div class="box"><a href="#" class="ui-btn ui-btn-inline ui-btn-fab"><i class="zmdi zmdi-mic"></i></a><a href="#" class="ui-btn ui-btn-inline ui-btn-fab"><i class="zmdi zmdi-videocam"></i></a></div></div><div class="col-xs-8 align-right"><div class="box">';
    
    $(div).append(html);
}
function createTicker1(position){
    
    var name = "createTicker";
    var title = $("#title").val();
    var desc = $("#desc").val();
    var img = $("#img").val();
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    
    $.getJSON( baseUrl+"/ajax/createTicker.php/", { title: title, desc: desc, img:img, lat:lat, lng:lng } )
    .done(function( json ) {
    
            if (json == true){
                new $.nd2Toast({
					message : "Tickr created",
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

function onError(error){
    alert("ERROR");
}

function createTicker(){
    navigator.geolocation.getCurrentPosition(createTicker1, onError); 
}

function getResultHtml(div, ticker){
    var name = "getResultHtml";
    var avatar = ticker.img;
    var str = ticker.desc;
    var lat = ticker.lat;
    var lng = ticker.lng;
    
    
    var geolocation = lat+", "+lng;
    $.getJSON( "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng, {  } )
    .done(function( json ) {
    
           
            $.each(json, function (i, item){
                if (item != "OK"){
                    if (item.length > 0){
                        if (item[2] == undefined){
                            if (item[1] == undefined){

                                geolocation = item[0]["formatted_address"];
                            }
                            else{

                                geolocation = item[1]["formatted_address"];
                               // console.log(geolocation);
                            }
                        }
                        else{
                            geolocation = item[2]["formatted_address"];
                            //console.log(geolocation);
                        }
                    }
                    //console.log(geolocation);
                }
                
                
            });
            var html = "";
            html = '<div class="nd2-card"><div class="card-media" style="background-image: url('+ticker.img+'); height: 180px; background-size: auto 100%; background-position: center top;"><div class="card-title has-avatar" style="background-color: rgba(0,0,0,0.0);><img class="card-avatar" src="'+avatar+'"><h3 class="card-primary-title" style="color: #fff;font-weight: bold;font-size: 20px;text-shadow: 1px 1px 2px #777;">'+ticker.title+'</h3><h5 class="card-subtitle" style="color: #eee;text-transform: none;text-shadow: 1px 1px 2px #777;">'+geolocation+'</h5></div></div><div class="card-supporting-text has-action">'+str+'</div><div class="card-action"><div class="row between-xs"><div class="col-xs-4"><div class="box"><a href="#" class="ui-btn ui-btn-inline ui-btn-fab"><i class="zmdi zmdi-mic"></i></a><a href="#" class="ui-btn ui-btn-inline ui-btn-fab"><i class="zmdi zmdi-videocam"></i></a></div></div><div class="col-xs-8 align-right"><div class="box">';
            
            if (userId == ticker.userId){
                html += '<a href="#entry" data-transition="slide" onclick="setActiveTicker(\''+ticker.id+'\');" class="ui-btn ui-btn-inline" >Tickr</a>';
            }
            
            html += '<a href="#detail" data-transition="slide" onclick="showActiveTicker(\''+ticker.id+'\', \''+ticker.title+'\');" class="ui-btn green ui-btn-inline">Show</a></div></div></div></div></div>';
            
            appendHTML(div, html);
           
            
    
    })
    .error(function(){ 
        alert( "error" );
     })
     .always(function(){
                  
            
             })
    
    
    
}

function appendHTML(div, html){
    $(div).append(html);
}

function refreshData(){
    getTicker();
    refreshNewest();
}

function refreshNewest(){
    $("#newest").html("");
    $("#newest").html("<li data-role='list-divider'>Newest</li>")
    $.getJSON( baseUrl+"/ajax/getTickerList.php/", { limit: 2} )
    .done(function( json ) {
            
            //console.log(name+"() got data");
            $.each(json, function (i, item){
                    //console.log(name+"() echos output");
                    $("#newest").append('<li class="ui-li-has-thumb"><a href="#" class="ui-btn waves-effect waves-button waves-effect waves-button"><img src="'+item.img+'" class="ui-thumbnail ui-thumbnail-circular"><h2>'+item.title+'</h2><p>'+item.desc+'</p></a></li>');
            });
    
    })
    .error(function(){ 
        alert( "error" );
     })
}

