AFRAME.registerComponent("car-movement", {
  schema: {
    speedofRotation: { type: "number", default: 0 },
    speedofPosition: { type: "number", default: 0 },
  },

  init: function () {
    window.addEventListener("keydown", (e) => {
      this.data.speedofPosition = this.el.getAttribute("position");

      var carPosition = this.data.speedofPosition;

      if (e.key === "ArrowRight" || e.key === "d") {
        carPosition.x += 0.05;
        this.el.setAttribute("position", carPosition);
      }
      if (e.key === "ArrowLeft" || e.key === "a") {
        carPosition.x -= 0.05;
        this.el.setAttribute("position", carPosition);
      }
    });
  },
});

AFRAME.registerComponent("road-movement", {
  schema: {
    speedofPosition: { type: "number", default: 0 },
  },
  init: function () {
    window.addEventListener("keydown", (e) => {
      this.data.speedofPosition = this.el.getAttribute("position");

      var roadPosition = this.data.speedofPosition;

      if (e.key === "ArrowUp" || e.key === "w") {
        roadPosition.z += 1;
        this.el.setAttribute("position", roadPosition);
      }
      if (e.key === "ArrowDown" || e.key === "s") {
        roadPosition.z -= 1;
        this.el.setAttribute("position", roadPosition);
      }
    });
  },
});
