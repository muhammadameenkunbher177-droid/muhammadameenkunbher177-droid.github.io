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

    let html = "";

data.typeMatches.forEach(type => {

    // Sirf International aur Women matches
    if (type.matchType !== "International" && type.matchType !== "Women") {
        return;
    }

    type.seriesMatches.forEach(series => {

        if (!series.seriesAdWrapper) return;

        series.seriesAdWrapper.matches.forEach(match => {

            const info = match.matchInfo;

            html += `
            <div class="card">
                <h2>${info.team1.teamName} VS ${info.team2.teamName}</h2>
                <p><strong>${info.seriesName}</strong></p>
                <p>${info.matchDesc}</p>
                <p>${info.status}</p>
                <p>${info.venueInfo.city}</p>
            </div>
            `;

        });

    });

});

container.innerHTML = html;
      html += `
      <div class="card" style="display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:15px;">

        <div>
          <img src="${match.home_logo}" width="60">
          <h3>${match.home}</h3>
          <p>${match.home_score}</p>
        </div>

        <div style="text-align:center;">
          <h2>VS</h2>
          <p>${match.status_text}</p>
          <p>${match.competition}</p>
        </div>

        <div>
          <img src="${match.away_logo}" width="60">
          <h3>${match.away}</h3>
          <p>${match.away_score}</p>
        </div>

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
