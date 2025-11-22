/* ================================
   Auto-loading local photos
   /photos/*.JPG
================================= */

const photoFiles = [
  "IMG_5919.jpg",
  "IMG_8330.JPG",
  "IMG_5897.JPG",
  "IMG_7751.JPG",
  "IMG_7382.JPG"
];

// Build full paths
const photos = photoFiles.map(name => `photos/${name}`);

/* ================================
   🎞 SLIDESHOW
================================= */

const slideshow = document.getElementById("slideshow");
let slideIndex = 0;
let slideInterval;
let isPaused = false;

function buildSlideshow() {
  photos.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.style.position = "absolute";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.opacity = i === 0 ? "1" : "0";
    img.style.transition = "opacity 0.8s ease";
    img.classList.add("slide");
    slideshow.appendChild(img);
  });
}

function startSlideshow() {
  const slides = document.querySelectorAll(".slide");
  slideInterval = setInterval(() => {
    if (!isPaused) {
      slides[slideIndex].style.opacity = "0";
      slideIndex = (slideIndex + 1) % slides.length;
      slides[slideIndex].style.opacity = "1";
    }
  }, 2600);
}

document.getElementById("pause-slide").addEventListener("click", () => {
  isPaused = !isPaused;
  document.getElementById("pause-slide").textContent =
    isPaused ? "Play" : "Pause";
});

/* ================================
   📸 POLAROID GALLERY
================================= */

function buildGallery() {
  const gallery = document.querySelector("#private-gallery .masonry");

  photos.forEach(src => {
    const figure = document.createElement("div");
    figure.className = "photo polaroid reveal";

    figure.innerHTML = `
      <img src="${src}" alt="">
      <div class="caption">Memory</div>
    `;

    gallery.appendChild(figure);
  });

  enableLightbox();
}

/* ================================
   🔍 LIGHTBOX VIEWER
================================= */

function enableLightbox() {
  const galleryImages = document.querySelectorAll("#private-gallery img");

  const lightbox = document.createElement("div");
  Object.assign(lightbox.style, {
    position: "fixed",
    inset: "0",
    background: "rgba(0,0,0,.8)",
    display: "none",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "9999"
  });

  const lbImg = document.createElement("img");
  lbImg.style.maxWidth = "92vw";
  lbImg.style.maxHeight = "92vh";
  lbImg.style.borderRadius = "14px";

  lightbox.appendChild(lbImg);
  document.body.appendChild(lightbox);

  galleryImages.forEach(img => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => {
      lbImg.src = img.src;
      lightbox.style.display = "flex";
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
  });
}

/* ================================
   🚀 INIT
================================= */

document.addEventListener("DOMContentLoaded", () => {
  buildSlideshow();
  startSlideshow();
  buildGallery();
});
