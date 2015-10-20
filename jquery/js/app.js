/*
    script for the index.html page
    dependencies: jquery

    open weather API: 
    http://api.openweathermap.org/data/2.5/weather?zip=98195,us&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f
*/

//when the DOM content has beeb koaded...
$(function() {
    'use strict';
    $('a').attr('target', '_blank'); //opens links in new tabs
    $('article').hide().fadeIn(1000); //makes stuff in article section fade in
    $('#toggle-article').click(function() { //what happens when u click this?
        $('article').fadeToggle(); //affects article
    });

    var url = 'http://api.openweathermap.org/data/2.5/weather?zip=98195,us&units=imperial&appid=bd82977b86bf27fb59a04b61b657fb6f';
    $.getJSON(url).then(function(data) { //then == once the data comes back. IMPORTANT! callback function
        console.log(data);
        var temperature = data.main.temp;
        $('#temp').text(Math.round(temperature));
    });

    console.log('test');

});