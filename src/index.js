import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import Stage1 from './scenes/stage1.js';

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1200,
  height: 800,
  scene: [Stage1],
  autoFocus: true,
  physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
};

const game = new Phaser.Game(config);
