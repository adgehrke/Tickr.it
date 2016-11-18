/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
/*var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		if (cordova.platformId == 'android') {
			StatusBar.backgroundColorByHexString("#333");
		}
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};*/

var userId = 1;
var activeTicker = 0;
$(document).ready(function() { 
      // jQuery is properly loaded at this point
      // so proceed to bind the Cordova's deviceready event
      $(document).bind("deviceready", function() {
         // Now Cordova is loaded
         // its great JS API can be used to access low-level
         // features as accelerometer, contacts and so on
          console.log("Device is ready!");
           $.mobile.allowCrossDomainPages = true;
           $.support.cors=true;
    getTicker();
	goParallax();
	if (cordova.platformId == 'android') {
		
		if (StatusBar) {
    StatusBar.hide();
	//StatusBar.overlaysWebView(false);
	//StatusBar.backgroundColorByHexString("#4e9fd5");
//StatusBar.styleLightContent();
}
    
}
      }); 
   });
   
   $( "#entry" ).on( "pageload", function( event, ui ) { getTickerByUserId();   } );

