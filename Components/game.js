AFRAME.registerComponent("game-play", {
  schema: {
    elementId: { type: "string", default: "" }, //change default
    gmeOvr: { type: "boolean", default: false }, //add
    targetActive: { type: "boolean", default: false },
  },
  update: function () {
    //console.log(this.data.gmeOvr);
    this.isVisible = this.el.getAttribute("visible"); //add
    // console.log(this.data.gmeOvr);
    if (!this.data.gmeOvr) {
      this.isCollided(this.data.elementId);

      var duration = 120;
      const timerEl = document.querySelector("#timer");
      clearInterval(this.gameStart);
      this.startTimer(duration, timerEl);
    }

    var elementId = this.el.getAttribute("id");
    // console.log(elementId, this.data.targetActive);

    // if (elementId.includes("#ar")) {
    //   if (this.data.targetActive) {
    //     this.el.setAttribute("visible", true);
    //     console.log("visible");
    //   } else {
    //     this.el.setAttribute("visible", false);
    //     console.log(" not visible");
    //   }
    // }
  },
  // tick:function(){//add
  //   this. isVisible = this.el.getAttribute("visible");

  // },
  init: function () {
    this.isVisible = this.el.getAttribute("visible"); //add
    this.gameStart;
    // var duration = 120;
    // const timerEl = document.querySelector("#timer");
    // this.startTimer(duration, timerEl);
    //this.gameOvr = false; //add
  },

  startTimer: function (duration, timerEl) {
    var minutes;
    var seconds;
    if (!this.gameStart) {
      this.gameStart = setInterval(() => {
        if (!this.data.gmeOvr) {
          if (duration >= 0) {
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
            //console.log("timer");
            this.gameOver(false);
          }
        }
      }, 1000);
    }
  },
  isCollided: function (elemntId) {
    this.isVisible = this.el.getAttribute("visible"); //add

    //add isVisible
    const element = document.querySelector(elemntId);
    element.addEventListener("collide", (e) => {
      // console.log(this.data.targetActive);
      //  console.log(elemntId.toString());
      //console.log(elemntId, this.data.gmeOvr, this.isVisible);
      if (this.data.targetActive) {
        if (elemntId.includes("#tr") && this.isVisible) {
          //add && isVisible
          //add &&
          // console.log(elemntId);
          this.isVisible = false; //add
          element.setAttribute("visible", false);
          element.setAttribute("game-play", { targetActive: false });

          this.updateScore();
          this.updateTarget();
          var id = parseInt(elemntId.toString()[3]);
          document
            .querySelector(`#ar${id}`)
            .setAttribute("game-play", { targetActive: false });
          document.querySelector(`#ar${id}`).setAttribute("visible", false);
          document
            .querySelector(`#tr${id}`)
            .setAttribute("game-play", { targetActive: false });
          if (id < 9) {
            id = id + 1;
          }
          //console.log(id);
          document
            .querySelector(`#tr${id}`)
            .setAttribute("game-play", { targetActive: true });
          document
            .querySelector(`#ar${id}`)
            .setAttribute("game-play", { targetActive: true });
          document.querySelector(`#ar${id}`).setAttribute("visible", true);
        }
        // } else if (elemntId.includes("#bx")) {  //add back
        //   //change to else if
        //   this.gameOver();
        //   console.log("collide");

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
      var completed = document.querySelector("#completed");
      completed.setAttribute("visible", true);
      this.gameOver(true);
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
  gameOver: function (completed) {
    var carEl = document.querySelector("#carModel");
    var element = document.querySelector("#gameOver");
    var restart = document.querySelector("#restart"); //add
    this.data.gmeOvr = true;
    console.log(completed);
    if (!completed) {
      element.setAttribute("visible", true);
    }
    restart.setAttribute("visible", true); //add
    // console.log(this.gameStart, "over");

    clearInterval(this.gameStart);
    this.gameStart = null;

    // console.log(this.gameStart, "over");
    carEl.setAttribute("car-rotation-reader", { gmeOver: true }); //add
    carEl.setAttribute("velocity", { x: 0, y: 0, z: 0 });
    for (var i = 0; i < 10; i++) {
      //add for loop
      var target = document.querySelector(`#tr${i}`);
      target.setAttribute("game-play", {
        gmeOvr: true,
        targetActive: false,
        elementId: `#tr${i}`,
      });
      var arrow = document.querySelector(`#ar${i}`);
      arrow.setAttribute("game-play", {
        gmeOvr: true,
        targetActive: false,
        elementId: `#ar${i}`,
      });
      // console.log(`#tr${i}`);
    }
    for (var j = 0; j < 20; j++) {
      //add for loop

      box = document.querySelector(`#bx${j}`);
      box.setAttribute("game-play", { gmeOvr: true });
    }
    //console.log(this.gameOvr);
  },
});
