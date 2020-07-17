let video;
let poseNet;
let pose;

let system;

let widthScale;
let heightScale;

let monsters;

const showVideo = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  monsters = [];

  for (let i = 0; i < 10; i++) {
    const position = createVector(random(windowWidth), random(windowHeight));
    const velocity = createVector(0, 0);
    const size = 40;
    const maxForce = random(5, 10);
    const maxSpeed = random(5, 10);
    monsters.push(new Monster(position, velocity, size, maxForce, maxSpeed));
  }

  const resolution = 20;
  system = new FlowFieldSystem(monsters, resolution);

  init();
}

function init() {
  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, { flipHorizontal: true, detectionType: "single" }, () => {
    console.log("poseNet ready");

    widthScale = windowWidth / video.width;
    heightScale = windowHeight / video.height;
  });

  poseNet.on("pose", (poses) => {
    if (poses.length > 0) {
      pose = poses[0].pose;
    }
  });
}


function draw() {
  if (showVideo) {
    push();
    translate(windowWidth, 0);
    scale(-1, 1);
    image(video, 0, 0, windowWidth, windowHeight);
    pop();
  }

  if (pose) {
    const player = new Player(pose.nose, widthScale, heightScale);
    const leftController = new Controller(pose.leftWrist, widthScale, heightScale);
    const rightController = new Controller(pose.rightWrist, widthScale, heightScale);

    system.run(player);

    player.display();
    leftController.display();
    rightController.display();

    for (let i = 0; i < monsters.length; i++) {
      if (leftController.hit(monsters[i]) || rightController.hit(monsters[i])) {
        monsters[i].die();
      }
    }
  }
}
