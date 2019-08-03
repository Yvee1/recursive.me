(function() {  
  // Create HTML space and form
  Pts.namespace( this );
  let space = new HTMLSpace("#pt").setup({bgcolor: "#000", resize: true });
  let form = space.getForm();

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
      form.strokeOnly("rgba(0, 0, 0, 0)", 1).fillText(`rgb(${255-i*10}, ${255-i*5}, ${255-i*20})`);
      form.styleTo("opacity", 1-(0.2+0.8*(i+1)/locations.length));
      let text = form.text([locations[i].x, locations[i].y], "me");
      console.log(text);
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