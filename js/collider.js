AFRAME.registerComponent("vehicles", {
  init: function () {
    for (var i = 1; i <= 5; i++) {
      var id = `vehicle${i}`;
      var posX = Math.random(-125, 125);
      var posY = 7;
      var posZ = Math.random(-125, 125);
      var position = {
        x: posX,
        y: posY,
        z: posZ,
      };

      this.vehicles(id, position);
    }
  },

  vehicles: (id, position) => {
    var roadEl = document.querySelector("#roadmodel");
    var vehicleEl = document.createElement("a-entity");
    vehicleEl.setAttribute("id", id);
    vehicleEl.setAttribute("position", position);
    vehicleEl.setAttribute("rotation", {
      x: 0,
      y: 180,
      z: 0,
    });
    vehicleEl.setAttribute("scale", { x: 1.5, y: 1.5, z: 1.5 });
    vehicleEl.setAttribute("gltf-model", "./models/vehicle/scene.gltf");
    vehicleEl.setAttribute("dynamic-body");
    vehicleEl.setAttribute("game-play", {
      elementId: `#${id}`,
    });
    roadEl.appendChild(vehicleEl);
  },
});
