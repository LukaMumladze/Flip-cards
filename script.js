document.querySelectorAll(".card").forEach((card) => {
	card.addEventListener("click", () => {
		card.classList.toggle("flipped");
	});
});

document.querySelectorAll(".return").forEach((button) => {
	button.addEventListener("click", (event) => {
		event.stopPropagation(); // Prevent the whole card from flipping
		button.closest(".card").classList.remove("flipped");
	});
});

const backgroundImages = [
  "https://images.unsplash.com/photo-1617201929478-8eedff7508f9?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1684175656218-70f1c6f442b9?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

];
document.querySelectorAll(".card").forEach((card, index) => {
  const backSide = card.querySelector(".back"); 
  if (backgroundImages[index]) {
    backSide.style.background = `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url('${backgroundImages[index]}') center/cover no-repeat`;
  }
});

function loadLeaflet() {
  const leafletCSS = document.createElement("link");
  leafletCSS.rel = "stylesheet";
  leafletCSS.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
  document.head.appendChild(leafletCSS);

  const leafletJS = document.createElement("script");
  leafletJS.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
  leafletJS.onload = initMaps; 
  document.body.appendChild(leafletJS);
}

function initMaps() {
  const locations = [
    { lat: 41.7151, lng: 44.8271 },
    { lat: 52.2298, lng: 21.0122 },
    { lat: 50.0647, lng: 19.9450 }  
  ];

  document.querySelectorAll(".mini-map").forEach((mapDiv, index) => {
    if (locations[index]) {
      const map = L.map(mapDiv).setView([locations[index].lat, locations[index].lng], 12);
      
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      L.marker([locations[index].lat, locations[index].lng]).addTo(map);
    }
  });
}

loadLeaflet();