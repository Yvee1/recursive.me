const swup = new Swup(); // only this line when included with script tag

swup.on('contentReplaced', init);

const bigMe = document.getElementById('big-me');

init();

function runPt() {  
  // Create HTML space and form
  Pts.namespace( this );
  let space = new HTMLSpace("#pt").setup({bgcolor: "#fff0", resize: true });
  let form = space.getForm();

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

      if (bigMe.classList.contains("huge-me")){
        if (window.location.pathname == '/'){
          bigMe.classList.remove('huge-me');
        }
        // console.log(window.visualViewport.width);
        // bigMe.style.fontSize = "40vh";
        // bigMe.style.left = `${window.innerWidth/3}px`;
        // bigMe.style.top = `${5*window.innerHeight/12}px`;
      }

      else if (window.location.pathname.indexOf('me.html') > -1){
        bigMe.classList.add('huge-me');
      }

      else {
      const width = space.size.x;
      const height = space.size.y;

      for (let angle = 0, i = 0; angle <= 2 * Math.PI; angle += gap, i++){
        let x = width/2 + Math.cos(-angle + offset + time/1000) * width * 0.3;
        let y = -20 + height/2 + Math.sin(2* (-angle + offset + time/1000)) * width/8;

        locations[i] = {x: x, y: y};
      }

      for (let i = locations.length - 1; i >= 0; i--){
        form.strokeOnly("rgba(0, 0, 0, 0)", 1).fillText(`hsl(${i/locations.length * 360}, ${100}%, ${50}%)`);

        form.styleTo("opacity", "");
        // form._ctx.style["font-size"] = "10vmin";
        // form._ctx.style["line-height"] = "8vw";
        form._ctx.style["font-family"] = MEs[i]["font-family"];
        form._ctx.style["font-style"] = MEs[i]["font-style"];
        form._ctx.style["font-variant"] = MEs[i]["font-variant"];
        form._ctx.style["font-weight"] = MEs[i]["font-weight"];
        form.text([locations[i].x, locations[i].y], "me");
      }

      bigMe.style.left = `${width/2}px`;
      bigMe.style.top = `${height/2 - 40 + document.getElementById("header").clientHeight}px`;
      bigMe.style.display = "block";

      // let elements = document.getElementsByClassName('pt-text');
      // for (elements)
    }
  }
  );

  space.play();
};

function init() {
  if (document.querySelector('#pt')){
    runPt();
  }

  const ptLink = document.getElementById('pt-link');

  function colorChange(event){
    bigMe.style.color = event.srcElement.style.color;
  }

  bigMe.addEventListener('click', function(event){
    if (ptLink){
      ptLink.removeEventListener('mouseover', colorChange);
    }
    this.classList.add("huge-me");
  });

  if (ptLink){
    ptLink.addEventListener('click', function(event){
      colorChange(event);
      this.removeEventListener('mouseover', colorChange);
    })
  }

  if (ptLink){
    ptLink.addEventListener('mouseover', colorChange);
  }
}