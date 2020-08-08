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

	$(document).on("pagecreate","#pslider", function(){ 
		$(document).on("change", "#slider-1", function(){
			var col = $(this).val();
		    $("#qq").html(col + "ms");

			tmp = parseFloat(col) * 10;
			bluetoothSerial.write([ 200 , tmp ], function(){},  function(){});
		});
	});

	/*$( "#slider-1" ).on( "slidestop", function( event, ui ) {
		tmp = parseInt($(this).val()) * 10;
		bluetoothSerial.write([ 200 , tmp ], function(){},  function(){});
	});*/

	$("input[name='sliderstep']").on("change", function() {
		bluetoothSerial.write( $("input[name='sliderstep']:checked").val() , function(){},  function(){});
	});

	//$("#ok").html("javascript OK");
}
/*sss*/
function refreshlist(){
	
	$.mobile.loading( "show" );

	bluetoothSerial.list(function(data){
		bluelist = data;
		//say_list(data);
		drawlist();

		$.mobile.loading( "hide" );

	}, function(){
		$.mobile.loading( "hide" );
		alert("No se pudo conectar Bluetooth");
	});	
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
	$.mobile.loading( "show" );
	bluetoothSerial.isConnected(function(){
		$.mobile.loading( "hide" );
	}, function(){
			bluetoothSerial.connect(bluelist[id].address, function(){ 
				$.mobile.changePage("#pslider");		
				$.mobile.loading( "hide" );
			}, function(){ 
				$.mobile.loading( "hide" );
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

function myclose(){
	if (navigator.app) {
	    navigator.app.exitApp();
	} else if (navigator.device) {
	    navigator.device.exitApp();
	} else {
	    window.close();
	}
}
