console.log('geonet');

$(document).ready(function(){
	//accessing key from json file
	var myKey = JSON.parse(apiKey);
	console.log(myKey[0]);
	myKey = myKey[0].key;
	console.log(myKey);



	$.ajax({
	  url : 'https://api.geonet.org.nz/intensity?type=reported',
		type :'GET',
		dataType :'json',
		success:function(data){
			console.log(data);
			var markers =[];

			var i;

			for (i = 0; i < data.features.length; i++) {
					var obj = {};
				 // console.log('longitude:' , data.features[i].geometry.coordinates[0]);
		  	 // console.log('latitude:' , data.features[i].geometry.coordinates[1]);

				 obj.lat = JSON.parse(data.features[i].geometry.coordinates[1]);
				 obj.lng = JSON.parse(data.features[i].geometry.coordinates[0]);

				 markers.push(obj);


			}
			console.log(markers);
			initMap(markers);
		}, error:function(){
			console.log('error');
		}

	});//ajax


//dynamically creating script tag and appending to the html body including the apikey
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key='+ myKey ;
document.getElementsByTagName('body')[0].appendChild(script);



function initMap(allMarkers) {
	console.log(allMarkers);
	var marker =[]
	// The location of Wellington
	var wellington = {lat: -41.2865, lng: 174.7762};
	// The map, centered at Wellington
	var map = new google.maps.Map(
	    document.getElementById('map'), {zoom: 10, center: wellington});
	// The marker, positioned at Welliington
	var i;
	var myIcon = {
        url : 'http://maps.google.com/mapfiles/kml/shapes/sailing.png',
        scaledSize: new google.maps.Size(50, 50)
      };


	for (i =0; i<allMarkers.length; i++) {

	  var latLng = {lat:allMarkers[i].lat , lng:allMarkers[i].lng }
		  // console.log(latLng);
					var marker = new google.maps.Marker({
						position: latLng,
						map: map
						// icon : myIcon
					});


}

}
}); //document ready
