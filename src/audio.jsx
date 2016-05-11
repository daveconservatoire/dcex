const T = window.T;

const Audio = {
  play(notes) {
    var mml = "l2" + notes;

    var gen = T("OscGen", {wave:"sin(10)", env:{type:"adsr"}}).play();

    T("mml", {mml:mml}, gen).on("ended", function() {
      gen.pause();
      this.stop();
    }).start();
  }
};

export {Audio as default};
