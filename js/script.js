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

			fakeMakers = [
				{lat: -41.206970214843, lng: 174.907836914062},
				{lat: -41.206970214843, lng: 175.907836914062}
			];
			// console.log(markers);
			initMap(fakeMakers);
			// initMap(markers);
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
	let mapCenter = {};
    mapCenter.lat = allMarkers.map(item => item.lat)
        .reduce((total, value) => (total) + (value), 0)/allMarkers.length;
    mapCenter.lng = allMarkers.map(item => item.lng)
        .reduce((total, value) => (total) + (value), 0)/allMarkers.length;
	var marker =[]
	// The location of Wellington
	var wellington = {lat: -41.2865, lng: 174.7762};
	// The map, centered at Wellington
	var map = new google.maps.Map(
	    document.getElementById('map'), {zoom: 8, center: mapCenter});
	// The marker, positioned at Welliington
	var i;
	var myIcon = {
        url : 'http://maps.google.com/mapfiles/kml/shapes/sailing.png',
        scaledSize: new google.maps.Size(50, 50)
      };



    


	for (let i =0; i<allMarkers.length; i++) {



	  let latLng = {lat:allMarkers[i].lat , lng:allMarkers[i].lng }
		  // console.log(latLng);


					let marker = new google.maps.Marker({
						position: latLng,
						map: map
					});

					let contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">LAT: '+allMarkers[i].lng+'</h1>'+
      '<h1 class="firstHeading">LNG: '+allMarkers[i].lat+'</h1>'+
      '<div id="bodyContent">'+
      '<p>MMI:</p>'+
      '<p>Count:</p>'+
      '</div>'+
      '</div>';

					  var infowindow = new google.maps.InfoWindow({
    	content: contentString
  		});

							  
						// icon : myIcon
						  marker.addListener('click', function() {
    						infowindow.open(map, this);
  							});

}

}
}); //document ready
