var backGround, backGroundImg;
var monkey, monkeyAnime, monkeyEnd;
var bananaImg, stoneImg;
var bananaGroup, stoneGroup;
var invisibleGround;
var Time = 0,bananas = 0;
var scoreBox, scoreBoxImg, bananaIcon, bananaIconImg;
var restartButton;
var gameOverText, gameOverTextImg;
var PLAY = 1;
var gameState = PLAY;

function preload() {
  backGroundImg = loadImage("jungle.jpg");
  scoreBoxImg = loadImage("scoreBox.png");
  stoneImg = loadImage("stone.png");
  bananaImg = loadImage("banana.png");
  bananaIconImg = loadImage("banana.png");
  gameOverTextImg = loadImage("GameOver.png");
  monkeyAnime = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  monkeyEnd = loadAnimation("Monkey_01.png");
}

function setup() {
  createCanvas(600, 300);

  //jungle backGround
  backGround = createSprite(width / 2, height / -100, 10, 10);
  backGround.addImage(backGroundImg);
  backGround.scale = 1.1;
  backGround.velocityX = -2;
  //monkey / player
  monkey = createSprite(width / 10, height / 1.3, 10, 10);
  monkey.addAnimation("monkey", monkeyAnime);
  monkey.addAnimation("monkeyDead", monkeyEnd);
  monkey.scale = 0.11;
  //invisible Ground for monkey to stand on
  invisibleGround = createSprite(width / 2, height / 1.2, width, 10);
  invisibleGround.visible = false;
  //score box outline
  scoreBox = createSprite(width / 1.14, height / 10, 130, 30);
  scoreBox.addImage(scoreBoxImg);
  //banana Icon
  bananaIcon = createSprite(width / 16, height / 10, 10, 10);
  bananaIcon.addImage(bananaIconImg);
  bananaIcon.rotation = -30;
  bananaIcon.scale = 0.05;

  gameOverText = createSprite(width / 2, height / 2 ,10, 10);
  gameOverText.addImage(gameOverTextImg);
  gameOverText.visible = false;

  stoneGroup = new Group();
  bananaGroup = new Group();
}

function draw() {
  background(220);
  
  if (gameState === PLAY) {
    //backGround reset
    if (backGround.x < 100) {
      backGround.x = backGround.width / 2.5;
    }

    Time = Time + Math.round(World.frameRate / 60);

    //monkey image size and gravity
    monkey.velocityY = monkey.velocityY + 1;

    //control of the monkey
    if (keyDown("space") && monkey.y > 200) {
      monkey.velocityY = -15;
    }

    spawnStone();
    spawnBanana();
    
    if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      bananas = bananas + 1;
    }else if (monkey.isTouching(stoneGroup)) {
      monkey.scale = 0.1;
    }
    switch(bananas){
      case 10: monkey.scale = 0.12;
        break;
      case 20: monkey.scale = 0.13;
        break;
      case 30: monkey.scale = 0.14;
        break;
      case 40: monkey.scale = 0.15;
        break;
      default:
        break;
    }
  } 

  monkey.collide(invisibleGround);
  drawSprites();
  //score
  fill("White");
  textSize(18);
  text("Time: " + Time, width / 1.28, height / 8.6);
  text("Bananas Collected:" + bananas, width / 9, height / 8.6);
}

function spawnStone() {
  if (frameCount % 150 === 0) {
    var stone;
    stone = createSprite(width, height / 1.3, 10, 10);
    stone.setCollider("rectangle", 0, 30, 280, 170);
    stone.addImage(stoneImg);
    stone.scale = 0.13;
    stone.velocityX = -4;
    stone.lifetime = 150;
    stoneGroup.add(stone);
  }
}

function spawnBanana() {
  if (frameCount % 120 === 0) {
    var banana;
    banana = createSprite(width, 200, 10, 10);
    banana.y = random(200, 100);
    banana.addImage(bananaImg);
    banana.scale = 0.06;
    banana.rotation = random(0, 30);
    banana.velocityX = -6;
    banana.lifetime = 100;
    bananaGroup.add(banana);
  }
}

