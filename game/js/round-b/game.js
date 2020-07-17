function RoundB() {
  const video = createCapture(VIDEO);
  video.hide();

  let pose;
  let poseLabel = "A";

  const poseNet = ml5.poseNet(video, { flipHorizontal: true, detectionType: "single" }, () => {
    console.log("poseNet ready");
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
    console.log(poseLabel);

    background(255);

    push();
    translate(video.width, 0);
    scale(-1, 1);
    image(video, 0, 0);
    pop();

    if (pose) {
      for (let i = 0; i < pose.keypoints.length; i++) {
        let x = pose.keypoints[i].position.x;
        let y = pose.keypoints[i].position.y;
        fill(0);
        stroke(255);
        ellipse(x, y, 16, 16);
      }
    }
  };
}