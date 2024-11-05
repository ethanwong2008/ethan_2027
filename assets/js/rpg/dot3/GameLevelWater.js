import GameEnv from './GameEnv.js';
import Background from './Background.js';
import PlayerOne from './PlayerOne.js';
import PlayerTwo from './PlayerTwo.js';

class GameLevelWater {
  constructor(path) {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    let width = GameEnv.innerWidth;
    let height = GameEnv.innerHeight;

    // Background data
    const image_src_water = path + "/images/rpg/map.jpg";
    const image_data_water = {
      name: 'water',
      src: image_src_water,
      pixels: { height: 580, width: 1038 }
    };

    // Player 1 sprite data (Luigi)
    const TURTLE_SCALE_FACTOR = 10;
    const sprite_src_turtle = path + "/images/rpg/luigi.png";
    const sprite_data_turtle = {
      name: 'turtle',
      src: sprite_src_turtle,
      SCALE_FACTOR: TURTLE_SCALE_FACTOR,
      STEP_FACTOR: 1000,
      ANIMATION_RATE: 50,
      INIT_POSITION: { x: 0, y: height - (height / TURTLE_SCALE_FACTOR) },
      pixels: { height: 72, width: 48 },
      orientation: { rows: 4, columns: 3 },
      down: { row: 0, start: 0, columns: 3 },
      left: { row: 1, start: 0, columns: 3 },
      right: { row: 2, start: 0, columns: 3 },
      up: { row: 3, start: 0, columns: 3 },
    };

    // Player 2 sprite data (fish)
    const sprite_src_fish = path + "/images/rpg/fishies.png";
    const sprite_data_fish = {
      name: 'fish',
      src: sprite_src_fish,
      SCALE_FACTOR: 16,
      STEP_FACTOR: 400,
      ANIMATION_RATE: 50,
      pixels: { height: 256, width: 384 },
      INIT_POSITION: { x: 0, y: 0 },
      orientation: { rows: 8, columns: 12 },
      down: { row: 0, start: 0, columns: 3 },
      left: { row: 1, start: 0, columns: 3 },
      right: { row: 2, start: 0, columns: 3 },
      up: { row: 3, start: 0, columns: 3 },
    };

    // Instantiate game objects
    this.objects = [
      new Background(image_data_water),
      new PlayerOne(sprite_data_turtle),
      new PlayerTwo(sprite_data_fish)
    ];

    // Start the game loop
    this.gameLoop();
  }

  // Collision detection function for two objects
  isColliding(obj1, obj2) {
    const pos1 = obj1.getPosition();
    const size1 = obj1.getSize();
    const pos2 = obj2.getPosition();
    const size2 = obj2.getSize();

    return (
      pos1.x < pos2.x + size2.width &&
      pos1.x + size1.width > pos2.x &&
      pos1.y < pos2.y + size2.height &&
      pos1.y + size1.height > pos2.y
    );
  }

  // Game loop function
  gameLoop() {
    const playerOne = this.objects[1]; // Luigi (PlayerOne)
    const playerTwo = this.objects[2]; // Fish (PlayerTwo)

    // Check for collision between Luigi and Fish
    if (this.isColliding(playerOne, playerTwo)) {
      this.handleCollision(playerOne, playerTwo);
    }

    // Update and redraw all objects
    this.objects.forEach(obj => obj.update());

    // Continue the game loop
    requestAnimationFrame(() => this.gameLoop());
  }

  // Handle collision between Luigi and Fish
  handleCollision(obj1, obj2) {
    console.log(`Collision detected between ${obj1.data.name} and ${obj2.data.name}`);
    // You can add additional collision handling code here, such as stopping movement,
    // triggering animations, reducing health, etc.
  }
}

export default GameLevelWater;
