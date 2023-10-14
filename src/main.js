// Nathan Altice
// Updated: 3/28/21
// Asset Management
// Testing various Phaser 3 asset types

// Discipline and Punish
'use strict';

// Test Scene
class Test extends Phaser.Scene {
    constructor() {
        super('testScene');
    }

    preload() {
        // set up loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loading = this.add.graphics();
        // see: https://photonstorm.github.io/phaser3-docs/Phaser.Loader.Events.html
        this.load.on('progress', (value)=> {
            loading.clear();                            // reset fill/line style
            loading.fillStyle(0xFACADE, 1);             // (color, alpha)
            loading.fillRect(100, 300, 700*value, 15);  // (x, y, width, height)
        });
        this.load.on('complete', ()=> {
            loading.destroy();
        });

        // set load path to save some typing
        this.load.path = './assets/';
        
        // images
        this.load.image('colorsquare', 'colorsquare.png');
        this.load.image('fastboy', 'fastboy.png');
        this.load.image('parallaxSky', 'parallaxSky.png');
        this.load.image('parallaxMountains', 'parallaxMountains.png');
        this.load.image('parallaxTreeline', 'parallaxTreeline.png');
        this.load.image('squarepattern', 'squarepattern.png');
        this.load.image('colorwaves', 'colorwaves.jpeg');
        
        // spritesheet
        this.load.spritesheet('pinkhover', 'pinkhover.png', {
            frameWidth: 100,
            frameHeight: 100,
            endFrame: 7
        });
        
        // texture atlas (aka fruit salad time 🍇 )
        this.load.atlas('fruitandveg', 'fruitandveg.png', 'fruitandveg.json');
        
        // sound
        this.load.audio('jumpSFX', 'jumpSFX.wav');
        this.load.audio('rail', 'railonnines.mp3');
        
        // video
        this.load.video('hypnotic', 'hypnotic.mp4', 'loadeddata', false, true);
    }

    create() {
        // output TextureManager cache (this allows us to 'see' what's been loaded)
        let cache = this.textures;
        console.log(cache.list);

        /***********************************
        // IMAGES
        ***********************************/
        // first (static)
        this.colorsquare00 = this.add.image(0, 0, 'colorsquare').setOrigin(0,0);
        
        // second (flip Y / alpha)
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
            this.sound.play('jumpSFX', { volume: 0.1 });
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

        /***********************************
        // VIDEO
        ***********************************/
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/video/
        // scene.load.video(key, url, loadEvent, asBlob, noAudio);
        this.add.video(500, 100, 'hypnotic').setOrigin(0).play(true).setScale(0.25);

        /***********************************
        // BGM (aka Background Music)
        ***********************************/
        this.bgm = this.sound.add('rail', {
            mute: false,
            volume: 0.5,
            rate: 1,
            loop: true
        });
        //this.bgm.play();

        /***********************************
        // GRAPHICS PRIMITIVES
        ***********************************/
        let graphics = this.add.graphics(); 
        // set gradiant fill for triangle
        // fillGradientStyle(topLeft, topRight, bottomLeft, bottomRight [, alpha])
        graphics.fillGradientStyle(0xff0000, 0xff0000, 0xffff00, 0xffff00, 0.75);
        // fillTriangle(x0, y0, x1, y1, x2, y2)           
        graphics.fillTriangle(400, 150, 350, 250, 450, 250); 
        // set fill style for circle
        graphics.fillStyle(0x00ccff, 1);
        // fillCircle(x, y, radius)
        graphics.fillCircle(400, 350, 50);
        // set line style for rounded rectangle
        graphics.lineStyle(2, 0xffff00, 1);
        // strokeRoundedRect(x, y, w, h, alpha)
        graphics.strokeRoundedRect(300, 150, 100, 200, 24);

        /***********************************
        // SPRITES (from sprite sheet)
        ***********************************/
        // first (static w/ specific frame number)
        this.pinkhoverStatic = this.add.sprite(100, 150, 'pinkhover', 3);
        
        // second (animated / infinite repeat)
        let config = {
            key: 'hoverAnimation',
            frames: this.anims.generateFrameNumbers('pinkhover', { start: 0, end: 7, first: 0 }),
            frameRate: 15,
            repeat: -1,
        };
        this.anims.create(config);
        this.pinkhoverAnimated = this.add.sprite(200, 150, 'pinkhover').play('hoverAnimation');

        /***********************************
        // SPRITES (from texture atlas)
        ***********************************/
        this.fruit01 = this.add.sprite(100, 400, 'fruitandveg', 'grapes');
        this.fruit02 = this.add.sprite(200, 400, 'fruitandveg', 'tomato');

        /***********************************
        // ISOBOX
        ***********************************/
        // ([, x] [, y] [, size] [, height] [, fillTop] [, fillLeft] [, fillRight])
        this.cube = this.add.isobox(100, 300, 50, 25);
        // ([, x] [, y] [, size] [, height] [, reversed] [, fillTop] [, fillLeft] [, fillRight])
        this.pyramid = this.add.isotriangle(200, 350, 25, 100, true, 0x00FF00, 0x00AA00, 0x003300);
        this.tweens.add({
            targets: [this.cube, this.pyramid],
            projection: 1.5,
            yoyo: true,
            duration: 5000,
            ease: 'Sine.easeInOut',
            repeat: -1
        });

        /***********************************
        // TILE SPRITES
        ***********************************/
        this.skyline = this.add.tileSprite(0, 455, 800, 100, 'parallaxSky').setOrigin(0,0);
        this.mountains = this.add.tileSprite(0, 455, 800, 100, 'parallaxMountains').setOrigin(0,0);
        this.treeline = this.add.tileSprite(0, 500, 800, 100, 'parallaxTreeline').setOrigin(0,0);
    }

    update() {
        // update tile sprite
        this.skyline.tilePositionX += 0.1;
        this.mountains.tilePositionX -= 0.3;
        this.treeline.tilePositionX -= 1;

        // rotate the fruits and veg
        this.fruit01.angle += 0.5;
        this.fruit02.angle -= 1;
    }
}

// configure and create ゲーム
let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    scene: [ Test ],
}

let game = new Phaser.Game(config);