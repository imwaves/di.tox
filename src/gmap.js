function initMap () {
  // The location of Uluru
  const position = { lat: 41.6897092, lng: 44.8061863 };
  // The map, centered at position
  const map = new google.maps.Map(
    document.getElementById('gmap'),
    {
      zoom: 16,
      center: position,
    }
  );

  const posMarker = new google.maps.Marker({
    position: position,
    map: map,
  });

  var request = {
    query: 'HOLOSEUM',
    fields: ['name', 'geometry'],
  };

  var service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      map.setCenter(results[0].geometry.location);
    }
  });


  function createMarker(place) {
    const infowindow = new google.maps.InfoWindow();

    if (!place.geometry || !place.geometry.location) return;

    posMarker.visible = false
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
    });

    google.maps.event.addListener(marker, "click", () => {
      infowindow.setContent(place.name || "");
      infowindow.open(map);
    });
  }
}
window.initMap = initMap;