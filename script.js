const map = L.map("map").setView([35.4437, 139.6380], 10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
}).addTo(map);

document.getElementById("addBtn").addEventListener("click", async () => {

    const customer = document.getElementById("customer").value;
    const address = document.getElementById("address").value;
    const work = document.getElementById("work").value;
    const time = document.getElementById("time").value;

    if(address===""){
        alert("住所を入力してください");
        return;
    }

    const url =
`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(address)}`;

    const res = await fetch(url,{
        headers:{
            "Accept":"application/json"
        }
    });

    const data = await res.json();

    if(data.length===0){
        alert("住所が見つかりません");
        return;
    }

    const lat = Number(data[0].lat);
    const lon = Number(data[0].lon);

    map.setView([lat,lon],16);

    const marker=L.marker([lat,lon]).addTo(map);

    marker.bindPopup(`
        <b>${customer}</b><br>
        ${work}<br>
        ${time}分<br>
        ${address}
    `);

});
