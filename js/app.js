var PLAYER_INIT_X = 201;
var PLAYER_INIT_Y = 405;
var TILE_WIDTH = 101;
var TILE_HEIGHT = 83;
var levelCount = 0;
var score = 0;
var lives = 5;
// Boolean variable used by engine.js to pause update(dt) while setTimeout is working
var game = true;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    //array of the 3 possible starting points on the Y axis
    this.yStart = [61, 145, 228];
    //randomly select a Y positon for enemy from array
    this.yPos = this.yStart[Math.floor(Math.random() * this.yStart.length)];
    this.y = this.yPos;
    this.speedMax = 280;
    this.speedMin = 120;
    this.speed = Math.random() * this.speedMax;

    //Prevents super-slow enemies
    if (this.speed < this.speedMin) {
        this.speed += 100;
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // Resets any enemy that goes off screen (past x = 550) by giving them a new Y position and speed
    this.x += (this.speed * dt);
    if (this.x > 550) {
        this.x = -100;
        this.yStart = [60, 143, 226];
        this.yPos = this.yStart[Math.floor(Math.random() * this.yStart.length)];
        this.y = this.yPos;
        this.speed = Math.random() * this.speedMax;
        if (this.speed < this.speedMin) {
            this.speed += 100;
        }
        this.x += (this.speed * dt);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.spriteArray = ['images/char-boy.png', 'images/char-horn-girl.png'];
    this.sprite = this.spriteArray[Math.floor(Math.random() * this.spriteArray.length)];
    this.x = x;
    this.y = y;
};

Player.prototype.update = function(dt) {
    var player = this;
    this.x = this.x;
    this.y = this.y;
    if (this.y < -9) {
        //sets game equal to false to halt update(dt) in engine.js
        game = false;
        //setTimeout anonymous function
        setTimeout(function() {
            alert("Level " + levelCount + " complete!");
            score += 100;
            levelCount++;
            player.reset();
        }, 700);
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    if (direction === 'up' && this.y > -9) {
        this.y -= TILE_HEIGHT;
    } else if (direction === 'down' && player.y < 405) {
        this.y += TILE_HEIGHT;
    } else if (direction === 'left' && player.x > -1) {
        this.x -= TILE_WIDTH;
    } else if (direction === 'right' && player.x < 400) {
        this.x += TILE_WIDTH;
    } else {
        return;
    }
};

Player.prototype.reset = function() {
    this.x = PLAYER_INIT_X;
    this.y = PLAYER_INIT_Y;
    game = true;
};

var Bonus = function(x, y) {
    this.spriteArray = ["images/Gem Blue.png", "images/Gem Green.png", "images/Gem Orange.png"];
    this.sprite = this.spriteArray[Math.floor(Math.random() * this.spriteArray.length)];
    this.spriteWidth = 70;
    this.spriteHeight = 100;
    this.xStart = [15, 116, 217, 318, 419];
    this.xPos = this.xStart[Math.floor(Math.random() * this.xStart.length)];
    this.x = this.xPos;
    this.yStart = [106, 190, 273];
    this.yPos = this.yStart[Math.floor(Math.random() * this.yStart.length)];
    this.y = this.yPos;
};

Bonus.prototype.update = function(dt) {
    this.x = x;
    this.y = y;
}

Bonus.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.spriteWidth, this.spriteHeight); //draws Gem from x,y at specified width and height
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(PLAYER_INIT_X, PLAYER_INIT_Y);
var allBonus = [];
var bonus = new Bonus();
allBonus.push(bonus);

var allEnemies = [];
for (var i = 0; i < 3; i++) {
    var enemy = new Enemy(i);
    allEnemies.push(enemy);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});