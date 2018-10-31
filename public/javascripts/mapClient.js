

let map;
// Create a new blank array for all the listing markers.
let markers = [];

// Create a "highlighted location" marker color for when the user
// mouses over the marker.
let highlightedIcon = makeMarkerIcon('FFFF24');

// Style the markers a bit. This will be our listing marker icon.
let defaultIcon = makeMarkerIcon('0091ff');



/**
 * Query FourSquare for specific data on venue
 * @param marker
 * @param infowindow
 * @param callback
 * @constructor
 */
function FourSquareFetch(marker, infowindow, callback) {


    const jqxhr = $.get(`https://api.foursquare.com/v2/venues/${marker.id}?client_id=NCFZZPUUTRBQAJGAAJMCCX1VOKO34QQI3BYYACN55PWKM5TF&client_secret=BBGFQZVWRTL1EAOJIZUMFPF5ZF5WASQ3CWHGOT1XFY5OFDBK&v=20181030`, function (data) {

        callback(data, marker, infowindow)
    })
        .fail(() => {
            alert('There was a problem requesting the FourSquare information for this marker');
        })

}

//marker bounce animation
function markerBounce(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function () {
        marker.setAnimation(null);
    }, 750);
}


function selectPlace(data, event) {

    for (var i = 0; i < markers.length; i++) {
        if (markers[i].getTitle() === data.title) {
            var largeInfowindow = new google.maps.InfoWindow();

            markers[i].setIcon(highlightedIcon);
            FourSquareFetch(markers[i], largeInfowindow, populateInfoWindow);
            //populateInfoWindow(markers[i], largeInfowindow);
            markers[i].setIcon(defaultIcon);
        }
    }

}


//takes locations array and creates the markers for each
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
    var venueID = locations[i].venueID;
    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        icon: defaultIcon,
        map: map,
        id: venueID
    });
    // Push the marker to our array of markers.
    markers.push(marker);
    // Create an onclick event to open the large infowindow at each marker.
    marker.addListener('click', function () {
        FourSquareFetch(this, largeInfowindow, populateInfoWindow)
        //populateInfoWindow(this, largeInfowindow);
    });
    // Two event listeners - one for mouseover, one for mouseout,
    // to change the colors back and forth.
    marker.addListener('mouseover', function () {
        this.setIcon(highlightedIcon);
    });
    marker.addListener('mouseout', function () {
        this.setIcon(defaultIcon);
    });
    return {position: position, title: title, marker: marker};
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
                {color: '#19a0d8'}
            ]
        }, {
            featureType: 'administrative',
            elementType: 'labels.text.stroke',
            stylers: [
                {color: '#ffffff'},
                {weight: 6}
            ]
        }, {
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [
                {color: '#e85113'}
            ]
        }, {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
                {color: '#efe9e4'},
                {lightness: -40}
            ]
        }, {
            featureType: 'transit.station',
            stylers: [
                {weight: 9},
                {hue: '#e85113'}
            ]
        }, {
            featureType: 'road.highway',
            elementType: 'labels.icon',
            stylers: [
                {visibility: 'off'}
            ]
        }, {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [
                {lightness: 100}
            ]
        }, {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
                {lightness: -100}
            ]
        }, {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
                {visibility: 'on'},
                {color: '#f0e4d3'}
            ]
        }, {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
                {color: '#efe9e4'},
                {lightness: -25}
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


    //show markers and list after map initializes
    listView();


}

// This function populates the infowindow when the marker is clicked.
function populateInfoWindow(data, marker, infowindow) {

    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        // Clear the infowindow content to give the streetview time to load.
        infowindow.setContent('');
        infowindow.marker = marker;
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function () {
            infowindow.marker = null;
        });
        var streetViewService = new google.maps.StreetViewService();
        var radius = 50;

        // In case the status is OK, which means the pano was found, compute the
        // position of the streetview image, then calculate the heading, then get a
        // panorama from that and set the options
        function getStreetView(data, status) {
            //use best known name from Foursquare, otherwise use marker title
            let title = data.hasOwnProperty('response') && data.response.hasOwnProperty('venue') && data.response.venue.hasOwnProperty('name') ? data.response.venue.name : marker.title;

            let url = data.hasOwnProperty('response') && data.response.hasOwnProperty('venue') && data.response.venue.hasOwnProperty('canonicalUrl') ? data.response.venue.canonicalUrl : 'No Url Found on FourSquare';
            let description = data.hasOwnProperty('response') && data.response.hasOwnProperty('venue') && data.response.venue.hasOwnProperty('description') ? data.response.venue.canonicalUrl : 'No description found on FourSquare';


            if (status == google.maps.StreetViewStatus.OK) {
                var nearStreetViewLocation = data.location.latLng;
                var heading = google.maps.geometry.spherical.computeHeading(
                    nearStreetViewLocation, marker.position);
                infowindow.setContent(`<div> ${title} </div> <div id="pano"></div> <div>${url}</div> <div>${description}</div>`);
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
                infowindow.setContent(`<div> ${title} </div> 
                    <div>No Street View Found</div>`);
            }
        }

        // Use streetview service to get the closest streetview image within
        // 50 meters of the markers position
        streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
        // Open the infowindow on the correct marker.
        infowindow.open(map, marker);
        markerBounce(marker); //animate marker on click
    }
}


// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
        '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
    return markerImage;
}


function listView() {


    // Data from server
    var places = [
        {
            name: "Sweet Hut Bakery and Cafe",
            category: "Food",
            title: 'Sweet Hut Bakery and Cafe',
            location: {lat: 33.961378, lng: -84.136208},
            venueID: '55abb4ff498e0ce438ee7554'
        },
        {
            name: "Jeju Sauna",
            category: "Sauna",
            title: 'Jeju Sauna',
            location: {lat: 33.9567, lng: -84.1313},
            venueID: '4a761ce0f964a52041e21fe3'
        },
        {
            name: "Avalon",
            category: "Shopping",
            title: 'Avalon',
            location: {lat: 34.0704, lng: -84.2765},
            venueID: '4f8dbdcce4b0003b52eab0e3'
        },
        {
            name: "Lake Lanier Islands Park",
            category: "Fitness",
            title: 'Lake Lanier Islands Park',
            location: {lat: 34.1767664, lng: -84.0254638}, venueID: '4b4b90bff964a52074a026e3'
        },
        {
            name: "Stone Summit Climbing and Fitness Gym",
            category: "Fitness",
            title: 'Stone Summit Climbing and Fitness Gym',
            location: {lat: 33.884895, lng: -84.267517}, venueID: '59f4fa6f5ba0466a8a68d152'
        },
        {
            name: "Boat Rock Outdoor Bouldering Area",
            category: "Fitness",
            title: 'Boat Rock Outdoor Bouldering Area',
            location: {lat: 33.7219, lng: -84.5641}, venueID: '4d45c3a5e198721e7b16c98b'
        },
        {
            name: "JINYA Ramen Bar",
            category: "Food",
            title: 'JINYA Ramen Bar',
            location: {lat: 33.919203, lng: -84.379007}, venueID: '576c8052498e086d556af39c'
        },
        {
            name: "Sharetea",
            category: "Food",
            title: 'Sharetea',
            location: {lat: 33.9184, lng: -84.3775},
            venueID: '5a7505d8d4cc98116ccad0dd'
        },
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
        self.filteredPeople = ko.computed(function () {
            var category = self.selectedCategory();

            if (category === "All") {

                //first clear all markers if markers array is not empty
                if (markers.length > 0) {
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
                if (markers.length > 0) {
                    deleteMarkers(markers);
                    markers = [];
                }

                var filteredPlaces = self.places.slice(); //clone the places array

                //Obtain a new array of items that match the category selected
                filteredPlaces = filteredPlaces.filter(function (person) {
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