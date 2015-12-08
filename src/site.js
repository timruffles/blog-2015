(function() {
"use strict";

main();

function main() {
  headerImage(64); 
}

function headerImage(desiredSquareDimension) {
  var points = [[0,.5], [.25,0], [.75,0], [1,.5], [.75,1], [.25,1]];
  var el = document.getElementById("header");
  var img = new Image;
  img.src = document.getElementById("headerImage").src;

  el.style.width = el.style.height = desiredSquareDimension + "px";

  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");

  img.onerror = function(e) {
    console.error("load fail", e);
  }

  img.onload = function() {
    canvas.width = img.width;
    canvas.height = img.height;
    
    var scale = desiredSquareDimension / img.width;
    ctx.beginPath();

    points.forEach(function(p, i) {
      ctx[i === 0 ? "moveTo" : "lineTo"](p[0] * img.width, p[1] * img.height);
    });

    ctx.clip();

    ctx.drawImage(img, 0, 0, img.width, img.height);
    canvas.style.transform = "scale(" + scale + ")";

    el.appendChild(canvas); 
  };
  
}
  
})();
