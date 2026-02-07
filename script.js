// 🪐 Cute click effect on planets
document.querySelectorAll('.planet').forEach(planet => {
  planet.addEventListener('click', () => {
    alert("🪐 " + planet.dataset.message);
  });
});

// 🎵 Music controls (SAFE)
const music = document.getElementById("bgMusic");
const toggle = document.getElementById("musicToggle");

if (music && toggle) {
  toggle.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      toggle.innerText = "🔊";
    } else {
      music.pause();
      toggle.innerText = "🔇";
    }
  });
}

// 🔒 Unlock universe
function unlockUniverse() {
  document.querySelector('.portal-star').style.display = 'block';
  const passwordInput = document.getElementById("passwordInput");
  const lockScreen = document.getElementById("lockScreen");
  const correctPassword = "Bhoomi@2007";

  if (!passwordInput || !lockScreen) return;

  if (passwordInput.value === correctPassword) {
    lockScreen.style.display = "none";

    if (music) {
      music.volume = 0.75;
      music.play().catch(() => {
        console.log("Autoplay blocked — user must tap play");
      });
    }
  } else {
    alert("❌ Wrong password");
  }
}

function openPortal() {
  const music = document.getElementById("bgMusic");

  if (music && !music.paused) {
    music.pause();
    music.currentTime = 0; // reset immediately
  }

  window.open("https://scrapbook-wheat.vercel.app/", "_blank");
}



// 🌸 Scroll animation (SAFE)
const cards = document.querySelectorAll('.card');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));
} else {
  cards.forEach(card => card.classList.add('show'));
}

// 🌌 Rotate photos inside each planet (SAFE)
document.querySelectorAll('.planet-photos').forEach(planet => {
  const images = planet.querySelectorAll('img');
  let index = 0;

  if (images.length === 0) return;

  // Apply crop for first image
  applyCrop(images[index]);
  images[index].classList.add('active');

  setInterval(() => {
    images[index].classList.remove('active');

    index = (index + 1) % images.length;

    applyCrop(images[index]);
    images[index].classList.add('active');
  }, 2500);
});

function applyCrop(img) {
  const position = img.dataset.position || 'center center';
  img.style.objectPosition = position;
}


// 🎬 Pause background music when VIDEO plays
document.querySelectorAll('video').forEach(video => {

  video.addEventListener('play', () => {
    if (music && !music.paused) {
      music.pause();
      music.dataset.wasPlaying = "true";
    }
  });

  video.addEventListener('pause', () => {
    if (music && music.dataset.wasPlaying === "true") {
      music.play().catch(() => {});
      music.dataset.wasPlaying = "false";
    }
  });

  video.addEventListener('ended', () => {
    if (music && music.dataset.wasPlaying === "true") {
      music.play().catch(() => {});
      music.dataset.wasPlaying = "false";
    }
  });
});

// 🎧 Spotify interaction handler (WORKING METHOD)
const spotifyIframes = document.querySelectorAll('iframe[src*="spotify"]');

spotifyIframes.forEach(iframe => {

  const wrapper = document.createElement('div');
  wrapper.style.position = 'relative';
  wrapper.style.width = '100%';

  iframe.parentNode.insertBefore(wrapper, iframe);
  wrapper.appendChild(iframe);

  const overlay = document.createElement('div');
  overlay.style.position = 'absolute';
  overlay.style.inset = '0';
  overlay.style.zIndex = '10';
  overlay.style.cursor = 'pointer';
  overlay.style.background = 'transparent';

  wrapper.appendChild(overlay);

  overlay.addEventListener('click', () => {
    if (music && !music.paused) {
      music.pause();
      music.dataset.wasPlaying = 'true';
    }
    overlay.remove(); // allow Spotify interaction
  });
});

// ▶ Resume background music when user clicks elsewhere
document.addEventListener('click', (e) => {
  const isSpotify = e.target.closest('iframe[src*="spotify"]');

  if (!isSpotify && music && music.dataset.wasPlaying === 'true') {
    music.play().catch(() => {});
    music.dataset.wasPlaying = 'false';
  }
});
