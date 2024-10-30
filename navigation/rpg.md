---
layout: base
title: RPG v0.3
permalink: /rpg/dot3
---

<style>
.custom-alert {
    display: none;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
}

.custom-alert button {
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: absolute;
}

#musicControls {
    position: fixed;
    bottom: 10px;
    left: 10px;
    z-index: 1000;
    display: flex;
    gap: 10px;
}
</style>

<div id="gameContainer">
    <canvas id='gameCanvas'></canvas>
</div>

<div id="custom-alert" class="custom-alert">
    <button onclick="closeCustomAlert()" id="custom-alert-message"></button>
</div>

<!-- Music Control Buttons -->
<div id="musicControls">
    <button onclick="playMusic()">Play Music</button>
    <button onclick="pauseMusic()">Pause Music</button>
    <button onclick="toggleMute()">Mute/Unmute</button>
</div>

<script type="module">
    import GameControl from '{{site.baseurl}}/assets/js/rpg/dot3/GameControl.js';

    const path = "{{site.baseurl}}";

    // Start game engine
    GameControl.start(path);

    // Dynamically create and set up background music
    const backgroundMusic = new Audio('{{site.baseurl}}/assets/audio/backgroundmusic.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5; // Adjust volume as needed

    // Attempt to auto-play, handle any auto-play restrictions
    backgroundMusic.play().catch(() => {
        console.log("Auto-play blocked. Music will start when user interacts.");
    });

    // Control Functions
    function playMusic() {
        backgroundMusic.play();
    }

    function pauseMusic() {
        backgroundMusic.pause();
    }

    function toggleMute() {
        backgroundMusic.muted = !backgroundMusic.muted;
    }

    // Start music on first user interaction if auto-play is blocked
    window.addEventListener('click', () => {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
        }
    });
</script>
