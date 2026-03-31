const API_KEY = "Qq5rjAlQvBYmTT1pOqeunfKBzTWkka05CyW8vcMJ";

const button = document.getElementById("getImagesBtn");
const gallery = document.getElementById("gallery");
const factText = document.getElementById("factText");

const spaceFacts = [
  "A day on Venus is longer than its year.",
  "Neutron stars spin extremely fast.",
  "The Sun makes up 99.86% of our solar system.",
  "There are billions of galaxies in the universe.",
  "Saturn could float in water."
];

// Show random fact
factText.textContent = spaceFacts[Math.floor(Math.random() * spaceFacts.length)];

createModal();

button.addEventListener("click", getImages);

async function getImages() {
  const start = startDate.value;
  const end = endDate.value;

  showLoading();

  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${start}&end_date=${end}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    render(data.reverse());
  } catch {
    gallery.innerHTML = "Error loading data";
  }
}

function render(items) {
  gallery.innerHTML = "";

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "gallery-item";

    if (item.media_type === "image") {
      card.innerHTML = `
        <div class="gallery-media">
          <img src="${item.url}">
        </div>
        <p>${item.title}</p>
        <p>${item.date}</p>
      `;
    } else {
      card.innerHTML = `
        <div class="video-thumbnail">▶</div>
        <p>${item.title}</p>
        <a class="video-link" href="${item.url}" target="_blank">Watch Video</a>
      `;
    }

    card.onclick = () => openModal(item);
    gallery.appendChild(card);
  });
}

function showLoading() {
  gallery.innerHTML = "🔄 Loading...";
}

function createModal() {
  const modal = document.createElement("div");
  modal.id = "modal";
  modal.className = "modal hidden";

  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">×</span>
      <div id="modalBody"></div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector(".close-modal").onclick = () => modal.classList.add("hidden");
}

function openModal(item) {
  const modal = document.getElementById("modal");
  const body = document.getElementById("modalBody");

  if (item.media_type === "image") {
    body.innerHTML = `<img src="${item.hdurl || item.url}">`;
  } else {
    body.innerHTML = `<iframe src="${item.url}"></iframe>`;
  }

  body.innerHTML += `
    <h2>${item.title}</h2>
    <p>${item.date}</p>
    <p>${item.explanation}</p>
  `;

  modal.classList.remove("hidden");
}