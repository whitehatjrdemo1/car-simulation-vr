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
      wireFence1.setAttribute("position", { x: posX, y: 2.5, z: -35 });
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
      22.86, -17.35, -12.81, 0.44, -30.18, -25.89, 15.61, 29.68, 11.95, -15.4,
    ];

    //z position array
    pz = [-15, -20, -25, -30, -35, -40, -35, -30, -25, -20];

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
      });

      box.setAttribute("static-body", {});

      var sceneEl = document.querySelector("#scene");
      sceneEl.appendChild(box);
    }
    tx = [
      30.86, -14.35, -20.81, 8.44, -38.18, -33.89, 23.61, 36.68, 19.95, -23.4,
    ];

    //z position array
    tz = [-15, -20, -25, -30, -35, -40, -35, -30, -25, -20];

    for (var i = 0; i < tx.length; i++) {
      var target = document.createElement("a-entity");

      //Update the position variables values from the array values.
      posTX = tx[i];
      posTY = 1.5;
      posTZ = tz[i];

      positionT = { x: posTX, y: posTY, z: posTZ };

      target.setAttribute("id", "tr" + i);

      target.setAttribute("position", positionT);

      target.setAttribute("geometry", {
        primitive: "torus",
        radius: this.data.height,
        tubularRadius: this.data.width,
        depth: this.data.depth,
      });
      //  target.setAttribute("rotation", "0 90 0");
      target.setAttribute("material", {
        src: "./images/traffic_cone.jpg",
        repeat: "1 1 1",
      });

      target.setAttribute("static-body", {});
      //      vehicleEl.setAttribute("dynamic-body");
      target.setAttribute("game-play", {
        elementId: `#tr${i}`,
      });
      var sceneEl = document.querySelector("#scene");
      sceneEl.appendChild(target);
    }
  },
});
