import Player from "./Player.js";
import GameEnv from "./GameEnv.js";

class NPC extends Player {
    constructor(data = null) {
        super(data);
        this.alertTimeout = null;

        // Create a black overlay with message and quest list, hidden initially
        this.createBlackOverlay();
    }

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

        // Add message and quest list to overlay
        const messageContainer = document.createElement('div');
        messageContainer.style.color = 'white';
        messageContainer.style.fontSize = '2em';
        messageContainer.style.textAlign = 'center';

        // Main message
        const mainMessage = document.createElement('p');
        mainMessage.textContent = "You are strong! Accept my quest!";
        messageContainer.appendChild(mainMessage);

        // Quest list
        const questList = document.createElement('ul');
        questList.style.listStyleType = 'decimal';
        questList.style.fontSize = '1.5em';

        const quests = [
            "Collect magical herbs.",
            "Defeat 10 goblins.",
            "Find a lost key."
        ];

        // Populate the quest list
        quests.forEach(quest => {
            const listItem = document.createElement('li');
            listItem.textContent = quest;
            questList.appendChild(listItem);
        });

        messageContainer.appendChild(questList);
        this.blackOverlay.appendChild(messageContainer);

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
     * 
     * Keys handled:
     * - 'e': Proximity interaction for Player 1
     * - 'u': Proximity interaction for Player 2
     * 
     * This method calls checkProximityToNPC() if either 'e' or 'u' is pressed.
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
        // Check if the released key is 'e' or 'u'
        if (key === 'e' || key === 'u') {
            // Clear the alert timeout to cancel the alert
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
        // Clear any existing alert timeout
        if (this.alertTimeout) {
            clearTimeout(this.alertTimeout);
        }

        // Set a new alert timeout
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
        // Filter all Player objects from the game environment
        var players = GameEnv.gameObjects.filter(obj => obj instanceof Player);
        var npc = this;

        if (players.length > 0 && npc) {
            players.forEach(player => {
                // The Euclidean distance between two points in a 2D space
                var distance = Math.sqrt(
                    Math.pow(player.position.x - npc.position.x, 2) + Math.pow(player.position.y - npc.position.y, 2)
                );

                // First check for when the player is within 35 units distance
                if (distance < 35) {
                    this.handleResponse("Come closer adventurer so I can get a better look!");
                }
                if (distance >= 35 && distance < 100 ) {
                    this.showBlackOverlay();
                }
                else if ( distance < 35) {
                    this.hideBlackOverlay(); // Hide overlay if out of range
                }
                if (player !== npc) {
                // If the player is more than 100 pixels away
                if (distance > 100) {
                    this.handleResponse("I see. You are the strongest I have ever seen.");
                }
                // If the player is within 100 pixels, greet them with their name
                else if (distance <= 100) {
                    names.push(player.spriteData.name);  // Collect player names within proximity
                }
            }
            });
        }
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