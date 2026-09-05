const vibeCards = document.querySelectorAll(".vibe-card");
const vibeButton = document.getElementById("vibeButton");

let selectedVibe = null;

const recommendations = {

    "Gaming": [
        {
            title: "Try Something New",
            text: "Play a game you've never tried before and give it at least 30 minutes.",
            time: "30 min",
            cost: "Free",
            people: "Solo",
            score: 88
        },
        {
            title: "Friend Challenge",
            text: "Play with a friend and let the loser choose what you play next.",
            time: "1 hour",
            cost: "Free",
            people: "Friends",
            score: 94
        },
        {
            title: "Change Your Strategy",
            text: "Play one competitive match using a completely different strategy.",
            time: "30 min",
            cost: "Free",
            people: "Solo",
            score: 91
        }
    ],

    "Music": [
        {
            title: "Discover Something New",
            text: "Put your headphones on and listen to an album you've never heard before.",
            time: "45 min",
            cost: "Free",
            people: "Solo",
            score: 92
        },
        {
            title: "Build the Perfect Playlist",
            text: "Make a 5-song playlist that perfectly matches your current mood.",
            time: "20 min",
            cost: "Free",
            people: "Solo",
            score: 89
        },
        {
            title: "Artist Roulette",
            text: "Pick an artist you've never listened to and explore their top 5 songs.",
            time: "25 min",
            cost: "Free",
            people: "Solo",
            score: 86
        }
    ],

    "Late Night": [
        {
            title: "Album Session",
            text: "Turn the lights down, put your headphones on and listen to an album from start to finish.",
            time: "45 min",
            cost: "Free",
            people: "Solo",
            score: 96
        },
        {
            title: "Movie Night",
            text: "Pick a movie you've been putting off and make yourself comfortable.",
            time: "2 hours",
            cost: "Free",
            people: "Solo",
            score: 90
        },
        {
            title: "Quiet Mode",
            text: "Put on some chill music, get away from your phone for a while and relax.",
            time: "30 min",
            cost: "Free",
            people: "Solo",
            score: 93
        }
    ],

    "Bored": [
        {
            title: "Learn Something Random",
            text: "Find a topic you've never learned about and spend 20 minutes exploring it.",
            time: "20 min",
            cost: "Free",
            people: "Solo",
            score: 87
        },
        {
            title: "Create Something",
            text: "Open a blank project and see what you can create in 30 minutes.",
            time: "30 min",
            cost: "Free",
            people: "Solo",
            score: 95
        },
        {
            title: "Room Reset",
            text: "Put on your favorite music and completely reset one part of your room.",
            time: "20 min",
            cost: "Free",
            people: "Solo",
            score: 84
        }
    ],

    "With Friends": [
        {
            title: "Random Challenge",
            text: "Everyone creates one challenge. Put them together and randomly pick one.",
            time: "30 min",
            cost: "Free",
            people: "Friends",
            score: 95
        },
        {
            title: "Explore Somewhere",
            text: "Go somewhere nearby that none of you have explored before.",
            time: "1 hour",
            cost: "Free",
            people: "Friends",
            score: 93
        },
        {
            title: "Group Playlist",
            text: "Everyone adds three songs to one playlist. No one can remove another person's song.",
            time: "20 min",
            cost: "Free",
            people: "Friends",
            score: 90
        }
    ],

    "No Money": [
        {
            title: "Explore",
            text: "Go for a walk somewhere you've never explored and find something interesting.",
            time: "1 hour",
            cost: "€0",
            people: "Solo / Friends",
            score: 91
        },
        {
            title: "Movie Night",
            text: "Pick something to watch at home and make a proper movie night out of it.",
            time: "2 hours",
            cost: "€0",
            people: "Friends",
            score: 89
        },
        {
            title: "Create Something",
            text: "Use whatever you already have and challenge yourself to make something new.",
            time: "30 min",
            cost: "€0",
            people: "Solo",
            score: 94
        }
    ]

};


vibeCards.forEach(card => {

    card.addEventListener("click", () => {

        vibeCards.forEach(card => {
            card.classList.remove("selected");
        });

        card.classList.add("selected");

        selectedVibe = card.querySelector("p").textContent;
    });

});


vibeButton.addEventListener("click", () => {

    if (!selectedVibe) {
        alert("Pick a vibe first 👀");
        return;
    }

    document.querySelector(".hero").innerHTML = `
        <div class="loading">
            FINDING YOUR VIBE...
        </div>
    `;

    setTimeout(() => {
        showRecommendation();
    }, 700);

});


function showRecommendation() {

    const options = recommendations[selectedVibe];

    const url = new URL(window.location.href);
    url.searchParams.set("vibe", selectedVibe);
    window.history.pushState({}, "", url);

    const randomIndex = Math.floor(Math.random() * options.length);

    const recommendation = options[randomIndex];

    document.querySelector(".hero").innerHTML = `

        <div class="result fade-in">

            <p class="result-small">YOUR VIBE</p>

            <h1>${selectedVibe}</h1>

            <div class="result-card">

                <div class="result-icon">✨</div>

                <h2>${recommendation.title}</h2>

                <p>${recommendation.text}</p>

                <div class="result-info">
                    ⏱ ${recommendation.time}
                    &nbsp;&nbsp; · &nbsp;&nbsp;
                    💸 ${recommendation.cost}
                    &nbsp;&nbsp; · &nbsp;&nbsp;
                    👤 ${recommendation.people}
                </div>

                <div class="score">
                    🔥 VIBE SCORE: ${recommendation.score}/100
                </div>

            </div>

            <button class="vibe-button" onclick="showAnother()">
                🔄 ANOTHER ONE
            </button>

            <button class="share-button" onclick="shareVibe()">
    ↗ SHARE MY VIBE
</button>

            <button class="back-button" onclick="location.reload()">
                ← PICK ANOTHER VIBE
            </button>

        </div>

    `;
}


function showAnother() {

    showRecommendation();

}

function shareVibe() {

    const shareUrl = window.location.href;

    navigator.clipboard.writeText(shareUrl)
        .then(() => {
            alert("VIBE link copied! 🔗🔥");
        })
        .catch(() => {
            alert("Copy the link from the address bar for now 👀");
        });

}

const urlParams = new URLSearchParams(window.location.search);
const sharedVibe = urlParams.get("vibe");

if (sharedVibe && recommendations[sharedVibe]) {

    selectedVibe = sharedVibe;

    showRecommendation();

}