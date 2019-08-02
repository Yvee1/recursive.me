(function() {  

  // Create HTML space and form
  Pts.namespace( this );
  let space = new HTMLSpace("#pt").setup({bgcolor: "#b80071", resize: true });
  let form = space.getForm();

  // css for testing
  let css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".pts-rect { font-size: 20vw; line-height: 50vh; overflow: hidden; pointer-events: none}";
  document.body.appendChild(css);

  function recurseMe() {
    space.clear();

    let rects = [];
    let gap = window.innerWidth*0.12;
    for (let i = 0; gap * Math.sqrt(i) <= space.size.x; i++){
        let x = gap*Math.sqrt(i);
        let rect = new Group( new Pt([x, space.size.y / 5 + 3 * i * Math.sin(x)]), new Pt([space.size.x-x+2, space.size.y]));
        rects.push(rect);
    }

    // Draw first rectangle(s)
    for (let i = rects.length-1; i >= 0; i--){
    form.strokeOnly("rgba(0, 0, 0, 0)", 1).fillText(`rgba(${255-i*10}, ${255-i*5}, ${255-i*20})`).cls(`r1Alt${i}`).rect( rects[i] );
    }

    for (let i = 0; i < rects.length; i++){
        document.querySelector(`.r1Alt${i}`).textContent = "me";
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