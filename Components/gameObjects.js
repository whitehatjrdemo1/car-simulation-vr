AFRAME.registerComponent("wire-fence", {
  init: function () {
    posX = -20;
    posZ = 85;
    for (var i = 0; i < 10; i++) {
      var wireFence1 = document.createElement("a-entity");
      posX += 5;
      posY = 2.5;
      posZ -= 10;
      var scale = { x: 2, y: 2, z: 2 };
      wireFence1.setAttribute("id", "wireFence1" + i);
      wireFence1.setAttribute("position", { x: posX, y: 2.5, z: -65 });
      wireFence1.setAttribute("scale", scale);
      wireFence1.setAttribute(
        "gltf-model",
        "./models/barbed_wire_fence/scene.gltf"
      );
      wireFence1.setAttribute("static-body", {});
      var sceneEL = document.querySelector("#scene");
      sceneEL.appendChild(wireFence1);

      var wireFence2 = document.createElement("a-entity");
      wireFence2.setAttribute("id", "wireFence2" + i);
      wireFence2.setAttribute("position", { x: posX, y: 2.5, z: 85 });
      wireFence2.setAttribute("scale", scale);
      wireFence2.setAttribute(
        "gltf-model",
        "./models/barbed_wire_fence/scene.gltf"
      );
      wireFence2.setAttribute("static-body", {});
      sceneEL.appendChild(wireFence2);

      var wireFence3 = document.createElement("a-entity");
      wireFence3.setAttribute("id", "wireFence3" + i);
      wireFence3.setAttribute("position", { x: -30, y: 2.5, z: posZ });
      wireFence3.setAttribute("scale", scale);
      wireFence3.setAttribute(
        "gltf-model",
        "./models/barbed_wire_fence/scene.gltf"
      );
      wireFence3.setAttribute("static-body", {});
      wireFence3.setAttribute("rotation", { x: 0, y: 90, z: 0 });
      sceneEL.appendChild(wireFence3);

      var wireFence4 = document.createElement("a-entity");
      wireFence4.setAttribute("id", "wireFence4" + i);
      wireFence4.setAttribute("position", { x: 50, y: 2.5, z: posZ });
      wireFence4.setAttribute("scale", scale);
      wireFence4.setAttribute(
        "gltf-model",
        "./models/barbed_wire_fence/scene.gltf"
      );
      wireFence4.setAttribute("static-body", {});
      wireFence4.setAttribute("rotation", { x: 0, y: 90, z: 0 });
      sceneEL.appendChild(wireFence4);
    }
  },
});

AFRAME.registerComponent("boxes", {
  schema: {
    height: { type: "number", default: 2 },
    width: { type: "number", default: 0.01 },
    depth: { type: "number", default: 1 },
  },
  init: function () {
    //x position array
    px = [
      15, -15, 12.5, -12.5, 10, -10, 7.5, -7.5, 5, -5, 7.5, -7.5, 5, -5, 5, -5,
      5, -5, 5, -5,
    ];

    //z position array
    pz = [
      -10, -15, -20, -25, -30, -35, -40, -45, -50, -55, -10, -15, -20, -25, -30,
      -35, -40, -45, -50, -55,
    ];

    for (var i = 0; i < px.length; i++) {
      var box = document.createElement("a-entity");

      //Update the position variables values from the array values.
      posX = px[i];
      posY = 1.5;
      posZ = pz[i];

      position = { x: posX, y: posY, z: posZ };

      box.setAttribute("id", "bx" + i);

      box.setAttribute("position", position);

      box.setAttribute("geometry", {
        primitive: "cone",
        height: this.data.height,
      });

      box.setAttribute("material", {
        src: "./images/traffic_cone.jpg",
        repeat: "1 1 1",
      });
      //vehicleEl.setAttribute("dynamic-body");
      box.setAttribute("game-play", {
        elementId: `#bx${i}`,
        gmeOvr: false,
      });

      box.setAttribute("static-body", {});

      var sceneEl = document.querySelector("#scene");
      sceneEl.appendChild(box);
    }
    tx = [15, -15, 12.5, -12.5, 10, -10, 7.5, -7.5, 5, 0];

    //z position array
    tz = [-15, -20, -25, -30, -35, -40, -45, -50, -55, -60];

    for (var j = 0; j < tx.length; j++) {
      var target = document.createElement("a-entity");

      //Update the position variables values from the array values.
      posTX = tx[j];
      posTY = 1.5;
      posTZ = tz[j];

      positionT = { x: posTX, y: posTY, z: posTZ };

      target.setAttribute("id", "tr" + j);

      target.setAttribute("position", positionT);
      target.setAttribute("rotation", { x: 90, y: 0, z: 0 });

      target.setAttribute("geometry", {
        primitive: "cylinder",
        height: this.data.width * 10,
        radius: this.data.height / 2,
      });
      //  target.setAttribute("rotation", "0 90 0");
      target.setAttribute("material", {
        src: "./images/target-logo-2.png",
        repeat: "1 1 1",
      });

      target.setAttribute("static-body", {});
      //      vehicleEl.setAttribute("dynamic-body");
      if (j === 0) {
        target.setAttribute("game-play", {
          elementId: `#tr${j}`,
          gmeOvr: false,
          targetActive: true,

        });
      } else {
        target.setAttribute("game-play", {
          elementId: `#tr${j}`,
          gmeOvr: false,
          targetActive: false,

        });
      }
      sceneEl.appendChild(target);

      var arrow = document.createElement("a-entity");

      arrow.setAttribute("id", "ar" + j);

      arrow.setAttribute("position", { x: posTX, y: 5, z: posTZ });
      arrow.setAttribute("rotation", { x: 0, y: 0, z: 0 });

      arrow.setAttribute("geometry", {
        primitive: "box",
        height: this.data.height,
        width: this.data.height / 2,
        depth: this.data.depth,
      });
      //  target.setAttribute("rotation", "0 90 0");
      arrow.setAttribute("material", {
        src: "./images/arrow.png",
        repeat: "1 -1 1",
      });

      arrow.setAttribute("static-body", {});
      //      vehicleEl.setAttribute("dynamic-body");
      if (j === 0) {
        arrow.setAttribute("game-play", {
          elementId: `#ar${j}`,
          gmeOvr: false,
          targetActive: true,
        });
        arrow.setAttribute("visible", true);
      } else {
        arrow.setAttribute("game-play", {
          elementId: `#ar${j}`,
          gmeOvr: false,
          targetActive: false,
        });
        arrow.setAttribute("visible", false);
      }
      sceneEl.appendChild(arrow);
    }
  },
  // update: function () {
  //   var arrow = this.el;
  //   var elementId = arrow.getAttribute("id");
  //   if (elementId.includes("#ar")) {
  //     if (this.data.targetActive) {
  //       arrow.setAttribute("game-play", {
  //         elementId: `#ar${j}`,
  //         gmeOvr: false,
  //         targetActive: true,
  //       });
  //       arrow.setAttribute("visible", true);
  //     } else {
  //       arrow.setAttribute("game-play", {
  //         elementId: `#ar${j}`,
  //         gmeOvr: false,
  //         targetActive: false,
  //       });
  //       arrow.setAttribute("visible", false);
  //     }
  //   }
  //  },
});
