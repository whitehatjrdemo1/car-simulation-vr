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
      if (e.key === "ArrowRight") {
        //   if (planeRotation.x < 10) {
        planeRotation.y -= 5;
        this.el.setAttribute("rotation", planeRotation);
        this.el.setAttribute("velocity", direction.multiplyScalar(3));
        //   }
      }
      if (e.key === "ArrowLeft") {
        //   if (planeRotation.x > -10) {
        planeRotation.y += 5;
        this.el.setAttribute("rotation", planeRotation);
        this.el.setAttribute("velocity", direction.multiplyScalar(3));
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
     // console.log(planeRotation);
    });
  },
});
AFRAME.registerComponent("camera-rotation-reader", {
  schema: {
    speedOfRotation: { type: "number", default: 0 },
    speedOfAscent: { type: "number", default: 0 },
  },
  // init: function () {
  //   window.addEventListener("keydown", (e) => {
  //     //get the data from the attributes
  //     this.data.speedOfRotation = this.el.getAttribute("rotation");
  //     this.data.speedOfAscent = this.el.getAttribute("position");

  //     var planeRotation = this.data.speedOfRotation;
  //     var planePosition = this.data.speedOfAscent;

  //     console.log(planeRotation);
  //     //control the attributes with the Arrow Keys
  //     if (e.key === "ArrowRight") {
  //       //   if (planeRotation.x < 10) {
  //       planeRotation.y -= 1;
  //       this.el.setAttribute("rotation", planeRotation);
  //       // this.el.setAttribute("velocity", direction.multiplyScalar(0))
  //       //   }
  //     }
  //     if (e.key === "ArrowLeft") {
  //       //   if (planeRotation.x > -10) {
  //       planeRotation.y += 1;
  //       this.el.setAttribute("rotation", planeRotation);
  //       // this.el.setAttribute("velocity", direction.multiplyScalar(0))
  //       //   }
  //     }
  //   });
  // },
  init: function () {
    this.directionVec3 = new THREE.Vector3();
  },
  tick: function () {
    var car = document.querySelector("#carModel");
    var player = document.querySelector("#carModel").object3D;
    var cam = document.querySelector("#camera").object3D;
    var direction = new THREE.Vector3();
    var camDirection = new THREE.Vector3();
    var position = car.getAttribute("position");
    var x = position.x;
    var y = position.y + 5;
    var z = position.z + 10;
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
