import './style.css'
import Phaser from 'phaser'

const sizes = {
  width: 640,
  height: 480
}

let score = 0
const speedDown = 300
const speedAst = 1000



const tiroTriplo = {
  tempodevida: 100, 
  velocidade: 2000,
  quantidade: 2,
  forca: 1,
  intervalo: 100,
  zigzag: 0
}
const tiroSimples = {
  tempodevida: 100, 
  velocidade: 2000,
  quantidade: 1,
  forca: 1,
  intervalo: 200,
  zigzag: 0
}
const tirozigzag = {
  tempodevida: 300, 
  velocidade: 700,
  quantidade: 1,
  forca: 1,
  intervalo: 300,
  zigzag: 1
}



var tiro = tirozigzag



class cGrupoAsteroides extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene)
    this.scene = scene
    this.physics = scene.physics
    this.arcade = scene.physics.arcade
    this.world = scene.physics.world

  
  }
}
class cGrupoTiros extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);
    this.scene = scene;
    this.physics = scene.physics;
    this.arcade = scene.physics.arcade;
    this.world = scene.physics.world;
    
   
  }
}

class cAsteroide extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y) {

        super(scene, x, y, 'astedoide')
        scene.add.existing(this)
        scene.physics.add.existing(this) 
        
        
      }
  
      preload() {

        this.setState = this.getTime();
      }
      create() {
       
          }

  preUpdate(time, delta) {
    this.setVelocity(0, 300)
    this.setAccelerationY(1000)
    this.setAngularAcceleration(Phaser.Math.Between(-1000, 1000))
    super.preUpdate(time, delta)
    
    if (this.y > sizes.height) {
      this.destroy()  
    }
  }
  getTime() {
    let d = new Date();

    return d.getTime();
  }
}


class cTiro extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y) {

    super(scene, x+18, y, 'tiro')
    scene.add.existing(this)
    scene.physics.add.existing(this)   
    
    this.setState = this.getTime();
    
    
      }
  
  preUpdate(time, delta) {
  
    this.setVelocity(0, -tiro.velocidade)

    super.preUpdate(time, delta)
    
    
    if (this.y < 0) {
      this.destroy()  
    }
    if (Math.abs(this.setState - this.getTime()) > tiro.tempodevida) {
      this.destroy()  
    }
    
  }
  getTime() {
    let d = new Date();

    return d.getTime();
  }
}


class GameScene extends Phaser.Scene {
  constructor() {
    super("scene-game");
    this.player;
    this.cursor
    this.playerSpeed = 1000
    this.astedoide
    this.textScore
    this.timedEvent
    this.remainingTime
    this.score = 0
    this.fonte
    this.delta
    this.GrupoAsteroides
    this.GrupoTiros
  }


  preUpdate(time, delta) {
    this.delta = delta
  
  }
  preload() {
    this.load.image('bg1', 'assets/Background/1.png')
    this.load.image('player', 'assets/Ship/2.png')
    this.load.image('astedoide', 'assets/Background/Meteor1.png')
    this.load.image('tiro', 'assets/Shoot/1.png')
    this.GrupoAsteroides

    //  this.load.font('fonte', 'assets/Font/PressStart2P.ttf')
  }


  getTime() {
    let d = new Date();

    return d.getTime();
  }
  create() {

    this.GrupoAsteroides = new cGrupoAsteroides(this)
    this.GrupoTiros = new cGrupoTiros(this)

    this.add.image(0, 0, 'bg1').setOrigin(0, 0);
    this.textScore = this.add.text((sizes.width / 2) - 90, 0, 'Score : 0');

    this.textScore.setFontSize(30)
    this.textScore.setFont('PressStart2P')
    this.player = this.physics.add.image(sizes.width / 2, sizes.height - 50, 'player').setOrigin(0, 0)
    this.player.setImmovable(true)
    this.player.body.setAllowGravity(false)
    this.player.setCollideWorldBounds(true)
    this.player.setDragX(1000)
    this.cursor = this.input.keyboard.createCursorKeys()
    this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
    this.timedEvent2 = this.time.addEvent({ delay: tiro.intervalo, callback: this.atira, callbackScope: this, loop: true });


  }

  atira() {
    
    if (tiro.zigzag == 1) {
    
      const desvio = Math.sin(this.time.now / 100) * 30
      const umtiro = new cTiro(this, this.player.x  + desvio, this.player.y);
      this.GrupoTiros.add(umtiro);
      return;
  }

  const umtiro = new cTiro(this, this.player.x , this.player.y);
  this.GrupoTiros.add(umtiro);
  if (tiro.quantidade > 1) {      
    const umtiro2 = new cTiro(this, this.player.x + 18 , this.player.y);
    const umtiro3 = new cTiro(this, this.player.x - 18 , this.player.y);
    this.GrupoTiros.add(umtiro2);
    this.GrupoTiros.add(umtiro3);
  }


}


  onEvent() {

    const astedoide = new cAsteroide(this, Math.random() * sizes.width, 0)
   
    this.GrupoAsteroides.add(astedoide)


    
    score++
  }
  
  update() {

    this.GrupoAsteroides.getChildren().forEach(element => {
      if (element.y > sizes.height) {
      // element.destroy()
      }
    
      if (this.physics.overlap(this.player, element)) {
        element.destroy()
      }
      if (this.physics.overlap(this.GrupoTiros, element)) {
        element.destroy()
      }
  
 
    
  });    

    this.textScore.setText('score : ' + score)
    this.player.x += Math.sin(this.time.now / 220) * 0.3
    this.player.y += Math.cos(this.time.now / 420) * 0.3
    const { left, right, up, down } = this.cursor



    if (left.isDown) {
      this.player.setAccelerationX(-this.playerSpeed)
    } else if (right.isDown) {
      this.player.setAccelerationX(this.playerSpeed)
    } else {
      this.player.setAccelerationX(0)

    }
  }
}


const config = {
  type: Phaser.WEBGL,
  width: sizes.width,
  height: sizes.height,
  canvas: gameCanvas,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: speedDown },
      debug: false
    }
  },
  scene: [GameScene]
}

const game = new Phaser.Game(config)
