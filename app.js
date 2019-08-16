const swup = new Swup(); // only this line when included with script tag

swup.on('contentReplaced', init);
swup.on('clickLink', linkClickHandler);
swup.on('popState', popStateHandler);

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

      if (!window.location.pathname == '/'){
        space.pause();
      } else {      
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
          form._ctx.style["font-family"] = MEs[i]["font-family"];
          form._ctx.style["font-style"] = MEs[i]["font-style"];
          form._ctx.style["font-variant"] = MEs[i]["font-variant"];
          form._ctx.style["font-weight"] = MEs[i]["font-weight"];
          form.text([locations[i].x, locations[i].y], "me");
        }

        if (document.getElementById("header")){
          document.documentElement.style.setProperty('--big-me-x', `${width/2}px`);
          document.documentElement.style.setProperty('--big-me-y', `${height/2 - 40 + document.getElementById("header").clientHeight}px`);
        }
      }
    }
  );

  space.play();
};

function linkClickHandler() {
  console.log("Link clicked!");

  if (window.location.pathname == '/'){
    bigMe.classList.add('huge-me');
    console.log("On index page");
  }

  if (window.location.pathname.indexOf('me.html') > -1){
    bigMe.classList.remove('huge-me');
    bigMe.classList.add('transition-enlarge');
    console.log("On me.html");
  }
}

function popStateHandler() {
  console.log("Page change!");

  if (window.location.pathname.indexOf('me.html') > -1){
    bigMe.classList.add('huge-me');
    console.log("Now on me.html");
  }

  if (window.location.pathname == '/'){
    bigMe.classList.remove('huge-me');
    bigMe.classList.add('transition-enlarge');
    console.log("Now on index");
  }
}

function init() {
  console.log("init");

  if (window.location.pathname.indexOf('me.html') > -1){
    bigMe.classList.remove('transition-enlarge');
  }
    
  if (document.querySelector('#pt')){
    // runPt();
  }

  const ptLink = document.getElementById('pt-link');

  const ptClick = (event) => {
    ptHover(event);
    ptLink.removeEventListener('mouseover', ptHover);
    ptLink.removeEventListener('click', ptClick);
  }

  const ptHover = (event) => {
    bigMe.style.color = event.srcElement.style.color;
  }

  if (ptLink){
    ptLink.addEventListener('click', ptClick);

    ptLink.addEventListener('mouseover', ptHover);
  }

  bigMe.addEventListener('click', function(event){
    if (ptLink){
      ptLink.removeEventListener('mouseover', ptHover);
      ptLink.removeEventListener('mouseover', ptClick);
    }
    this.classList.add("huge-me");
  });

}