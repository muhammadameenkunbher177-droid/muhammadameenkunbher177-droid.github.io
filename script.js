console.log("🏏 CricZone Hub Loaded");

const API_KEY = "YOUR_RAPIDAPI_KEY";

async function loadLiveMatches() {

    const container = document.getElementById("liveMatches");

    container.innerHTML = "Loading...";

    try {

        const response = await fetch(
            "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/live",
            {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": API_KEY,
                    "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com"
                }
            }
        );

        const data = await response.json();

        let html = "";

        data.typeMatches.forEach(type => {

            // Sirf International aur Women matches
            if (
                type.matchType !== "International" &&
                type.matchType !== "Women"
            ) return;

            type.seriesMatches.forEach(series => {

                if (!series.seriesAdWrapper) return;

                series.seriesAdWrapper.matches.forEach(match => {

                    const info = match.matchInfo;

                    const score1 =
                        match.matchScore?.team1Score?.inngs1?.runs ?? "-";

                    const wickets1 =
                        match.matchScore?.team1Score?.inngs1?.wickets ?? "";

                    const overs1 =
                        match.matchScore?.team1Score?.inngs1?.overs ?? "";

                    const score2 =
                        match.matchScore?.team2Score?.inngs1?.runs ?? "-";

                    const wickets2 =
                        match.matchScore?.team2Score?.inngs1?.wickets ?? "";

                    const overs2 =
                        match.matchScore?.team2Score?.inngs1?.overs ?? "";

                    html += `
                    <div class="card">

                        <h2>${info.team1.teamName} vs ${info.team2.teamName}</h2>

                        <p><strong>${info.seriesName}</strong></p>

                        <p>${info.matchDesc}</p>

                        <p>${info.status}</p>

                        <p>
                        ${score1}/${wickets1} (${overs1})
                        &nbsp; | &nbsp;
                        ${score2}/${wickets2} (${overs2})
                        </p>

                        <p>📍 ${info.venueInfo.city}</p>

                    </div>
                    `;

                });

            });

        });

        if (html === "") {
            html = "<h3>No International Matches Available</h3>";
        }

        container.innerHTML = html;

    } catch (error) {

        console.log(error);

        container.innerHTML =
            "<h3>Unable to load matches.</h3>";
    }

}

loadLiveMatches();

setInterval(loadLiveMatches, 60000);
