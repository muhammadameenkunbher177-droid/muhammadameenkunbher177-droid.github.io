// CricZone Hub JavaScript

document.addEventListener("DOMContentLoaded", function () {
    console.log("CricZone Hub Loaded Successfully!");

    const btn = document.querySelector(".btn");

    if (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            alert("🏏 Welcome to CricZone Hub!");
        });
    }
});
