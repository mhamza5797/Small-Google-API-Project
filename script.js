let map, infoWindow, service;
let markers = [];
let SkatingRingsMarkers = [];
let MuseumsMarkers = [];
let waterFallMarkers = [];
let inDoorSaktingRingMarkers = [];
let outDoorSkatingRingsMarkers = [];

let img = document.createElement("img");

const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");
const btn3 = document.querySelector(".btn3");
const btn4 = document.querySelector(".btn4");
const btn5 = document.querySelector(".btn5");
let searchMarker = document.querySelector("#searchMarker");

const filterAllSkating = document.querySelector("#AllSkatingRings");
const filterAllMuseums = document.querySelector("#AllMuseums");
const filterAllWaterFalls = document.querySelector("#AllWaterFalls");
const showPosition = document.querySelector(".geolocation");

showPosition.addEventListener('click', showCurrentLocation);

btn1.addEventListener("click", () => {
  deleteMarkers(inDoorSaktingRingMarkers); 
  findInDoorSkatingRinks();  
});
btn2.addEventListener("click",  () => {
  deleteMarkers(outDoorSkatingRingsMarkers); 
  findOutDoorSkatingRinks();  
});
btn3.addEventListener("click",  () => {
  deleteMarkers(SkatingRingsMarkers);  
  findAllSkatingRinks(); 
});
btn4.addEventListener("click",  () => {
  deleteMarkers(MuseumsMarkers); 
  findAllMuseums();  
});
btn5.addEventListener("click",  () => {
  deleteMarkers(waterFallMarkers); 
  findAllWaterFalls();  
});



async function initMap() {
  const defaultLocation = { lat: 43.2557, lng: -79.8711 };
  let infoWindow = new google.maps.InfoWindow();


  map = new google.maps.Map(document.getElementById("map"), {
    center: defaultLocation,
    zoom: 12,
  });

  infoWindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);
  findAllMuseums();
  findAllSkatingRinks();
  findAllWaterFalls();

  const image = img.src = "https://img.icons8.com/?size=40&id=80319&format=png";

  let input = document.querySelector("#searchbox");
  let autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  const marker = new google.maps.Marker({
    position: input,
    map,
    icon: image,
  });

  

  google.maps.event.addListener(autocomplete, "place_changed", () => {
    let place = autocomplete.getPlace();
   
    if(place.geometry.viewport){
      map.fitBounds(place.geometry.viewport)
    }else{
      map.setCenter(place.geometry.location)
      map.setZoom(12)
    }
    
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
  });

  google.maps.event.addListener(marker, "click", () => {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat: marker.getPosition().lat(), lng: marker.getPosition().lng() };
  
    geocoder.geocode({ location: latlng }, (results, status) => {
   
        const contentDiv = document.createElement('div');
  
        const setParagraph = document.createElement('p');
        setParagraph.textContent = 'My Location'; 
  
        const addressParagraph = document.createElement('p');
        addressParagraph.textContent = results[0].formatted_address; 
  
        const directionsLink = document.createElement('a');
        const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latlng.lat},${latlng.lng}`;
        directionsLink.setAttribute('href', directionsUrl);
        directionsLink.setAttribute('target', '_blank');
        directionsLink.textContent = 'Get Directions';
  
        contentDiv.appendChild(setParagraph);
        contentDiv.appendChild(addressParagraph); 
        contentDiv.appendChild(directionsLink);

        infoWindow.setContent(contentDiv);
        infoWindow.open(map, marker);

    });
  });

  google.maps.event.addListener(map, "click", () => {
    if (infoWindow) {
      infoWindow.close();
    }
  });

}


function showCurrentLocation() {
  let infoWindow = new google.maps.InfoWindow();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        const image = img.src = "https://img.icons8.com/?size=40&id=80319&format=png";

        const marker = new google.maps.Marker({
          position: pos,
          map,
          icon: image,
        });

  google.maps.event.addListener(marker, "click", () => {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat: marker.getPosition().lat(), lng: marker.getPosition().lng() };
  
    geocoder.geocode({ location: latlng }, (results, status) => {
   
        const contentDiv = document.createElement('div');
  
        const setParagraph = document.createElement('p');
        setParagraph.textContent = 'My Location'; 
  
        const addressParagraph = document.createElement('p');
        addressParagraph.textContent = results[0].formatted_address; 
  
        contentDiv.appendChild(setParagraph);
        contentDiv.appendChild(addressParagraph); 

        infoWindow.setContent(contentDiv);
        infoWindow.open(map, marker);

    });
  });

  google.maps.event.addListener(map, "click", () => {
    if (infoWindow) {
      infoWindow.close();
    }
  });
        

        map.setCenter(pos);
      },
      () => handleLocationError(true, map.getCenter())
    );
  } else {
    handleLocationError(false, map.getCenter());
  }
}


function findInDoorSkatingRinks() {

  deleteAllMarkers();

  const request = {
    location: map.getCenter(),
    radius: '5000',
    type: ['skating ring'],
    keyword: 'indoor ice skating'
  };

  let infoWindow = new google.maps.InfoWindow();

  service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      results.forEach(place => {
        if (!place.geometry || !place.geometry.location) return;

        const image = img.src = "https://img.icons8.com/?size=40&id=cLyDZt57ga8m&format=png";

        const marker = new google.maps.Marker({
          map,
          position: place.geometry.location,
          icon: image,
        });
        inDoorSaktingRingMarkers.push(marker);

        google.maps.event.addListener(marker, "click", () => {
          const geocoder = new google.maps.Geocoder();
          const latlng = { lat: marker.getPosition().lat(), lng: marker.getPosition().lng() };
        
          geocoder.geocode({ location: latlng }, (results, status) => {
         
              const contentDiv = document.createElement('div');

              const nameParagraph = document.createElement('p');
              nameParagraph.textContent = place.name; 
        
              const addressParagraph = document.createElement('p');
              addressParagraph.textContent = results[0].formatted_address; 
        
              const directionsLink = document.createElement('a');
              const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latlng.lat},${latlng.lng}`;
              directionsLink.setAttribute('href', directionsUrl);
              directionsLink.setAttribute('target', '_blank');
              directionsLink.textContent = 'Get Directions';

              contentDiv.appendChild(nameParagraph);
              contentDiv.appendChild(addressParagraph); 
              contentDiv.appendChild(directionsLink);
      
              infoWindow.setContent(contentDiv);
              infoWindow.open(map, marker);
      
          });

         google.maps.event.addListener(map, "click", () => {
            if (infoWindow) {
              infoWindow.close();
            }
          });

        });
      });
    }
  });

}


function findOutDoorSkatingRinks() {
  
  deleteAllMarkers();

  const request = {
    location: map.getCenter(),
    radius: '5000',
    type: ['skating ring'],
    keyword: 'outdoor ice skating'
  };

  let infoWindow = new google.maps.InfoWindow();

  const image = img.src = "https://img.icons8.com/?size=40&id=cLyDZt57ga8m&format=png";

  service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      results.forEach(place => {
        if (!place.geometry || !place.geometry.location) return;

        const marker = new google.maps.Marker({
          map,
          position: place.geometry.location,
          icon: image,
        });
        outDoorSkatingRingsMarkers.push(marker);

        google.maps.event.addListener(marker, "click", () => {
          const geocoder = new google.maps.Geocoder();
          const latlng = { lat: marker.getPosition().lat(), lng: marker.getPosition().lng() };
        
          geocoder.geocode({ location: latlng }, (results, status) => {
         
              const contentDiv = document.createElement('div');

              const nameParagraph = document.createElement('p');
              nameParagraph.textContent = place.name; 
        
              const addressParagraph = document.createElement('p');
              addressParagraph.textContent = results[0].formatted_address; 
        
              const directionsLink = document.createElement('a');
              const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latlng.lat},${latlng.lng}`;
              directionsLink.setAttribute('href', directionsUrl);
              directionsLink.setAttribute('target', '_blank');
              directionsLink.textContent = 'Get Directions';

              contentDiv.appendChild(nameParagraph);
              contentDiv.appendChild(addressParagraph); 
              contentDiv.appendChild(directionsLink);
      
              infoWindow.setContent(contentDiv);
              infoWindow.open(map, marker);
      
          });

         google.maps.event.addListener(map, "click", () => {
            if (infoWindow) {
              infoWindow.close();
            }
          });

        });
      });
    }
  });

}

function findAllSkatingRinks() {

  deleteAllMarkers();

  const request = {
    location: map.getCenter(),
    radius: '5000',
    type: ['skating ring'],
    keyword: 'ice_skating'
  };

  let infoWindow = new google.maps.InfoWindow();

  const image = img.src = "https://img.icons8.com/?size=40&id=cLyDZt57ga8m&format=png";
  
  service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      results.forEach(place => {
        if (!place.geometry || !place.geometry.location) return;

        const marker = new google.maps.Marker({
          map,
          position: place.geometry.location,
          icon: image,
        });
        SkatingRingsMarkers.push(marker);

        google.maps.event.addListener(marker, "click", () => {
          const geocoder = new google.maps.Geocoder();
          const latlng = { lat: marker.getPosition().lat(), lng: marker.getPosition().lng() };
        
          geocoder.geocode({ location: latlng }, (results, status) => {
         
              const contentDiv = document.createElement('div');

              const nameParagraph = document.createElement('p');
              nameParagraph.textContent = place.name; 
        
              const addressParagraph = document.createElement('p');
              addressParagraph.textContent = results[0].formatted_address; 
        
              const directionsLink = document.createElement('a');
              const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latlng.lat},${latlng.lng}`;
              directionsLink.setAttribute('href', directionsUrl);
              directionsLink.setAttribute('target', '_blank');
              directionsLink.textContent = 'Get Directions';

              contentDiv.appendChild(nameParagraph);
              contentDiv.appendChild(addressParagraph); 
              contentDiv.appendChild(directionsLink);
      
              infoWindow.setContent(contentDiv);
              infoWindow.open(map, marker);
      
          });

         google.maps.event.addListener(map, "click", () => {
            if (infoWindow) {
              infoWindow.close();
            }
          });

        });
      });
    }
  });

}

function findAllMuseums() {
  
  deleteAllMarkers();

  const request = {
    location: map.getCenter(),
    radius: '5000',
    type: ['Museums'],
    keyword: 'museums'
  };

  let infoWindow = new google.maps.InfoWindow();

  const image = img.src = "https://img.icons8.com/?size=40&id=VWmwqW08SYpY&format=png";
  
  service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      results.forEach(place => {
        if (!place.geometry || !place.geometry.location) return;

        const marker = new google.maps.Marker({
          map,
          position: place.geometry.location,
          icon: image,
        });
        MuseumsMarkers.push(marker);

        google.maps.event.addListener(marker, "click", () => {
          const geocoder = new google.maps.Geocoder();
          const latlng = { lat: marker.getPosition().lat(), lng: marker.getPosition().lng() };
        
          geocoder.geocode({ location: latlng }, (results, status) => {
         
              const contentDiv = document.createElement('div');

              const nameParagraph = document.createElement('p');
              nameParagraph.textContent = place.name; 
        
              const addressParagraph = document.createElement('p');
              addressParagraph.textContent = results[0].formatted_address; 
        
              const directionsLink = document.createElement('a');
              const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latlng.lat},${latlng.lng}`;
              directionsLink.setAttribute('href', directionsUrl);
              directionsLink.setAttribute('target', '_blank');
              directionsLink.textContent = 'Get Directions';

              contentDiv.appendChild(nameParagraph);
              contentDiv.appendChild(addressParagraph); 
              contentDiv.appendChild(directionsLink);
      
              infoWindow.setContent(contentDiv);
              infoWindow.open(map, marker);
      
          });

         google.maps.event.addListener(map, "click", () => {
            if (infoWindow) {
              infoWindow.close();
            }
          });

        });
      });
    }
  });

}

function findAllWaterFalls() {
  
  deleteAllMarkers();

  const request = {
    location: map.getCenter(),
    radius: '5000',
    type: ['WaterFalls'],
    keyword: 'waterfalls'
  };

  let infoWindow = new google.maps.InfoWindow();

  const image = img.src = "https://img.icons8.com/?size=40&id=TtLhFutHlpps&format=png";
  
  service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      results.forEach(place => {
        if (!place.geometry || !place.geometry.location) return;

        const marker = new google.maps.Marker({
          map,
          position: place.geometry.location,
          icon: image,
        });
        waterFallMarkers.push(marker);

        google.maps.event.addListener(marker, "click", () => {
          const geocoder = new google.maps.Geocoder();
          const latlng = { lat: marker.getPosition().lat(), lng: marker.getPosition().lng() };
        
          geocoder.geocode({ location: latlng }, (results, status) => {
         
              const contentDiv = document.createElement('div');

              const nameParagraph = document.createElement('p');
              nameParagraph.textContent = place.name; 
        
              const addressParagraph = document.createElement('p');
              addressParagraph.textContent = results[0].formatted_address; 
        
              const directionsLink = document.createElement('a');
              const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latlng.lat},${latlng.lng}`;
              directionsLink.setAttribute('href', directionsUrl);
              directionsLink.setAttribute('target', '_blank');
              directionsLink.textContent = 'Get Directions';

              contentDiv.appendChild(nameParagraph);
              contentDiv.appendChild(addressParagraph); 
              contentDiv.appendChild(directionsLink);
      
              infoWindow.setContent(contentDiv);
              infoWindow.open(map, marker);
      
          });

         google.maps.event.addListener(map, "click", () => {
            if (infoWindow) {
              infoWindow.close();
            }
          });

        });
      });
    }
  });

}


function addMarker() {
  const marker = new google.maps.Marker({
    position: place.geometry.location,
    map,
  });

  markers.push(marker);
}

function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function hideMarkers() {
  setMapOnAll(null);
}


function deleteMarkers(markersArray) {
  markersArray.forEach(marker => {
    marker.setMap(null);
  });
  markersArray.length = 0; 
}

function deleteAllMarkers(){
  deleteMarkers(SkatingRingsMarkers);
  deleteMarkers(MuseumsMarkers);
  deleteMarkers(waterFallMarkers);
  deleteMarkers(inDoorSaktingRingMarkers);
  deleteMarkers(outDoorSkatingRingsMarkers);
}

let filterStates = {
  skatingRinks: false,
  museums: false,
  waterFalls: false
};

function updateMarkersBasedOnFilters() {
  deleteAllMarkers();

  if (filterStates.skatingRinks) {
    findAllSkatingRinks(); 
  }
  if (filterStates.museums) {
    findAllMuseums(); 
  }
  if (filterStates.waterFalls) {
    findAllWaterFalls(); 
  }
}

function filters() {
  filterAllSkating.addEventListener("change", () => {
    filterStates.skatingRinks = filterAllSkating.checked;
    updateMarkersBasedOnFilters();
  });

  filterAllMuseums.addEventListener("change", () => {
    filterStates.museums = filterAllMuseums.checked;
    updateMarkersBasedOnFilters();
  });

  filterAllWaterFalls.addEventListener("change", () => {
    filterStates.waterFalls = filterAllWaterFalls.checked;
    updateMarkersBasedOnFilters();
  });
}

filters();

