const map = L.map("map").setView([35.4437, 139.6380], 10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
}).addTo(map);

document.getElementById("addBtn").addEventListener("click", () => {

    const customer = document.getElementById("customer").value;
    const work = document.getElementById("work").value;
    const time = document.getElementById("time").value;

    const marker = L.marker([35.4437,139.6380]).addTo(map);

    marker.bindPopup(`
        <b>${customer}</b><br>
        ${work}<br>
        ${time}分
    `);

});
