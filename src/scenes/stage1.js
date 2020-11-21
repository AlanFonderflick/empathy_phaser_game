import Ghost from '../gameObjects/Ghost'
import Ball from '../gameObjects/Ball'
import FinePerson from '../gameObjects/FinePerson'
import BadPerson from '../gameObjects/BadPerson'
import Portal from '../gameObjects/Portal'

export default class Stage1 extends Phaser.Scene {

  /**
   *  Game scene containing the main game logic
   *  @extends Phaser.Scene
   */
  constructor() {
    super('game');
  }

  preload() {
    this.load.image('ghost', './src/assets/ghost.png');
  }

  makeCollisionsBetweenBadPeople(){
    for(let i = 0; i< this.badPeople.children.entries.length; i++){
      for(let j = 0; j< this.badPeople.children.entries.length; j++){
        this.physics.add.collider(this.badPeople.children.entries[i].sprite, this.badPeople.children.entries[j].sprite);
      }
      for(let j = 0; j< this.finePeople.children.entries.length; j++){
        this.physics.add.collider(this.badPeople.children.entries[i].sprite, this.finePeople.children.entries[j].sprite);
        this.physics.add.overlap(this.badPeople.children.entries[i].sprite, this.ball.sprite, this.ball.looseFeeling, null, this.ball);
      }
    }
  }
  makeOverlapBetweenGhostAndFinePeople(){
    for(let i = 0; i< this.finePeople.children.entries.length; i++){
      this.physics.add.overlap(this.ghost.sprite, this.finePeople.children.entries[i].sprite, this.collectFeeling, null, this);
    }
  }

  createRandomBadPeople(){
    this.badPeople = this.add.group();
    this.badPeople.enableBody = true;

    let badPeople;
    for (let i = 0; i < 3; i++)
    {
      let randomX = Math.random()*500;
      let randomY = Math.random()*500;
      badPeople = new BadPerson(this, randomX, randomY);
      this.badPeople.add(badPeople);
    }
    this.makeCollisionsBetweenBadPeople();
  }

  createFinePeople(){
    this.finePeople = this.add.group();
    this.finePeople.enableBody = true;

    let finePerson;
    for (let i = 0; i < 3; i++)
    {
      let randomX = Math.random()*500;
      let randomY = Math.random()*500;
      finePerson = new FinePerson(this, randomX, randomY);
      this.finePeople.add(finePerson);
    }
  }

  collectFeeling(ghost, finePeople){
    if(finePeople.hasFeeling && !this.ball.sprite.isFat){
      this.playCollect(finePeople);
      finePeople.hasFeeling = false;
      this.ball.makeFat(finePeople);
    }
  }

  playCollect(){
    //add anim effect
  }

  increaseScore(){
    this.score += 1;
    if(this.score == this.finePeople.children.entries.length){
      this.makeNewLevel();
    }
  }

  clearPeople(){
    for(let person of this.finePeople.children.entries){
      person.kill();
    }
    for(let i = 0; i < this.badPeople.children.entries; i++){
      this.badPeople.children.entries[i].kill();
    }

    console.log('destroyed', this.finePeople, this.badPeople)
  }
  makeNewLevel(){
    this.clearPeople();
    this.createFinePeople();
    this.createRandomBadPeople();
    this.makeOverlapBetweenGhostAndFinePeople();
    this.score = 0;
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.ghost = new Ghost(this, 300, 500);
    this.ball = new Ball(this, 350, 500);
    this.portal = new Portal(this, 600, 300);
    this.createFinePeople();
    this.createRandomBadPeople();
    this.makeOverlapBetweenGhostAndFinePeople();
    this.score = 0;
  }

  update(){


  }


}
