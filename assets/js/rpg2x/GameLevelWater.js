
// To build GameLevels, each contains GameObjects from below imports
import GameEnv from './GameEnv.js';
import Background from './Background.js';
import PlayerOne from './PlayerOne.js';
import PlayerTwo from './PlayerTwo.js';
import NPC from './NPC.js';
//import Goomba from './EnemyGoomba.js';
//import Coin from './Coin.js';


class GameLevelWater {
  constructor(path) {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    // Values dependent on GameEnv.create()
    let width = GameEnv.innerWidth;
    let height = GameEnv.innerHeight;

    // Background data
    const image_src_water = path + "/images/rpg/map.png";
    const image_data_water = {
        name: 'water',
        src: image_src_water,
        pixels: {height: 580, width: 1038}
    };

    // Player 1 sprite data (turtle)
    const LUIGI_SCALE_FACTOR = 10;
    const sprite_src_luigi = path + "/images/rpg/luigi.png";
    const sprite_data_luigi = {
        name: 'luigi',
        src: sprite_src_luigi,
        SCALE_FACTOR: LUIGI_SCALE_FACTOR,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 50,
        INIT_POSITION: { x: 0, y: height - (height/LUIGI_SCALE_FACTOR) }, 
        pixels: {height: 72, width: 48},
        orientation: {rows: 4, columns: 3 },
        down: {row: 0, start: 0, columns: 3 },
        left: {row: 1, start: 0, columns: 3 },
        right: {row: 2, start: 0, columns: 3 },
        up: {row: 3, start: 0, columns: 3 },
    };

    // Player 2 sprite data (fish)
    const sprite_src_fish = path + "/images/rpg/fishies.png";
    const sprite_data_fish = {
        name: 'fish',
        src: sprite_src_fish,
        SCALE_FACTOR: 16,
        STEP_FACTOR: 400,
        ANIMATION_RATE: 50,
        pixels: {height: 256, width: 384},
        INIT_POSITION: { x: 0, y: 0 },
        orientation: {rows: 8, columns: 12 },
        down: {row: 0, start: 0, columns: 3 },  // 1st row
        left: {row: 2, start: 0, columns: 3 },  // 2nd row
        right: {row: 3, start: 0, columns: 3 }, // 3rd row
        up: {row: 1, start: 0, columns: 3 },    // 4th row
    };

    // NPC sprite data (frog)
    const sprite_src_frog = path + "/images/rpg/fishies.png";
    const sprite_data_frog = {
        name: 'npc',
        src: sprite_src_frog,
        SCALE_FACTOR: 16,  // Adjust this based on your scaling needs
        ANIMATION_RATE: 50,
        pixels: {height: 256, width: 384},
        INIT_POSITION: { x: (width / 2), y: (height / 2)},
        orientation: {rows: 8, columns: 12 },
        down: {row: 0, start: 9, columns: 3 },  // This is the stationary npc, down is default 
    };

    // List of objects defnitions for this level
    this.objects = [
      { class: Background, data: image_data_water },
      { class: PlayerOne, data: sprite_data_luigi },
      { class: PlayerTwo, data: sprite_data_fish },
      { class: NPC, data: sprite_data_frog }
    ];
  }

}

export default GameLevelWater;
