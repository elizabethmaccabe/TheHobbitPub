//Side Nav for Mobile and Tablet
$(document).ready(function()
{
    $('.sidenav').sidenav();
});

//Collapsibles for Drinks Menu
$(document).ready(function()
{
    $('.collapsible').collapsible();
});

//Google Maps on Contact Page
function map()
{
    var center = new google.maps.LatLng(50.9188, -1.3952)
    
    var mapProp = 
    {
        center: center,
        zoom: 14,
    };
    
    var map = new google.maps.Map(document.getElementById("map"), mapProp);
    var marker = new google.maps.Marker
    ({
        position: center,
    });
    
    marker.setMap(map);
}