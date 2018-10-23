//anything the Maps API is used for, creating markers, tracking click events on markers, making the map, refreshing the map.

var map;
// Create a new blank array for all the listing markers.
var markers = [];
// This global polygon variable is to ensure only ONE polygon is rendered.
var polygon = null;
function selectPlace(data, event) {
    if (event.shiftKey) {
        alert('hello')
    } else {
        //do normal action
        alert(JSON.stringify(data)) //data eg. {"name":"Lady of LÃ³rien","category":"Fictional"}
        //createMarker({title: data.title, location: data.location});
    }
}
function createMarker(locations) {
    var largeInfowindow = new google.maps.InfoWindow();


    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
    var highlightedIcon = makeMarkerIcon('FFFF24');

    // Style the markers a bit. This will be our listing marker icon.
    var defaultIcon = makeMarkerIcon('0091ff');
// Get the position from the location array.
    var position = locations.location;
    var title = locations.title;
    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        icon: defaultIcon,
        id: '1'
    });
    // Push the marker to our array of markers.
    markers.push(marker);
    // Create an onclick event to open the large infowindow at each marker.
    marker.addListener('click', function() {
        populateInfoWindow(this, largeInfowindow);
    });
    // Two event listeners - one for mouseover, one for mouseout,
    // to change the colors back and forth.
    marker.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
    });
    marker.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
    });
    return {position: position, title: title, marker: marker};
}

//teakes locations array
function createMultipleMarkers(locations, i, map) {
    var largeInfowindow = new google.maps.InfoWindow();


    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
    var highlightedIcon = makeMarkerIcon('FFFF24');

    // Style the markers a bit. This will be our listing marker icon.
    var defaultIcon = makeMarkerIcon('0091ff');
// Get the position from the location array.
    var position = locations[i].location;
    var title = locations[i].title;
    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        icon: defaultIcon,
        map: map,
        id: i
    });
    // Push the marker to our array of markers.
    markers.push(marker);
    // Create an onclick event to open the large infowindow at each marker.
    marker.addListener('click', function() {
        populateInfoWindow(this, largeInfowindow);
    });
    // Two event listeners - one for mouseover, one for mouseout,
    // to change the colors back and forth.
    marker.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
    });
    marker.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
    });
    return {position: position, title: title, marker: marker};
}

// Sets the map on all markers in the array.
function setMapOnAll(markersArray, map) {
    for (var i = 0; i < markersArray.length; i++) {
        markersArray[i].setMap(map);
    }
}
// Adds a marker to the map and push to the array.
function addMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}
function initMap() {
    // Create a styles array to use with the map.
    var styles = [
        {
            featureType: 'water',
            stylers: [
                { color: '#19a0d8' }
            ]
        },{
            featureType: 'administrative',
            elementType: 'labels.text.stroke',
            stylers: [
                { color: '#ffffff' },
                { weight: 6 }
            ]
        },{
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [
                { color: '#e85113' }
            ]
        },{
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
                { color: '#efe9e4' },
                { lightness: -40 }
            ]
        },{
            featureType: 'transit.station',
            stylers: [
                { weight: 9 },
                { hue: '#e85113' }
            ]
        },{
            featureType: 'road.highway',
            elementType: 'labels.icon',
            stylers: [
                { visibility: 'off' }
            ]
        },{
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [
                { lightness: 100 }
            ]
        },{
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
                { lightness: -100 }
            ]
        },{
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
                { visibility: 'on' },
                { color: '#f0e4d3' }
            ]
        },{
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
                { color: '#efe9e4' },
                { lightness: -25 }
            ]
        }
    ];
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 34.0029, lng: -84.1446},
        zoom: 10,
        styles: styles,
        mapTypeControl: false
    });
    // These are the real estate listings that will be shown to the user.
    // Normally we'd have these in a database instead.
    var locations = [
        {title: 'Sweet Hut Bakery and Cafe', location: {lat: 33.961378, lng: -84.136208}},
        {title: 'JeJu Sauna', location: {lat: 33.9567, lng: -84.1313}},
        {title: 'Avalon', location: {lat: 34.0704, lng: -84.2765}},
        {title: 'Lake Lanier Islands Park', location: {lat: 34.1767664, lng: -84.0254638}},
        {title: 'Stone Summit Climbing and Fitness Gym', location: {lat: 33.884895, lng: -84.267517}},
        {title: 'Boat Rock Outdoor Bouldering Area', location: {lat: 33.7219, lng: -84.5641}},
        {title: 'JINYA Ramen Bar', location: {lat: 33.919203, lng: -84.379007}},
        {title: 'Sharetea', location: {lat: 33.9184, lng: -84.3775}}
    ];
    // Initialize the drawing manager.
    var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT,
            drawingModes: [
                google.maps.drawing.OverlayType.POLYGON
            ]
        }
    });

    //show markers and list after map initializes
    listView();




    document.getElementById('show-listings').addEventListener('click', showListings);
    document.getElementById('hide-listings').addEventListener('click', hideListings);
    document.getElementById('toggle-drawing').addEventListener('click', function() {
        toggleDrawing(drawingManager);
    });
    document.getElementById('zoom-to-area').addEventListener('click', function() {
        zoomToArea();
    });
    document.getElementById('search-within-time').addEventListener('click', function() {
        searchWithinTime();
    });
    // Add an event listener so that the polygon is captured,  call the
    // searchWithinPolygon function. This will show the markers in the polygon,
    // and hide any outside of it.
    drawingManager.addListener('overlaycomplete', function(event) {
        // First, check if there is an existing polygon.
        // If there is, get rid of it and remove the markers
        if (polygon) {
            polygon.setMap(null);
            hideListings(markers);
        }
        // Switching the drawing mode to the HAND (i.e., no longer drawing).
        drawingManager.setDrawingMode(null);
        // Creating a new editable polygon from the overlay.
        polygon = event.overlay;
        polygon.setEditable(true);
        // Searching within the polygon.
        searchWithinPolygon(polygon);
        // Make sure the search is re-done if the poly is changed.
        polygon.getPath().addListener('set_at', searchWithinPolygon);
        polygon.getPath().addListener('insert_at', searchWithinPolygon);
    });
}
// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        // Clear the infowindow content to give the streetview time to load.
        infowindow.setContent('');
        infowindow.marker = marker;
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });
        var streetViewService = new google.maps.StreetViewService();
        var radius = 50;
        // In case the status is OK, which means the pano was found, compute the
        // position of the streetview image, then calculate the heading, then get a
        // panorama from that and set the options
        function getStreetView(data, status) {
            if (status == google.maps.StreetViewStatus.OK) {
                var nearStreetViewLocation = data.location.latLng;
                var heading = google.maps.geometry.spherical.computeHeading(
                    nearStreetViewLocation, marker.position);
                infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
                var panoramaOptions = {
                    position: nearStreetViewLocation,
                    pov: {
                        heading: heading,
                        pitch: 30
                    }
                };
                var panorama = new google.maps.StreetViewPanorama(
                    document.getElementById('pano'), panoramaOptions);
            } else {
                infowindow.setContent('<div>' + marker.title + '</div>' +
                    '<div>No Street View Found</div>');
            }
        }
        // Use streetview service to get the closest streetview image within
        // 50 meters of the markers position
        streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
        // Open the infowindow on the correct marker.
        infowindow.open(map, marker);
    }
}
// This function will loop through the markers array and display them all.
function showListings() {
    var bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
        bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);
}
// This function will loop through the listings and hide them all.
function hideListings() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
}
// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
        '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21,34));
    return markerImage;
}
// This shows and hides (respectively) the drawing options.
function toggleDrawing(drawingManager) {
    if (drawingManager.map) {
        drawingManager.setMap(null);
        // In case the user drew anything, get rid of the polygon
        if (polygon !== null) {
            polygon.setMap(null);
        }
    } else {
        drawingManager.setMap(map);
    }
}
// This function hides all markers outside the polygon,
// and shows only the ones within it. This is so that the
// user can specify an exact area of search.
function searchWithinPolygon() {
    for (var i = 0; i < markers.length; i++) {
        if (google.maps.geometry.poly.containsLocation(markers[i].position, polygon)) {
            markers[i].setMap(map);
        } else {
            markers[i].setMap(null);
        }
    }
}
// This function takes the input value in the find nearby area text input
// locates it, and then zooms into that area. This is so that the user can
// show all listings, then decide to focus on one area of the map.
function zoomToArea() {
    // Initialize the geocoder.
    var geocoder = new google.maps.Geocoder();
    // Get the address or place that the user entered.
    var address = document.getElementById('zoom-to-area-text').value;
    // Make sure the address isn't blank.
    if (address == '') {
        window.alert('You must enter an area, or address.');
    } else {
        // Geocode the address/area entered to get the center. Then, center the map
        // on it and zoom in
        geocoder.geocode(
            { address: address,
                componentRestrictions: {locality: 'New York'}
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    map.setCenter(results[0].geometry.location);
                    map.setZoom(15);
                } else {
                    window.alert('We could not find that location - try entering a more' +
                        ' specific place.');
                }
            });
    }
}
// This function allows the user to input a desired travel time, in
// minutes, and a travel mode, and a location - and only show the listings
// that are within that travel time (via that travel mode) of the location
function searchWithinTime() {
    // Initialize the distance matrix service.
    var distanceMatrixService = new google.maps.DistanceMatrixService;
    var address = document.getElementById('search-within-time-text').value;
    // Check to make sure the place entered isn't blank.
    if (address == '') {
        window.alert('You must enter an address.');
    } else {
        hideListings();
        // Use the distance matrix service to calculate the duration of the
        // routes between all our markers, and the destination address entered
        // by the user. Then put all the origins into an origin matrix.
        var origins = [];
        for (var i = 0; i < markers.length; i++) {
            origins[i] = markers[i].position;
        }
        var destination = address;
        var mode = document.getElementById('mode').value;
        // Now that both the origins and destination are defined, get all the
        // info for the distances between them.
        distanceMatrixService.getDistanceMatrix({
            origins: origins,
            destinations: [destination],
            travelMode: google.maps.TravelMode[mode],
            unitSystem: google.maps.UnitSystem.IMPERIAL,
        }, function(response, status) {
            if (status !== google.maps.DistanceMatrixStatus.OK) {
                window.alert('Error was: ' + status);
            } else {
                displayMarkersWithinTime(response);
            }
        });
    }
}
// This function will go through each of the results, and,
// if the distance is LESS than the value in the picker, show it on the map.
function displayMarkersWithinTime(response) {
    var maxDuration = document.getElementById('max-duration').value;
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;
    // Parse through the results, and get the distance and duration of each.
    // Because there might be  multiple origins and destinations we have a nested loop
    // Then, make sure at least 1 result was found.
    var atLeastOne = false;
    for (var i = 0; i < origins.length; i++) {
        var results = response.rows[i].elements;
        for (var j = 0; j < results.length; j++) {
            var element = results[j];
            if (element.status === "OK") {
                // The distance is returned in feet, but the TEXT is in miles. If we wanted to switch
                // the function to show markers within a user-entered DISTANCE, we would need the
                // value for distance, but for now we only need the text.
                var distanceText = element.distance.text;
                // Duration value is given in seconds so we make it MINUTES. We need both the value
                // and the text.
                var duration = element.duration.value / 60;
                var durationText = element.duration.text;
                if (duration <= maxDuration) {
                    //the origin [i] should = the markers[i]
                    markers[i].setMap(map);
                    atLeastOne = true;
                    // Create a mini infowindow to open immediately and contain the
                    // distance and duration
                    var infowindow = new google.maps.InfoWindow({
                        content: durationText + ' away, ' + distanceText +
                            '<div><input type=\"button\" value=\"View Route\" onclick =' +
                            '\"displayDirections(&quot;' + origins[i] + '&quot;);\"></input></div>'
                    });
                    infowindow.open(map, markers[i]);
                    // Put this in so that this small window closes if the user clicks
                    // the marker, when the big infowindow opens
                    markers[i].infowindow = infowindow;
                    google.maps.event.addListener(markers[i], 'click', function() {
                        this.infowindow.close();
                    });
                }
            }
        }
    }
    if (!atLeastOne) {
        window.alert('We could not find any locations within that distance!');
    }
}
// This function is in response to the user selecting "show route" on one
// of the markers within the calculated distance. This will display the route
// on the map.
function displayDirections(origin) {
    hideListings();
    var directionsService = new google.maps.DirectionsService;
    // Get the destination address from the user entered value.
    var destinationAddress =
        document.getElementById('search-within-time-text').value;
    // Get mode again from the user entered value.
    var mode = document.getElementById('mode').value;
    directionsService.route({
        // The origin is the passed in marker's position.
        origin: origin,
        // The destination is user entered address.
        destination: destinationAddress,
        travelMode: google.maps.TravelMode[mode]
    }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            var directionsDisplay = new google.maps.DirectionsRenderer({
                map: map,
                directions: response,
                draggable: true,
                polylineOptions: {
                    strokeColor: 'green'
                }
            });
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function listPlaces() {
    var SimpleListModel = function(items) {
        this.items = ko.observableArray(items);
        this.itemToAdd = ko.observable("");
        this.addItem = function() {
            if (this.itemToAdd() != "") {
                this.items.push(this.itemToAdd()); // Adds the item. Writing to the "items" observableArray causes any associated UI to update.
                this.itemToAdd(""); // Clears the text box, because it's bound to the "itemToAdd" observable
            }
        }.bind(this);  // Ensure that "this" is always this view model
    };

    ko.applyBindings(new SimpleListModel(["Alpha", "Beta", "Gamma"]));
}

function listView(){


        // Data from server
        var places = [
            { name: "Sweet Hut Bakery and Cafe", category: "Food", title: 'Sweet Hut Bakery and Cafe', location: {lat: 33.961378, lng: -84.136208}},
            { name: "Jeju Sauna", category: "Sauna", title: 'Jeju Sauna', location: {lat: 33.9567, lng: -84.1313}},
            { name: "Avalon", category: "Shopping", title: 'Avalon', location: {lat: 34.0704, lng: -84.2765}},
            { name: "Lake Lanier Islands Park", category: "Fitness", title: 'Lake Lanier Islands Park', location: {lat: 34.1767664, lng: -84.0254638}},
            { name: "Stone Summit Climbing and Fitness Gym", category: "Fitness", title: 'Stone Summit Climbing and Fitness Gym', location: {lat: 33.884895, lng: -84.267517}},
            { name: "Boat Rock Outdoor Bouldering Area", category: "Fitness", title: 'Boat Rock Outdoor Bouldering Area', location: {lat: 33.7219, lng: -84.5641}},
            { name: "JINYA Ramen Bar", category: "Food", title: 'JINYA Ramen Bar', location: {lat: 33.919203, lng: -84.379007}},
            { name: "Sharetea", category: "Food", title: 'Sharetea', location: {lat: 33.9184, lng: -84.3775}},
        ];

        // View Model
        function PeopleViewModel() {
            var self = this;


            // import starting data
            self.places = places;

            // currently selected category
            //self.selectedCategory = ko.observable("All");
            //availableCountries: ko.observableArray(['France', 'Germany', 'Spain'])
            self.categories = ko.observableArray(["All", "Food", "Fitness", "Shopping", "Sauna"]);
            self.selectedCategory = ko.observable("All");

            // filtered people list
            self.filteredPeople = ko.computed(function() {
                var category = self.selectedCategory();

                if(category === "All") {

                    //first clear all markers if markers array is not empty
                    if (markers.length >0){
                        deleteMarkers(markers);
                        markers = [];
                    }

                    // The following group uses the location array to create an array of markers on initialize.
                    for (var i = 0; i < places.length; i++) {
                        console.log(location[i]);
                        var __ret = createMultipleMarkers(self.places, i, map);
                    }
                    return self.places;
                } else {

                    //first clear all markers if markers array is not empty
                    if (markers.length >0){
                        deleteMarkers(markers);
                        markers = [];
                    }

                    var filteredPlaces = self.places.slice(); //clone the places array

                    //Obtain a new array of items that match the category selected
                    filteredPlaces = filteredPlaces.filter(function(person) {
                        return person.category === category;
                    });

                    //create markers for places that fit the category
                    for (var i = 0; i < filteredPlaces.length; i++) {
                        var __ret = createMultipleMarkers(filteredPlaces, i, map);
                    }

                    return filteredPlaces;
                }
            });


        }



        ko.applyBindings(new PeopleViewModel());
}