import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import Stage1 from './scenes/stage1.js';
import Stage2 from './scenes/stage2.js';
import Stage3 from './scenes/stage3.js';

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1200,
  height: 800,
  backgroundColor: '#535c5a',
  scene: [Stage1, Stage2, Stage3],
  autoFocus: true,
  physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
};

const game = new Phaser.Game(config);
