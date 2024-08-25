let bullets = [];
let enemies = [];
let score = 0;
let player;
let invader;
let projectile;
let explosion;
const maxMag = 30;
let mag = 30;
let numOfMags = 4;

const levels = { 1: 10, 2: 30 };
console.log(Object.keys(levels).length);
function preload() {
	player = loadImage("/Assets/Sprites/Invaders/space__0006_Player.png");
	invader = loadImage("/Assets/Sprites/Invaders/space__0004_C1.png");
	projectile = loadImage("/Assets/Sprites/Projectiles/Projectile_Player.png");
	explosion = loadImage(
		"/Assets/Sprites/Invaders/space__0009_EnemyExplosion.png"
	);
}

function setup() {
	createCanvas(400, 600);
	noCursor();
	// Create enemies
	for (let i = 0; i < Object.keys(levels).length; i++) {
		for (let j = 0; j < Object.values(levels)[i]; j++) {
			createEnemy();
		}
	}
}

function draw() {
	background(0);
	// frameRate(30);

	// Scoreboard
	textSize(25);
	fill(255);
	text("Score: " + score, 20, 30);

	// Magazine
	textSize(25);
	fill(255);
	text(`${mag}/${maxMag}\n${numOfMags}`, 300, 500);
	// Player
	image(player, mouseX - 20, height - 20, 40);

	// Spawn bullets
	for (let bullet of bullets) {
		bullet.y -= 30;
		image(projectile, bullet.x, bullet.y, 5, 15);
	}

	// Spawn enemies
	for (let enemy of enemies) {
		enemy.y += 2;

		image(invader, enemy.x - 20, enemy.y, 40);
		if (enemy.y > height) {
			text("You lost!", width - 275, height / 2);
			noLoop();
		}
	}

	// Check for collision
	for (let enemy of enemies) {
		for (let bullet of bullets) {
			if (dist(enemy.x, enemy.y, bullet.x, bullet.y) < 30) {
				score++;
				let enemyIndex = enemies.indexOf(enemy);
				let bulletIndex = bullets.indexOf(bullet);

				enemies.splice(enemyIndex, 1);
				bullets.splice(bulletIndex, 1);
				createEnemy();
			}
		}
	}
}

function mousePressed() {
	let bullet = {
		x: mouseX,
		y: height - 50,
	};
	if (mag > 0) {
		mag--;
		bullets.push(bullet);
	}
}

function keyPressed() {
	if (key === "r") {
		if (numOfMags > 0) {
			mag = maxMag;
			numOfMags--;
		}
	}
}
function createEnemy() {
	let enemy = {
		x: random(0, width - 30),
		y: random(-800, 0),
	};

	enemies.push(enemy);
}
