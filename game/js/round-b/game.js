function RoundB() {
  let isOver = false;

  const video = createCapture(VIDEO);
  video.hide();
  const showVideo = true;

  let monsterNum = 4;

  const monsters = [];

  this.getSystem = () => {
    monsters.length = 0;

    for (let i = 0; i < monsterNum; i++) {
      const position = createVector(random(windowWidth), random(windowHeight));
      const velocity = createVector(0, 0);
      const size = 40;
      const maxForce = random(5, 10);
      const maxSpeed = random(2, 5);

      let char;

      if (i % 2 === 0) {
        char = "A";
      } else if (i % 3 === 0) {
        char = "C";
      } else {
        char = "Y";
      }

      monsters.push(new CharMonster(position, velocity, size, maxForce, maxSpeed, char));
    }

    const resolution = 20;

    return new FlowFieldSystem(monsters, resolution);
  };

  let system = this.getSystem();

  setInterval(() => {
    system.reset();
  }, 3000);

  let pose;
  let poseLabel = "X";

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

  let options = {
    inputs: 34,
    outputs: 4,
    task: "classification",
    debug: true
  };

  const brain = ml5.neuralNetwork(options);

  const modelInfo = {
    model: "model/model.json",
    metadata: "model/model_meta.json",
    weights: "model/model.weights.bin",
  };

  brain.load(modelInfo, () => {
    console.log("Rose classification ready");
    this.classifyPose();
  });

  this.classifyPose = () => {
    if (isOver) {
      return;
    }

    if (pose) {
      let inputs = [];

      for (let i = 0; i < pose.keypoints.length; i++) {
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
        inputs.push(x);
        inputs.push(y);
      }

      brain.classify(inputs, (err, results) => {
        if (!err && results.length > 0) {
          if (results[0].confidence > 0.75) {
            poseLabel = results[0].label.toUpperCase();
          }
        }
        this.classifyPose();
      });
    } else {
      setTimeout(this.classifyPose, 100);
    }
  };

  this.draw = () => {
    if (isOver) {
      return;
    }

    console.log(poseLabel);

    background(255);

    if (pose) {
      const player = new Player(pose.nose, widthScale, heightScale);

      system.run(player);

      player.display();

      let allDead = true;

      for (let i = 0; i < monsters.length; i++) {
        if (monsters[i].dead) {
          continue;
        }

        allDead = false;

        if (poseLabel === monsters[i].char) {
          monsters[i].die();
        }

        if (!monsters[i].dead && monsters[i].hit(player)) {
          isOver = true;
        }
      }

      if (allDead) {
        system = this.getSystem();
      }
    }

    if (showVideo) {
      push();
      translate(windowWidth, 0);
      scale(-1, 1);
      image(video, 0, 0, windowWidth * 0.1, windowHeight * 0.1);
      pop();
    }
  };
}