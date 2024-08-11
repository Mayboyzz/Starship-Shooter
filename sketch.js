let bullets = [];
let enemies = [];
let reloadBonus = [];
let score = 0;
let player;
let invader;
let projectile;
let explosion;
console.log(reloadBonus);

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
	for (let i = 0; i < 10; i++) {
		createEnemy();
	}
}

function draw() {
	background(0);
	frameRate(30);

	// Scoreboard
	textSize(25);
	fill(255);
	text("Score: " + score, 20, 30);

	// Player
	image(player, mouseX - 20, height - 20, 40);

	// Spawn bullets
	for (let bullet of bullets) {
		bullet.y -= 25;
		image(projectile, bullet.x, bullet.y, 5, 15);
	}

	// Spawn enemies
	for (let enemy of enemies) {
		enemy.y += 5;
		image(invader, enemy.x - 20, enemy.y, 40);
		if (enemy.y > height) {
			text("You lost!", width - 275, height / 2);
			noLoop();
		}
	}

	// Check for collision
	for (let enemy of enemies) {
		for (let bullet of bullets) {
			if (dist(enemy.x, enemy.y, bullet.x, bullet.y) < 20) {
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

	bullets.push(bullet);
}

function createEnemy() {
	let enemy = {
		x: random(0, width - 30),
		y: random(-800, 0),
	};

	enemies.push(enemy);
}
