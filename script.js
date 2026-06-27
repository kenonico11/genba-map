// 地図を作成
const map = L.map("map").setView([35.4437, 139.6380], 10);
let genbaList = [];

// OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
}).addTo(map);

// 現場追加
document.getElementById("addBtn").addEventListener("click", async () => {

    const customer = document.getElementById("customer").value.trim();
    const address = document.getElementById("address").value.trim();
    const work = document.getElementById("work").value;
    const time = document.getElementById("time").value;

    if (address === "") {
        alert("住所を入力してください");
        return;
    }

    try {

        const url =
        "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q="
        + encodeURIComponent(address);

        const res = await fetch(url);

        const data = await res.json();

        if (data.length === 0) {
            alert("住所が見つかりません");
            return;
        }

        const lat = Number(data[0].lat);
        const lon = Number(data[0].lon);

        const marker = L.marker([lat, lon]).addTo(map);

        marker.bindPopup(`
        genbaList.push({
    customer,
    address,
    work,
    time,
    lat,
    lon
});

localStorage.setItem(
    "genbaList",
    JSON.stringify(genbaList)
);
            <b>${customer}</b><br>
            ${work}<br>
            ${time}分<br>
            ${address}
        `);

        map.setView([lat, lon], 16);

    } catch (e) {

        alert("住所検索に失敗しました");

        console.log(e);

    }

});
