console.log("🏏 CricZone Hub Loaded");

async function loadLiveMatches() {
  const container = document.getElementById("liveMatches");

  try {
    const response = await fetch(
      "https://sportscore.com/api/widget/matches/?sport=cricket&limit=5"
    );

    const data = await response.json();

    if (!data.matches || data.matches.length === 0) {
      container.innerHTML = "<p>No live matches available.</p>";
      return;
    }

    let html = "";

    data.matches.forEach(match => {
      html += `
        <div class="card" style="margin-bottom:15px;">
          <h3>${match.homeTeam} vs ${match.awayTeam}</h3>
          <p><strong>Status:</strong> ${match.status}</p>
          <p><strong>Score:</strong> ${match.score || "Not Available"}</p>
        </div>
      `;
    });

    container.innerHTML = html;

  } catch (error) {
    console.error(error);
    container.innerHTML = "<p>Unable to load live scores.</p>";
  }
}

loadLiveMatches();
setInterval(loadLiveMatches, 60000);
