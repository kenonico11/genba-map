const map=L.map("map").setView([35.4437,139.6380],10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{

attribution:"© OpenStreetMap"

}).addTo(map);
