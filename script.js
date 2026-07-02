console.log("🏏 CricZone Hub V2 Loaded");

// ============================
// LIVE MATCHES
// ============================

async function loadLiveMatches() {

const container = document.getElementById("liveMatches");

if (!container) return;

try {

const response = await fetch(
"https://sportscore.com/api/widget/matches/?sport=cricket&limit=5"
);

const data = await response.json();

if (!data.matches || data.matches.length === 0) {

container.innerHTML =
"<p>No live cricket matches available.</p>";

return;

}

let html = "";

data.matches.forEach(match => {

html += `
<div class="card">

<div style="display:flex;justify-content:space-between;align-items:center;">

<div style="text-align:center;">

<img src="${match.home_logo}" width="60">

<h3>${match.home}</h3>

<p>${match.home_score || "-"}</p>

</div>

<div style="text-align:center;">

<h2>VS</h2>

<p>${match.status_text}</p>

<p>${match.competition}</p>

</div>

<div style="text-align:center;">

<img src="${match.away_logo}" width="60">

<h3>${match.away}</h3>

<p>${match.away_score || "-"}</p>

</div>

</div>

</div>
`;

});

container.innerHTML = html;

}

catch(error){

console.log(error);

container.innerHTML =
"<p>Unable to load live scores.</p>";

}

}

loadLiveMatches();

// Refresh every minute

setInterval(loadLiveMatches,60000);
// ============================
// LIVE CLOCK
// ============================

function updateClock() {

  const clock = document.getElementById("liveClock");

  if (!clock) return;

  const now = new Date();

  clock.innerHTML = now.toLocaleTimeString();

}

setInterval(updateClock, 1000);

updateClock();


// ============================
// ASIA CUP COUNTDOWN
// ============================

const countdown = document.getElementById("countdown");

if (countdown) {

  const targetDate = new Date("September 1, 2026 00:00:00").getTime();

  setInterval(() => {

    const now = new Date().getTime();

    const distance = targetDate - now;

    if (distance <= 0) {

      countdown.innerHTML = "🏆 Asia Cup Has Started!";

      return;

    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdown.innerHTML =
      `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;

  }, 1000);

}


// ============================
// BACK TO TOP BUTTON
// ============================

const topBtn = document.createElement("button");

topBtn.innerHTML = "⬆";

topBtn.id = "topBtn";

document.body.appendChild(topBtn);

Object.assign(topBtn.style, {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  padding: "12px 16px",
  fontSize: "20px",
  border: "none",
  borderRadius: "50%",
  cursor: "pointer",
  display: "none",
  background: "#FFD700",
  color: "#000",
  zIndex: "9999"
});

window.addEventListener("scroll", () => {

  if (window.scrollY > 300) {

    topBtn.style.display = "block";

  } else {

    topBtn.style.display = "none";

  }

});

topBtn.addEventListener("click", () => {

  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

});


// ============================
// FADE-IN ANIMATION
// ============================

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.style.opacity = "1";

      entry.target.style.transform = "translateY(0)";

    }

  });

});

sections.forEach(section => {

  section.style.opacity = "0";

  section.style.transform = "translateY(30px)";

  section.style.transition = "all .8s ease";

  observer.observe(section);

});

console.log("✅ CricZone Hub V2 Ready");
