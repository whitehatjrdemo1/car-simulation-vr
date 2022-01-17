AFRAME.registerComponent("bullets", {
  init: function () {
    this.shootBullet();
  },

  shootBullet: function () {
    window.addEventListener("click", (e) => {
      //if(e.key === "z"){
      var bullet = document.createElement("a-entity");
      bullet.setAttribute("geometry", { primitive: "sphere", radius: 0.1 });
      bullet.setAttribute("material", "color", "black");
      var cam = document.querySelector("#camera-rig");
      var pos = cam.getAttribute("position");
      bullet.setAttribute("position", { x: pos.x, y: pos.y+1, z: pos.z-0.5 });
      bullet.setAttribute("velocity", { x: 0, y: 0, z: -1 });
      var camera = document.querySelector("#camera").object3D;
      var scene = document.querySelector("#scene");
      var direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      //console.log(direction)
      bullet.setAttribute("velocity", direction.multiplyScalar(-10));
      bullet.setAttribute("dynamic-body", { shape: "sphere", mass: 0 });
      bullet.addEventListener("collide", this.removeBullet);
      scene.appendChild(bullet);
      this.shootSound()
      //}
    });
  },

  shootSound:function(){
      var entity = document.querySelector("#sound1")
      entity.components.sound.playSound()
  },

  removeBullet: function (e) {
    console.log(e.detail.target.el);
    console.log(e.detail.body.el);
    var element = e.detail.target.el;
    var elementHit = e.detail.body.el;
    if (elementHit.id.includes("box")) {
      element.removeEventListener("collide", this.removeBullet);
      var scene = document.querySelector("#scene");
      scene.removeChild(element);
      elementHit.setAttribute("material", { opacity: 0.6, transparent: true });
      var impulse = new CANNON.Vec3(-2, 2, 1);
      var worldPoint = new CANNON.Vec3().copy(
        elementHit.getAttribute("position")
      );
      elementHit.body.applyImpulse(impulse, worldPoint);
    }
  },
});


