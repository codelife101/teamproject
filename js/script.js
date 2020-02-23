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



    


	for (i =0; i<allMarkers.length; i++) {



	  var latLng = {lat:allMarkers[i].lat , lng:allMarkers[i].lng }
		  // console.log(latLng);


					var marker = new google.maps.Marker({
						position: latLng,
						map: map
					});

					  var infowindow = new google.maps.InfoWindow({
    	content: contentString
  		});

							  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">'+allMarkers[i].lng+'</h1>'+
      '<div id="bodyContent">'+
      '<p><b>vdksl</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';
						// icon : myIcon
						  marker.addListener('click', function() {
    						infowindow.open(map, marker);
  							});

}

}
}); //document ready
