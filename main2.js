// build a top down shooter using Phaser 3
//using oo programming
// must have patterns for the enemies
// must have patterns for the shots fired by the player
// must have patterns for the enemies shots
// must have patterns for the enemies movement
// must have patterns for the enemies spawn
// it must draw inspiration from the game Galaga, vampire survivors, and other top down shooters
// must have a health bar
// must have a score
// must have a level
// must have a game over screen
// must have a start screen
// must have a pause screen
// must have a way to restart the game
// must have a way to pause the game
// must have a way to quit the game
// must have a way to mute the game
// must have a way to unmute the game
// must have a way to mute the music
// must have a way to unmute the music
// must have a way to mute the sound effects
// must have a way to unmute the sound effects
// must have some dash like moviments
// the shots must have a cooldown
// on every 10 points the level must increase
// the enemies must have a health bar
// the enemies must have a way to shoot
// the enemies must have a way to move
// the enemies must have a way to spawn
// the enemies must have a way to die
// the enemies must have a way to drop items
// the enemies must have a way to drop power ups
// every level up the player must choose a power up to use and it must be random
// the player must have a way to shoot
// the player must have a way to move
// the player must have a way to die
// the player must have a way to dash

import './style.css'


import Phaser from 'phaser';



//fazer padrões

//padrõres de inimigos
const pattern1 = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0]
];

const pattern2 = [
    [0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0],
    [1, 0, 0, 0, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

const pattern3 = [
    [0, 0, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 1, 1],
    [0, 0, 0, 1, 1],
    [0, 0, 0, 0, 0]
];


const padroes = [pattern1, pattern2, pattern3]

const TiposInimigos = ['enemynave1', 'enemynave2', 'enemynave3', 'enemynave4', 'boss1', 'boss2', 'boss3', 'dude', 'jelly', 'jelly2']




const FXExplosao = ['fx1', 'fx2', 'fx3', 'fx4','fx7']
const FXFire = ['fxfire', 'fx8', 'fx9']
const FXMisc = ['fx5', 'fx6']


class FX extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, tipo = -1, FX = FXFire) {
      
        //const ImgFX = ['fx1', 'fx2', 'fx3', 'fx4', 'fx5', 'fx6', 'fx7', 'fx8', 'fx9', 'fxfire', 'fxsmoke']
        const fx = FX[Phaser.Math.Between(0,FX.length-1)]     
        super(scene, x, y, fx)
         
        this.scene = scene
        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)
        this.setScale(1)
        this.setVelocityY(0)
        
        this.play(fx)
        this.once(Phaser.Animations.Events.ANIMATION_COMPLETE, this.destroi, this);
        this.setGravityY(0)
        
        this.isCircle = true
                      
    }
    destroi(sprite, animation) {
        this.destroy()
    }   
}

class Drop extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, drops = ['gem1', 'gem2', 'gem3', 'gem4'] ) {

       // const ImgDrops = ['powerup1', 'powerup2', 'powerup3', 'powerup4', 'powerup5', 'powerup6', 'powerup7', 'gem1', 'gem2', 'gem3', 'gem4']
       
         const drop = drops[Phaser.Math.Between(0, drops.length-1)]

        super(scene, x, y, drop)

        this.drop = drop
        this.scene = scene
        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)
    
        this.setImmovable(true)
        this.setScale(1)
        this.setVelocityY(Phaser.Math.Between(100, 200))
        this.setGravityY(50)
    
        this.scene.physics.add.collider(this, this.scene.player, this.ColisaoPlayer, null, this);
        this.timedEvent = this.scene.time.addEvent({ delay: 5000, callback: this.destroi, callbackScope: this, loop: false });        
    }
    
    destroi() {
        this.destroy()
    }

    ColisaoPlayer(sprite, player)  {   
        
        if (this.drop === 'gem1') {
            this.scene.score += 5
        }
        if (this.drop === 'gem2') {
            this.scene.score += 10
        }
        if (this.drop === 'gem3') {
            this.scene.score += 15
        }
        if (this.drop === 'gem4') {
            this.scene.score += 20
        }
    
        switch (this.drop) {
            case 'powerup1':
                player.setTipoTiro('P')

                
                break;
            case 'powerup2':
                player.setTipoTiro('B')

                
                break;
            case 'powerup3':
                player.setTipoTiro('R')
 
             
                break;
            case 'powerup4':
                player.setTipoTiro('E')
          
                
                break;
            case 'powerup5':
                player.setTipoTiro('S')
       
                
                break;
            case 'powerup6':
                player.setTipoTiro('S2')
         
                
                break;
            case 'powerup7':
                player.setTipoTiro('D')
        
                
                break;
            default:
                break;
        }
    
        this.scene.updateUI()
        
        
        player.blink()

        this.destroi()

    }
}


//must create a way to spawn enemies in a pattern

class AsteroidPattern {
    constructor(scene) {
        this.scene = scene;
        this.asteroids = [];
    }

    createPattern(x, y) {
        const pattern = padroes[Phaser.Math.Between(0, 2)];
         y -= 100
        const startX = x - (pattern[0].length * 50) / 2;
        const startY = y - (pattern.length * 50) / 2;

        for (let row = 0; row < pattern.length; row++) {
            for (let col = 0; col < pattern[row].length; col++) {
                if (pattern[row][col] === 1) {
                    const asteroid = new Astedoide(this.scene, startX + col * 50, startY + row * 50);
                    this.asteroids.push(asteroid);
                }
            }
        }
    }

    destroyPattern() {
        this.asteroids.forEach(asteroid => asteroid.destroy());
        this.asteroids = [];
    }
}

class Inimigo extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, tipoinimigo = 'bebezinho') {
        super(scene, x, y, tipoinimigo)  
        this.scene = scene
        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)
        this.maior = false
        this.life = 1
        this.segueJogador = false
        this.zigzag = false
        this.atirador = false
        this.dasher = false //é movimento
        this.disableX = false
        this.disableY = false
        this.segundoMovimento = false
        this.movimentoSin = false
        this.movimentoCos = false
        this.criadude = false
        this.smoker = false
        this.PodeMaior = false
        this.vely = 100
        this.drops = ['gem1', 'gem2']
        this.setDepth(0)

        this.frequenciadetiro = 1000

        this.velocidadetiro = 500


        this.EventoMovimento = 800
        this.EventoTiro = 1000
        this.EventoMorre = 6000
      
        

        switch (tipoinimigo) {
            case 'boss1':
                this.life = 4
                this.atirador= true
                this.maior = true
                this.smoker = true
                this.EventoMorre = 10000
                this.velocidadetiro = 1000
                this.frequenciadetiro = 500
                this.drops = ['gem4', 'gem5','powerup1', 'powerup2', 'powerup3', 'powerup4']
                break;
            case 'boss2':
                this.life = 4
                this.atirador= true
                this.maior = true
                this.velocidadetiro = 2000
                this.frequenciadetiro = 700
                this.EventoMorre = 10000
                this.drops = ['gem4', 'gem5','powerup1', 'powerup2', 'powerup3', 'powerup4']
                break;
            case 'boss3':
                this.life = 2
                this.atirador= true
                this.maior = true
                this.velocidadetiro = 1000
                this.frequenciadetiro = 600
                this.EventoMorre = 10000
                this.drops = ['gem4', 'gem5','powerup1', 'powerup2', 'powerup3', 'powerup4']
                break;

            case 'jelly':
                this.life = 1
                this.zigzag = true
                this.smoker = true
                this.EventoMorre = 7000
                this.drops = ['gem1', 'gem2']
                break;
            case 'jelly2':
                this.life = 1
                this.zigzag = true
                this.segundoMovimento = true
                this.EventoMorre = 7500
                this.drops = ['gem1', 'gem2']
                break;

            case 'dude':
                this.atirador= true
                this.velocidadetiro = 120
                this.life = 1
                this.EventoMorre = 5000
                this.drops = ['gem1', 'gem2', 'powerup1', 'powerup2', 'powerup3', 'powerup4']
                break;
            
        
            case 'enemynave1'://complexa
                this.atirador= true
                this.segundoMovimento = true
                this.life = 2
                this.criadude = true
                this.frequenciadetiro = 120
                this.EventoMorre = 8000
                this.drops  = ['gem1', 'gem2', 'powerup1', 'powerup2', 'powerup3', 'powerup4']
                
                break;
            case 'enemynave2':
                this.atirador= true
                this.EventoMorre = 6500
                this.velocidadetiro = 200
                this.life = 1
                this.drops = ['gem1', 'gem2']
                break;
            case 'enemynave3':
                this.atirador= true
                this.life = 1
                this.EventoMorre = 5000
                this.velocidadetiro = 350
                this.criadude = true
                this.drops = ['gem1', 'gem2']
                break;
            case 'enemynave4'://complexa
                this.atirador= true
                this.life = 2
                this.criadude = true
                this.segundoMovimento = true
                this.EventoMorre = 8300
                this.frequenciadetiro = 200
                this.velocidadetiro = 400
                this.PodeMaior = true
                this.drop = ['gem1', 'gem2', 'powerup1', 'powerup2', 'powerup3', 'powerup4']

                break;
            case 'bebezinho':
                this.EventoMorre = 4000
                this.velocidadetiro = 200
                this.atirador= true
               // this.segundoMovimento = true
               // this.criadude = true
                this.life = 1
                this.smoker = true
                //this.PodeMaior = true
              //  this.zigzag = true
              this.drops = ['gem1', 'gem2']
                break;

            default:
                break;
        }
        if (this.PodeMaior === true) {
            this.setScale(Math.random() < 0.1 ? 1.5 : 1) 
            if (this.scaleX > 1) {
                this.maior = true
                this.EventoMorre += 3000
                this.velocidadetiro *= 2
                this.life += 2
            }
        }else{

            this.setScale(1)
        }
        
        this.setVelocityY(Phaser.Math.Between(this.vely, this.vely + 10))
        this.setCollideWorldBounds(false)

        this.setGravityY(800)
        this.setBounce(0)
        this.setImmovable(true)
        this.setDragY(850)
        //this.tint = new Phaser.Display.Color(Phaser.Math.Between(0, 255), Phaser.Math.Between(0, 255), Phaser.Math.Between(0, 255)).color
        this.isCircle = true
      
        this.scene.physics.add.collider(this, this.scene.GrupoTiros, this.ColisaoTiros, null, this);
        this.scene.physics.add.collider(this, this.scene.player, this.ColisaoPlayer, null, this);
        this.MorreEvent = this.scene.time.addEvent({ delay: this.EventoMorre, callback: this.destroi, callbackScope: this, loop: false });
        if (this.atirador === true) {
            this.TiroEvent = this.scene.time.addEvent({ delay: this.EventoTiro, callback: this.atira, callbackScope: this, loop: true });
        }
        this.MovimentoEvent = this.scene.time.addEvent({ delay: this.EventoMovimento, callback: this.Movimento, callbackScope: this, loop: true });
    }

    smokeup()
    {
        for (var i = 0; i < 7; i++) {
            new FX(this.scene, this.x-Phaser.Math.Between(-20,20), this.y+Phaser.Math.Between(-20,20), -1, ['fxsmoke'])
        }

    }

    //cria um inimigo do tipo 'dude' na posição x, y

    CriaDude (){

        const inim = new Inimigo(this.scene, this.x, this.y+10, 'dude')   

    }


    Movimento() {
        if (this.active === false) {return}
        this.setVelocityX(Phaser.Math.Between(-this.vely, this.vely))
        this.setVelocityY(Phaser.Math.Between(-this.vely, this.vely))
        this.angle += Phaser.Math.Between(-3, 3)
        this.gravity = Phaser.Math.Between(-3, 3)

        if (this.segundoMovimento === true) {
            this.setVelocityX(Phaser.Math.Between(-this.vely, this.vely))
            this.setVelocityY(Phaser.Math.Between(-this.vely, this.vely))
            this.angle += Phaser.Math.Between(-3, 3)
            this.gravity = Phaser.Math.Between(-3, 3)
        }



    }

    atira() {
        if (this.active === false) {return}

        if (this.smoker === true) {
            if(Math.random() < 0.1)
            {
                this.smokeup()

            }
        }

        if (this.criadude === true) {
            if(Math.random() < 0.1)
            {
                this.CriaDude()
                return

            }
        }
        

        this.scene.GrupoTirosInimigos.add ( new Tiro(this.scene, this.x, this.y+10, -1, this.velocidadetiro))
        
        if (this.maior === true) {
            this.scene.GrupoTirosInimigos.add ( new Tiro(this.scene, this.x+10, this.y+10, -1, this.velocidadetiro))
        }
    }   



    ColisaoTiros(sprite, tiro) {
        
        var desvio = Phaser.Math.Between(-10, 10)
        new FX(this.scene, this.x-desvio, this.y+desvio,-1, FXExplosao)
        desvio = Phaser.Math.Between(-10, 10)
        new FX(this.scene, this.x+desvio, this.y+desvio, -1, FXFire)
        
        //this.destroy();
        this.life -= this.scene.player.dano
        tiro.destroy();
    }

    ColisaoPlayer(sprite, player)  {
        
        var desvio = Phaser.Math.Between(-10, 10)
        new FX(this.scene, this.x-desvio, this.y+desvio)
        desvio = Phaser.Math.Between(-10, 10)
        new FX(this.scene, this.x+desvio, this.y+desvio)
        this.scene.player.tomaDano()
        this.life -= 1
        //this.destroy();
    }

    destroi() {
        if (this.active === false) {return}
        this.smokeup()
        this.destroy()
        
    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta)
        if (this.life <= 0) {
            var desvio = Phaser.Math.Between(-10, 10)
            new FX(this.scene, this.x-desvio, this.y+desvio)
            desvio = Phaser.Math.Between(-10, 10)
            new FX(this.scene, this.x+desvio, this.y+desvio)
            new Drop(this.scene, this.x, this.y, this.drops)
            this.destroy()
           
        }

        if (this.zigzag === true) {
            this.x +=  Math.sin(time / 100)  * 4
        }

        this.scaleX +=  Math.sin(time / 100)  / 50
        this.scaleY += Math.cos(time / 100) /50
    }


}

class Astedoide extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      
        const ImgAsteroides = ['astedoide1', 'astedoide2', 'astedoide3', 'astedoide4', 'astedoide5']

        super(scene, x, y, ImgAsteroides[Phaser.Math.Between(0, 4)])
        this.scene = scene
        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)
        this.setScale(1)
        this.setVelocityY(Phaser.Math.Between(100, 105))
        this.setCollideWorldBounds(false)
        this.setBounce(1)
        this.setAngularAcceleration(100)
        this.setGravityY(1000)
        this.setDragY(1000)
        this.isCircle = true
        this.scene.physics.add.collider(this, this.scene.GrupoTiros, this.ColisaoTiros, null, this);
        this.scene.physics.add.collider(this, this.scene.player, this.ColisaoPlayer, null, this);
        this.timedEvent = this.scene.time.addEvent({ delay: 10000, callback: this.destroi, callbackScope: this, loop: false });
     
    }

    
    preUpdate(time, delta) {
        super.preUpdate(time, delta)
    }


    ColisaoTiros(sprite, tiro) {
        var desvio = Phaser.Math.Between(-10, 10)
        new FX(this.scene, this.x-desvio, this.y+desvio,-1, FXExplosao)  
        desvio = Phaser.Math.Between(-10, 10)
        new FX(this.scene, this.x+desvio, this.y+desvio, -1, FXFire)  

        new Drop(this.scene, this.x, this.y)

        this.destroy();
        tiro.destroy();

        
    }
    ColisaoPlayer(sprite, player)  {       

        var desvio = Phaser.Math.Between(-10, 10)
        new FX(this.scene, this.x-desvio, this.y+desvio)  
        desvio = Phaser.Math.Between(-10, 10)
        new FX(this.scene, this.x+desvio, this.y+desvio)  
        this.scene.player.tomaDano()
        this.destroy();

                
    }


    destroi() {
    
        this.destroy()

    }   
}


class Tiro extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, direcao = 1, velocidadetiro = 300, rocket = false, tipo = "tiro2" ) {
        super(scene, x, y, tipo)
        


        this.scene = scene
        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)
        this.setScale(1 * direcao)
        this.setVelocityY(-velocidadetiro * direcao)
        this.setCollideWorldBounds(false)
        this.setBounce(0)
        this.setGravityY(-velocidadetiro * direcao)
        this.setDragY(50)
        
        
        this.timedEvent = this.scene.time.addEvent({ delay: 2000, callback: this.destroi, callbackScope: this, loop: false });
        
    }
    destroi() {
        this.destroy()
    }   

    preUpdate(time, delta) {
        super.preUpdate(time, delta)
        if (this.rocket === true) {
            this.x +=  Math.sin(time / 90)  * 5
        }
        //this.y += Math.cos(time / 100) /50

        if (this.y < 0) {
            this.destroy()
        }
    }


}



class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player')

        this.tipodetiro = 'P'
        this.dano = 1
        this.frequenciadetiro = 1000
        this.scene = scene
        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)
        this.setCollideWorldBounds(true)
        this.setScale(1)
        this.setImmovable(true)

        this.levelP = 0
        this.levelB = 0
        this.levelR = 0
        this.levelE = 0
        this.levelS = 0
        this.levelS2 = 0
        this.levelD = 0


        this.vidas = 3
        this.energia = 1

        this.energycooldown = 1000

        this.velocidadetiro = 800

        this.dashTimer = null;
        this.dashCooldown = 1000; // milliseconds

        this.cursor = this.scene.input.keyboard.createCursorKeys()
        this.timedEvent = this.scene.time.addEvent({ delay: this.frequenciadetiro, callback: this.atira, callbackScope: this, loop: true });
        this.EnergiaEvent = this.scene.time.addEvent({ delay: this.energycooldown, callback: this.RecuperaEnergia, callbackScope: this, loop: true });  
        this.scene.physics.add.collider(this, this.scene.GrupoTirosInimigos, this.ColisaoTiros, null, this);
    }

    reset(){
        this.vidas = 3
        this.energia = 1
        this.scene.healthbarcolor.setScale(1, 1)
        this.scene.energybarcolor.setScale(1, 1)
        this.levelP = 0
        this.levelB = 0
        this.levelR = 0
        this.levelE = 0
        this.levelS = 0
        this.levelS2 = 0
        this.levelD = 0
        this.tipodetiro = 'P'
        this.dano = 1
        this.frequenciadetiro = 1000
        this.velocidadetiro = 800
        this.dashTimer = null;
        this.dashCooldown = 1000; // milliseconds
    }

    RecuperaEnergia() {
        if (this.scene.energybarcolor.scaleX < 1) {
            this.scene.energybarcolor.setScale(this.scene.energybarcolor.scaleX+0.1, 1)
        }
    }

    ColisaoTiros(sprite, tiro) {
        var desvio = Phaser.Math.Between(-10, 10)
        new FX(this.scene, this.x-desvio, this.y+desvio,-1, FXExplosao)
        desvio = Phaser.Math.Between(-10, 10)
        new FX(this.scene, this.x+desvio, this.y+desvio, -1, FXFire)
        this.tomaDano()
        tiro.destroy();
    }
    setVelocidadeTiro(vel) {
        this.velocidadetiro = vel
    }
    setfrequenciaTiro(freq) {
        this.frequenciadetiro = freq
        this.timedEvent.delay = freq
    }

    setTipoTiro(tipo) {
        this.tipodetiro = tipo
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta)
       
        this.scaleX +=  Math.sin(time / 150)  / 75
        this.scaleY += Math.cos(time / 150) /70

        this.body.setAllowGravity(false)
        this.setDragX(500)
        this.scene.fogo.x = this.x-6
        this.scene.fogo.y = this.y+40
        const { left, right, up, down, D } = this.cursor;
        if (left.isDown) {
            this.setAccelerationX(-1500);
            this.scene.fogo.scaleY = -0.4
            this.scene.fogo.x = this.x-6
            this.scene.fogo.y = this.y+17
            
            
        } else if (right.isDown) {
            this.setAccelerationX(1500);
            this.scene.fogo.scaleY = -0.4
            this.scene.fogo.x = this.x-6
            this.scene.fogo.y = this.y+17
        }else if (up.isDown) {

        } else {
            this.setAccelerationX(0);
            this.scene.fogo.scaleY = -1.5
            this.scene.fogo.y = this.y+60
        }
      
        
        //mecanica de dash

        if (Phaser.Input.Keyboard.JustDown(left) || Phaser.Input.Keyboard.JustDown(right)) {
        
            if (this.dashTimer && this.dashTimer.getProgress() < 1) {
                
                if (left.isDown) {
                    if (this.scene.energybarcolor.scaleX > 0.4) {
                        this.scene.energybarcolor.setScale(this.scene.energybarcolor.scaleX-0.4, 1)
                    }else{return}
                    if(this.scene.energybarcolor.scaleX<=0) this.scene.energybarcolor.scaleX = 0
                    this.setAccelerationX(0)
                    this.setDragX(30000)
                    this.setVelocityX(-700);
                    this.smokeup()
                    this.blink()
                    
                    
                } else if (right.isDown) {
                    if (this.scene.energybarcolor.scaleX > 0.4) {
                        this.scene.energybarcolor.setScale(this.scene.energybarcolor.scaleX-0.4, 1)
                    }else{return}
                    if(this.scene.energybarcolor.scaleX<=0) this.scene.energybarcolor.scaleX = 0
                    this.setDragX(30000)
                    this.setAccelerationX(0)
                    this.setVelocityX(700);
                    this.smokeup()
                    this.blink()
                    

                }
                this.dashTimer.remove();

            } else {
                this.dashTimer = this.scene.time.delayedCall(this.dashCooldown, () => {
                    this.dashTimer = null;
                    this.setDragX(800)
                });

            }
        }

    }

    blink(){
        for (var i = 0; i < 3; i++) {
            new FX(this.scene, this.x-Phaser.Math.Between(-20,20), this.y+Phaser.Math.Between(-20,20), -1, ['fx5'])
        }
    }

    smokeup()
    {
        for (var i = 0; i < 7; i++) {
            new FX(this.scene, this.x-Phaser.Math.Between(-20,20), this.y+Phaser.Math.Between(-20,20), -1, ['fxsmoke'])
        }

    }
    atira() {
        
        console.log(this.tipodetiro)
        switch (this.tipodetiro) {
            case 'P':

                this.scene.GrupoTiros.add(new Tiro(this.scene, this.x, this.y, 1, 500, false, "tiro").setScale(2.4))
                this.dano = 2
                this.setfrequenciaTiro(1000);

                break;
            case 'B':
                this.scene.GrupoTiros.add(new Tiro(this.scene, this.x, this.y, 1, 800, true, 'tiro2').setScale(0.4))
                this.dano = 0.2
                this.setfrequenciaTiro(100);
                break;
            case 'R':
                this.scene.GrupoTiros.add(new Tiro(this.scene, this.x, this.y, 1, this.velocidadetiro, true, 'tiro3'))
                this.dano = 0.4
                this.setfrequenciaTiro(160);
                break;
            case 'E':
                this.scene.GrupoTiros.add(new Tiro(this.scene, this.x, this.y, 1, this.velocidadetiro, false, 'tiro4').setScale(1.4))
                this.setfrequenciaTiro(400);
                break;
            case 'S':
                this.scene.GrupoTiros.add(new Tiro(this.scene, this.x, this.y, 1, this.velocidadetiro, false, 'tiro5'))
                this.setfrequenciaTiro(1000);
                break;
            case 'S2':
                this.scene.GrupoTiros.add(new Tiro(this.scene, this.x, this.y, 1, this.velocidadetiro, false, 'tiro6'))
                break;
            case 'D':
                this.scene.GrupoTiros.add(new Tiro(this.scene, this.x, this.y, 1, this.velocidadetiro, false, 'tiro7'))
                break;
            default:
                this.scene.GrupoTiros.add(new Tiro(this.scene, this.x, this.y, 1, this.velocidadetiro, false, 'tiro'))
                break;
        }


        
    }
    tomaDano(){
       
        if (this.scene.energybarcolor.scaleX > 0.1) {
            this.scene.energybarcolor.setScale(this.scene.energybarcolor.scaleX-0.4, 1)
        }else{
            this.scene.healthbarcolor.setScale(this.scene.healthbarcolor.scaleX-0.1, 1)
        }

        if (this.scene.healthbarcolor.scaleX <= 0) {

            this.scene.healthbarcolor.setScale(1, 1)
            this.scene.imgLife[this.vidas].destroy()
            this.vidas -= 1        
        }

        if(this.scene.energybarcolor.scaleX<=0) this.scene.energybarcolor.scaleX = 0
        if(this.scene.healthbarcolor.scaleX<=0) this.scene.healthbarcolor.scaleX = 0
        if (this.vidas <= 0) {
            this.waveIndex = 0  
            this.scene.scene.start('scene-gameover')

                
        }
    }
}





  


  class GameScene extends Phaser.Scene {
    constructor() {
      super('scene-game')
      this.player;  
      this.fogo
      this.astedoide;
      this.GrupoAsteroides 
      this.GrupoTiros
      this.AnimExplosao
      this.AnimFogo
      this.ImgAsteroides = []

      this.GrupoTirosInimigos


      this.textScore
      this.textLevel
    

      this.healthbarbg
      this.healthbarcolor

      this.energybarbg
      this.energybarcolor
      
      this.imgLife = []

        this.score = 0
        this.level = 0 

        this.FXanims = []

        this.waveIndex = 0;
        this.waveDuration = 20000; // duration of each wave in milliseconds
        this.timeBetweenWaves = 3000; // time between waves in milliseconds
        

        this.waveTimer = null;
        this.intermizzoTimer = null;
        this.spawnTimer = null;
        
        this.waveText = null;
        this.waveTextTween = null;

        this.tempoSpawnInimigo = 2000


    }           

    reset(){
        this.player.reset()
        this.GrupoTiros.clear(true, true)
        this.GrupoTirosInimigos.clear(true, true)
        this.GrupoAsteroides.clear(true, true)
        this.score = 0
        this.level = 0
        this.updateUI()
        this.waveIndex = 0
        this.startNextWave()
    }


    //o jogo deve possuir um sistema de waves de inimigos
    //o sistema de waves deve ser chamado ao final de cada wave que dura um tempo determinado
    //o sistema de waves tambem termina quando o ultimo inimigo da wave é destruido
    //entre as waves o jogador deve ter um tempo de alguns segundos voando até a proxima wave
    
    betweenWaves() {
        this.waveText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Wave ' + (this.waveIndex + 1), { fontFamily: 'PressStart2P', fontSize: 30, color: '#ffffff' });   
        this.waveText.setOrigin(0.5);
        this.waveTextTween = this.tweens.add({
            targets: this.waveText,
            alpha: 0,
            duration: this.timeBetweenWaves / 2,
            ease: 'Linear',
            repeat: 0,
            yoyo: false,
            onComplete: () => { this.waveText.destroy(); this.waveTextTween = null; }
        });

        this.intermizzoTimer = this.time.addEvent({ delay: this.timeBetweenWaves, callback: this.startNextWave, callbackScope: this, loop: false });
        this.waveTimer = null;
        this.spawnTimer = null;
        this.waveIndex++;

    }

    startNextWave() {
       
        this.waveTimer = this.time.addEvent({ delay: this.waveDuration, callback: this.betweenWaves, callbackScope: this, loop: false });
        this.spawnTimer =  this.time.addEvent({ delay: this.tempoSpawnInimigo, callback: this.LancaAsteroide, callbackScope: this, loop: true });
    }
    preload() {
        
        this.load.image('bg1', 'assets/Background/3b.png')
        this.load.image('player', 'assets/Ship/2.png')

        this.load.image('emptylife', 'assets/Hud/EmptylLife.png')

        this.load.image('fulllife', 'assets/Hud/FullLife.png')
        this.load.image('healthbarbg', 'assets/Hud/HealthBar.png')
        this.load.image('healthbar', 'assets/Hud/HealthBarColor.png')

        this.load.image('energybarbg', 'assets/Hud/EnergieBar.png')
        this.load.image('energybar', 'assets/Hud/EnergieBarColor.png')




        //naves olhanco para cima
        this.load.image('enemynave1', 'assets/Ship/11.png').flipY = true
        this.load.image('enemynave2', 'assets/Ship/6.png').flipY = true
        this.load.image('enemynave3', 'assets/Ship/6b.png').flipY = true
        this.load.image('enemynave4', 'assets/Ship/4.png').flipY = true




        //naves de boss olhando pra baixo
        this.load.image('boss1', 'assets/Ship/7.png')
        this.load.image('boss2', 'assets/Ship/8.png')
        this.load.image('boss3', 'assets/Ship/9.png')
        

        //naves olhando pra baixo
        this.load.image('bebezinho', 'assets/Ship/10.png')
        this.load.image('jelly', 'assets/Ship/jelly.png')
        this.load.image('jelly2', 'assets/Ship/jelly-2.png')
        this.load.image('dude', 'assets/Ship/5.png')


        
        this.load.image('LifeIcon', 'assets/Hud/LifeIcon.png')

        this.load.image('tiro', 'assets/Shoot/1.png')
        this.load.image('tiro2', 'assets/Shoot/2.png')
        this.load.image('tiro3', 'assets/Shoot/3.png')
        this.load.image('tiro4', 'assets/Shoot/4.png')
        this.load.image('tiro5', 'assets/Shoot/5.png')
        this.load.image('tiro6', 'assets/Shoot/6.png')
        this.load.image('tiro7', 'assets/Shoot/7.png')
        this.load.image('tiro8', 'assets/Shoot/8.png')
        this.load.image('tiro9', 'assets/Shoot/9.png')
        this.load.image('tiro10', 'assets/Shoot/10.png')
        this.load.image('tiro11', 'assets/Shoot/11.png')
        this.load.image('tiro12', 'assets/Shoot/12.png')
        this.load.image('tiro13', 'assets/Shoot/13.png')
        this.load.image('tiro14', 'assets/Shoot/14.png')


        this.load.image('astedoide1', 'assets/Background/Meteor1.png')
        this.load.image('astedoide2', 'assets/Background/Meteor2.png')
        this.load.image('astedoide3', 'assets/Background/Meteor3.png')
        this.load.image('astedoide4', 'assets/Background/Meteor4.png')
        this.load.image('astedoide5', 'assets/Background/Meteor5.png')
        
        this.load.image('powerup1', 'assets/Item/PowerUp1.png')
        this.load.image('powerup2', 'assets/Item/PowerUp2.png')
        this.load.image('powerup3', 'assets/Item/PowerUp3.png')
        this.load.image('powerup4', 'assets/Item/PowerUp4.png')
        this.load.image('powerup5', 'assets/Item/PowerUp5.png')
        this.load.image('powerup6', 'assets/Item/PowerUp6.png')
        this.load.image('powerup7', 'assets/Item/PowerUp7.png')

        this.load.image('gem1', 'assets/Item/Gem1.gif')
        this.load.image('gem2', 'assets/Item/Gem2.gif')
        this.load.image('gem3', 'assets/Item/Gem3.gif')
        this.load.image('gem4', 'assets/Item/Gem4.gif')

        this.load.spritesheet('fx1', 'assets/Fx/Fx1.png', { frameWidth: 38, frameHeight: 38, numberOfFrames: 6 })
        this.load.spritesheet('fx2', 'assets/Fx/Fx2.png', { frameWidth: 34, frameHeight: 34, numberOfFrames: 6 })
        this.load.spritesheet('fx3', 'assets/Fx/Fx3.png', { frameWidth: 30, frameHeight: 30, numberOfFrames: 6 })
        this.load.spritesheet('fx4', 'assets/Fx/Fx4.png', { frameWidth: 36, frameHeight: 36, numberOfFrames: 6 })
        this.load.spritesheet('fx5', 'assets/Fx/Fx5.png', { frameWidth: 14, frameHeight: 28, numberOfFrames: 5 })
        this.load.spritesheet('fx6', 'assets/Fx/Fx6.png', { frameWidth: 12, frameHeight: 28, numberOfFrames: 6 })
        this.load.spritesheet('fx7', 'assets/Fx/Fx7.png', { frameWidth: 82, frameHeight: 72, numberOfFrames: 8 })
        this.load.spritesheet('fx8', 'assets/Fx/Fx8.png', { frameWidth: 32, frameHeight: 32, numberOfFrames: 7 })
        this.load.spritesheet('fx9', 'assets/Fx/Fx9.png', { frameWidth: 32, frameHeight: 32, numberOfFrames: 7 })

        this.load.spritesheet('fxfire', 'assets/Fx/fx fire.png', { frameWidth: 16, frameHeight: 16, numberOfFrames: 6 })
        this.load.spritesheet('fxsmoke', 'assets/Fx/smoke.png', { frameWidth: 16, frameHeight: 16, numberOfFrames: 6 })


        this.load.spritesheet('explosao', 'assets/Fx/Fx1.png', { frameWidth: 38, frameHeight: 38, numberOfFrames: 6 })
        this.load.spritesheet('fogo', 'assets/Fx/Fx6.png', { frameWidth: 12, frameHeight: 28, numberOfFrames: 6 })
    }   
    update(time, delta) {

       
  
    

       

    }


    updateUI() {

        
        for (var i = 0; i < this.player.vidas; i++) {
            this.imgLife[i].visible = true
        }
        this.textScore.setText('Score : ' + this.score);
        this.textLevel.setText('Level : ' + this.level);

        if (this.score % 10 === 0) {
            this.level++;
        }
    }
    create() {
        
        
        this.anims.create({ key: 'fx1', frames: this.anims.generateFrameNumbers('fx1', { start: 0, end: 5 }), frameRate: 10, repeat: 0 })
        this.anims.create({ key: 'fx2', frames: this.anims.generateFrameNumbers('fx2', { start: 0, end: 5 }), frameRate: 10, repeat: 0 })
        this.anims.create({ key: 'fx3', frames: this.anims.generateFrameNumbers('fx3', { start: 0, end: 5 }), frameRate: 10, repeat: 0 })
        this.anims.create({ key: 'fx4', frames: this.anims.generateFrameNumbers('fx4', { start: 0, end: 5 }), frameRate: 10, repeat: 0 })
        this.anims.create({ key: 'fx5', frames: this.anims.generateFrameNumbers('fx5', { start: 0, end: 4 }), frameRate: 10, repeat: 0 })
        this.anims.create({ key: 'fx6', frames: this.anims.generateFrameNumbers('fx6', { start: 0, end: 5 }), frameRate: 10, repeat: 0 })
        this.anims.create({ key: 'fx7', frames: this.anims.generateFrameNumbers('fx7', { start: 0, end: 7 }), frameRate: 10, repeat: 0 })
        this.anims.create({ key: 'fx8', frames: this.anims.generateFrameNumbers('fx8', { start: 0, end: 6 }), frameRate: 10, repeat: 0 })
        this.anims.create({ key: 'fx9', frames: this.anims.generateFrameNumbers('fx9', { start: 0, end: 6 }), frameRate: 10, repeat: 0 })
        this.anims.create({ key: 'fxfire', frames: this.anims.generateFrameNumbers('fxfire', { start: 0, end: 5 }), frameRate: 10, repeat: 0 })
        this.anims.create({ key: 'fxsmoke', frames: this.anims.generateFrameNumbers('fxsmoke', { start: 0, end: 5 }), frameRate: 10, repeat: 0 })

        this.imgLife[0] = this.add.image(10, 50, 'LifeIcon').setOrigin(0,0).setDepth(1)
        this.imgLife[1] = this.add.image(40, 50, 'LifeIcon').setOrigin(0,0).setDepth(1)
        this.imgLife[2] = this.add.image(70, 50, 'LifeIcon').setOrigin(0,0).setDepth(1)
        this.imgLife[3] = this.add.image(100, 50, 'LifeIcon').setOrigin(0,0).setDepth(1)
        
        this.AnimExplosao = this.anims.create({ key: 'explosao', frames: this.anims.generateFrameNumbers('explosao', { start: 0, end: 5 }), frameRate: 10, repeat: 0 })
        this.AnimFogo = this.anims.create({ key: 'fogo', frames: this.anims.generateFrameNumbers('fogo', { start: 0, end: 5 }), frameRate: 10, repeat: -1 })
        this.GrupoAsteroides = new Phaser.GameObjects.Group(this)
        this.GrupoTiros = new Phaser.GameObjects.Group(this)
        this.GrupoTirosInimigos = new Phaser.GameObjects.Group(this)
        this.add.image(0,0, "bg1").setOrigin(0,0)
        this.player = new Player(this, 320, 430)
        this.fogo = this.add.sprite(this.player.x-6, this.player.y+45, 'fogo').setOrigin(0,0)
        this.fogo.play('fogo')
        this.fogo.scaleY = -1

        

        this.healthbarbg = this.add.image(10, 10, 'healthbarbg').setOrigin(0,0).setDepth(1)
        this.healthbarcolor = this.add.image(19, 17, 'healthbar').setOrigin(0,0).setDepth(1)

        this.energybarbg = this.add.image(10 + 120, 10+3, 'energybarbg').setOrigin(0,0).setDepth(1)
        this.energybarcolor = this.add.image(19 + 120, 17+3, 'energybar').setOrigin(0,0).setDepth(1)


        this.textScore = this.add.text((640)-120, 20, 'Score : 0' ).setDepth(1);
        this.textScore.setFontSize(10);
        this.textScore.setFontFamily('PressStart2P');
        
        this.textLevel = this.add.text((640)-120, 40, 'Level : 0' ).setDepth(1);
        this.textLevel.setFontSize(10);
        this.textLevel.setFontFamily('PressStart2P');
        this.input.keyboard.on('keydown-SPACE', function () {
            this.scene.pause()
            this.scene.launch('scene-pause');
            
        }, this)

        this.input.keyboard.on('keydown-ESC', function () {
            this.reset()
            this.scene.start('scene-game')
        }, this)
        
        this.betweenWaves();
    }



    
    LancaAsteroide() {
        //this.timedEvent.delay = Phaser.Math.Between(400, 1500)
        this.inimigos10porcento = ["boss1", "boss2", "dude"]
        this.inimigos25porcento = ["enemynave1", "enemynave4","boss3"]   
        this.inimigos50porcento = ["astedoide","enemynave3", "enemynave2"]
        this.inimigos100porcento = ["bebezinho", "jelly","jelly2", "asteroide" ]    
        this.updateUI()
        this.porcentagem = Phaser.Math.Between(0, 100)
        if (this.porcentagem <= 5){

            //inimigos que podem ser criados com 10% de chance

        
            const selecionado = this.inimigos10porcento[Phaser.Math.Between(0, this.inimigos10porcento.length-1)]
            
            if (selecionado === "astedoide") {
                const pattern = new AsteroidPattern(this);

                pattern.createPattern(Phaser.Math.Between(0, 640), 0);
                return
            }     
            
            const inim = new Inimigo(this, Phaser.Math.Between(0, 640), 0, selecionado )
            return



        }else if (this.porcentagem <= 30 ) {
            //inimigos que podem ser criados com 25% de chance
            const selecionado = this.inimigos25porcento[Phaser.Math.Between(0, this.inimigos10porcento.length-1)]
            if (selecionado === "astedoide") {
                const pattern = new AsteroidPattern(this);

                pattern.createPattern(Phaser.Math.Between(0, 640), 0);
                return
            }   

            const inim = new Inimigo(this, Phaser.Math.Between(0, 640), 0, selecionado )
            return
        }else if (this.porcentagem <= 70 ) {
            const selecionado = this.inimigos50porcento[Phaser.Math.Between(0, this.inimigos10porcento.length-1)]
            if (selecionado === "astedoide") {
                const pattern = new AsteroidPattern(this);

                pattern.createPattern(Phaser.Math.Between(0, 640), 0);
                return
            }   
            //inimigos que podem ser criados com 50% de chance
            
            const inim = new Inimigo(this, Phaser.Math.Between(0, 640), 0, selecionado )
            return
        
       
        }else if (this.porcentagem <= 100  ) {
            const selecionado = this.inimigos100porcento[Phaser.Math.Between(0, this.inimigos10porcento.length-1)]
            if (selecionado === "astedoide") {
                const pattern = new AsteroidPattern(this);

                pattern.createPattern(Phaser.Math.Between(0, 640), 0);
                return
            }   

           //inimigos que podem ser criados com 100% de chance
             
              const inim = new Inimigo(this, Phaser.Math.Between(0, 640), 0, selecionado )
              return
        }
     
    }
}

class Pausa extends Phaser.Scene {
    constructor() {
        super('scene-pause')
    }

    create() {
        this.add.rectangle(640/2, 480/2, 640, 480, 0x000000, 0.5)
        this.add.text(640/2-35, 480/2, 'PAUSE').setFontFamily('PressStart2P');
        this.input.keyboard.on('keydown-SPACE', function () {
            this.scene.resume('scene-game')
            this.scene.stop()
        }, this)


    }
}


class GameOver extends Phaser.Scene {
    constructor() {
        super('scene-gameover')
    }

    create() {
        this.add.text(640/2-45, 480/2, 'GAMEOVER').setFontFamily('PressStart2P');
        this.input.keyboard.on('keydown-SPACE', function () {
            var game = this.scene.launch('scene-game')
            this.scene.stop()
        }, this)


    }
}


class TitleScene extends Phaser.Scene {
    constructor() {
        super('scene-title');
        this.fundo;
    }
    preload() {
        // Carregue a imagem do logotipo
        this.load.image('logo', 'assets/Background/Stars.png');    
    
    }
    create() {
        // Adicione o texto "Pressione SPACE para começar"
        this.fundo = this.add.image(640/2, 480/2, 'logo').setOrigin(0.5, 0.5).setScale(1);
        this.texto = this.add.text(640/2-45-45, 480/2-30, 'NAVITAS');
        this.texto2 = this.add.text(640/2-63-45, 480/2+40-30, 'Press SPACE to start');
        this.texto.setFontFamily('Arial');
        this.texto2.setFontFamily('Arial');
        this.texto.setFontSize(40);
        this.texto2.setFontSize(20);
        // Crie um evento de teclado para detectar quando a tecla SPACE é pressionada
        this.input.keyboard.on('keydown-SPACE', this.startGame, this);
        var fx1 = this.fundo.postFX.addGlow(0xff55ff, 0, 0, false, 0.1, 24)
        this.tweens.add({
            targets: fx1,
            outerStrength: 1,
            yoyo: true,
            loop: -1,
            ease: 'sine.inout'
        });
    }

    update(delta, time) {
       
        this.texto.rotation += Math.sin(delta / 200) / 500
        this.texto2.rotation += Math.sin(delta / 200) / 490

      //  this.fundo.tint= 0x000000 + Math.random()*100 * 0xffffff;
        this.fundo.scaleX +=  Math.sin(delta / 15)  / 375
        this.fundo.scaleY += Math.cos(delta / 5) /100


        this.texto.scaleX +=  Math.sin(delta / 150)  / 75
        this.texto.scaleY += Math.cos(delta / 50) /70

        this.texto2.scaleX +=  Math.sin(delta / 150)  / 75
        this.texto2.scaleY += Math.cos(delta / 150) /70
       
    }

    startGame() {
        // Inicie a cena do jogo principal
        this.scene.start('scene-game');
    }
}


const config = {
    type: Phaser.WEBGL,
    width: 640,
    height: 480,
    canvas: gameCanvas,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false
      }
    },
    scene: [TitleScene,GameScene,Pausa, GameOver]
  }
const game = new Phaser.Game(config)