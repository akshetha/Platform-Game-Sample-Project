let playerImage, player, ground, spikey, scoins, platforms, coins, lava;
let score = 0;
let jumpCount = 0;
const maxJumps = 2;
let movingPlatform;
let direction = 0;
let gameState = "playing"; // Add gameState variable
let backgroundImg;

function preload() {
  spikey = loadImage('assets/spike.png');
  scoins = loadImage('assets/coins.png');
  playerImage = loadImage('assets/player.png');
  backgroundImg = loadImage("assets/background.png");
  endImage = loadImage("assets/end.png");
}

function setup() {
  createCanvas(700, 400);
  world.gravity.y = 20;

  spikey.resize(40, 0);
  scoins.resize(40, 0);
  playerImage.resize(30, 50); // Resize the player image
  backgroundImg.resize(700, 400);
  endImage.resize(45, 50);
  
  player = new Sprite(50, 250, 40, 40);
  player.image = playerImage; // Assign the player image
  player.rotationLock = true;
  player.vel.x = 0;
  player.vel.y = 0;

  ground = new Sprite(150, 380, 1200, 40, "s"); // Increased length
  ground.color = color(188, 158, 130);
  ground.friction = 0;

  platforms = new Group();
  platforms.color = "PaleVioletRed"; // Changed color
  platforms.friction = 0;

  lava = new Group();
  lava.color = "Purple"; // Changed color
  lava.friction = 0;
  lava.collider = "s";

  spike = new Group();
  spike.image = spikey;
  spike.friction = 0;

  coins = new Group();
  coins.image = scoins;
  coins.collider = "k";

  end = new Sprite(4500, 335, 40, 40);
  end.image = endImage;
  end.rotationLock = true;
  end.collider = "k";

  player.overlaps(coins, collect);

  loadStartScreen();
}

function draw() {
  background('LightPink');
  image(backgroundImg, 0, 0);
  if (player.x<110){
    textSize(20);
    fill("LightGoldenRodYellow");
    textAlign(LEFT);
    text("Hey there!\n[use your arrows]", 50, 70);
  } else if (player.x<600){
    textSize(20);
    fill("LightGoldenRodYellow");
    textAlign(LEFT);
    text("This is Victor!", 50, 70);
  } else if (player.x<900){
    textSize(20);
    fill("LightGoldenRodYellow");
    textAlign(LEFT);
    text("He heard you're low on some hope today.\nSo he's here to get you some love <3", 50, 70);
  } else if (player.x<1200){
    textSize(20);
    fill("LightGoldenRodYellow");
    textAlign(LEFT);
    text("", 50, 70);
  } else if (player.x<1500){
    textSize(20);
    fill("LightGoldenRodYellow");
    textAlign(LEFT);
    text("Hmm? Whats that?", 50, 70);
  } else if (player.x<1900){
    textSize(20);
    fill("LightGoldenRodYellow");
    textAlign(LEFT);
    text("He says that he understands\nand everyone gets low sometimes.", 50, 70);
  } else if (player.x<1900){
    textSize(20);
    fill("LightGoldenRodYellow");
    textAlign(LEFT);
    text("I get that too!\nWe'll be okay as long as we stick together <3", 50, 70);
  }
  else if (player.x<2300){
    textSize(20);
    fill("LightGoldenRodYellow");
    textAlign(LEFT);
    text("Just dont fall into the sea of negetivity\n", 50, 70);
  } else if (player.x<2700){
    textSize(20);
    fill("LightGoldenRodYellow");
    textAlign(LEFT);
    text("Sometimes it can seem endless\nbut I promise we'll make it \nat the end", 10, 70);
  }else if (player.x<3000){
    textSize(20);
    fill("LightGoldenRodYellow");
    textAlign(LEFT);
    text("", 10, 70);
  }  else if (player.x<3500){
    textSize(20);
    fill("LightGoldenRodYellow");
    textAlign(LEFT);
    text("Things are bound to get tough \nsometimes!", 10, 70);
  } else if (player.x<3700){
    textSize(20);
    fill("LightGoldenRodYellow");
    textAlign(LEFT);
    text("", 10, 70);
  } else if (player.x<3900){
    textSize(20);
    fill("LightGoldenRodYellow");
    textAlign(LEFT);
    text("And sometimes", 10, 70);
  } else if (player.x<4100){
    textSize(20);
    fill("LightGoldenRodYellow");
    textAlign(LEFT);
    text("You've gotta loose hope \nto grow stronger", 10, 70);
  } else if (player.x<4300){
    textSize(20);
    fill("LightGoldenRodYellow");
    textAlign(LEFT);
    text("<33", 10, 70);
  } else if (player.x<4500){
    textSize(20);
    fill("LightGoldenRodYellow");
    textAlign(LEFT);
    text("That's you by the way", 10, 70);
  }


  if (gameState === "playing") {

    if ((kb.presses("space")|| kb.presses("up"))&& jumpCount<maxJumps) {
      player.vel.y = -6;
      jumpCount++;
    }

    if (kb.pressing("left")) {
      player.vel.x = -3;
    } else if (kb.pressing("right")) {
      player.vel.x = 3;
    } else {
      player.vel.x = 0;
    }

    if (player.y < 20) {
      player.y = 20;
    }

    if (player.collides(ground) || player.collides(platforms)) {
      jumpCount = 0;
    }

    spike.forEach(s => {
      if (s.y < 200) {
        s.vel.y = 3;
      } else if (s.y > 325) {
        s.vel.y = -3;
      }
    });

    if (player.collides(spike) || player.collides(lava)) {
      reset();
    }
    if (player.collides(end)) {
      youWin();
    }

    if (direction === 0) {
      movingPlatform.vel.x = 2;
      if (movingPlatform.x >= 1500) {
        direction = 1;
      }
    } else if (direction === 1) {
      movingPlatform.vel.x = -2;
      if (movingPlatform.x <= 960) {
        direction = 0;
      }
    }

    camera.x = player.x + 102;
    ground.x = camera.x;
  } else if (gameState === "win") {
    displayWinMessage();
  }
}

function loadStartScreen() {
  platforms.removeAll();
  coins.removeAll();
  spike.removeAll();

  player.x = 50;

  new platforms.Sprite(110, 310, 50, 100, "s");
  new platforms.Sprite(260, 200, 50, 50, "s");
  new platforms.Sprite(410, 200, 50, 50, "s");
  new platforms.Sprite(700, 285, 50, 150, "s");
  new platforms.Sprite(850, 310, 50, 100, "s");
  movingPlatform = new platforms.Sprite(950, 200, 60, 10, "k");
  new platforms.Sprite(1600, 250, 50, 220, "s");
  new platforms.Sprite(1800, 100, 50, 50, "s");
  new platforms.Sprite(2100, 300, 50, 50, "s");
  new platforms.Sprite(2200, 260, 50, 50, "s");
  new platforms.Sprite(2200, 120, 50, 50, "s");
  new platforms.Sprite(2300, 220, 50, 50, "s");
  new platforms.Sprite(2300, 100, 50, 50, "s");
  new platforms.Sprite(2400, 150, 50, 50, "s");
  new platforms.Sprite(2600, 150, 50, 50, "s");
  new platforms.Sprite(2600, 300, 50, 120, "s");

  new platforms.Sprite(2800, 200, 50, 50, "s");
  new platforms.Sprite(3000, 150, 50, 50, "s");
  new platforms.Sprite(3200, 150, 50, 50, "s");
  new platforms.Sprite(3400, 150, 50, 50, "s");
  new platforms.Sprite(3600, 310, 50, 100, "s");
  new platforms.Sprite(3800, 285, 50, 150, "s");
  new platforms.Sprite(4000, 310, 50, 100, "s");

  new lava.Sprite(2126, 359, 1000, 10);

  new spike.Sprite(3000, 150, "k");
  new spike.Sprite(3200, 130, "k");
  new spike.Sprite(3400, 100, "k");

  new coins.Sprite(260, 150, 15);
  new coins.Sprite(410, 50, 15);
  new coins.Sprite(700, 180, 15);
  new coins.Sprite(850, 100, 15);
  new coins.Sprite(1100, 100, 15);
  new coins.Sprite(1250, 50, 15);
  new coins.Sprite(1400, 100, 15);
  new coins.Sprite(1800, 50, 15);
  new coins.Sprite(2100, 250, 15);
  new coins.Sprite(2200, 210, 15);
  new coins.Sprite(2200, 70, 15);
  new coins.Sprite(2300, 170, 15);
  new coins.Sprite(2300, 50, 15);
  new coins.Sprite(2400, 100, 15);
  new coins.Sprite(2600, 210, 15);
  new coins.Sprite(3100, 340, 15);
  new coins.Sprite(3300, 340, 15);
  new coins.Sprite(3500, 340, 15);
  new coins.Sprite(3800, 150, 15);
  new coins.Sprite(4100, 340, 15);
}

function reset() {
  score = 0;
  loadStartScreen();
}

function collect(player, coin) {
  coin.remove();
  score = score + 1;
}

function youWin() {
  gameState = "win"; // Set gameState to win
  spike.forEach(s => s.x = -8000);
  platforms.forEach(p => p.x = -8000);
  lava.forEach(p => p.x = -8000);
  player.x = 7000; // Move player to a visible position
  camera.x = player.x; // Center the camera on the player
}

function displayWinMessage() {
  fill("LightGoldenRodYellow");
  textAlign(CENTER);

  if (score === 20) {
    textSize(20);
    text("Congratulations!", width / 2, height / 2 - 30);
    textSize(12);
    text("You've restored your hope to the fullest\nNow you are ready to face anything! \nYou've got this!", width / 2, height / 2);
  } else if (score < 20 && score > 15) {
    textSize(20);
    text("Great work!", width / 2, height / 2 - 30);
    textSize(12);
    text("You grasp as much love as you can\nYou feel at peace\nJust remember, your love \nmatters the most for your hope", width / 2, height / 2);
  } else if (score < 15 && score > 5) {
    textSize(20);
    text("Oh my!", width / 2, height / 2 - 30);
    textSize(12);
    text("You shut out some major love\naround you :(\nTry Again! You can't give up now!\nWe've already come so far!", width / 2, height / 2);
  } else if (score < 5 && score > 0) {
    textSize(20);
    text("Yikes!", width / 2, height / 2 - 30);
    textSize(12);
    text("Are you hurt? Take a second to think it over.\nWhat's wrong? Try again! This time try taking \nmore of this love around you and see what happens <33", width / 2, height / 2);
  } else {
    textSize(20);
    text("...", width / 2, height / 2 - 30);
    textSize(12);
    text("Hmm...\nYou seem to be trying hard at avoiding the hope around you...\nTry again...", width / 2, height / 2);
  }
}
