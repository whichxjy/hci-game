let video;

let pose;
let skeleton;

let brain;

const STATE_WAITING = 1;
const STATE_COLLECTING = 2;

let state = STATE_WAITING;

let targetLabel;

function setup() {
  createCanvas(windowWidth, windowHeight);

  video = createCapture(VIDEO);
  video.hide();

  const poseNet = ml5.poseNet(video, { flipHorizontal: true, detectionType: "single" }, () => {
    console.log("poseNet ready");
  });

  poseNet.on("pose", (poses) => {
    if (poses.length > 0) {
      pose = poses[0].pose;
      skeleton = poses[0].skeleton;

      if (state === STATE_COLLECTING) {
        let inputs = [];

        for (let i = 0; i < pose.keypoints.length; i++) {
          let x = pose.keypoints[i].position.x;
          let y = pose.keypoints[i].position.y;
          inputs.push(x);
          inputs.push(y);
        }

        let target = [targetLabel];
        brain.addData(inputs, target);
      }
    }
  });

  brain = ml5.neuralNetwork({
    inputs: 34,
    outputs: 2,
    task: "classification",
    debug: true
  });
}

function keyPressed() {
  if (keyCode === 32) {
    brain.saveData();
  } else if (keyCode === 13) {
    brain.normalizeData();
    brain.train({ epochs: 50 }, () => {
      console.log("Model trained");
      brain.save();
    });
  } else if (state === STATE_WAITING) {
    setTimeout(() => {
      targetLabel = key;
      console.log("Collecting: " + key);
      state = STATE_COLLECTING;

      setTimeout(() => {
        console.log("Done");
        state = STATE_WAITING;
      }, 10000);
    }, 2000);
  }
}

function draw() {
  background(255);

  push();
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0);
  pop();

  if (pose) {
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(0);
      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }

    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0);
      stroke(255);
      ellipse(x, y, 16, 16);
    }
  }
}