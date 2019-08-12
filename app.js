(function() {  
  // Create HTML space and form
  Pts.namespace( this );
  let space = new HTMLSpace("#pt").setup({bgcolor: "#fff0", resize: true });
  let form = space.getForm();
  let test = space.getForm();

  const fonts = ["Arial, sans-serif", "Helvetica, sans-serif", "Times New Roman, serif", "Times, serif", "Courier New, monospace",
                "Courier, monospace", "Verdana, sans-serif", "Georgia, serif", "Palatino,Palatino Linotype,Palatino LT STD,Book Antiqua,Georgia,serif",  
                "Bookman", "Comic Sans MS", "Trebuchet MS", "Perpetua, serif", "Impact"];
  const fontVariants = ["normal", "normal", "small-caps"];
  const fontStyles = ["normal", "italic"];
  const fontWeight = ["normal", "bold", "bolder"];

  const gap = 0.7;
  const amount = Math.ceil(2 * Math.PI / gap);
  const offset = Math.PI/2;
  const locations = new Array(amount);
  const MEs = new Array(amount);

  let count = 0;

  for (let i = 0; i < MEs.length; i++){
    MEs[i] = {};

    MEs[i]["font-family"] = fonts[Math.floor(Math.random()*fonts.length)];
    MEs[i]["font-style"] = fontStyles[Math.floor(Math.random()*fontStyles.length)];
    MEs[i]["font-variant"] = fontVariants[Math.floor(Math.random()*fontVariants.length)];
    MEs[i]["font-weight"] = fontWeight[Math.floor(Math.random()*fontWeight.length)];
  }

  space.add(
    // For DOM, don't use arrow function so that `this` here will refer to this player
    function (time, ftime) {
      form.scope(this);

      const width = space.size.x;
      const height = space.size.y;

      for (let angle = 0, i = 0; angle <= 2 * Math.PI; angle += gap, i++){
        let x = width/2 + Math.cos(-angle + offset + time/1000) * width * 0.3;
        let y = -20 + height/2 + Math.sin(2* (-angle + offset + time/1000)) * width/8;

        locations[i] = {x: x, y: y};
      }

      for (let i = locations.length - 1; i >= 0; i--){
        form.strokeOnly("rgba(0, 0, 0, 0)", 1).fillText(`hsl(${50 + i/locations.length * 310}, ${100-i/locations.length * 50}%, ${50+i/locations.length * 10}%)`);
        form.alpha(0.5);

        form._ctx.style["font-size"] = "10vw";
        form._ctx.style["line-height"] = "8vw";
        form._ctx.style["font-family"] = MEs[i]["font-family"];
        form._ctx.style["font-style"] = MEs[i]["font-style"];
        form._ctx.style["font-variant"] = MEs[i]["font-variant"];
        form._ctx.style["font-weight"] = MEs[i]["font-weight"];
        form.text([locations[i].x, locations[i].y], "me");
      }

      form._ctx.style["font-size"] = "20vw";
      form._ctx.style["line-height"] = "14vw";
      form._ctx.style["font-family"] = "Times New Roman, serif";
      form._ctx.style["font-style"] = "italic";
      form._ctx.style["font-variant"] = "small-caps";
      form._ctx.style["font-weight"] = "lighter";
      form._ctx.style["z-index"] = 1;
      form.fillText('red');
      form.cls("big-me");

      form.alpha(0.9);
      form.text([width/2, height/2 - 40], "me");

      form.reset();
      form.cls(false);
    }
  );

  space.play();
})();