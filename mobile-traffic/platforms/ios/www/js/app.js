/*
    app.js
    main script file for this mapping application
    source data URL: https://data.seattle.gov/resource/65fc-btcc.json

    Traffic Cams Assignment js
*/

$(function() {
   'use strict';

    function createInitialMap (loc, zoom) {
        var map = L.map('map').setView(loc, zoom);

        L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWluYXRhcmkiLCJhIjoiY2lmdTE2ZzU4MWhuY3RnbHkxYWpsOXRlaiJ9.wO7T0GN1zFwTP1idsA77-g', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        var mapDataUrl = 'https://data.seattle.gov/resource/65fc-btcc.json';

        $.getJSON(mapDataUrl).then(function (data) {

            function removeMarkers(markers) {
                markers.forEach(function(marker){
                    map.removeLayer(marker);
                })
            }

            function addMarkers(filteredCameras, map) {
                removeMarkers(cameras.map(function(cam){
                        return cam.element;
                }));

                filteredCameras.forEach(function(cam) {
                    map.addLayer(cam.element);
                });
                
                var numWSDOT = filteredCameras.filter(function(cam) {
                    return cam.data.ownershipcd === 'WSDOT'
                }).length;
                var numSDOT = filteredCameras.filter(function(cam) {
                    return cam.data.ownershipcd === 'SDOT'
                }).length;
                document.getElementById("CounterText").innerHTML = "There are " + numWSDOT + " WSDOT Cameras and " + numSDOT + " SDOT Cameras showing!";
            }

            var cameras = data.map(function(cam) {
                var element;
                if (cam.ownershipcd == 'WSDOT') {
                    element = L.circleMarker([cam.location.latitude, cam.location.longitude], {
                        color: 'red',
                        fillColor: '#f03',
                        fillOpacity: 0.5
                    }).bindPopup('<h2>' + cam.cameralabel + '</h2><img src="' + cam.imageurl.url + '"/>', {className: 'trafficCam'});

                } else {
                    element = L.circleMarker([cam.location.latitude, cam.location.longitude]).bindPopup('<h2>' + cam.cameralabel + '</h2><img src="' + cam.imageurl.url + '"/>', {className: 'trafficCam'});
                }

                return {
                    element: element,
                    data: cam
                }
            });

            var markerFilter = document.getElementById('camera-filter-field');
            markerFilter.addEventListener('keyup', function () {
                var filter = this.value.toLowerCase();
                var filteredCams = cameras.filter(function(cam) {
                    return cam.data.cameralabel.toLowerCase().indexOf(filter) >= 0;
                });
                addMarkers(filteredCams, map);
            });
            addMarkers(cameras, map);
            map.fitBounds(map.getBounds(), {padding: [50, 20]});
        });
    }
    createInitialMap([47.6097, -122.3331], 12);
});