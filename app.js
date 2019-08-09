(function() {  
  // Create HTML space and form
  Pts.namespace( this );
  let space = new HTMLSpace("#pt").setup({bgcolor: "#fff", resize: true });
  let form = space.getForm();

  const fonts = ["Arial, sans-serif", "Helvetica, sans-serif", "Times New Roman, serif", "Times, serif", "Courier New, monospace",  "Courier, monospace", "Verdana, sans-serif", "Georgia, serif", "Palatino, serif", "Garamond, serif",  "Bookman", "Comic Sans MS", "Trebuchet MS"];
  const fontVariants = ["normal", "small-caps"];
  const fontStyles = ["normal", "italic"];
  const fontWeight = ["normal", "bold"];

  function recurseMe() {
    space.clear();

    let width = space.size.x;
    let gap = width*0.12;

    let locations = [];

    for (let i = 0; gap * Math.sqrt(i) <= width; i++){
      let x = gap*Math.sqrt(i);
      let y = 5 * space.size.y / 12 + 3 * i * Math.sin(x/50);

      locations.push({x: x, y: y});
    }

    for (let i = locations.length - 1; i >= 0; i--){
      form.strokeOnly("rgba(0, 0, 0, 0)", 1).fillText(`hsl(${i*5}, ${100-i*2}%, ${50+i}%)`);
      form.alpha(1-(0.1+0.5*(i+1)/locations.length));

      form._ctx.style["font-family"] = fonts[Math.floor(Math.random()*fonts.length)];
      form._ctx.style["font-style"] = fontStyles[Math.floor(Math.random()*fontStyles.length)];
      form._ctx.style["font-variant"] = fontVariants[Math.floor(Math.random()*fontVariants.length)];
      form._ctx.style["font-weight"] = fontWeight[Math.floor(Math.random()*fontWeight.length)];

      form.font(12, fontWeight[Math.floor(Math.random() * fontWeight.length)], fontStyles[Math.floor(Math.random()*fontStyles.length)], 1.2, fonts[Math.floor(Math.random()*fonts.length)]);
      form.text([locations[i].x, locations[i].y], "me");
    }
  }

  space.add(
    // For DOM, don't use arrow function so that `this` here will refer to this player
    {start: function(bound){
        form.scope(this);
        recurseMe();
    }, resize: function(bound) {
        form.scope(this);
        recurseMe();
    }
  });
})();