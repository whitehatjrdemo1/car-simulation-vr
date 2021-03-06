//Terrain Rotation
AFRAME.registerComponent("terrain-rotation-reader", {
  schema: {
    speedOfRotation: { type: "number", default: 0 },
  },
  init: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        this.data.speedOfRotation += 1;
      }
      if (e.key === "ArrowLeft") {
        this.data.speedOfRotation -= 1;
      }
      var mapRotation = this.el.getAttribute("rotation");

      mapRotation.y += this.data.speedOfRotation;

      this.el.setAttribute("rotation", {
        x: mapRotation.x,
        y: mapRotation.y,
        z: mapRotation.z,
      });
    });
  },
  // tick: function () {
  //   var mapRotation = this.el.getAttribute("rotation");

  //   mapRotation.y += this.data.speedOfRotation;

  //   this.el.setAttribute("rotation", {
  //     x: mapRotation.x,
  //     y: mapRotation.y,
  //     z: mapRotation.z,
  //   });
  // },
});

//Plane rotation component
AFRAME.registerComponent("car-rotation-reader", {
  schema: {
    speedOfRotation: { type: "number", default: 0 },
    speedOfAscent: { type: "number", default: 0 },
    gmeOver: { type: "boolean", default: false }, //add
  },
  init: function () {
    window.addEventListener("keydown", (e) => {
      var car = document.querySelector("#carModel");
      var player = document.querySelector("#carModel").object3D;
      var direction = new THREE.Vector3();
      var cameraEL = document.querySelector("#camera");
      player.getWorldDirection(direction);
      //get the data from the attributes
      this.data.speedOfRotation = this.el.getAttribute("rotation");
      this.data.speedOfAscent = this.el.getAttribute("position");

      var planeRotation = this.data.speedOfRotation;
      var planePosition = this.data.speedOfAscent;
      // console.log(e);

      // console.log(planeRotation);
      //control the attributes with the Arrow Keys

      if (!this.data.gmeOver) {
        //add the if

        if (e.key === "ArrowRight") {
          //   if (planeRotation.x < 10) {
          planeRotation.y -= 5;
          this.el.setAttribute("rotation", planeRotation);
          this.el.setAttribute("velocity", direction.multiplyScalar(6));
          //   }
        }
        if (e.key === "ArrowLeft") {
          //   if (planeRotation.x > -10) {
          planeRotation.y += 5;
          this.el.setAttribute("rotation", planeRotation);
          this.el.setAttribute("velocity", direction.multiplyScalar(6));
          //   }
        }
        if (e.key === "ArrowUp") {
          this.el.setAttribute("velocity", direction.multiplyScalar(6));
        }
        if (e.key === "ArrowDown") {
          this.el.setAttribute("velocity", direction.multiplyScalar(-3));
        }
        if (e.key === " ") {
          // console.log(e);
          this.el.setAttribute("velocity", direction.multiplyScalar(0));
        }
      } else {
        if (e.key === "r" || e.key === "R") {
          this.data.gmeOver = false;
          //add the if and block
          var carEl = document.querySelector("#carModel");
          var element = document.querySelector("#gameOver");
          var restart = document.querySelector("#restart");
          var timerEl = document.querySelector("#timer");
          var lifeEl = document.querySelector("#life");
          var scoreEl = document.querySelector("#score");
          timerEl.setAttribute("text", { value: 120 });
          timerEl.setAttribute("timer", { gmeOvr: false });

          lifeEl.setAttribute("text", { value: 10 });
          scoreEl.setAttribute("text", { value: 0 });

          element.setAttribute("visible", false);
          restart.setAttribute("visible", false);

          carEl.setAttribute("car-rotation-reader", { gmeOver: false });
          carEl.setAttribute("velocity", { x: 0, y: 0, z: 0 });
          carEl.setAttribute("position", { x: 0, y: 1, z: -10 });
          carEl.setAttribute("rotation", { x: 0, y: 180, z: 0 });

          for (var i = 0; i < 10; i++) {
            target = document.querySelector(`#tr${i}`);
            arrow = document.querySelector(`#ar${i}`);
            if (i === 0) {
              target.setAttribute("game-play", {
                elementId: `#tr${i}`,
                gmeOvr: false,
                targetActive: true,
              });
              arrow.setAttribute("game-play", {
                elementId: `#ar${i}`,
                gmeOvr: false,
                targetActive: true,
              });
              arrow.setAttribute("visible", true);
            } else {
              target.setAttribute("game-play", {
                elementId: `#tr${i}`,
                gmeOvr: false,
                targetActive: false,
              });
              arrow.setAttribute("game-play", {
                elementId: `#ar${i}`,
                gmeOvr: false,
                targetActive: false,
              });
              arrow.setAttribute("visible", false);
            }
            target.setAttribute("visible", true);
            // console.log(`tr${i}`);
          }
          for (var j = 0; j < 20; j++) {
            box = document.querySelector(`#bx${j}`);
            box.setAttribute("game-play", {
              gmeOvr: false,
              elementId: `#bx${j}`,
            });
          }
        }
      }

      // console.log(planeRotation);
    });
  },
});
AFRAME.registerComponent("camera-change", {
  schema: {
    cameraPosition: { type: "number", default: 0 }, //add
  },
  init: function () {
    window.addEventListener("keydown", (e) => {
      var cam = document.querySelector("#camera");
      var camPosition = cam.getAttribute(
        "camera-rotation-reader"
      ).cameraPosition;
      if (e.key === "c" || e.key === "C") {
        camPosition = parseInt(camPosition) + 1;
        if (camPosition >= 0 && camPosition <= 2) {
          cam.setAttribute("camera-rotation-reader", {
            cameraPosition: camPosition,
          });
        } else {
          cam.setAttribute("camera-rotation-reader", {
            cameraPosition: 0,
          });
        }
      }
    });
  },
});
AFRAME.registerComponent("camera-rotation-reader", {
  schema: {
    speedOfRotation: { type: "number", default: 0 },
    speedOfAscent: { type: "number", default: 0 },
    cameraPosition: { type: "number", default: 0 },
  },

  init: function () {
    this.directionVec3 = new THREE.Vector3();
  },
  tick: function () {
    if (this.data.cameraPosition === 0) {
      cx = 0;
      cy = 5;
      cz = 10;
    } else if (this.data.cameraPosition === 1) {
      cx = 0;
      cy = 0;
      cz = -2.5;
      // } else if (this.data.cameraPosition === 2) {
      //   cx = 0;
      //   cy = -1.5;
      //   cz = -2;
    } else {
      cx = 0;
      cy = 1;
      cz = -0.5;
    }
    var car = document.querySelector("#carModel");
    var player = document.querySelector("#carModel").object3D;
    var cam = document.querySelector("#camera").object3D;
    var direction = new THREE.Vector3();
    var camDirection = new THREE.Vector3();
    var position = car.getAttribute("position");
    var x = position.x + cx;
    var y = position.y + +cy;
    var z = position.z + cz;
    var camPosition = { x: x, y: y, z: z };
    this.el.setAttribute("position", camPosition);
    // console.log(position)
    player.getWorldDirection(direction);
    cam.getWorldDirection(camDirection);
    direction = direction.sub(camDirection);

    // var directionVec3 = this.directionVec3;

    // // Grab position vectors (THREE.Vector3) from the entities' three.js objects.
    // var targetPosition = player.position;
    // var currentPosition = this.el.object3D.position;

    // // Subtract the vectors to get the direction the entity should head in.
    // directionVec3.copy(targetPosition).sub(currentPosition);
    this.el.setAttribute("rotation", direction.multiplyScalar(1.2));

    // this.el.setAttribute("look-at", car);

    // this.el.setAttribute("position", {
    //   x: currentPosition.x + directionVec3.x,
    //   y: currentPosition.y,
    //   z: currentPosition.z + directionVec3.z,
    // });
  },
});
AFRAME.registerComponent("follow", {
  schema: {
    target: { type: "selector" },
    speed: { type: "number" },
  },

  init: function () {
    this.directionVec3 = new THREE.Vector3();
  },

  tick: function (time, timeDelta) {
    var directionVec3 = this.directionVec3;

    // Grab position vectors (THREE.Vector3) from the entities' three.js objects.
    var targetPosition = this.data.target.object3D.position;
    var currentPosition = this.el.object3D.position;

    // Subtract the vectors to get the direction the entity should head in.
    directionVec3.copy(targetPosition).sub(currentPosition);

    // Calculate the distance.
    var distance = directionVec3.length();

    // Don't go any closer if a close proximity has been reached.
    if (distance < 1) {
      return;
    }

    // Scale the direction vector's magnitude down to match the speed.
    var factor = this.data.speed / distance;
    ["x", "y", "z"].forEach(function (axis) {
      directionVec3[axis] *= factor * (timeDelta / 1000);
    });

    // Translate the entity in the direction towards the target.
    this.el.setAttribute("position", {
      x: currentPosition.x + directionVec3.x,
      y: currentPosition.y + directionVec3.y,
      z: currentPosition.z + directionVec3.z,
    });
  },
});
