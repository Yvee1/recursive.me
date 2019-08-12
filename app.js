(function() {  
  // Create HTML space and form
  Pts.namespace( this );
  let space = new HTMLSpace("#pt").setup({bgcolor: "#fff", resize: true });
  let form = space.getForm();
  let test = space.getForm();

  const fonts = ["Arial, sans-serif", "Helvetica, sans-serif", "Times New Roman, serif", "Times, serif", "Courier New, monospace",
                "Courier, monospace", "Verdana, sans-serif", "Georgia, serif", "Palatino,Palatino Linotype,Palatino LT STD,Book Antiqua,Georgia,serif",  
                "Bookman", "Comic Sans MS", "Trebuchet MS", "Perpetua, serif"];
  const fontVariants = ["normal", "normal", "small-caps"];
  const fontStyles = ["normal", "italic"];
  const fontWeight = ["normal", "bold", "bolder"];

  function recurseMe() {
    space.clear();
    form.reset();
    test.reset();

    const width = space.size.x;
    const height = space.size.y;

    const gap = 0.7;
    const amount = Math.floor(2 * Math.PI / gap);
    const locations = new Array(amount);

    const offset = Math.PI/2;

    for (let angle = 0, i = 0; angle <= 2 * Math.PI; angle += gap, i++){
      let x = width/2 + Math.cos(-angle + offset) * width/3;
      let y = height/2 + Math.sin(2* (-angle + offset)) * width/8;

      locations[i] = {x: x, y: y};
    }

    for (let i = locations.length - 1; i >= 0; i--){
      form.strokeOnly("rgba(0, 0, 0, 0)", 1).fillText(`hsl(${i/locations.length * 360}, ${100-i/locations.length * 50}%, ${50+i/locations.length * 10}%)`);
      // form.alpha(1-(0.9*(i+1)/locations.length));
      form.alpha(0.5);

      // Center text
      //form._ctx.style['transform'] = "";

      if (i == 0){
        form._ctx.style["font-size"] = "20vw";
        form._ctx.style["font-family"] = "Times New Roman, serif";
        form._ctx.style["font-style"] = "italic";
        form._ctx.style["font-variant"] = "small-caps";
        form._ctx.style["font-weight"] = "lighter";
        form.alpha(0.9);
      } else {
        form._ctx.style["font-family"] = fonts[Math.floor(Math.random()*fonts.length)];
        form._ctx.style["font-style"] = fontStyles[Math.floor(Math.random()*fontStyles.length)];
        form._ctx.style["font-variant"] = fontVariants[Math.floor(Math.random()*fontVariants.length)];
        form._ctx.style["font-weight"] = fontWeight[Math.floor(Math.random()*fontWeight.length)];
      }

      // form.font(12, fontWeight[Math.floor(Math.random() * fontWeight.length)], fontStyles[Math.floor(Math.random()*fontStyles.length)], 1.2, fonts[Math.floor(Math.random()*fonts.length)]);
      form.text([locations[i].x, locations[i].y], "me");

      form.reset();
      
      // form.fill("red")
      //     .circle(Circle.fromCenter([locations[i].x, locations[i].y]), 20);

      form.reset();
    }
  }

  space.add(
    // For DOM, don't use arrow function so that `this` here will refer to this player
    {start: function(bound){
        form.scope(this);
        test.scope(this);
        recurseMe();
    }, resize: function(bound) {
        form.scope(this);
        test.scope(this);
        recurseMe();
    }
  });
})();