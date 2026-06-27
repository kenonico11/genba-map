// ===============================
// 現場マップ Ver1.1
// 地図・保存・一覧・削除
// ===============================

const map = L.map("map").setView([35.4437, 139.6380], 10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
}).addTo(map);

let genbaList = [];
let markers = [];

// 保存データ読込
const saved = localStorage.getItem("genbaList");

if (saved) {
    genbaList = JSON.parse(saved);

    genbaList.forEach(genba => {
        addMarker(genba);
    });

    renderList();
}

// 現場追加
document.getElementById("addBtn").addEventListener("click", async () => {

    const customer = document.getElementById("customer").value.trim();
    const address = document.getElementById("address").value.trim();
    const work = document.getElementById("work").value;
    const time = document.getElementById("time").value;

    if (!address) {
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

        saveData();

        addMarker(genba);

        renderList();

        map.setView([genba.lat, genba.lon], 15);

        document.getElementById("customer").value = "";
        document.getElementById("address").value = "";
        document.getElementById("time").value = "60";

    } catch (e) {

        console.log(e);

        alert("住所検索に失敗しました");

    }

});

function saveData() {

    localStorage.setItem(
        "genbaList",
        JSON.stringify(genbaList)
    );

}

function addMarker(genba) {

    const marker = L.marker([genba.lat, genba.lon]).addTo(map);

    marker.bindPopup(`
        <b>${genba.customer || "お客様名なし"}</b><br>
        ${genba.work}<br>
        ${genba.time}分<br>
        ${genba.address}
    `);

    markers.push(marker);

}

function renderList() {

    const list = document.getElementById("list");

    list.innerHTML = "";

    genbaList.forEach((genba, index) => {

        const div = document.createElement("div");

        div.style.border = "1px solid #ccc";
        div.style.padding = "8px";
        div.style.marginBottom = "8px";
        div.style.borderRadius = "6px";

        div.innerHTML = `
            <b>${genba.customer || "お客様名なし"}</b><br>
            ${genba.work}<br>
            ${genba.time}分<br>
            <button onclick="moveToGenba(${index})">地図へ</button>
            <button onclick="deleteGenba(${index})">削除</button>
        `;

        list.appendChild(div);

    });

}

window.moveToGenba = function(index){

    const g = genbaList[index];

    map.setView([g.lat, g.lon],16);

    markers[index].openPopup();

}

window.deleteGenba = function(index){

    if(!confirm("削除しますか？")) return;

    map.removeLayer(markers[index]);

    markers.splice(index,1);

    genbaList.splice(index,1);

    saveData();

    renderList();

}

const toggle = document.getElementById("toggle");
const panel = document.getElementById("panel");

toggle.onclick = () => {

    panel.classList.toggle("hide");

    if(panel.classList.contains("hide")){

        toggle.innerHTML="▶";

    }else{

        toggle.innerHTML="◀";

    }

    setTimeout(()=>{
        map.invalidateSize();
    },300);

}
