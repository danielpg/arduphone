var bluelist = [];
var desktop = 0;

//if(desktop == 0){
if(window.location.href.indexOf("localhost") >= 0 ){
	$(function(){ onDeviceReady(); });
} else {
	document.addEventListener("deviceready", onDeviceReady, false);
}
	
function onDeviceReady() {
	refreshlist();


	$( "#slider-1" ).on( "slidestop", function( event, ui ) {
		console.log(  $(this).val()  );
	});

	$("input[name='sliderstep']").on("change", function() {
		console.log( $("input[name='sliderstep']:checked").val() );
	});
	//$("#ok").html("javascript OK");
}
/*sss*/
function refreshlist(){
	bluetoothSerial.list(function(data){
		bluelist = data;
		//say_list(data);
		drawlist();
	}, function(){});	
}

function testint() {
	bluetoothSerial.write([186], function(){},  function(){});
}

function drawlist(){
	for(i = 0; i < bluelist.length; i++ ){
		//$("#list").append("<div class='mybutton' onclick='select_blue(" + i + ")'>d:" + bluelist[i].name + "</div>");	
		img = "";
		if( bluelist[i].name.toLowerCase().includes("torre") ){
			img = "lambov";
		} else if( bluelist[i].name.toLowerCase().includes("camion") ){
			img = "lambov";
		} else {
			img = "lambov";
		}

		$("#idisps").append("<li><a href='#' onclick='select_blue(" + i + ",\"\")'><img src='images/" + img + ".png'>" + bluelist[i].name + "</a></li>");
	}
	$("#idisps").listview("refresh");
}

function select_blue(id){
	bluetoothSerial.isConnected(function(){}, function(){
		bluetoothSerial.connect(bluelist[id].address, function(){ 
			 $.mobile.changePage("#pslider");		
		}, function(){ 
			 alert("Error: no se pudo conectar.");
		 });
	});
}

function send_char(str){
	bluetoothSerial.write(str, function(){	}, function(){ 
		alert("Error");
	});
}

function button1(){
	bluetoothSerial.write("a", function(){
		alert("WriteOK");
	}, function(){ 
		alert("writeError");
	});
}

function button2(){
	bluetoothSerial.write("1", function(){
		alert("WriteOK");
	}, function(){ 
		alert("writeError");
	});
}

function activeRead(){
	bluetoothSerial.subscribe('\n', function (data) {
	    
		//console.log(data);
	    
	}, function(){   }
		//error Reading
	);
}

//bluetoothSerial.write(data, success, failure);
//

function say_list(items){
	for(i = 0; i < items.length; i++ ){
		$("#console").append("<div>object:</div>");
		for (var mkey in items[i]){
			$("#console").append("<div><b>" + mkey + "</b>: " + items[i][mkey] + "</div>");	
		
		}
	}
}

function send_speed(){

}


function myclose(){
	if (navigator.app) {
	    navigator.app.exitApp();
	} else if (navigator.device) {
	    navigator.device.exitApp();
	} else {
	    window.close();
	}
}
