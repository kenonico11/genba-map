// =========================
// 現場マップ Ver1.0
// =========================

// 地図作成
const map = L.map("map").setView([35.4437, 139.6380], 10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
}).addTo(map);

// 保存用配列
let genbaList = [];

// 保存済みデータを読み込む
const saved = localStorage.getItem("genbaList");

if (saved) {

    genbaList = JSON.parse(saved);

    genbaList.forEach(addMarker);

}

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
            "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=" +
            encodeURIComponent(address);

        const res = await fetch(url);

        const data = await res.json();

        if (data.length === 0) {

            alert("住所が見つかりません");

            return;

        }

        const genba = {

            customer,
            address,
            work,
            time,
            lat: Number(data[0].lat),
            lon: Number(data[0].lon)

        };

        genbaList.push(genba);

        localStorage.setItem(
            "genbaList",
            JSON.stringify(genbaList)
        );

        addMarker(genba);

        map.setView([genba.lat, genba.lon], 16);

        document.getElementById("customer").value = "";
        document.getElementById("address").value = "";
        document.getElementById("time").value = "60";

    } catch (e) {

        console.error(e);

        alert("住所検索に失敗しました");

    }

});

// マーカー追加
function addMarker(genba) {

    const marker = L.marker([genba.lat, genba.lon]).addTo(map);

    marker.bindPopup(`
        <b>${genba.customer}</b><br>
        ${genba.work}<br>
        ${genba.time}分<br>
        ${genba.address}
    `);

}
