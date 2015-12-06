(function() {  

patchPrototypes();

main();

function main() {
  styleArticles();
}

function styleArticles() {
  $("article").forEach(function(el, i) {
    var y = 5 + i + "ex";
    el.css({
      "z-index": -100 - i,
      "transform": "translate3d(0, " + y + ",0)",
    })

    var l = 100 - (i * 5);
    el.$("polygon").set("fill", "hsl(0,0%," + l + "%)");
  });
}

function $(s, c) {
  var selection = [].slice.call((c || document).querySelectorAll(s));
  groupFn("set");
  groupFn("css");

  return selection; 

  function groupFn(method) {
    selection[method] = function() {
      var params = arguments;
      selection.forEach(function(el) {
        el[method].apply(el, params); 
      });
      return selection;
    }
  }
}

function patchPrototypes() {
  Element.prototype.set = Element.prototype.setAttribute;
  Element.prototype.get = Element.prototype.getAttribute;
  Element.prototype.css = function(k, v) {
    var el = this;
    if(typeof k === "object") {
      return Object.keys(k).forEach(function(ik) {
        el.style[ik] = k[ik]; 
      });
    }
    this.style[k] = v;
  };

  Element.prototype.$ = function(s) {
    return $(s, this); 
  }
  
}

})();
