import Ghost from '../gameObjects/Ghost'
import Ball from '../gameObjects/Ball'
import FinePerson from '../gameObjects/FinePerson'
import BadPerson from '../gameObjects/BadPerson'
import Follower from '../gameObjects/Follower'
import Portal from '../gameObjects/Portal'

export default class Stage2 extends Phaser.Scene {

  /**
   *  Game scene containing the main game logic
   *  @extends Phaser.Scene
   */
  constructor() {
    super('stage2');
  }

  preload() {
    this.load.image('ghost', './src/assets/ghost.gif');
    this.load.image('ball', './src/assets/ball.png');
    this.load.image('chara', './src/assets/chara.png');
    this.load.image('arrow', './src/assets/arrow.png');
    this.load.image('portal', './src/assets/portal.png');
    this.load.atlas('flares', './src/assets/flares.png', './src/assets/flares.json');
    this.load.tilemapTiledJSON('level1', './src/assets/maps/map1.json');
    this.load.tilemapTiledJSON('level2', './src/assets/maps/map2.json');
    this.load.tilemapTiledJSON('level3', './src/assets/maps/map3.json');

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

  createWellParticles(target){
    if(!target.sprite.isFat){
      this.well.active = false;
    }
    else {
      this.well.active = true;

    }
    this.well.x = target.sprite.x;
    this.well.y = target.sprite.y;
  }

  createRandomBadPeople(){
    this.badPeople.enableBody = true;
    let badPeopleObjects = [];
    this.map.filterObjects('BadPeople', (badPerson) => {
      if(badPerson.type == 'random'){
        badPeopleObjects.push(badPerson);
      }
    });

    let badPerson;
    for (let i = 0; i < badPeopleObjects.length; i++)
    {
      badPerson = new BadPerson(this, badPeopleObjects[i].x, badPeopleObjects[i].y);
      this.badPeople.add(badPerson);
    }
    this.makeCollisionsBetweenBadPeople();
  }

  createFollowerPeople(){
    let followerPeopleObjects = [];
    let curve = null;
    this.map.filterObjects('BadPeople', (badPerson) => {
      if(badPerson.type == 'follower'){
        this.map.filterObjects('BadPeople', (badPerson2) => {
          if(badPerson2.type == 'curve' && badPerson2.name == badPerson.name ){
            curve = badPerson2;
          }
        });
        badPerson.path = curve;
        followerPeopleObjects.push(badPerson);
      }
    });

    let followerPerson;
    for (let i = 0; i < followerPeopleObjects.length; i++)
    {
      followerPerson = new Follower(this, followerPeopleObjects[i].x, followerPeopleObjects[i].y, followerPeopleObjects[i].path);
      this.badPeople.add(followerPerson);
    }
  }

  createFollowerPath(){
    this.follower = new Follower(this, 200, 200);
  }

  createFinePeople(){
    this.finePeople = this.add.group();
    this.finePeople.enableBody = true;
    let finePeopleObjects = [];
    this.portalObject = this.map.filterObjects('FinePeople', (finePerson) => finePeopleObjects.push(finePerson));

    let finePerson;
    for (let i = 0; i < finePeopleObjects.length; i++)
    {
      finePerson = new FinePerson(this, finePeopleObjects[i].x, finePeopleObjects[i].y);
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

  playCollect(finePerson){
    //this.createWellParticles(this.ball);
    finePerson.parent.emitParticles(this.ball);
  }

  increaseScore(){
    this.score += 1;
    if(this.score == this.finePeople.children.entries.length){
      this.scene.start('stage3');
    }
  }

  clearPeople(){
    this.finePeople.getChildren().map(child => child.kill())
    this.badPeople.getChildren().map(child => child.kill())
    this.badPeople.getChildren()[0].kill();
    this.finePeople.getChildren()[0].kill();

  }
  makeNewLevel(){
    this.clearPeople();
    this.createFinePeople();
    this.createRandomBadPeople();
    this.makeOverlapBetweenGhostAndFinePeople();
    this.score = 0;
  }

  createPortal(){
    this.portalObject = this.map.getObjectLayer('Portal').objects[0];
    this.portal = new Portal(this, this.portalObject.x, this.portalObject.y);
  }

  create() {
    this.map = this.make.tilemap({ key: 'level2' });
    this.map.createStaticLayer('Background', 'arrow', 0, 0);
    this.map.createStaticLayer('Collision', 'arrow', 0, 0);
    this.badPeople = this.add.group();

    this.particles = this.add.particles('flares');
    // this.well = this.particles.createGravityWell({
    //    x: 0,
    //    y: 0,
    //    power: 3,
    //    epsilon: 100,
    //    gravity: 100
    // });
    this.cursors = this.input.keyboard.createCursorKeys();
    this.ghost = new Ghost(this, 300, 500);
    this.ball = new Ball(this, 350, 500);
    this.createFinePeople();
    this.createFollowerPeople();
    this.createRandomBadPeople();
    this.makeOverlapBetweenGhostAndFinePeople();
    this.createPortal();
    this.score = 0;
  }

  update(){
    //this.createWellParticles(this.ball);

  }


}
