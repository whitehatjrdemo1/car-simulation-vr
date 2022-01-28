AFRAME.registerComponent("game-play", {
  schema: {
    elementId: { type: "string", default: "#bx1" },
    gmeOvr: { type: "boolean", default: false }, //add
  },
  update: function () {
    var isVisible = this.el.getAttribute("visible"); //add
    this.isCollided(this.data.elementId, isVisible); //add isVisible
  },

  init: function () {
    var duration = 120;
    const timerEl = document.querySelector("#timer");
    this.startTimer(duration, timerEl);
    this.gameOvr = false; //add
  },

  startTimer: function (duration, timerEl) {
    var minutes;
    var seconds;
    setInterval(() => {
      if (duration >= 0 && !this.data.gmeOvr) {
        //add &&
        minutes = parseInt(duration / 60);
        seconds = parseInt(duration % 60);
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        timerEl.setAttribute("text", {
          value: minutes + ":" + seconds,
        });
        duration -= 1;
      } else {
        this.gameOver();
      }
    }, 1000);
  },
  isCollided: function (elemntId, isVisible) {
    //add isVisible
    const element = document.querySelector(elemntId);
    element.addEventListener("collide", (e) => {
      if (elemntId.includes("#carModel")) {
        console.log(e);
      }
      if (elemntId.includes("#tr") && !this.data.gmeOvr && isVisible) {
        //add && isVisible
        //add &&
        // console.log(this.gameOvr);
        element.setAttribute("visible", false);
        this.updateScore();
        this.updateTarget();
      } else if(elemntId.includes("#bx")){ //change to else if
        this.gameOver();
        //console.log(e.target, e.detail);
      }
    });
  },
  updateTarget: function () {
    var element = document.querySelector("#life");
    var count = element.getAttribute("text").value;
    var currentTargets = parseInt(count);
    currentTargets -= 1;
    if (currentTargets <= 0) {
      //add if block
      var completed = document.querySelector("completed");
      completed.setAttribute("visible", true);
      this.gameOver()
    }
    element.setAttribute("text", {
      value: currentTargets,
    });
  },
  updateScore: function () {
    var element = document.querySelector("#score");
    var count = element.getAttribute("text").value;
    var currentScore = parseInt(count);
    currentScore += 50;
    element.setAttribute("text", {
      value: currentScore,
    });
  },
  gameOver: function () {
    var carEl = document.querySelector("#carModel");
    var element = document.querySelector("#gameOver");
    var restart = document.querySelector("#restart"); //add

    element.setAttribute("visible", true);
    restart.setAttribute("visible", true); //add

    carEl.setAttribute("car-rotation-reader", { gmeOver: true }); //add
    carEl.setAttribute("velocity", { x: 0, y: 0, z: 0 });
    this.gameOvr = true; //add
    for (var i = 0; i < 10; i++) {
      //add for loop
      console.log(this.gameOvr);
      target = document.querySelector(`#tr${i}`);
      target.setAttribute("game-play", { gmeOvr: true });

      box = document.querySelector(`#bx${i}`);
      box.setAttribute("game-play", { gmeOvr: true });
    }
    //console.log(this.gameOvr);
  },
});
