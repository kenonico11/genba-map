// 地図を作成
const map = L.map("map").setView([35.4437, 139.6380], 10);

// OpenStreetMapを表示
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
}).addTo(map);

// 「現場追加」ボタン
document.getElementById("addBtn").addEventListener("click", () => {

    const customer = document.getElementById("customer").value;
    const work = document.getElementById("work").value;
    const time = document.getElementById("time").value;

    // 仮の位置（横浜駅）
    const lat = 35.4660;
    const lon = 139.6227;

    const marker = L.marker([lat, lon]).addTo(map);

    marker.bindPopup(`
        <b>${customer}</b><br>
        作業：${work}<br>
        時間：${time}分
    `);

    map.setView([lat, lon], 15);

});
