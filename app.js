const swup = new Swup(); // only this line when included with script tag

swup.on('contentReplaced', init);
swup.on('clickLink', linkClickHandler);
swup.on('popState', popStateHandler);

const bigMe = document.getElementById('big-me');
const rotSqr = document.getElementById("rotated-square")

init();

function doMe(){
  bigMe.classList.add('huge-me');
  bigMe.classList.add('me-transition');
  if (window.innerWidth > 500){
    document.getElementById("square").style.transform = "scale(4)";
    // rotSqr.style.transform = `rotate(45deg)
    //                           scaleX(${1.1 * document.body.clientWidth / rotSqr.clientWidth})
    //                           scaleY(${1.1 * document.body.clientHeight / rotSqr.clientHeight})`;
    rotSqr.style.transform = `rotate(45deg) scale(${Math.max(1.5 * document.body.clientWidth / rotSqr.clientWidth, 1.5 * document.body.clientHeight / rotSqr.clientHeight)})`;
    rotSqr.classList.add("rot-transition");
  } else{
    document.getElementById("square").style.transform = "scale(8)";
    document.getElementById("rotated-square").style.transform = "scale(10)";
  }
  window.addEventListener('resize', positionText);
  window.addEventListener('resize', scaleRotSqr);
}

function positionText(){
  let textEl = document.getElementById('text');
  if (textEl){
    let computedStyle = window.getComputedStyle(textEl);
    let elementHeight = textEl.clientHeight;
    elementHeight -= parseFloat(computedStyle.paddingTop);
    textEl.style.paddingTop = `${document.body.clientHeight / 2 - elementHeight / 2}px`;
  }
}

function scaleRotSqr(){
  rotSqr.style.transform = `rotate(45deg) scale(${Math.max(1.5 * document.body.clientWidth / rotSqr.clientWidth, 1.5 * document.body.clientHeight / rotSqr.clientHeight)})`;
}

function doIndex(){
  console.log("HII");
  bigMe.classList.remove('huge-me');
  bigMe.classList.add('transition-enlarge');

  window.removeEventListener('resize', scaleRotSqr);
}

function linkClickHandler() {
  // console.log("Link clicked!");

  if (window.location.pathname == '/'){
    // console.log("On index page");
    doMe();
  }

  if (window.location.pathname.indexOf('me.html') > -1){
    // console.log("On me.html");
    doIndex();
  }
}

function popStateHandler() {
  // console.log("Page change!");

  if (window.location.pathname.indexOf('me.html') > -1){
    bigMe.classList.add('huge-me');
    // console.log("Now on me.html");
  }

  if (window.location.pathname == '/'){
    bigMe.classList.remove('huge-me');
    bigMe.classList.add('transition-enlarge');
    // console.log("Now on index");
    const rotSqr = document.getElementById("rotated-square");
    rotSqr.style.transform = "rotate(45deg)";
    window.removeEventListener('resize', scaleRotSqr);
  }
}

function init() {
  // console.log("init");
  bigMe.classList.remove('me-transition');
  rotSqr.classList.remove("rot-transition");

  positionText();
  window.addEventListener('resize', positionText);

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