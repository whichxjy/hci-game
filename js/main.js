let video;
let poseNet;
let pose;

let system;

let widthScale;
let heightScale;

let monsters;

function setup() {
  createCanvas(windowWidth, windowHeight);

  monsters = [];

  const position = createVector(random(windowWidth), random(windowHeight));
  const velocity = createVector(0, 0);
  const size = 30;
  const maxForce = random(15, 30);
  const maxSpeed = random(15, 30);
  monsters.push(new Monster(position, velocity, size, maxForce, maxSpeed));

  const resolution = 20;
  system = new FlowFieldSystem(monsters, resolution);

  setupPose();
}

function draw() {
  system.run();
  drawPose();
}

function setupPose() {
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

function drawPose() {
  push();
  translate(windowWidth, 0);
  scale(-1, 1);
  pop();

  if (pose) {
    const player = new Player(pose.nose, widthScale, heightScale);
    const leftController = new Controller(pose.leftWrist, widthScale, heightScale);
    const rightController = new Controller(pose.rightWrist, widthScale, heightScale);

    player.display();
    leftController.display();
    rightController.display();

    for (let i = 0; i < monsters.length; i++) {
      monsters[i].chase(player);

      if (leftController.hit(monsters[i]) || rightController.hit(monsters[i])) {
        monsters[i].die();
      }
    }
  }
}
