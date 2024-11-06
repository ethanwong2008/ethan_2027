import Player from "./Player.js";
import GameEnv from "./GameEnv.js";

class NPC extends Player {
    constructor(data = null) {
        super(data);
        this.alertTimeout = null;

        // Create a black overlay with message, hidden initially
        this.createBlackOverlay();
    }

    /**
     * Create a full-screen black overlay with a message in the center.
     */
    createBlackOverlay() {
        this.blackOverlay = document.createElement('div');
        this.blackOverlay.style.position = 'fixed';
        this.blackOverlay.style.top = 0;
        this.blackOverlay.style.left = 0;
        this.blackOverlay.style.width = '100vw';
        this.blackOverlay.style.height = '100vh';
        this.blackOverlay.style.backgroundColor = 'black';
        this.blackOverlay.style.opacity = 0;
        this.blackOverlay.style.display = 'flex';
        this.blackOverlay.style.justifyContent = 'center';
        this.blackOverlay.style.alignItems = 'center';
        this.blackOverlay.style.transition = 'opacity 0.5s';

        // Add message to overlay
        this.overlayMessage = document.createElement('div');
        this.overlayMessage.style.color = 'white';
        this.overlayMessage.style.fontSize = '2em';
        this.overlayMessage.style.textAlign = 'center';
        this.overlayMessage.textContent = "You are strong! Accept any quest!";
        this.blackOverlay.appendChild(this.overlayMessage);

        document.body.appendChild(this.blackOverlay);
    }

    /**
     * Show the black overlay with the message.
     */
    showBlackOverlay() {
        this.blackOverlay.style.opacity = 1;
    }

    /**
     * Hide the black overlay.
     */
    hideBlackOverlay() {
        this.blackOverlay.style.opacity = 0;
    }

    /**
     * Override the update method to draw the NPC.
     * This NPC is stationary, so the update method only calls the draw method.
     * 
     * @override
     */
    update() {
        this.draw();
    }

    /**
     * Handles keydown events for proximity interaction.
     * This method is triggered when a key is pressed and checks for proximity interactions.
     * 
     * @param {Object} event - The event object containing the key that was pressed.
     * @param {string} event.key - The key that was pressed.
     */
    handleKeyDown({ key }) {
        switch (key) {
            case 'e':  // Player 1 
            case 'u':  // Player 2 
                this.checkProximityToNPC();
                break;
        }
    }

    /**
     * Handles key up events to stop the player's velocity.
     * 
     * This method stops the player's velocity based on the key released.
     * It also clears the alert timeout if the 'e' or 'u' key is released.
     * 
     * @param {Object} event - The keyup event object.
     * @param {string} event.key - The key that was released.
     */
    handleKeyUp({ key }) {
        if (key === 'e' || key === 'u') {
            if (this.alertTimeout) {
                clearTimeout(this.alertTimeout);
                this.alertTimeout = null;
                closeCustomAlert();
            }
            this.hideBlackOverlay(); // Hide overlay when key is released
        }
    }

    /**
     * Custom alert mechanism to handle responses.
     * 
     * @param {string} message - The message to be displayed in the alert.
     */
    handleResponse(message) {
        if (this.alertTimeout) {
            clearTimeout(this.alertTimeout);
        }

        this.alertTimeout = setTimeout(() => {
            showCustomAlert(message);
        }, 0);
    }

    /**
     * Check for proximity of objects.
     * This method checks if any players are within a certain distance of the NPC.
     * If players are within the specified distance, their names are collected and a response is generated.
     */
    checkProximityToNPC() {
        const players = GameEnv.gameObjects.filter(obj => obj instanceof Player);
        const npc = this;

        players.forEach(player => {
            const distance = Math.sqrt(
                Math.pow(player.position.x - npc.position.x, 2) + 
                Math.pow(player.position.y - npc.position.y, 2)
            );

            // If player is within 35 units, turn screen black and show message
            if (distance < 35) {
                this.showBlackOverlay();
            } else {
                this.hideBlackOverlay(); // Hide overlay if out of range
            }

            // Additional response handling based on distance
            if (distance < 35) {
                this.handleResponse("Come closer adventurer!");
            } 
            else if (distance >= 35 && distance < 100) {
                this.handleResponse("Come so I can see you!");
            } else {
                this.handleResponse("I see. You are the strongest I have ever seen.");
            }
        });
    }
}

export default NPC;

/**
 * Show the custom alert with the given message.
 * 
 * @param {string} message - The message to be displayed in the alert.
 */
function showCustomAlert(message) {
    const alertBox = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('custom-alert-message');
    alertMessage.textContent = message;
    alertBox.style.display = 'block';
}

/**
 * Close the custom alert.
 */
function closeCustomAlert() {
    const alertBox = document.getElementById('custom-alert');
    alertBox.style.display = 'none';
}
