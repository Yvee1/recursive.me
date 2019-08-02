(function() {  

  // Create HTML space and form
  Pts.namespace( this );
  let space = new HTMLSpace("#pt").setup({bgcolor: "#000", resize: true });
  let form = space.getForm();

  // css for testing
  let css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".pts-text {line-height: 55vh; overflow: hidden; pointer-events: all; font-size: 15vw; transition: font-size 1s;} .pts-text:hover {font-size: 20vw}";
  document.body.appendChild(css);

  function recurseMe() {
    space.clear();

    let width = space.size.x;
    let gap = width*0.12;

    let locations = [];

    for (let i = 0; gap * Math.sqrt(i) <= width; i++){
      let x = gap*Math.sqrt(i);
      let y = space.size.y / 5 + 3 * i * Math.sin(x/50);

      locations.push({x: x, y: y});
    }

    for (let i = locations.length - 1; i >= 0; i--){
      form.strokeOnly("rgba(0, 0, 0, 0)", 1).fillText(`rgba(${255-i*10}, ${255-i*5}, ${255-i*20})`);
      form.text([locations[i].x, locations[i].y], "me");
      console.log([locations[i].x, locations[i].y]);
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