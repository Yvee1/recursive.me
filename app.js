const swup = new Swup(); // only this line when included with script tag

swup.on('contentReplaced', init);
swup.on('clickLink', linkClickHandler);
swup.on('popState', popStateHandler);

const bigMe = document.getElementById('big-me');

init();

function doMe(){
  bigMe.classList.add('huge-me');
  if (window.innerWidth > 500){
    document.getElementById("square").style.transform = "scale(5)";
    document.getElementById("rotated-square").style.transform = "rotate(45deg) scale(5)";
  } else{
    document.getElementById("square").style.transform = "scale(10)";
    document.getElementById("rotated-square").style.transform = "rotate(45deg) scale(10)";
  }
  window.addEventListener('resize', positionText);
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

function doIndex(){
  bigMe.classList.remove('huge-me');
  bigMe.classList.add('transition-enlarge');
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
  }
}

function init() {
  // console.log("init");
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