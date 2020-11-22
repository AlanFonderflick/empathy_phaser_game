import Phaser from 'phaser'

export default class Arrow extends Phaser.GameObjects.GameObject {

  /**
   * Character group with different sprite parts
   */
  constructor(scene, x, y) {
    super(scene, x, y);
    this.scene = scene;
    this.sprite = this.scene.add.sprite(x+30, y, 'arrow');
    this.sprite.name = 'arrow';
    this.sprite.setOrigin(.5, -.5);
    this.scene.add.existing(this);

  }


  preUpdate(){

    this.sprite.x = this.scene.ghost.sprite.body.position.x+15;
    this.sprite.y = this.scene.ghost.sprite.body.position.y+15;
  }

}
