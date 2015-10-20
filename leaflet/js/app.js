/*
    script file for index.html
    dependencies: leaflet, jquery

    Open Street Maps tile layer URL template:
    http://{s}.tile.osm.org/{z}/{x}/{y}.png

    attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
*/

$(function() {
    'use strict';

    function createMap (loc, zoom) {
        var map = L.map('map').setView(loc, zoom); //accept parameter of id of div where map shows up! (can be smallerized). west longitude should be negative.

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.circleMarker(loc).addTo(map).bindPopup('<h2>beep beep</h2>' + '<img src="http://cdn.playbuzz.com/cdn/591a75e5-627b-4298-8fd0-663fe77a4c4d/da40aae6-762b-4d94-9273-9a99a61516ab.jpg"/>', {className: 'catImage'}); //can put any html in here!
        L.circleMarker([47.6097, -122.3331], {color: 'red', fillColor: '#f03', fillOpacity: 0.5}).addTo(map);
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
            createMap([pos.coords.latitude, pos.coords.longitude], 15);
        });
    } else {
        createMap([47.6097, -122.3331], 12);
    }
});