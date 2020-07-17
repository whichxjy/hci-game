function Game() {
  const video = createCapture(VIDEO);
  video.hide();
  const showVideo = false;

  let pose;
  let widthScale;
  let heightScale;

  let monsterNum = 2;

  const poseNet = ml5.poseNet(video, { flipHorizontal: true, detectionType: "single" }, () => {
    console.log("poseNet ready");

    widthScale = windowWidth / video.width;
    heightScale = windowHeight / video.height;
  });

  poseNet.on("pose", (poses) => {
    if (poses.length > 0) {
      pose = poses[0].pose;
    }
  });

  const monsters = [];

  this.getSystem = () => {
    monsters.length = 0;

    for (let i = 0; i < monsterNum; i++) {
      const position = createVector(random(windowWidth), random(windowHeight));
      const velocity = createVector(0, 0);
      const size = 40;
      const maxForce = random(5, 10);
      const maxSpeed = random(5, 10);
      monsters.push(new Monster(position, velocity, size, maxForce, maxSpeed));
    }

    const resolution = 20;

    return new FlowFieldSystem(monsters, resolution);
  };

  let system = this.getSystem();

  setInterval(() => {
    system.reset();
  }, 3000);

  this.draw = () => {
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

      let allDead = true;

      for (let i = 0; i < monsters.length; i++) {
        if (monsters[i].dead) {
          continue;
        }

        allDead = false;

        if (leftController.hit(monsters[i]) || rightController.hit(monsters[i])) {
          monsters[i].die();
        }
      }

      if (allDead) {
        monsterNum += 1;
        system = this.getSystem();
      }
    }
  };
}