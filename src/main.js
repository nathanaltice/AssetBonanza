// Nathan Altice
// Updated: 4/14/20
// Asset Management
// Testing various asset types

// discipline
'use strict';

// Test Scene
class Test extends Phaser.Scene {
    constructor() {
        super("testScene");
    }

    preload() {
        // set load path to save some typing
        this.load.path = "./assets/";
        // images
        this.load.image('colorsquare', 'colorsquare.png');
        this.load.image('fastboy', 'fastboy.png');
        this.load.image('parallaxSky', 'parallaxSky.png');
        this.load.image('parallaxMountains', 'parallaxMountains.png');
        this.load.image('parallaxTreeline', 'parallaxTreeline.png');
        this.load.image('squarepattern', 'squarepattern.png');
        // spritesheet
        this.load.spritesheet('pinkhover', 'pinkhover.png', {
            frameWidth: 100,
            frameHeight: 100,
            endFrame: 7
        });
        // texture atlas aka fruit salad time 🍇
        this.load.atlas('fruitandveg', 'fruitandveg.png', 'fruitandveg.json');
        // sound
        this.load.audio('jumpSFX', 'jumpSFX.wav');
    }

    create() {
        // demonstrate images
        // first (static)
        this.colorsquare00 = this.add.image(0, 0, 'colorsquare').setOrigin(0,0);
        // second (flip Y)
        this.colorsquare01 = this.add.image(100, 0, 'colorsquare').setOrigin(0,0);
        this.colorsquare01.setAlpha(0.1, 0.5, 1, 0.75);
        this.colorsquare01.flipY = true;  
        // third (tint - Gameboy-esque colors 💚)
        this.colorsquare02 = this.add.image(200, 0, 'colorsquare').setOrigin(0,0);
        this.colorsquare02.tint = 0x00FF11;         // WebGL only
        // fourth (interactive Y flip / blend mode)
        this.colorsquare03 = this.add.image(300, 0, 'colorsquare').setOrigin(0,0);
        this.colorsquare03.flipY = true;
        this.colorsquare03.blendMode = 'SCREEN';    // WebGL only
        this.colorsquare03.setInteractive().on('pointerdown',(pointer, localX, localY, event)=>{
            console.log(`pointer: ${pointer}, localX: ${localX}, localY: ${localY}, event: ${event}`);
            this.colorsquare03.toggleFlipY();   // context is still the scene
        });
        // fifth (pointerover / change texture / set random position / play sound)
        this.colorsquare04 = this.add.image(400, 0, 'colorsquare').setOrigin(0,0);
        this.colorsquare04.setInteractive().on('pointerover',()=>{
            this.colorsquare04.setTexture('fastboy');
            this.colorsquare04.setRandomPosition();
            this.colorsquare04.setDepth(10);
            this.sound.play('jumpSFX');
        });
        // sixth (interactive angle change)
        this.colorsquare05 = this.add.image(550, 50, 'colorsquare');
        this.colorsquare05.setInteractive().on('pointerdown',()=>{
            this.colorsquare05.angle += 45;
        });
        // seventh (interactive make smol)
        this.colorsquare06 = this.add.image(600, 0, 'colorsquare').setOrigin(0,0);
        this.colorsquare06.setInteractive().on('pointerdown',()=>{
            this.colorsquare06.setScale(0.25);
        });
        // eighth (display depth / interactive tween)
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
        // first (static w/ specific frame number)
        this.pinkhoverStatic = this.add.sprite(100, 200, 'pinkhover', 3);
        // second (animated / infinite repeat)
        let config = {
            key: 'hoverAnimation',
            frames: this.anims.generateFrameNumbers('pinkhover', { start: 0, end: 7, first: 0}),
            frameRate: 15,
            repeat: -1,
        };
        this.anims.create(config);
        this.pinkhoverAnimated = this.add.sprite(200, 200, 'pinkhover').play('hoverAnimation');

        // demonstrate tile sprites x3 for parallax effect
        this.skyline = this.add.tileSprite(0, 455, 800, 100, 'parallaxSky').setOrigin(0,0);
        this.mountains = this.add.tileSprite(0, 455, 800, 100, 'parallaxMountains').setOrigin(0,0);
        this.treeline = this.add.tileSprite(0, 500, 800, 100, 'parallaxTreeline').setOrigin(0,0);

        // demonstrate quad (tween alpha / corners)
        this.add.quad(400, 300, 'squarepattern');
        this.checkers = this.add.quad(600, 300, 'squarepattern');
        this.checkers.setDepth(-2);
        this.tweens.add({
            targets: this.checkers,
            bottomRightAlpha: 0.5,
            topLeftX: 700,
            topLeftY: 500,
            topRightX: 650,
            topRightY: 15,
            bottomRightX: 800,
            bottomRightY: 310,
            bottomLeftX: 300,
            bottomLeftY: 400,
            duration: 10000,
            yoyo: true,
            ease: 'Linear',
            repeat: -1,
        });

        // add sprites from our texture atlas
        this.fruit01 = this.add.sprite(100, 400, 'fruitandveg', 'pear');
        this.fruit02 = this.add.sprite(200, 400, 'fruitandveg', 'tomato');
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

// load texture atlas
this.load.atlas('key', 'image.png', 'atlas.json');

// add a texture atlas sprite
this.add.sprite(x, y, 'key', 'frame_name');