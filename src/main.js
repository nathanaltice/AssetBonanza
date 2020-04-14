// Nathan Altice
// Updated: 4/14/20
// Asset Management
// Testing various asset types

// Test Scene
class Test extends Phaser.Scene {
    constructor() {
        super("testScene");
    }

    preload() {
        // set load path
        this.load.path = "./assets/";
        // images
        this.load.image('colorsquare', 'colorsquare.png');
        this.load.image('fastboy', 'fastboy.png');
        this.load.image('parallaxSky', 'parallaxSky.png');
        this.load.image('parallaxMountains', 'parallaxMountains.png');
        this.load.image('parallaxTreeline', 'parallaxTreeline.png');
        // spritesheet
        this.load.spritesheet('pinkhover', 'pinkhover.png', {
            frameWidth: 100,
            frameHeight: 100,
            endFrame: 7
        });
    }

    create() {
        // demonstrate images
        // first
        this.colorsquare00 = this.add.image(0, 0, 'colorsquare').setOrigin(0,0);
        // second
        this.colorsquare01 = this.add.image(100, 0, 'colorsquare').setOrigin(0,0);
        this.colorsquare01.setAlpha(0.1, 0.5, 1, 0.75);
        this.colorsquare01.flipY = true;  
        // third
        this.colorsquare02 = this.add.image(200, 0, 'colorsquare').setOrigin(0,0);
        this.colorsquare02.tint = 0x00AA11;         // WebGL only (not Canvas)
        // fourth
        this.colorsquare03 = this.add.image(300, 0, 'colorsquare').setOrigin(0,0);
        this.colorsquare03.flipY = true;
        this.colorsquare03.blendMode = 'SCREEN';    // WebGL only
        this.colorsquare03.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
            console.log(`pointer: ${pointer}, localX: ${localX}, localY: ${localY}, event: ${event}`);
            this.colorsquare03.toggleFlipY();   // context is still the scene
        });
        // fifth
        this.colorsquare04 = this.add.image(400, 0, 'colorsquare').setOrigin(0,0);
        this.colorsquare04.setInteractive().on('pointerdown',()=>{
            this.colorsquare04.setTexture('fastboy');
            this.colorsquare04.setRandomPosition();
        });
        // sixth
        this.colorsquare05 = this.add.image(550, 50, 'colorsquare');
        this.colorsquare05.setInteractive().on('pointerdown',()=>{
            this.colorsquare05.angle += 45;
        });
        // seventh
        this.colorsquare06 = this.add.image(600, 0, 'colorsquare').setOrigin(0,0);
        this.colorsquare06.setInteractive().on('pointerdown',()=>{
            this.colorsquare06.setScale(0.25);
        });
        // eighth
        this.colorsquare07 = this.add.image(700, 0, 'colorsquare').setOrigin(0,0);
        this.colorsquare07.setDepth(-1);    // set depth below other squares
        this.colorsquare07.setInteractive().on('pointerdown',()=>{
            this.tweens.add({
                targets: this.colorsquare07,
                x: 0,
                duration: 5000,
                yoyo: true,
                ease: 'Bounce.easeOut',
                repeat: 0,
            });
        });

        // demonstrate sprites
        // static w/ specific frame number
        this.pinkhoverStatic = this.add.sprite(100, 200, 'pinkhover', 3);
        // animated, looping
        let config = {
            key: 'hoverAnimation',
            frames: this.anims.generateFrameNumbers('pinkhover', { start: 0, end: 7, first: 0}),
            frameRate: 15,
            repeat: -1,
        };
        this.anims.create(config);
        this.pinkhoverAnimated = this.add.sprite(200, 200, 'pinkhover').play('hoverAnimation');

        // demonstrate
        this.skyline = this.add.tileSprite(0, 455, 800, 100, 'parallaxSky').setOrigin(0,0);
        this.mountains = this.add.tileSprite(0, 455, 800, 100, 'parallaxMountains').setOrigin(0,0);
        this.treeline = this.add.tileSprite(0, 500, 800, 100, 'parallaxTreeline').setOrigin(0,0);

    }

    update() {
        // update tile sprite
        this.skyline.tilePositionX += 0.1;
        this.mountains.tilePositionX -= 0.3;
        this.treeline.tilePositionX -= 1;
    }
}

// configure and create game
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [ Test ],
    render: {
        pixelArt: true,
    }
}

let game = new Phaser.Game(config);